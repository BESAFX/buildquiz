package com.besafx.app.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Entity
@Component
public class Question implements Serializable {

    private final static Logger log = LoggerFactory.getLogger(Question.class);

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "questionSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "QUESTION_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "questionSequenceGenerator")
    private Long id;

    private Integer code;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String content;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String description;

    @JoinColumn(name = "quiz")
    @ManyToOne
    private Quiz quiz;

    @OneToMany(mappedBy = "question")
    @OrderBy(value = "code")
    private List<Answer> answers = new ArrayList<>();


    @JsonCreator
    public static Question Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Question quiz = mapper.readValue(jsonString, Question.class);
        return quiz;
    }

    public String getRightAnswers() {
        try {
            return String.join(", ", this.answers.stream()
                    .filter(Answer::getIsAnswer)
                    .map(answer -> answer.getCode().toString())
                    .collect(Collectors.toList())
            );
        } catch (Exception ex) {
            return "";
        }
    }
}
