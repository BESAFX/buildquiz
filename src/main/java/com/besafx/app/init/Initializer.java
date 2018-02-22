package com.besafx.app.init;

import com.besafx.app.Main;
import com.besafx.app.entity.Contact;
import com.besafx.app.entity.Person;
import com.besafx.app.entity.Team;
import com.besafx.app.service.ContactService;
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

    private final Logger log = LoggerFactory.getLogger(Main.class);

    @Autowired
    private TeamService teamService;

    @Autowired
    private ContactService contactService;

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
                "ROLE_PROFILE_UPDATE",
                "ROLE_TRAINEE_CREATE",
                "ROLE_TRAINEE_UPDATE",
                "ROLE_TRAINEE_DELETE",
                "ROLE_TRAINEE_ENABLE",
                "ROLE_TRAINEE_DISABLE",
                "ROLE_TRAINER_CREATE",
                "ROLE_TRAINER_UPDATE",
                "ROLE_TRAINER_DELETE",
                "ROLE_TRAINER_ENABLE",
                "ROLE_TRAINER_DISABLE",
                "ROLE_TEAM_CREATE",
                "ROLE_TEAM_UPDATE",
                "ROLE_TEAM_DELETE"
        ));
        teamService.save(team);
        //
        log.info("إنشاء المستخدم الخاص بمدير النظام");
        Person person = new Person();
        Contact contact = new Contact();
        contact.setNickname("Eng.");
        contact.setName("BASSAM ALMAHDY");
        contact.setPhoto("");
        contact.setQualification("Web Developer");
        contact.setEmail("islamhaker@gmail.com");
        person.setContact(contactService.save(contact));
        person.setUserName("islamhaker@gmail.com");
        person.setPassword(passwordEncoder.encode("besa2009"));
        person.setHiddenPassword("besa2009");
        person.setEnabled(true);
        person.setTokenExpired(false);
        person.setActive(false);
        person.setTechnicalSupport(true);
        person.setTeam(team);
        person.setOptions(JSONConverter.toString(Options.builder().lang("AR").dateType("H")));
        personService.save(person);
    }
}
