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
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Question implements Serializable {

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

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String content;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String description;

    @JoinColumn(name = "quiz")
    @ManyToOne
    private Quiz quiz;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_update")
    private Date lastUpdate;

    @JoinColumn(name = "last_person")
    @ManyToOne
    private Person lastPerson;

    @OneToMany(mappedBy = "question")
    private List<Answer> answers = new ArrayList<>();
    

    @JsonCreator
    public static Question Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Question quiz = mapper.readValue(jsonString, Question.class);
        return quiz;
    }
}
