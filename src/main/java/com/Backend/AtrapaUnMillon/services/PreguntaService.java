package com.Backend.AtrapaUnMillon.services;

import com.Backend.AtrapaUnMillon.exceptions.AdminBadRequestException;
import com.Backend.AtrapaUnMillon.exceptions.PreguntaBadRequestException;
import com.Backend.AtrapaUnMillon.models.Admin;
import com.Backend.AtrapaUnMillon.models.Pregunta;
import com.Backend.AtrapaUnMillon.repositories.AdminRepository;
import com.Backend.AtrapaUnMillon.repositories.PreguntaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PreguntaService {

    @Autowired
    private PreguntaRepository preguntaRepository;

    @Autowired
    private AdminRepository adminRepository;

    public List<Pregunta> getAllPreguntas(){
        return preguntaRepository.findAll();
    }

    public Pregunta getPreguntaById(Long id){
        Optional<Pregunta> pregunta = preguntaRepository.findById(id);
        if(pregunta.isPresent()){
            return pregunta.get();
        }else{
            throw new PreguntaBadRequestException("No existe pregunta con ese id");
        }
    }

    public List<Pregunta> getPreguntaByIdAdmin(Long idAdmin){
        List<Pregunta> preguntas = preguntaRepository.findByAdminId(idAdmin);
        return preguntas;
    }

    public Pregunta createPregunta(String pregunta, String respuestaCorrecta, String respuesta1,
                               String respuesta2, String respuesta3, String nivel,
                               String dificultad, String asignatura, int tiempo,
                               byte[] imagen, Long idAdmin){
        Optional<Admin> optionalAdmin = adminRepository.findById(idAdmin);
        if(optionalAdmin.isPresent()){
            Admin admin = optionalAdmin.get();
            Pregunta new_pregunta = new Pregunta(pregunta, respuestaCorrecta, respuesta1, respuesta2,
                    respuesta3, nivel, dificultad, asignatura, tiempo, imagen, admin);
            preguntaRepository.save(new_pregunta);
            return new_pregunta;
        }else{
            throw new AdminBadRequestException("No existe admin");
        }
    }

    public Pregunta editPregunta(Pregunta existingPregunta, String pregunta, String respuestaCorrecta,
                                 String respuesta1, String respuesta2, String respuesta3, String nivel,
                                 String dificultad, String asignatura, int tiempo, byte[] imagen, Long idAdmin) {
        Optional<Admin> optionalAdmin = adminRepository.findById(idAdmin);
        if(optionalAdmin.isPresent()){
            Admin admin = optionalAdmin.get();
            if(admin == existingPregunta.getAdmin()){
                existingPregunta.setPregunta(pregunta);
                existingPregunta.setRespuestaCorrecta(respuestaCorrecta);
                existingPregunta.setRespuesta1(respuesta1);
                existingPregunta.setRespuesta2(respuesta2);
                existingPregunta.setRespuesta3(respuesta3);
                existingPregunta.setNivel(nivel);
                existingPregunta.setDificultad(dificultad);
                existingPregunta.setAsignatura(asignatura);
                existingPregunta.setTiempo(tiempo);
                existingPregunta.setImagen(imagen);
                preguntaRepository.save(existingPregunta);
                return existingPregunta;
            }else{
                throw new PreguntaBadRequestException("No coincide el admin creador con el que edita");
            }
        }else{
            throw new AdminBadRequestException("No existe admin");
        }
    }
}
