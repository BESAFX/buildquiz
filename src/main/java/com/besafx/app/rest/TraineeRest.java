package com.besafx.app.rest;

import com.besafx.app.auditing.PersonAwareUserDetails;
import com.besafx.app.config.CustomException;
import com.besafx.app.entity.Person;
import com.besafx.app.entity.Trainee;
import com.besafx.app.search.TraineeSearch;
import com.besafx.app.service.ContactService;
import com.besafx.app.service.PersonService;
import com.besafx.app.service.TraineeService;
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
@RequestMapping(value = "/api/trainee/")
public class TraineeRest {

    public static final String FILTER_TABLE = "" +
            "**," +
            "-traineeQuizzes," +
            "person[id,contact[id,name,email]]";
    public static final String FILTER_DETAILS = "" +
            "**," +
            "traineeQuizzes[**,quiz[id,code,content,category[id,code,name]],-trainee]," +
            "person[**,team[id,code,name],contact[id,name,email]]";
    public static final String FILTER_COMBO = "" +
            "**," +
            "-traineeQuizzes," +
            "person[id,contact[id,name,email]]";

    private final static Logger log = LoggerFactory.getLogger(TraineeRest.class);

    @Autowired
    private TraineeService traineeService;

    @Autowired
    private ContactService contactService;

    @Autowired
    private PersonService personService;

    @Autowired
    private TraineeSearch traineeSearch;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINEE_CREATE')")
    @Transactional
    public String create(@RequestBody Trainee trainee) {
        if (personService.findByUserName(trainee.getPerson().getUserName()) != null) {
            throw new CustomException("هذا البريد الإلكتروني غير متاح ، فضلاً ادخل بريد آخر غير مستخدم");
        }
        trainee.getPerson().setContact(contactService.save(trainee.getPerson().getContact()));
        trainee.getPerson().setHiddenPassword(trainee.getPerson().getPassword());
        trainee.getPerson().setPassword(passwordEncoder.encode(trainee.getPerson().getPassword()));
        trainee.getPerson().setEnabled(true);
        trainee.getPerson().setTokenExpired(false);
        trainee.getPerson().setActive(false);
        trainee.getPerson().setTechnicalSupport(false);
        trainee.getPerson().setOptions(JSONConverter.toString(Options.builder().lang("AR").dateType("H")));
        trainee.setPerson(personService.save(trainee.getPerson()));
        Trainee topTrainee = traineeService.findTopByOrderByCodeDesc();
        if (topTrainee == null) {
            trainee.setCode(1);
        } else {
            trainee.setCode(topTrainee.getCode() + 1);
        }
        trainee.setEnabled(true);
        trainee = traineeService.save(trainee);
        Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
        String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
        notificationService.notifyOne(Notification
                .builder()
                .message(lang.equals("AR") ? "تم انشاء حساب المتدرب بنجاح" : "Create Trainee Account Successfully")
                .type("success")
                .build(), caller.getUserName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_DETAILS), trainee);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINEE_UPDATE')")
    @Transactional
    public String update(@RequestBody Trainee trainee) {
        if (traineeService.findByCodeAndIdIsNot(trainee.getCode(), trainee.getId()) != null) {
            throw new CustomException("هذا الكود مستخدم سابقاً، فضلاً قم بتغير الكود.");
        }
        Trainee object = traineeService.findOne(trainee.getId());
        if (object != null) {
            log.info("فحص الباسوورد الخاص بحساب المتدرب...");
            if (!object.getPerson().getPassword().equals(trainee.getPerson().getPassword())) {
                trainee.getPerson().setHiddenPassword(trainee.getPerson().getPassword());
                trainee.getPerson().setPassword(passwordEncoder.encode(trainee.getPerson().getPassword()));
            } else {
                trainee.getPerson().setHiddenPassword(object.getPerson().getHiddenPassword());
            }
            trainee.getPerson().setContact(contactService.save(trainee.getPerson().getContact()));
            trainee.getPerson().setTokenExpired(false);
            trainee.getPerson().setActive(false);
            trainee.getPerson().setTechnicalSupport(false);
            log.info("حفظ حساب المتدرب...");
            trainee.setPerson(personService.save(trainee.getPerson()));
            log.info("حفظ بيانات المتدرب...");
            trainee = traineeService.save(trainee);
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .title(lang.equals("AR") ? "العمليات على حسابات المتدربين" : "Data Processing")
                    .message(lang.equals("AR") ? "تم تعديل بيانات حساب المتدرب بنجاح" : "Update Trainee Account Information Successfully")
                    .type("warning")
                    .build(), caller.getUserName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_DETAILS), trainee);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "enable/{customerId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINEE_ENABLE')")
    @Transactional
    public String enable(@PathVariable(value = "customerId") Long customerId) {
        Trainee trainee = traineeService.findOne(customerId);
        if (trainee != null) {
            trainee.setEnabled(true);
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_DETAILS), traineeService.save(trainee));
        } else {
            throw new CustomException("هذا المتدرب غير موجود");
        }
    }

    @RequestMapping(value = "disable/{customerId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINEE_DISABLE')")
    @Transactional
    public String disable(@PathVariable(value = "customerId") Long customerId) {
        Trainee trainee = traineeService.findOne(customerId);
        if (trainee != null) {
            trainee.setEnabled(false);
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_DETAILS), traineeService.save(trainee));
        } else {
            throw new CustomException("هذا المتدرب غير موجود");
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINEE_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id) {
        Trainee trainee = traineeService.findOne(id);
        if (trainee != null) {
            traineeService.delete(id);
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم حذف حساب المتدرب وكل ما يتعلق به من حسابات بنجاح" : "Delete Trainee Account With All Related Successfully")
                    .type("error")
                    .build(), caller.getUserName());
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        List<Trainee> list = Lists.newArrayList(traineeService.findAll());
        list.sort(Comparator.comparing(Trainee::getCode));
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), list);
    }

    @RequestMapping(value = "findAllCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAllCombo() {
        List<Trainee> list = Lists.newArrayList(traineeService.findAll());
        list.sort(Comparator.comparing(Trainee::getCode));
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_COMBO), list);
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_DETAILS), traineeService.findOne(id));
    }

    @RequestMapping(value = "filter", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String filter(
            @RequestParam(value = "code", required = false) final String code,
            @RequestParam(value = "name", required = false) final String name,
            @RequestParam(value = "mobile", required = false) final String mobile,
            @RequestParam(value = "identityNumber", required = false) final String identityNumber,
            @RequestParam(value = "email", required = false) final String email) {
        List<Trainee> list = traineeSearch.filter(code, name, mobile, identityNumber, email);
        list.sort(Comparator.comparing(Trainee::getCode));
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), list);
    }
}
