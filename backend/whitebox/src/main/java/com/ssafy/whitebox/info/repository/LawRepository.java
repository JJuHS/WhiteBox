package com.ssafy.whitebox.info.repository;

import com.ssafy.whitebox.info.entity.Law;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface LawRepository extends JpaRepository<Law, Long> {
    List<Law> findByPageOrderByLawNumberAscSeqAsc(int page);
}
