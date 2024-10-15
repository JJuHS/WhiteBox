package com.ssafy.whitebox.info.dto;

import com.ssafy.whitebox.info.entity.Terms;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "관련 용어 정보")
public class TermsParam {

    @Schema(description = "용어 이름")
    String name;

    @Schema(description = "용어 내용")
    String description;


    public static TermsParam from(Terms terms){
        TermsParam termsParam = new TermsParam();
        termsParam.name = terms.name();
        termsParam.description = terms.description();
        return termsParam;
    }


}
