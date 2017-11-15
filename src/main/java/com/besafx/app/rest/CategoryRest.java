package com.besafx.app.rest;

import com.besafx.app.entity.Category;
import com.besafx.app.entity.Person;
import com.besafx.app.service.CategoryService;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping(value = "/api/category/")
public class CategoryRest {

    public static final String FILTER_TABLE = "**,lastPerson[id,nickname,name]";
    public static final String FILTER_CATEGORY_COMBO = "id,code,name";

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private PersonService personService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_CATEGORY_CREATE')")
    @Transactional
    public String create(@RequestBody Category category, Principal principal) {
        Category topCategory = categoryService.findTopByOrderByCodeDesc();
        if(topCategory == null){
            category.setCode(1);
        }else{
            category.setCode(topCategory.getCode() + 1);
        }
        Person caller = personService.findByEmail(principal.getName());
        category.setLastPerson(caller);
        category.setLastUpdate(new DateTime().toDate());
        category = categoryService.save(category);
        String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
        notificationService.notifyOne(Notification
                .builder()
                .message(lang.equals("AR") ? "تم انشاء المادة بنجاح" : "Create Subject Successfully")
                .type("success")
                .build(), principal.getName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), category);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_CATEGORY_UPDATE')")
    @Transactional
    public String update(@RequestBody Category category, Principal principal) {
        Category object = categoryService.findOne(category.getId());
        if (object != null) {
            Person caller = personService.findByEmail(principal.getName());
            category.setLastPerson(caller);
            category.setLastUpdate(new DateTime().toDate());
            category = categoryService.save(category);
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم تعديل المادة بنجاح" : "Update Subject Successfully")
                    .type("warning")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), category);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_CATEGORY_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id, Principal principal) {
        Category category = categoryService.findOne(id);
        if (category != null) {
            categoryService.delete(id);
            Person caller = personService.findByEmail(principal.getName());
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم حذف المادة بنجاح" : "Delete Subject Successfully")
                    .type("error")
                    .build(), principal.getName());
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        List<Category> list = Lists.newArrayList(categoryService.findAll());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), list);
    }

    @RequestMapping(value = "findAllCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAllCombo() {
        List<Category> list = Lists.newArrayList(categoryService.findAll());
        list.sort(Comparator.comparing(Category::getCode));
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_CATEGORY_COMBO), list);
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), categoryService.findOne(id));
    }
}
