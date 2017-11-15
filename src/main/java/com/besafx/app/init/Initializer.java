package com.besafx.app.init;

import com.besafx.app.entity.Person;
import com.besafx.app.entity.Team;
import com.besafx.app.service.PersonService;
import com.besafx.app.service.TeamService;
import com.besafx.app.util.JSONConverter;
import com.besafx.app.util.Options;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class Initializer implements CommandLineRunner {

    private final static Logger log = LoggerFactory.getLogger(Initializer.class);

    @Autowired
    private TeamService teamService;

    @Autowired
    private PersonService personService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (personService.count() == 0) {
            runForFirstTimeOnly();
        }
    }

    private void runForFirstTimeOnly() {
        log.info("انشاء مجموعة الصلاحيات");
        Team team = new Team();
        team.setCode(1);
        team.setName("الدعم الفني");
        team.setAuthorities(String.join(",",
                "ROLE_CATEGORY_CREATE",
                "ROLE_CATEGORY_UPDATE",
                "ROLE_CATEGORY_DELETE",
                "ROLE_QUIZ_CREATE",
                "ROLE_QUIZ_UPDATE",
                "ROLE_QUIZ_DELETE",
                "ROLE_QUESTION_CREATE",
                "ROLE_QUESTION_UPDATE",
                "ROLE_QUESTION_DELETE",
                "ROLE_ANSWER_CREATE",
                "ROLE_ANSWER_UPDATE",
                "ROLE_ANSWER_DELETE",
                "ROLE_RESULT_CREATE",
                "ROLE_RESULT_UPDATE",
                "ROLE_RESULT_DELETE",
                "ROLE_SUMMERY_CREATE",
                "ROLE_SUMMERY_UPDATE",
                "ROLE_SUMMERY_DELETE",
                "ROLE_PERSON_CREATE",
                "ROLE_PERSON_UPDATE",
                "ROLE_PERSON_DELETE",
                "ROLE_TEAM_CREATE",
                "ROLE_TEAM_UPDATE",
                "ROLE_TEAM_DELETE",
                "ROLE_PROFILE_UPDATE"
        ));
        teamService.save(team);
        //
        log.info("إنشاء المستخدم الخاص بمدير النظام");
        Person person = new Person();
        person.setNickname("Eng.");
        person.setName("BASSAM ALMAHDY");
        person.setPhoto("");
        person.setQualification("Web Developer");
        person.setEmail("islamhaker@gmail.com");
        person.setPassword(passwordEncoder.encode("besa2009"));
        person.setHiddenPassword("besa2009");
        person.setEnabled(true);
        person.setTokenExpired(false);
        person.setActive(false);
        person.setTechnicalSupport(true);
        person.setTeam(team);
        person.setOptions(JSONConverter.toString(Options.builder().lang("AR").dateType("H")));
        log.info(JSONConverter.toString(Options.builder().lang("AR").dateType("H")));
        personService.save(person);
    }
}
