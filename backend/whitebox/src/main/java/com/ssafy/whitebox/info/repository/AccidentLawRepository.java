package com.ssafy.whitebox.info.repository;

import com.ssafy.whitebox.info.entity.AccidentLaw;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccidentLawRepository extends JpaRepository<AccidentLaw, Long> {
    List<AccidentLaw> findByPageOrderByLawNumberAscSeqAsc(int page);
}
