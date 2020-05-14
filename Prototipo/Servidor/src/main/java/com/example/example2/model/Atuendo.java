package com.example.example2.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Atuendo {

    @Id
    @GeneratedValue
    private Long id_atuendo;

    private boolean favorito;

    @ManyToOne
    @JsonIgnore
    private Armario armario;

    @OneToMany(mappedBy = "id_atuendo", cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, orphanRemoval = true)
    @JsonIgnore
    private List<AtuendoXPrenda> prendas = new ArrayList<AtuendoXPrenda>();

    
    public Long getId() {
        return id_atuendo;
    }

    public boolean isFavorito() {
        return favorito;
    }

    public void setFavorito(boolean favorito) {
        this.favorito = favorito;
    }

    public void setId(Long id) {
        this.id_atuendo = id;
    }    

    public Armario getArmario() {
        return armario;
    }

    public void setArmario(Armario armario) {
        this.armario = armario;
    }

    public List<AtuendoXPrenda> getPrendas(){
        return prendas;
    }

    public void setPrendas(List<AtuendoXPrenda> prendas){
        this.prendas = prendas;
    }

    public void addPrenda(AtuendoXPrenda prenda){
        this.prendas.add(prenda);
    }
}