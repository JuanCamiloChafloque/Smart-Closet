package com.example.example2.service;

import com.example.example2.model.Usuario;
import com.example.example2.model.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RestController
class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @GetMapping("/usuarios")
    public Iterable<Usuario> getUsuarios() {
        return repository.findAll();
    }

    @PostMapping("/crearUsuario")
    public Usuario crearUsuario(@RequestBody Usuario user) {
        return repository.save(user);
    }

}