package com.example.example2.service;

import com.example.example2.model.Prenda;
import com.example.example2.model.PrendaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RestController
class PrendaService {

    @Autowired
    private PrendaRepository repository;

    @PostMapping("/crearPrenda")
    public Prenda crearPrenda(@RequestBody Prenda prenda) {
        return repository.save(prenda);
    }
    
    
}