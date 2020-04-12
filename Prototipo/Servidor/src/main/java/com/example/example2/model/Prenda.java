package com.example.example2.model;

import java.sql.Blob;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Prenda {

    @Id
    @GeneratedValue
    private Long id_prenda;

    private String seccion;
    private String tipo;
    private Long nivel_formalidad;
    private Long nivel_abrigo;
    private String color;
    private boolean favorito;
    private boolean disponible;
    private String descripcion;
    private String img_url;
    
    @Lob
    @JsonIgnore
    private Blob imagen;

    @ManyToOne
    @JsonIgnore
    private Armario armario;

    public Long getId() {
        return id_prenda;
    }

    public String getImg_url() {
		return img_url;
	}

	public void setImg_url(String img_url) {
		this.img_url = img_url;
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

    public Long getNivel_abrigo() {
        return nivel_abrigo;
    }

    public void setNivel_abrigo(Long nivel_abrigo) {
        this.nivel_abrigo = nivel_abrigo;
    }

    public Long getNivel_formalidad() {
        return nivel_formalidad;
    }

    public void setNivel_formalidad(Long nivel_formalidad) {
        this.nivel_formalidad = nivel_formalidad;
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
}