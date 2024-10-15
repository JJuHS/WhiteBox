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
public class Terms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="te_idx")
    private Long index;

    @Column(name="te_name")
    @JsonProperty("name")
    private String name;

    @Column(name="te_description")
    @JsonProperty("description")
    private String description;


    public Terms(String name, String description) {
        this(null, name, description);
    }

    public Terms(Long index, String name, String description) {
        this.index = index;
        this.name = name;
        this.description = description;
    }

    @Override
    public String toString() {
        return "Terms{" +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
      }

}
