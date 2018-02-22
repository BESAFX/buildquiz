package com.besafx.app.rest;

import com.besafx.app.auditing.PersonAwareUserDetails;
import com.besafx.app.entity.Person;
import com.besafx.app.entity.Question;
import com.besafx.app.service.QuestionService;
import com.besafx.app.util.JSONConverter;
import com.besafx.app.util.Options;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/api/question/")
public class QuestionRest {

    public static final String FILTER_TABLE = "" +
            "**," +
            "quiz[id]," +
            "answers[**,question[id]]";

    @Autowired
    private QuestionService questionService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_QUESTION_CREATE')")
    @Transactional
    public String create(@RequestBody Question question, Principal principal) {
        Question topQuestion = questionService.findTopByQuizOrderByCodeDesc(question.getQuiz());
        if (topQuestion == null) {
            question.setCode(1);
        } else {
            question.setCode(topQuestion.getCode() + 1);
        }
        question = questionService.save(question);
        Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
        String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
        notificationService.notifyOne(Notification
                .builder()
                .message(lang.equals("AR") ? "تم انشاء السؤال بنجاح" : "Create Question Successfully")
                .type("success")
                .build(), principal.getName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), question);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_QUESTION_UPDATE')")
    @Transactional
    public String update(@RequestBody Question question, Principal principal) {
        Question object = questionService.findOne(question.getId());
        if (object != null) {
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            question = questionService.save(question);
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم تعديل السؤال بنجاح" : "Update Question Successfully")
                    .type("warning")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), question);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_QUESTION_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id, Principal principal) {
        Question question = questionService.findOne(id);
        if (question != null) {
            questionService.delete(id);
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم حذف السؤال بنجاح" : "Delete Question Successfully")
                    .type("error")
                    .build(), principal.getName());
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        List<Question> list = Lists.newArrayList(questionService.findAll());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), list);
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), questionService.findOne(id));
    }

    @RequestMapping(value = "findByQuiz/{quizId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByQuiz(@PathVariable Long quizId) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), questionService.findByQuizIdOrderByCodeAsc(quizId));
    }
}
