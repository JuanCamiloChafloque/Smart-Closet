package com.example.example2.service;

import com.example.example2.exceptions.NotFoundException;
import com.example.example2.model.Armario;
import com.example.example2.model.Prenda;
import com.example.example2.model.PrendaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping("/modificarFavorito/{id}")
    public Prenda modificarFavorito(@PathVariable("id") Long id_prenda){
        Prenda prendaEncontrada = repository.findById(id_prenda).get();
        if(prendaEncontrada.isFavorito()){
            prendaEncontrada.setFavorito(false);
        } else {
            prendaEncontrada.setFavorito(true);
        }
        return repository.save(prendaEncontrada);
    }

    @PutMapping("/modificarDisponible/{id}")
    public Prenda modificarDisponible(@PathVariable("id") Long id_prenda){
        Prenda prendaEncontrada = repository.findById(id_prenda).get();
        if(prendaEncontrada.isDisponible()){
            prendaEncontrada.setDisponible(false);
        } else {
            prendaEncontrada.setDisponible(true);
        }
        return repository.save(prendaEncontrada);
    }
    
    @DeleteMapping("/eliminarPrenda/{id}")
    public void eliminarPrenda(@PathVariable("id") Long id_prenda) {
        Armario armario = repository.findById(id_prenda).get().getArmario();
        Long numPrendas = armario.getNumPrendas();
        armario.setNumPrendas((numPrendas - 1));
        if(repository.existsById(id_prenda)){
            repository.deleteById(id_prenda);
        }
        else {
            throw new NotFoundException();
        }
    }
    
    
}