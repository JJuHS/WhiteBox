package com.ssafy.whitebox.ai.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "lawyer")
public class Lawyer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "lawyer_name", length = 255)
    private String lawyerName;

    @Column(name = "lawyer_date")
    @Temporal(TemporalType.DATE)
    private Date lawyerDate;

    @Column(name = "lawyer_image_url", length = 255)
    private String lawyerImageUrl;
}
