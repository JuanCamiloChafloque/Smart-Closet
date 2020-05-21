package com.example.example2.service;

import java.util.ArrayList;
import java.util.Collections;
import java.sql.Date;
import java.util.List;

import com.example.example2.model.Atuendo;
import com.example.example2.model.Calendario;
import com.example.example2.model.CalendarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/ultimaVez/{id}")
    public Date puestoUltimaVez(@PathVariable("id") Long id){
        Iterable<Calendario> fechas = repository.findAll();
        List<Date> misFechas = new ArrayList<Date>();
        Date reciente;
        for(Calendario actual: fechas){
            if(actual.getAtuendo().getId() == id){
                misFechas.add(actual.getFecha());
            }
        }
        reciente = Collections.max(misFechas);
        return reciente;
    }

    @GetMapping("/atuendoFecha/{nickname}/{fecha}")
    public Atuendo atuendoFecha(@PathVariable("fecha") String fecha, @PathVariable("nickname") String nickname){
        Date fechaActual = Date.valueOf(fecha);
        Iterable<Calendario> fechas = repository.findAll();
        for(Calendario actual: fechas){
            if(actual.getFecha().equals(fechaActual) && actual.getArmario().getUsuario().getNickname().equals(nickname)){
                return actual.getAtuendo();
            }
        }
        return null;
    }

    @GetMapping("/cantidadVeces/{id}")
    public int cantidadVecesPuesto(@PathVariable("id") Long id){
        Iterable<Calendario> fechas = repository.findAll();
        int cantidad = 0;
        for(Calendario actual: fechas){
            if(actual.getAtuendo().getId() == id){
                cantidad++;
            }
        }
        return cantidad;
    }
    
}