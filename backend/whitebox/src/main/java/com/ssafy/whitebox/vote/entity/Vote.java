package com.ssafy.whitebox.vote.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.whitebox.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import com.ssafy.whitebox.ai.entity.AIResult;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Getter
@Setter
@Entity
@Table(name = "VOTE")
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteId;

    @OneToOne
    @JoinColumn(name = "ai_index")
    private AIResult aiResult;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_index")
    private User user;

    private String voTitle;
    private String voDescription;
    private LocalDateTime voCreatedAt;
    private LocalDateTime voExpirationDate;
    private int voHit;
    private int voApprovalCnt;
    private int voOppositeCnt;
    private int voNeutralCnt;
    private boolean voIsImage;

    @OneToMany(mappedBy = "vote", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<VoteImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "vote", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<VoteComment> comments = new ArrayList<>();

}
