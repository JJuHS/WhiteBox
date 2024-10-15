package com.ssafy.whitebox.ai.repository;

import com.ssafy.whitebox.ai.entity.Lawyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface LawyerRepository extends JpaRepository<Lawyer, Integer> {

    Lawyer findByLawyerNameAndLawyerDate(String lawyerName, Date lawyerDate);
}
