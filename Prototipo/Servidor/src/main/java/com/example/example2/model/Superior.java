package com.example.example2.model;

import javax.persistence.Entity;

@Entity
public class Superior extends Prenda {

    private String cuello;
    private String manga;

    public String getCuello() {
        return cuello;
    }

    public String getManga() {
        return manga;
    }

    public void setManga(String manga) {
        this.manga = manga;
    }

    public void setCuello(String cuello) {
        this.cuello = cuello;
    }

}