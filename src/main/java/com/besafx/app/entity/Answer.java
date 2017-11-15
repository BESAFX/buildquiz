package com.besafx.app.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
public class Answer implements Serializable {

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "answerSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "ANSWER_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "answerSequenceGenerator")
    private Long id;

    private Boolean isAnswer;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String content;

    @JoinColumn(name = "question")
    @ManyToOne
    private Question question;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_update")
    private Date lastUpdate;

    @JoinColumn(name = "last_person")
    @ManyToOne
    private Person lastPerson;
    

    @JsonCreator
    public static Answer Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Answer answer = mapper.readValue(jsonString, Answer.class);
        return answer;
    }
}
