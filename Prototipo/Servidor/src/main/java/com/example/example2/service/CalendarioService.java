package com.example.example2.service;

import com.example.example2.model.Calendario;
import com.example.example2.model.CalendarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalendarioService {

    @Autowired
    private CalendarioRepository repository;

    @PostMapping("/crearFecha")
    public Calendario crearCalendario(@RequestBody Calendario calendario) {
        return repository.save(calendario);
    }
    
}