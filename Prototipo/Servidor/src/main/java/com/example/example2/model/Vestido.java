package com.example.example2.model;

import javax.persistence.Entity;

@Entity
public class Vestido extends Prenda{

    private String largo;

    public String getLargo() {
        return largo;
    }

    public void setLargo(String largo) {
        this.largo = largo;
    }

}