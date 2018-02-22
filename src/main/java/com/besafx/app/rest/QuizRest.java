package com.besafx.app.rest;

import com.besafx.app.auditing.PersonAwareUserDetails;
import com.besafx.app.entity.Quiz;
import com.besafx.app.entity.Person;
import com.besafx.app.service.QuizService;
import com.besafx.app.service.PersonService;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping(value = "/api/quiz/")
public class QuizRest {

    public static final String FILTER_TABLE = "" +
            "**," +
            "category[id,code,name]," +
            "questions[id]";
    public static final String FILTER_QUIZ_COMBO = "" +
            "id," +
            "code," +
            "content";

    @Autowired
    private QuizService quizService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_QUIZ_CREATE')")
    @Transactional
    public String create(@RequestBody Quiz quiz, Principal principal) {
        Quiz topQuiz = quizService.findTopByOrderByCodeDesc();
        if(topQuiz == null){
            quiz.setCode(1);
        }else{
            quiz.setCode(topQuiz.getCode() + 1);
        }
        Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
        quiz = quizService.save(quiz);
        String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
        notificationService.notifyOne(Notification
                .builder()
                .message(lang.equals("AR") ? "تم انشاء الاختبار بنجاح" : "Create Quiz Successfully")
                .type("success")
                .build(), principal.getName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), quiz);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_QUIZ_UPDATE')")
    @Transactional
    public String update(@RequestBody Quiz quiz, Principal principal) {
        Quiz object = quizService.findOne(quiz.getId());
        if (object != null) {
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            quiz = quizService.save(quiz);
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم تعديل الاختبار بنجاح" : "Update Quiz Successfully")
                    .type("warning")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), quiz);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_QUIZ_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id, Principal principal) {
        Quiz quiz = quizService.findOne(id);
        if (quiz != null) {
            quizService.delete(id);
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم حذف الاختبار بنجاح" : "Delete Quiz Successfully")
                    .type("error")
                    .build(), principal.getName());
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        List<Quiz> list = Lists.newArrayList(quizService.findAll());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), list);
    }

    @RequestMapping(value = "findAllCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAllCombo() {
        List<Quiz> list = Lists.newArrayList(quizService.findAll());
        list.sort(Comparator.comparing(Quiz::getCode));
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_QUIZ_COMBO), list);
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), quizService.findOne(id));
    }
}
