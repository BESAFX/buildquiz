package com.besafx.app.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;

@Data
@Entity
public class Trainer implements Serializable {

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "trainerSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "TRAINER_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "trainerSequenceGenerator")
    private Long id;

    private Integer code;

    @Column(columnDefinition = "boolean default true")
    private Boolean enabled;

    @JoinColumn(name = "person")
    @OneToOne
    private Person person;

    @JsonCreator
    public static Trainer Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Trainer trainer = mapper.readValue(jsonString, Trainer.class);
        return trainer;
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
