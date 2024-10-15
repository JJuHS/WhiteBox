package com.ssafy.whitebox.vote.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PageResponse<T> {
    private long totalElements; // 총 게시글 수
    private List<T> content; // 페이지에 해당하는 게시글 목록

    public PageResponse(long totalElements, List<T> content) {
        this.totalElements = totalElements;
        this.content = content;
    }
}
