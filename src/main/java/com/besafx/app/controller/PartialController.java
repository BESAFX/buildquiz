package com.besafx.app.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class PartialController {

    private final static Logger log = LoggerFactory.getLogger(PartialController.class);

    @Autowired
    private SessionRegistry sessionRegistry;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView navToHome(Principal principal) {
        if (principal.getName().equals("anonymousUser")) {
            return new ModelAndView("redirect:/login");
        } else {
            return new ModelAndView("index");
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String navToLogin() {
        return "login";
    }

    @RequestMapping(value = "/getAllLoggedUsers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<String> getLoggedUsers() {
        return sessionRegistry.getAllPrincipals().stream()
                .filter(u -> !sessionRegistry.getAllSessions(u, false).isEmpty())
                .map(Object::toString)
                .collect(Collectors.toList());
    }

    // Match everything without a suffix (so not a static resource)
    @RequestMapping(value = {
            "/{path:[^\\.]*}",
            "/admin/category",
            "/admin/quiz",
            "/admin/question",
            "/admin/answer",
            "/admin/person",
            "/admin/team"
    })
    public String redirect() {
        // Forward to home page so that route is preserved.
        return "forward:/";
    }
}
