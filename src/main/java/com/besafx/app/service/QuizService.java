package com.besafx.app.service;
import com.besafx.app.entity.Quiz;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface QuizService extends PagingAndSortingRepository<Quiz, Long>, JpaSpecificationExecutor<Quiz> {
    Quiz findTopByOrderByCodeDesc();
    Quiz findByCodeAndIdIsNot(Integer code, Long id);
}
