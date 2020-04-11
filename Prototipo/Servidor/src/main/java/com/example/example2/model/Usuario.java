package com.example.example2.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Usuario {

    @Id
    @GeneratedValue
    private Long id_user;

    private String nombre;
    private String apellido;
    private String genero;
    private String correo;
    private String nickname;
    private String password;
    private String ciudad;
    private String celular;

    @OneToOne (cascade = CascadeType.ALL)
    @JsonIgnore
    private Armario armario;

    public Long getId() {
        return id_user;
    }

    public void setId(Long id) {
        this.id_user = id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Armario getArmario() {
        return armario;
    }

    public void setArmario(Armario armario) {
        this.armario = armario;
    }
}