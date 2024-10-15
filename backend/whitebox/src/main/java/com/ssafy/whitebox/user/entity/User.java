package com.ssafy.whitebox.user.entity;


import com.ssafy.whitebox.user.util.UserType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Accessors(fluent = true)
@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_index")
    private Long userIndex;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name="user_password", nullable = false)
    private String userPassword;

    @Column(name = "user_nickname", nullable = false)
    private String userNickname;

    // Enum 타입을 문자열로 저장할 것이다.
    @Enumerated(EnumType.STRING)
    @Column(name = "user_type" , nullable = false)
    private UserType userType;

    @Column(name = "user_date", nullable = false, updatable = false)
    private LocalDateTime userDate;


    public User( String userEmail, String userPassword, String userNickname, UserType userType) {
        this(null, userEmail, userPassword, userNickname, userType, null);
    }

    public User(Long userIndex, String userEmail, String userPassword, String userNickname, UserType userType, LocalDateTime userDate) {
        this.userIndex = userIndex;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userNickname = userNickname;
        this.userType = userType;
        this.userDate = userDate;
    }


    // 날짜 추가
    @PrePersist
    protected void onCreate() {
        this.userDate = LocalDateTime.now();
    }

    public void changeType(UserType newType){
        this.userType = newType;
    }

}
