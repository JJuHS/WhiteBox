package com.ssafy.whitebox.info.repository;

import com.ssafy.whitebox.info.entity.Terms;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TermsRepository extends JpaRepository<Terms, Long> {
    List<Terms> findAll();
}
