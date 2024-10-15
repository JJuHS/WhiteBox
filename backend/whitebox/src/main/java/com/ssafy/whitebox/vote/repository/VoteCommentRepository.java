package com.ssafy.whitebox.vote.repository;

import com.ssafy.whitebox.vote.entity.VoteComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ssafy.whitebox.vote.entity.Vote;
import java.util.List;

@Repository
public interface VoteCommentRepository extends JpaRepository<VoteComment, Long> {
    List<VoteComment> findByVote(Vote vote);

    // 특정 Vote의 댓글 수를 계산하는 메서드
    @Query("SELECT COUNT(vc) FROM VoteComment vc WHERE vc.vote = :vote")
    int countByVote(@Param("vote") Vote vote);

}
