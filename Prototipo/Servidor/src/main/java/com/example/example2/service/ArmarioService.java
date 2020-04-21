package com.example.example2.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Blob;
import java.util.ArrayList;

import com.example.example2.model.Accesorio;
import com.example.example2.model.Armario;
import com.example.example2.model.ArmarioRepository;
import com.example.example2.model.Inferior;
import com.example.example2.model.Prenda;
import com.example.example2.model.Superior;
import com.example.example2.model.Zapato;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RestController
class ArmarioService {

    @Autowired
    private ArmarioRepository repository;

    @Autowired
    private UsuarioService userService;

    @Autowired
    private PrendaService prendaService;
    
    @GetMapping("/armario/{nickname}")
    public Armario findClosetByUser(@PathVariable("nickname") String nickname) {
        return userService.findByNickname(nickname).getArmario();
    }

    @GetMapping("/armario/{nickname}/prendas")
    public Iterable<Prenda> getPrendasUser(@PathVariable("nickname") String nickname) {
        return findClosetByUser(nickname).getPrendas();
    }

    @GetMapping("/armario/{nickname}/prendas/superior")
    public Iterable<Superior> getPrendasSuperiores(@PathVariable("nickname") String nickname) {
        ArrayList<Superior> superiores = new ArrayList<Superior>();
        Iterable<Prenda> prendas = getPrendasUser(nickname);
        for(Prenda actual: prendas) {
            if(actual instanceof Superior){
                superiores.add((Superior)actual);
            }
        }
        return superiores;
    }

    @GetMapping("/armario/{nickname}/prendas/inferior")
    public Iterable<Inferior> getPrendasInferiores(@PathVariable("nickname") String nickname) {
        ArrayList<Inferior> inferiores = new ArrayList<Inferior>();
        Iterable<Prenda> prendas = getPrendasUser(nickname);
        for(Prenda actual: prendas) {
            if(actual instanceof Inferior){
                inferiores.add((Inferior)actual);
            }
        }
        return inferiores;
    }

    @GetMapping("/armario/{nickname}/prendas/zapatos")
    public Iterable<Zapato> getPrendasZapatos(@PathVariable("nickname") String nickname) {
        ArrayList<Zapato> zapatos = new ArrayList<Zapato>();
        Iterable<Prenda> prendas = getPrendasUser(nickname);
        for(Prenda actual: prendas) {
            if(actual instanceof Zapato){
                zapatos.add((Zapato)actual);
            }
        }
        return zapatos;
    }

    @GetMapping("/armario/{nickname}/prendas/accesorios")
    public Iterable<Accesorio> getPrendasAccesorios(@PathVariable("nickname") String nickname) {
        ArrayList<Accesorio> accesorios = new ArrayList<Accesorio>();
        Iterable<Prenda> prendas = getPrendasUser(nickname);
        for(Prenda actual: prendas) {
            if(actual instanceof Accesorio){
                accesorios.add((Accesorio)actual);
            }
        }
        return accesorios;
    }

    @GetMapping("/armario/{nickname}/prendas/favoritos")
    public Iterable<Prenda> getPrendasFavoritas(@PathVariable("nickname") String nickname) {
        ArrayList<Prenda> favoritas = new ArrayList<Prenda>();
        Iterable<Prenda> prendas = getPrendasUser(nickname);
        for(Prenda actual: prendas) {
            if(actual.isFavorito()){
                favoritas.add(actual);
            }
        }
        return favoritas;
    }

    @PostMapping("/crearArmario")
    public Armario crearArmario(@RequestBody Armario armario) {
        return repository.save(armario);
    }

    @PutMapping("/agregarSuperior/{nickname}")
    public Armario agregarSuperior(@PathVariable("nickname") String nickname, @RequestBody Superior prenda){
        Armario armarioEncontrado = findClosetByUser(nickname);
        Long numPrendas = armarioEncontrado.getNumPrendas();
        Superior newPrenda = new Superior();
        newPrenda.setSeccion(prenda.getSeccion());
        newPrenda.setTipo(prenda.getTipo());
        newPrenda.setFormalidad(prenda.getFormalidad());
        newPrenda.setAbrigo(prenda.getAbrigo());
        newPrenda.setDisponible(prenda.isDisponible());
        newPrenda.setFavorito(prenda.isFavorito());
        newPrenda.setDescripcion(prenda.getDescripcion());
        newPrenda.setColor(prenda.getColor());
        newPrenda.setUrl(prenda.getUrl());
        newPrenda.setCuello(prenda.getCuello());
        newPrenda.setManga(prenda.getManga());
        newPrenda.setArmario(armarioEncontrado);
        //newPrenda.setImagen(BlobProxy.generateProxy(codeImage(prenda.getImg_url())));

        armarioEncontrado.setNumPrendas((numPrendas + 1));
        prendaService.crearPrenda(newPrenda);
        armarioEncontrado.getPrendas().add(newPrenda);
        
        return repository.save(armarioEncontrado);
    }

