package com.besafx.app.service;

import com.besafx.app.entity.Answer;
import com.besafx.app.entity.Result;
import com.besafx.app.entity.TraineeQuiz;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface ResultService extends PagingAndSortingRepository<Result, Long>, JpaSpecificationExecutor<Result> {
    void deleteByAnswerIn(List<Answer> answer);
    List<Result> findByAnswerInAndTraineeQuiz(List<Answer> answers, TraineeQuiz traineeQuiz);
}

