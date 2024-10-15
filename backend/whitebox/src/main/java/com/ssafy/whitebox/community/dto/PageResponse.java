package com.ssafy.whitebox.community.dto;
import java.util.List;

public class PageResponse<T> {
    private long totalElements;
    private List<T> content;

    public PageResponse(long totalElements, List<T> content) {
        this.totalElements = totalElements;
        this.content = content;
    }

    // Getters and setters
    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }
}
