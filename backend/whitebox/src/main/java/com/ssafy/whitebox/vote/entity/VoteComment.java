package com.ssafy.whitebox.vote.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.whitebox.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class VoteComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // 기본 키

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id", nullable = false)
    @JsonBackReference
    private Vote vote;  // 투표 게시판과의 연관 관계 (N:1)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // 유저와의 연관 관계 (N:1)

    @Column(nullable = false, length = 500)
    private String comment;  // 댓글 내용

    @Column(nullable = false)
    private int voteType;  // 투표 타입 (1: 찬성, 2: 반대, 3: 중립, 4: 투표하지 않음)

    @Column(nullable = false)
    private LocalDateTime postedAt = LocalDateTime.now();  // 댓글 작성 시간

    // 생성자
    public VoteComment(Vote vote, User user, String comment, int voteType) {
        this.vote = vote;
        this.user = user;
        this.comment = comment;
        this.voteType = voteType;
    }
}
