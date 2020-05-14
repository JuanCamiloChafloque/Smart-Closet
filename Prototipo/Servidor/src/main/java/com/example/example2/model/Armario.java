package com.example.example2.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Armario {

    @Id
    @GeneratedValue
    private Long id_armario;

    private Long num_prendas;

    @OneToOne(mappedBy = "armario")
    @JsonIgnore
    private Usuario usuario;

    @OneToMany(mappedBy = "armario")
    @JsonIgnore
    private List<Prenda> prendas;

    @OneToMany(mappedBy = "armario")
    @JsonIgnore
    private List<Atuendo> atuendos;

    public Long getId() {
        return id_armario;
    }

    public void setId(Long id) {
        this.id_armario = id;
    }

    public Long getNumPrendas() {
        return num_prendas;
    }

    public void setNumPrendas(Long numPrendas) {
        this.num_prendas = numPrendas;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<Prenda> getPrendas() {
        return prendas;
    }

    public void addPrenda(Prenda prenda) {
        this.prendas.add(prenda);
    }

    public List<Atuendo> getAtuendos() {
        return atuendos;
    }

    public void addAtuendo(Atuendo atuendo) {
        this.atuendos.add(atuendo);
    }

}