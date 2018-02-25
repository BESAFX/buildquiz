package com.besafx.app.rest;

import com.besafx.app.auditing.PersonAwareUserDetails;
import com.besafx.app.config.DropboxManager;
import com.besafx.app.entity.Person;
import com.besafx.app.service.ContactService;
import com.besafx.app.service.PersonService;
import com.besafx.app.util.JSONConverter;
import com.besafx.app.util.Options;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.math.BigInteger;
import java.security.Principal;
import java.security.SecureRandom;
import java.util.concurrent.Future;

@RestController
@RequestMapping(value = "/api/person/")
public class PersonRest {

    public static final String FILTER_TABLE = "**,-hiddenPassword,team[**,-persons]";

    private SecureRandom random;

    @PostConstruct
    public void init() {
        random = new SecureRandom();
    }

    @Autowired
    private ContactService contactService;

    @Autowired
    private PersonService personService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private DropboxManager dropboxManager;

    @RequestMapping(value = "setGUILang/{lang}", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PROFILE_UPDATE')")
    @Transactional
    public void setGUILang(@PathVariable(value = "lang") String lang) {
        Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
        Options options = JSONConverter.toObject(caller.getOptions(), Options.class);
        options.setLang(lang);
        caller.setOptions(JSONConverter.toString(options));
        personService.save(caller);
    }

    @RequestMapping(value = "setDateType/{type}", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PROFILE_UPDATE')")
    @Transactional
    public void setDateType(@PathVariable(value = "type") String type) {
        Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
        Options options = JSONConverter.toObject(caller.getOptions(), Options.class);
        options.setDateType(type);
        caller.setOptions(JSONConverter.toString(options));
        personService.save(caller);
    }

    @RequestMapping(value = "setStyle/{style}", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PROFILE_UPDATE')")
    @Transactional
    public void setStyle(@PathVariable(value = "style") String style) {
        Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
        Options options = JSONConverter.toObject(caller.getOptions(), Options.class);
        options.setStyle(style);
        caller.setOptions(JSONConverter.toString(options));
        personService.save(caller);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PROFILE_UPDATE')")
    @Transactional
    public String update(@RequestBody Person person, Principal principal) {
        Person object = personService.findOne(person.getId());
        if (object != null) {
            if (!object.getPassword().equals(person.getPassword())) {
                person.setHiddenPassword(person.getPassword());
                person.setPassword(passwordEncoder.encode(person.getPassword()));
            } else {
                person.setHiddenPassword(object.getHiddenPassword());
            }
            person = personService.save(person);
            notificationService.notifyOne(Notification
                    .builder()
                    .message("تم حفظ التغيرات بنجاح")
                    .type("success")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), person);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "/uploadPersonPhoto", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    @Transactional
    public String uploadPersonPhoto(@RequestParam("file") MultipartFile file, Principal principal) throws Exception {
        Person person = personService.findByUserName(principal.getName());
        String fileName = new BigInteger(130, random).toString(32) + "." + FilenameUtils.getExtension(file.getOriginalFilename());
        Future<Boolean> task = dropboxManager.uploadFile(file, "/build-quiz/persons/" + fileName.toLowerCase());
        if (task.get()) {
            Future<String> task11 = dropboxManager.shareFile("/build-quiz/persons/" + fileName.toLowerCase());
            String photoLink = task11.get();
            person.getContact().setPhoto(photoLink);
            person.setContact(contactService.save(person.getContact()));
            personService.save(person);
            return photoLink;
        } else {
            return null;
        }
    }


    @RequestMapping("findActivePerson")
    @ResponseBody
    public String findActivePerson() {
        Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), caller);
    }

}
