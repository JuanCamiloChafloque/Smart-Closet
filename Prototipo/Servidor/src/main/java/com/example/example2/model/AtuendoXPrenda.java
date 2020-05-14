package com.example.example2.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

@Entity
public class AtuendoXPrenda {
    
    @EmbeddedId
    private AtuendoPrendaId id;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("id_atuendo")
    private Atuendo id_atuendo;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("id_prenda")
    private Prenda id_prenda;

    public Atuendo getAtuendoId(){
        return id_atuendo;
    }

    public void setAtuendoId(Atuendo id){
        this.id_atuendo = id;
    }

    public Prenda getPrendaId(){
        return id_prenda;
    }

    public void setPrendaId(Prenda id){
        this.id_prenda = id;
    }

    public void setEmbId(AtuendoPrendaId id){
        this.id = id;
    }

}