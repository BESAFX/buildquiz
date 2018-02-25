package com.besafx.app.service;

import com.besafx.app.entity.Question;
import com.besafx.app.entity.Quiz;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface QuestionService extends PagingAndSortingRepository<Question, Long>, JpaSpecificationExecutor<Question> {
    Question findTopByQuizOrderByCodeDesc(Quiz quiz);
    Question findByCodeAndQuizAndIdIsNot(Integer code, Quiz quiz, Long id);
    List<Question> findByQuizIdOrderByCodeAsc(Long id);
    Long countByQuiz(Quiz quiz);
}

