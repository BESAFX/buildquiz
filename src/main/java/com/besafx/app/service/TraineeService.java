package com.besafx.app.service;

import com.besafx.app.entity.Trainee;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface TraineeService extends PagingAndSortingRepository<Trainee, Long>, JpaSpecificationExecutor<Trainee> {
    Trainee findTopByOrderByCodeDesc();

    Trainee findByCodeAndIdIsNot(Integer code, Long id);
}

