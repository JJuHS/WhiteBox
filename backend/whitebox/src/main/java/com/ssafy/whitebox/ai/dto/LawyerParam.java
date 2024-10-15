package com.ssafy.whitebox.ai.dto;

import lombok.Data;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
public class LawyerParam {
    private String lawyerName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date lawyerDate;
    private String email;
}
