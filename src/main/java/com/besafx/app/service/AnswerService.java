package com.besafx.app.service;

import com.besafx.app.entity.Answer;
import com.besafx.app.entity.Question;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface AnswerService extends PagingAndSortingRepository<Answer, Long>, JpaSpecificationExecutor<Answer> {
    List<Answer> findByQuestion(Question question);
}

