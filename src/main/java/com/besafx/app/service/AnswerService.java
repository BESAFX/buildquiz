package com.besafx.app.service;

import com.besafx.app.entity.Answer;
import com.besafx.app.entity.Question;
import com.besafx.app.entity.Quiz;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface AnswerService extends PagingAndSortingRepository<Answer, Long>, JpaSpecificationExecutor<Answer> {
    Answer findTopByQuestionOrderByCodeDesc(Question question);
    Answer findByCodeAndQuestionAndIdIsNot(Integer code, Question question, Long id);
    List<Answer> findByQuestionIdOrderByCodeAsc(Long questionId);
}

