package com.example.example2.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class AtuendoPrendaId implements Serializable {
    
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Column(name = "id_prenda")
    private Long id_prenda;

    @Column(name = "id_atuendo")
    private Long id_atuendo;

    public Long getIdPrenda(){
        return id_prenda;
    }

    public void setIdPrenda(Long id){
        this.id_prenda = id;
    }

    public Long getIdAtuendo(){
        return id_atuendo;
    }

    public void setIdAtuendo(Long id){
        this.id_atuendo = id;
    }


}