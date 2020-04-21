package com.example.example2.model;

import javax.persistence.Entity;

@Entity
public class Zapato extends Prenda {

    private String forma;

    public String getForma() {
        return forma;
    }

    public void setForma(String forma) {
        this.forma = forma;
    }

}