package com.example.example2.model;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Prenda {

    @Id
    @GeneratedValue
    private Long id_prenda;

    private String seccion;
    private String tipo;
    private Long formalidad;
    private Long abrigo;
    private String color;
    private boolean favorito;
    private boolean disponible;
    private String descripcion;
    private String url;
    
    @Lob
    @JsonIgnore
    private Blob imagen;

    @ManyToOne
    @JsonIgnore
    private Armario armario;

    @OneToMany(mappedBy = "id_prenda", cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, orphanRemoval = true)
    @JsonIgnore
    private List<AtuendoXPrenda> atuendos = new ArrayList<AtuendoXPrenda>();

    public Long getId() {
        return id_prenda;
    }

    public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public boolean isFavorito() {
        return favorito;
    }

    public void setFavorito(boolean favorito) {
        this.favorito = favorito;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getAbrigo() {
        return abrigo;
    }

    public void setAbrigo(Long abrigo) {
        this.abrigo = abrigo;
    }

    public Long getFormalidad() {
        return formalidad;
    }

    public void setFormalidad(Long formalidad) {
        this.formalidad = formalidad;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getSeccion() {
        return seccion;
    }

    public void setSeccion(String seccion) {
        this.seccion = seccion;
    }

    public void setId(Long id) {
        this.id_prenda = id;
    }

    public Armario getArmario() {
        return armario;
    }

    public void setArmario(Armario armario) {
        this.armario = armario;
    }

    public void setImagen(Blob imagen) {
        this.imagen = imagen;
    }

    public Blob getImage() {
        return imagen;
    }

    public List<AtuendoXPrenda> getAtuendos(){
        return atuendos;
    }

    public void setAtuendos(List<AtuendoXPrenda> atuendos){
        this.atuendos = atuendos;
    }
}