    @PutMapping("/agregarInferior/{nickname}")
    public Armario agregarInferior(@PathVariable("nickname") String nickname, @RequestBody Inferior prenda){
        Armario armarioEncontrado = findClosetByUser(nickname);
        Long numPrendas = armarioEncontrado.getNumPrendas();
        Inferior newPrenda = new Inferior();
        newPrenda.setSeccion(prenda.getSeccion());
        newPrenda.setTipo(prenda.getTipo());
        newPrenda.setFormalidad(prenda.getFormalidad());
        newPrenda.setAbrigo(prenda.getAbrigo());
        newPrenda.setDisponible(prenda.isDisponible());
        newPrenda.setFavorito(prenda.isFavorito());
        newPrenda.setDescripcion(prenda.getDescripcion());
        newPrenda.setColor(prenda.getColor());
        newPrenda.setBota(prenda.getBota());
        newPrenda.setUrl(prenda.getUrl());
        newPrenda.setArmario(armarioEncontrado);
        //newPrenda.setImagen(BlobProxy.generateProxy(codeImage(prenda.getImg_url())));

        armarioEncontrado.setNumPrendas((numPrendas + 1));
        prendaService.crearPrenda(newPrenda);
        armarioEncontrado.getPrendas().add(newPrenda);
        
        return repository.save(armarioEncontrado);
    }

    @PutMapping("/agregarAccesorio/{nickname}")
    public Armario agregarAccesorio(@PathVariable("nickname") String nickname, @RequestBody Accesorio prenda){
        Armario armarioEncontrado = findClosetByUser(nickname);
        Long numPrendas = armarioEncontrado.getNumPrendas();
        Accesorio newPrenda = new Accesorio();
        newPrenda.setSeccion(prenda.getSeccion());
        newPrenda.setTipo(prenda.getTipo());
        newPrenda.setFormalidad(prenda.getFormalidad());
        newPrenda.setAbrigo(prenda.getAbrigo());
        newPrenda.setDisponible(prenda.isDisponible());
        newPrenda.setFavorito(prenda.isFavorito());
        newPrenda.setDescripcion(prenda.getDescripcion());
        newPrenda.setColor(prenda.getColor());
        newPrenda.setUrl(prenda.getUrl());
        newPrenda.setArmario(armarioEncontrado);
        //newPrenda.setImagen(BlobProxy.generateProxy(codeImage(prenda.getImg_url())));

        armarioEncontrado.setNumPrendas((numPrendas + 1));
        prendaService.crearPrenda(newPrenda);
        armarioEncontrado.getPrendas().add(newPrenda);
        
        return repository.save(armarioEncontrado);
    }

    @PutMapping("/agregarZapato/{nickname}")
    public Armario agregarZapato(@PathVariable("nickname") String nickname, @RequestBody Zapato prenda){
        Armario armarioEncontrado = findClosetByUser(nickname);
        Long numPrendas = armarioEncontrado.getNumPrendas();
        Zapato newPrenda = new Zapato();
        newPrenda.setSeccion(prenda.getSeccion());
        newPrenda.setTipo(prenda.getTipo());
        newPrenda.setFormalidad(prenda.getFormalidad());
        newPrenda.setAbrigo(prenda.getAbrigo());
        newPrenda.setDisponible(prenda.isDisponible());
        newPrenda.setFavorito(prenda.isFavorito());
        newPrenda.setDescripcion(prenda.getDescripcion());
        newPrenda.setColor(prenda.getColor());
        newPrenda.setForma(prenda.getForma());
        newPrenda.setUrl(prenda.getUrl());
        newPrenda.setArmario(armarioEncontrado);
        //newPrenda.setImagen(BlobProxy.generateProxy(codeImage(prenda.getImg_url())));

        armarioEncontrado.setNumPrendas((numPrendas + 1));
        prendaService.crearPrenda(newPrenda);
        armarioEncontrado.getPrendas().add(newPrenda);
        
        return repository.save(armarioEncontrado);
    }

    public static byte[] codeImage(String img) {
        Path path = Paths.get("../../../../../../../../App/src/assets/images/" + img);
        byte[] data = null;
        try{
            data = Files.readAllBytes(path);
        }catch(IOException e){
            e.printStackTrace();
        }
        return data;
    }

    public static String decodeImage(Blob image, String img_url){
        String url = "../ImagesDB";
        try{
            InputStream is = image.getBinaryStream();
            Files.copy(is, Paths.get(url + img_url), StandardCopyOption.REPLACE_EXISTING);
        }catch(Exception e) {
            e.printStackTrace();
        }
        return url;
    }

}