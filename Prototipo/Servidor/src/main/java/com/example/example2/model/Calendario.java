package com.example.example2.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Calendario {

    @Id
    @GeneratedValue
    private Long id_calendario;

    private Date fecha;

    @ManyToOne
    @JsonIgnore
    private Atuendo atuendo;

    @ManyToOne
    @JsonIgnore
    private Armario armario;

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Long getId(){
        return id_calendario;
    }

    public void setId(Long id){
        this.id_calendario = id;
    }

    public Atuendo getAtuendo(){
        return atuendo;
    }

    public void setAtuendo(Atuendo atuendo) {
        this.atuendo = atuendo;
    }

    public Armario getArmario() {
        return armario;
    }

    public void setArmario(Armario armario) {
        this.armario = armario;
    }

    
}