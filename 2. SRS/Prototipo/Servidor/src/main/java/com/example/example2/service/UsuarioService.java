package com.example.example2.service;

import com.example.example2.model.Usuario;
import com.example.example2.model.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    
    @GetMapping("/usuario/{nickname}")
    public Usuario findByNickname(@PathVariable("nickname") String nickname) {
        Iterable<Usuario> usuarios = repository.findAll();
        for(Usuario actual: usuarios){
            if(actual.getNickname().equalsIgnoreCase(nickname)){
                return actual;
            }
        }
        return null;
    }

    @GetMapping("/findUsuario/{id}")
    public Usuario findById(@PathVariable("id") Long id) {
        return repository.findById(id).get();
    }

    @PostMapping("/crearUsuario")
    public Usuario crearUsuario(@RequestBody Usuario user) {
        return repository.save(user);
    }

    @PutMapping("/editarUsuario/{id}")
    public Usuario editarUsuario(@PathVariable("id") Long id, @RequestBody Usuario user){
        Usuario usuarioEncontrado = repository.findById(id).get();
        usuarioEncontrado.setNombre(user.getNombre());
        usuarioEncontrado.setApellido(user.getApellido());
        usuarioEncontrado.setGenero(user.getGenero());
        usuarioEncontrado.setCorreo(user.getCorreo());
        usuarioEncontrado.setCiudad(user.getCiudad());
        usuarioEncontrado.setNickname(user.getNickname());
        usuarioEncontrado.setPassword(user.getPassword());
        usuarioEncontrado.setCelular(user.getCelular());

        return repository.save(usuarioEncontrado);
    }

}