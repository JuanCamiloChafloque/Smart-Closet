package com.example.example2.model;

import javax.persistence.Entity;

@Entity
public class Accesorio extends Prenda{

    private String lugar;

    public String getLugar() {
        return lugar;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

}