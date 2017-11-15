package com.besafx.app.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
public class Summary implements Serializable {

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "summarySequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "SUMMARY_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "summarySequenceGenerator")
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    @JoinColumn(name = "person")
    @ManyToOne
    private Person person;

    @JoinColumn(name = "quiz")
    @ManyToOne
    private Quiz quiz;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_update")
    private Date lastUpdate;

    @JoinColumn(name = "last_person")
    @ManyToOne
    private Person lastPerson;

    @JsonCreator
    public static Summary Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Summary summary = mapper.readValue(jsonString, Summary.class);
        return summary;
    }
}
