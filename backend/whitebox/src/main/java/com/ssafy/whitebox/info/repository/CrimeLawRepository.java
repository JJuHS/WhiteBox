package com.ssafy.whitebox.info.repository;


import com.ssafy.whitebox.info.entity.CrimeLaw;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrimeLawRepository extends JpaRepository<CrimeLaw, Long>{
    List<CrimeLaw> findByPageOrderByLawNumberAscSeqAsc(int page);
}
