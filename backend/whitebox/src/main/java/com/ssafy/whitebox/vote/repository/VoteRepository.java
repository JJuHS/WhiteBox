package com.ssafy.whitebox.vote.repository;

import com.ssafy.whitebox.ai.entity.AIResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ssafy.whitebox.vote.entity.Vote;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    boolean existsByAiResult(AIResult aiResult);

    @Query(value = "SELECT * FROM vote v WHERE v.vo_expiration_date > :currentDate " +
            "ORDER BY (v.vo_approval_cnt + v.vo_opposite_cnt + v.vo_neutral_cnt) DESC " +
            "LIMIT 6", nativeQuery = true)
    List<Vote> findTop6Votes(@Param("currentDate") LocalDateTime currentDate);
}
