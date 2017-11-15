package com.besafx.app.service;
import com.besafx.app.entity.Category;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface CategoryService extends PagingAndSortingRepository<Category, Long>, JpaSpecificationExecutor<Category> {
    Category findTopByOrderByCodeDesc();
    Category findByCodeAndIdIsNot(Integer code, Long id);
}
