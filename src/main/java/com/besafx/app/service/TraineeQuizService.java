package com.besafx.app.service;

import com.besafx.app.entity.Trainee;
import com.besafx.app.entity.TraineeQuiz;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface TraineeQuizService extends PagingAndSortingRepository<TraineeQuiz, Long>, JpaSpecificationExecutor<TraineeQuiz> {
    TraineeQuiz findTopByTraineeOrderByKeyDesc(Trainee trainee);

    TraineeQuiz findByKeyAndTraineeAndIdIsNot(Integer code, Trainee trainee, Long id);

    List<TraineeQuiz> findByTraineeIdOrderByKeyAsc(Long traineeId);

    List<TraineeQuiz> findByTraineePersonIdOrderByKeyAsc(Long personId);
}

