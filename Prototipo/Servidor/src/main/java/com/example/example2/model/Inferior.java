package com.example.example2.model;

import javax.persistence.Entity;

@Entity
public class Inferior extends Prenda {

    private String bota;

    public String getBota() {
        return bota;
    }

    public void setBota(String bota) {
        this.bota = bota;
    }

}