package com.besafx.app.entity.listener;


import com.besafx.app.auditing.Action;
import com.besafx.app.component.BeanUtil;
import com.besafx.app.entity.History;
import com.besafx.app.entity.Trainee;
import com.besafx.app.rest.TraineeRest;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Component
public class TraineeListener {

    private static final Logger log = LoggerFactory.getLogger(TraineeListener.class);

    @Transactional(Transactional.TxType.MANDATORY)
    public void perform(Trainee trainee, Action action, String message) {
        try {
            EntityManager entityManager = BeanUtil.getBean(EntityManager.class);
            History history = new History();
            history.setClassName(trainee.getClass().getSimpleName());
            history.setScreenName("المتدربين");
            history.setAction(action);
            history.setObjectJson(SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), TraineeRest.FILTER_TABLE), trainee));
            history.setNote(message);
            entityManager.persist(history);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
