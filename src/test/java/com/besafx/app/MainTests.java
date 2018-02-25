package com.besafx.app;

import com.besafx.app.entity.Answer;
import com.besafx.app.service.CategoryService;
import org.apache.commons.collections.CollectionUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MainTests {

    private final Logger log = LoggerFactory.getLogger(MainTests.class);

    @Autowired
    private CategoryService categoryService;

    @Test
    public void contextLoads() throws Exception {
        Answer answer = new Answer();
        answer.setId(Long.valueOf(1));

        Answer answer2 = new Answer();
        answer2.setId(Long.valueOf(2));

        List<Answer> l1 = new ArrayList<>();
        l1.add(answer);

        List<Answer> l2 = new ArrayList<>();
        l2.add(answer2);

        log.info("RESULT: " + CollectionUtils.isEqualCollection(l1, l2));
    }
}
