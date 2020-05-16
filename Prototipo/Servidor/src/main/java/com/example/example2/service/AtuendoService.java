package com.example.example2.service;

import com.example.example2.model.Atuendo;
import com.example.example2.model.AtuendoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AtuendoService {

    @Autowired
    private AtuendoRepository repository;

    @PostMapping("/crearAtuendo")
    public Atuendo crearAtuendo(@RequestBody Atuendo atuendo) {
        return repository.save(atuendo);
    }

    @GetMapping("/findAtuendo/{id}")
    public Atuendo findById(@PathVariable("id") Long id) {
        return repository.findById(id).get();
    }

    @PutMapping("/modificarAtuendoFavorito/{id}")
    public Atuendo modificarFavorito(@PathVariable("id") Long id_atuendo, @RequestBody Atuendo atuendo){
        Atuendo atuendoEncontrado = repository.findById(id_atuendo).get();
        if(atuendoEncontrado.isFavorito()){
            atuendoEncontrado.setFavorito(false);
        } else {
            atuendoEncontrado.setFavorito(true);
        }
        return repository.save(atuendoEncontrado);
    }
    
}