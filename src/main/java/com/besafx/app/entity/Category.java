package com.besafx.app.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "categorySequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "CATEGORY_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "categorySequenceGenerator")
    private Long id;

    private Integer code;

    private String name;

    private String description;

    @JsonCreator
    public static Category Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Category category = mapper.readValue(jsonString, Category.class);
        return category;
    }
}
