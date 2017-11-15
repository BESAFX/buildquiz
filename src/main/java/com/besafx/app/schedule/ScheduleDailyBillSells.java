package com.besafx.app.schedule;

import com.besafx.app.Async.AsyncSchedule;
import com.besafx.app.config.EmailSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduleDailyBillSells {

    private final Logger log = LoggerFactory.getLogger(ScheduleDailyBillSells.class);

    @Autowired
    private AsyncSchedule asyncSchedule;

    @Autowired
    private EmailSender emailSender;

    @Scheduled(cron = "0 0 22 * * *")
    public void run() throws Exception {

    }


}
