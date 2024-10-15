package com.ssafy.whitebox.info.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class RelatedSites {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rs_idx")
    private Long index;

    @Column(name="rs_category")
    @JsonProperty("category")
    private String category;

    @Column(name= "rs_name")
    @JsonProperty("name")
    private String name;

    @Column(name= "rs_url")
    @JsonProperty("url")
    private String url;

    public RelatedSites(String category, String name, String url){
        this(null, category, name, url);
    }

    public RelatedSites(Long index, String category, String name, String url) {
        this.index = index;
        this.category = category;
        this.name = name;
        this.url = url;
    }

    @Override
    public String toString() {
        return "RelatedSites{" +
                "index=" + index +
                ", category='" + category + '\'' +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
