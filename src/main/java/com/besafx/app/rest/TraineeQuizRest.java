package com.besafx.app.rest;

import com.besafx.app.Async.TransactionalService;
import com.besafx.app.auditing.PersonAwareUserDetails;
import com.besafx.app.entity.Person;
import com.besafx.app.entity.Trainee;
import com.besafx.app.entity.TraineeQuiz;
import com.besafx.app.service.TraineeQuizService;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/traineeQuiz/")
public class TraineeQuizRest {

    private final static Logger log = LoggerFactory.getLogger(TraineeQuizRest.class);

    public static final String FILTER_TABLE = "" +
            "**," +
            "trainee[id,person[id,-team,contact[id,name,email]]]," +
            "quiz[id,code,content,questions[id,result]]";

    @Autowired
    private TraineeQuizService traineeQuizService;

    @Autowired
    private TraineeService traineeService;

    @Autowired
    private TransactionalService transactionalService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINEE_QUIZ_CREATE')")
    @Transactional
    public String create(@RequestBody TraineeQuiz traineeQuiz) {
        TraineeQuiz topTraineeQuiz = traineeQuizService.findTopByTraineeOrderByKeyDesc(traineeQuiz.getTrainee());
        if (topTraineeQuiz == null) {
            traineeQuiz.setKey(Long.valueOf(1));
        } else {
            traineeQuiz.setKey(topTraineeQuiz.getKey() + 1);
        }
        traineeQuiz = traineeQuizService.save(traineeQuiz);
        Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
        String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
        notificationService.notifyOne(Notification
                .builder()
                .message(lang.equals("AR") ? "تم انشاء اختبار للمتدرب بنجاح" : "Create TraineeQuiz Successfully")
                .type("success")
                .build(), caller.getUserName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), traineeQuiz);
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINEE_QUIZ_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id) {
        TraineeQuiz traineeQuiz = traineeQuizService.findOne(id);
        if (traineeQuiz != null) {
            traineeQuizService.delete(id);
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم حذف اختبار المتدرب بنجاح" : "Delete TraineeQuiz Successfully")
                    .type("error")
                    .build(), caller.getUserName());
        }
    }

    @RequestMapping(value = "deleteByTrainee/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_TRAINEE_QUIZ_DELETE')")
    @Transactional
    public void deleteByTrainee(@PathVariable Long id) {
        Trainee trainee = traineeService.findOne(id);
        if (trainee != null) {
            traineeQuizService.delete(trainee.getTraineeQuizzes());
            Person caller = ((PersonAwareUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم حذف نماذج الاختبارات بنجاح" : "Delete TraineeQuizzes Successfully")
                    .type("error")
                    .build(), caller.getUserName());
        }
    }

    @RequestMapping(value = "getTraineeQuizPercentage/{traineeQuizId}", method = RequestMethod.GET, produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    @Transactional
    public String getTraineeQuizPercentage(@PathVariable(value = "traineeQuizId") Long traineeQuizId) {
        TraineeQuiz traineeQuiz = traineeQuizService.findOne(traineeQuizId);
        return transactionalService.getTraineeQuizPercentage(traineeQuiz).toString().concat(" %");
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        List<TraineeQuiz> list = Lists.newArrayList(traineeQuizService.findAll());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), list);
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), traineeQuizService.findOne(id));
    }

    @RequestMapping(value = "findByTrainee/{traineeId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByTrainee(@PathVariable Long traineeId) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), traineeQuizService.findByTraineeIdOrderByKeyAsc(traineeId));
    }

    @RequestMapping(value = "findByPerson/{personId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByPerson(@PathVariable Long personId) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), traineeQuizService.findByTraineePersonIdOrderByKeyAsc(personId));
    }
}
