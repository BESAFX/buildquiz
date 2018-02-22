package com.besafx.app.rest;

import com.besafx.app.auditing.PersonAwareUserDetails;
import com.besafx.app.config.CustomException;
import com.besafx.app.entity.Trainer;
import com.besafx.app.entity.Person;
import com.besafx.app.service.ContactService;
import com.besafx.app.service.TrainerService;
import com.besafx.app.service.PersonService;
import com.besafx.app.util.JSONConverter;
import com.besafx.app.util.Options;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping(value = "/api/trainer/")
public class TrainerRest {

    public static final String FILTER_TABLE = "" +
            "**," +
            "person[**,-hiddenPassword,team[id]]";
    public static final String FILTER_TRAINER_COMBO = "" +
            "**," +
            "person[id,nickname,name,mobile]";

    private final static Logger log = LoggerFactory.getLogger(TrainerRest.class);

    @Autowired
    private TrainerService trainerService;

    @Autowired
    private ContactService contactService;

    @Autowired
    private PersonService personService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINER_CREATE')")
    @Transactional
    public String create(@RequestBody Trainer trainer) {
        if (personService.findByUserName(trainer.getPerson().getUserName()) != null) {
            throw new CustomException("هذا البريد الإلكتروني غير متاح ، فضلاً ادخل بريد آخر غير مستخدم");
        }
        trainer.getPerson().setContact(contactService.save(trainer.getPerson().getContact()));
        trainer.getPerson().setHiddenPassword(trainer.getPerson().getPassword());
        trainer.getPerson().setPassword(passwordEncoder.encode(trainer.getPerson().getPassword()));
        trainer.getPerson().setEnabled(true);
        trainer.getPerson().setTokenExpired(false);
        trainer.getPerson().setActive(false);
        trainer.getPerson().setTechnicalSupport(false);
        trainer.getPerson().setOptions(JSONConverter.toString(Options.builder().lang("AR").dateType("H")));
        trainer.setPerson(personService.save(trainer.getPerson()));
        Trainer topTrainer = trainerService.findTopByOrderByCodeDesc();
        if (topTrainer == null) {
            trainer.setCode(1);
        } else {
            trainer.setCode(topTrainer.getCode() + 1);
        }
        trainer.setEnabled(true);
        trainer = trainerService.save(trainer);
        Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
        String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
        notificationService.notifyOne(Notification
                .builder()
                .title(lang.equals("AR") ? "العمليات على حسابات المدربين" : "Data Processing")
                .message(lang.equals("AR") ? "تم انشاء حساب المدرب بنجاح" : "Create Trainer Account Successfully")
                .type("success")
                .build(), caller.getUserName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), trainer);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINER_UPDATE')")
    @Transactional
    public String update(@RequestBody Trainer trainer) {
        if (trainerService.findByCodeAndIdIsNot(trainer.getCode(), trainer.getId()) != null) {
            throw new CustomException("هذا الكود مستخدم سابقاً، فضلاً قم بتغير الكود.");
        }
        Trainer object = trainerService.findOne(trainer.getId());
        if (object != null) {
            log.info("فحص الباسوورد الخاص بحساب المدرب...");
            if (!object.getPerson().getPassword().equals(trainer.getPerson().getPassword())) {
                trainer.getPerson().setHiddenPassword(trainer.getPerson().getPassword());
                trainer.getPerson().setPassword(passwordEncoder.encode(trainer.getPerson().getPassword()));
            } else {
                trainer.getPerson().setHiddenPassword(object.getPerson().getHiddenPassword());
            }
            trainer.getPerson().setContact(contactService.save(trainer.getPerson().getContact()));
            trainer.getPerson().setTokenExpired(false);
            trainer.getPerson().setActive(false);
            trainer.getPerson().setTechnicalSupport(false);
            log.info("حفظ حساب المدرب...");
            trainer.setPerson(personService.save(trainer.getPerson()));
            log.info("حفظ بيانات المدرب...");
            trainer = trainerService.save(trainer);
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .title(lang.equals("AR") ? "العمليات على حسابات المدربين" : "Data Processing")
                    .message(lang.equals("AR") ? "تم تعديل بيانات حساب المدرب بنجاح" : "Update Trainer Account Information Successfully")
                    .type("warning")
                    .build(), caller.getUserName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), trainer);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "enable/{trainerId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINER_ENABLE')")
    @Transactional
    public String enable(@PathVariable(value = "trainerId") Long trainerId) {
        Trainer trainer = trainerService.findOne(trainerId);
        if (trainer != null) {
            trainer.getPerson().setEnabled(true);
            trainer.getPerson().setTokenExpired(false);
            trainer.getPerson().setActive(false);
            trainer.getPerson().setTechnicalSupport(false);
            trainer.setPerson(personService.save(trainer.getPerson()));
            trainer = trainerService.save(trainer);
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), trainer);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "disable/{trainerId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINER_DISABLE')")
    @Transactional
    public String disable(@PathVariable(value = "trainerId") Long trainerId) {
        Trainer trainer = trainerService.findOne(trainerId);
        if (trainer != null) {
            trainer.getPerson().setEnabled(false);
            trainer.getPerson().setTokenExpired(false);
            trainer.getPerson().setActive(false);
            trainer.getPerson().setTechnicalSupport(false);
            trainer.setPerson(personService.save(trainer.getPerson()));
            trainer = trainerService.save(trainer);
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), trainer);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINER_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id) {
        Trainer trainer = trainerService.findOne(id);
        if (trainer != null) {
            trainerService.delete(id);
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .title(lang.equals("AR") ? "العمليات على حسابات المدربين" : "Data Processing")
                    .message(lang.equals("AR") ? "تم حذف حساب المدرب بنجاح" : "Delete Trainer Account Successfully")
                    .type("error")
                    .build(), caller.getUserName());
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        List<Trainer> list = Lists.newArrayList(trainerService.findAll());
        list.sort(Comparator.comparing(Trainer::getCode));
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), list);
    }

    @RequestMapping(value = "findAllCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAllCombo() {
        List<Trainer> list = Lists.newArrayList(trainerService.findAll());
        list.sort(Comparator.comparing(Trainer::getCode));
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TRAINER_COMBO), list);
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), trainerService.findOne(id));
    }
}
