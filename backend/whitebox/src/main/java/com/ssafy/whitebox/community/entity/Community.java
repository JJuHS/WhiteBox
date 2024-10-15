package com.ssafy.whitebox.community.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.whitebox.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "COMMUNITY")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Community {
    @ManyToOne
    @JoinColumn(name = "user_index", nullable = false)  // user_index를 외래 키로 설정
    private User user;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "com_index")
    private long comIndex;

    @Column(name = "com_title", nullable = false)
    private String comTitle;

    @Column(name = "com_description", nullable = false)
    private String comDescription;

    @Column(name = "com_created_at", nullable = false, updatable = false)
    private LocalDateTime comCreatedAt;

    @Column(name = "com_hit", nullable = false)
    private int comHit;

    @Column(name = "com_is_image", nullable = false)
    private Boolean comIsImage;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<CommunityImage> images;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<CommunityComment> comments;

}
