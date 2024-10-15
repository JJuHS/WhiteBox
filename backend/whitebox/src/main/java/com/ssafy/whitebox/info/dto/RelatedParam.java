package com.ssafy.whitebox.info.dto;

import com.ssafy.whitebox.info.entity.RelatedSites;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "관련 사이트 정보")
public class RelatedParam {

    @Schema(description = "사이트 분류")
    String category;

    @Schema(description = "사이트 이름")
    String name;

    @Schema(description = "사이트 주소")
    String url;


    public static RelatedParam from(RelatedSites relatedSites){
        RelatedParam relatedParam = new RelatedParam();
        relatedParam.category = relatedSites.category();
        relatedParam.name = relatedSites.name();
        relatedParam.url = relatedSites.url();

        return relatedParam;
    }
}
