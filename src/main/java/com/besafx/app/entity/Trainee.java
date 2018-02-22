package com.besafx.app.entity;

import com.besafx.app.entity.listener.TraineeListener;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@EntityListeners(TraineeListener.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Trainee implements Serializable {

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "traineeSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "TRAINEE_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "traineeSequenceGenerator")
    private Long id;

    private Integer code;

    @Column(columnDefinition = "boolean default true")
    private Boolean enabled;

    @ManyToOne
    @JoinColumn(name = "person")
    private Person person;

    @OneToMany(mappedBy = "trainee")
    @OrderBy(value = "key")
    private List<TraineeQuiz> traineeQuizzes = new ArrayList<>();

    @JsonCreator
    public static Trainee Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Trainee trainee = mapper.readValue(jsonString, Trainee.class);
        return trainee;
    }

    public String getEnabledInArabic() {
        try {
            return this.enabled ? "مفعل" : "معطل";
        } catch (Exception ex) {
            return "";
        }
    }

    public String getEnabledInEnglish() {
        try {
            return this.enabled ? "Enabled" : "Disabled";
        } catch (Exception ex) {
            return "";
        }
    }

}
