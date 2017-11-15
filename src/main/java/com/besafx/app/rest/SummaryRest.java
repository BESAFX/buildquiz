package com.besafx.app.rest;

import com.besafx.app.entity.Person;
import com.besafx.app.entity.Summary;
import com.besafx.app.service.PersonService;
import com.besafx.app.service.SummaryService;
import com.besafx.app.util.JSONConverter;
import com.besafx.app.util.Options;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/api/summary/")
public class SummaryRest {

    public static final String FILTER_TABLE = "**,quiz[id,code,content],person[id,nickname,name],lastPerson[id,nickname,name]";

    @Autowired
    private SummaryService summaryService;

    @Autowired
    private PersonService personService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_SUMMERY_CREATE')")
    @Transactional
    public String create(@RequestBody Summary summary, Principal principal) {
        Person caller = personService.findByEmail(principal.getName());
        summary.setLastPerson(caller);
        summary.setLastUpdate(new DateTime().toDate());
        summary = summaryService.save(summary);
        String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
        notificationService.notifyOne(Notification
                .builder()
                .message(lang.equals("AR") ? "تم انشاء اختبار المتدرب بنجاح" : "Create Quiz Of Trainer Successfully")
                .type("success")
                .build(), principal.getName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), summary);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_SUMMERY_UPDATE')")
    @Transactional
    public String update(@RequestBody Summary summary, Principal principal) {
        Summary object = summaryService.findOne(summary.getId());
        if (object != null) {
            Person caller = personService.findByEmail(principal.getName());
            summary.setLastPerson(caller);
            summary.setLastUpdate(new DateTime().toDate());
            summary = summaryService.save(summary);
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم تعديل اختبار المتدرب بنجاح" : "Update Quiz Of Trainer Successfully")
                    .type("warning")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), summary);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_SUMMERY_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id, Principal principal) {
        Summary summary = summaryService.findOne(id);
        if (summary != null) {
            summaryService.delete(id);
            Person caller = personService.findByEmail(principal.getName());
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم حذف اختبار المتدرب بنجاح" : "Delete Quiz Of Trainer Successfully")
                    .type("error")
                    .build(), principal.getName());
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        List<Summary> list = Lists.newArrayList(summaryService.findAll());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), list);
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), summaryService.findOne(id));
    }
}
