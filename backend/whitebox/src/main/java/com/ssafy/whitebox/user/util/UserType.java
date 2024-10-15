package com.ssafy.whitebox.user.util;


import com.fasterxml.jackson.annotation.JsonValue;

/*
* LAWYER : 변호사
* MEMBER : 일반 유저
* ADMIN  : 운영자
*
* */
public enum UserType {
    MEMBER("MEMBER"),
    LAWYER("LAWYER"),
    ADMIN("ADMIN");

    private String value;

    UserType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}