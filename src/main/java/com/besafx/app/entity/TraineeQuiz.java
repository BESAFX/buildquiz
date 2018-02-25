package com.besafx.app.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;

@Data
@Entity
@Component
@JsonIgnoreProperties(ignoreUnknown = true)
public class TraineeQuiz implements Serializable {

    private final static Logger log = LoggerFactory.getLogger(TraineeQuiz.class);

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "traineeQuizSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "TRAINEE_QUIZ_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "traineeQuizSequenceGenerator")
    private Long id;

    private Long key;

    @Column(columnDefinition = "int default 1")
    private Integer solvedTimeInSeconds;

    @ManyToOne
    @JoinColumn(name = "trainee")
    private Trainee trainee;

    @ManyToOne
    @JoinColumn(name = "quiz")
    private Quiz quiz;

    @JsonCreator
    public static TraineeQuiz Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        TraineeQuiz traineeQuiz = mapper.readValue(jsonString, TraineeQuiz.class);
        return traineeQuiz;
    }

}
