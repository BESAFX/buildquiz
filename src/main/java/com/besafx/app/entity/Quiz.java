package com.besafx.app.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Quiz implements Serializable {

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "quizSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "QUIZ_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "quizSequenceGenerator")
    private Long id;

    private Integer code;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String content;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String note;

    @JoinColumn(name = "category")
    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "quiz")
    @OrderBy(value = "code")
    private List<Question> questions = new ArrayList<>();


    @JsonCreator
    public static Quiz Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Quiz quiz = mapper.readValue(jsonString, Quiz.class);
        return quiz;
    }
}
