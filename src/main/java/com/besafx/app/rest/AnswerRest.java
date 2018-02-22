package com.besafx.app.rest;

import com.besafx.app.auditing.PersonAwareUserDetails;
import com.besafx.app.entity.Answer;
import com.besafx.app.entity.Person;
import com.besafx.app.entity.Question;
import com.besafx.app.service.AnswerService;
import com.besafx.app.service.PersonService;
import com.besafx.app.service.QuestionService;
import com.besafx.app.util.JSONConverter;
import com.besafx.app.util.Options;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.ListIterator;

@RestController
@RequestMapping(value = "/api/answer/")
public class AnswerRest {

    private final static Logger log = LoggerFactory.getLogger(AnswerRest.class);

    public static final String FILTER_TABLE = "" +
            "**," +
            "question[id]";

    @Autowired
    private AnswerService answerService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ANSWER_CREATE')")
    @Transactional
    public String create(@RequestBody Answer answer) {
        Answer topAnswer = answerService.findTopByQuestionOrderByCodeDesc(answer.getQuestion());
        if (topAnswer == null) {
            answer.setCode(1);
        } else {
            answer.setCode(topAnswer.getCode() + 1);
        }
        answer = answerService.save(answer);
        Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
        String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
        notificationService.notifyOne(Notification
                .builder()
                .message(lang.equals("AR") ? "تم انشاء الاجابة بنجاح" : "Create Answer Successfully")
                .type("success")
                .build(), caller.getUserName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), answer);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ANSWER_UPDATE')")
    @Transactional
    public String update(@RequestBody Answer answer) {
        Answer object = answerService.findOne(answer.getId());
        if (object != null) {
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            answer = answerService.save(answer);
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم تعديل الاجابة بنجاح" : "Update Answer Successfully")
                    .type("warning")
                    .build(), caller.getUserName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), answer);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ANSWER_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id) {
        Answer answer = answerService.findOne(id);
        if (answer != null) {
            answerService.delete(id);
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم حذف الاجابة بنجاح" : "Delete Answer Successfully")
                    .type("error")
                    .build(), caller.getUserName());
        }
    }

    @RequestMapping(value = "deleteByQuestion/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ANSWER_DELETE')")
    @Transactional
    public void deleteByQuestion(@PathVariable Long id) {
        Question question = questionService.findOne(id);
        if (question != null) {
            answerService.delete(question.getAnswers());
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم حذف الاجابات بنجاح" : "Delete Answers Successfully")
                    .type("error")
                    .build(), caller.getUserName());
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        List<Answer> list = Lists.newArrayList(answerService.findAll());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), list);
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), answerService.findOne(id));
    }

    @RequestMapping(value = "findByQuestion/{questionId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByQuestion(@PathVariable Long questionId) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), answerService.findByQuestionIdOrderByCodeAsc(questionId));
    }
}
