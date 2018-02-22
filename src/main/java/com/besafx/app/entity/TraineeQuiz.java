package com.besafx.app.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.Optional;

@Data
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class TraineeQuiz implements Serializable {

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

    private Integer percentage;

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

    public String getPercentageInArabic() {
        try {
            return !Optional.ofNullable(this.percentage).isPresent() ? "تحت التنفيذ" : this.percentage.toString();
        } catch (Exception ex) {
            return "";
        }
    }

    public String getPercentageInEnglish() {
        try {
            return !Optional.ofNullable(this.percentage).isPresent() ? "Pending" : this.percentage.toString();
        } catch (Exception ex) {
            return "";
        }
    }

}
