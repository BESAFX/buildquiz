package com.besafx.app.Async;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.Future;

@Service
public class AsyncSchedule {

    private final Logger log = LoggerFactory.getLogger(AsyncSchedule.class);

    @Async("ByteGenerate")
    public Future<byte[]> getFile() throws Exception {
        return null;
    }
}
