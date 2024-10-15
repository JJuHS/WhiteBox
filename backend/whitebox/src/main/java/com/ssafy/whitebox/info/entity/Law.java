package com.ssafy.whitebox.info.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(fluent = true)
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Law {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="law_idx")
    private Long index;

    @Column(name="law_seq")
    private int seq;

    @Column(name="law_page")
    private int page;

    @Column(name="law_start_date")
    private String startDate;

    @Column(name="law_announce_date")
    private String announceDate;

    @Column(name="law_number")
    private int lawNumber;

    @Column(name="law_description")
    private String lawDescription;


    public Law(int page, String startDate, String announceDate, int lawNumber, String lawDescription){
        this(null, page, startDate, announceDate, lawNumber, lawDescription);
    }

    public Law(Long index, int page, String startDate, String announceDate, int lawNumber, String lawDescription) {
        this.index = index;
        this.page = page;
        this.startDate = startDate;
        this.announceDate = announceDate;
        this.lawNumber = lawNumber;
        this.lawDescription = lawDescription;
    }
}
