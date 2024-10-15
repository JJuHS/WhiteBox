package com.ssafy.whitebox.ai.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.vote.entity.Vote;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "AI")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class AIResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ai_index")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_index", nullable = false)  // user_index를 외래 키로 설정
    private User user;

    @Column(name = "ai_created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "ai_related_law", columnDefinition = "TEXT")
    private String aiRelatedLaw;

    @Column(name = "ai_explanation", columnDefinition = "TEXT")
    private String aiExplanation;

    @Column(name = "ai_description", columnDefinition = "TEXT")
    private String aiDescription;

    @Column(name = "ai_Result", columnDefinition = "TEXT")
    private String aiResult;

    @Column(name = "ai_user_fault")
    private int aiUserFault;

    @Column(name = "ai_other_fault")
    private int aiOtherFault;

    @Column(name = "ai_video_url", length = 255)
    private String videoUrl;

    @Column(name = "thumbnail1", length = 255)
    private String thumbnail1;

    @Column(name = "thumbnail2", length = 255)
    private String thumbnail2;

    @Column(name = "thumbnail3", length = 255)
    private String thumbnail3;

    @Column(name = "thumbnail4", length = 255)
    private String thumbnail4;

    @Column(name = "is_uploaded")
    private boolean isUploaded;

    @OneToOne(mappedBy = "aiResult", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    private Vote vote;
}
