package com.Backend.AtrapaUnMillon.services;

import com.Backend.AtrapaUnMillon.exceptions.AdminBadRequestException;
import com.Backend.AtrapaUnMillon.models.Admin;
import com.Backend.AtrapaUnMillon.models.Jugador;
import com.Backend.AtrapaUnMillon.models.Partida;
import com.Backend.AtrapaUnMillon.models.Pregunta;
import com.Backend.AtrapaUnMillon.repositories.AdminRepository;
import com.Backend.AtrapaUnMillon.repositories.JugadorRepository;
import com.Backend.AtrapaUnMillon.repositories.PartidaRepository;
import com.Backend.AtrapaUnMillon.repositories.PreguntaRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PartidaService {

    @Autowired
    private PartidaRepository partidaRepository;
    @Autowired
    private PreguntaRepository preguntarepository;
    @Autowired
    private AdminRepository adminRepository;

    public Partida getPartida(String id){
        Optional<Partida> existing_partida = partidaRepository.findById(id);
        if(existing_partida.isPresent()){
            Partida partida = existing_partida.get();
            return partida;
        }else{
            throw new AdminBadRequestException("ID no existente");
        }
    }

    public Partida createPartida(String nivel, String dificultad, String asignatura,
                              int numRondas, int numVidas, String titulo, Long idAdmin) {
        String id = RandomStringUtils.randomAlphanumeric(7).toUpperCase();
        List<Pregunta> preguntas_filtered;
        if (nivel == null && dificultad == null && asignatura == null) {
            preguntas_filtered = preguntarepository.findAll();
        } else if (nivel == null && dificultad == null) {
            preguntas_filtered = preguntarepository.findPreguntaByAsignatura(asignatura);
        } else if (dificultad == null && asignatura == null) {
            preguntas_filtered = preguntarepository.findPreguntaByNivel(nivel);
        } else if (nivel == null && asignatura == null) {
            preguntas_filtered = preguntarepository.findPreguntaByDificultad(dificultad);
        } else if (nivel == null) {
            preguntas_filtered = preguntarepository.findPreguntaByDificultadAndAsignatura(dificultad, asignatura);
        } else if (asignatura == null) {
            preguntas_filtered = preguntarepository.findPreguntaByDificultadAndNivel(dificultad, nivel);
        } else if (dificultad == null) {
            preguntas_filtered = preguntarepository.findPreguntaByAsignaturaAndNivel(asignatura, nivel);
        } else {
            preguntas_filtered = preguntarepository.findPreguntaByAsignaturaAndNivelAndDificultad(asignatura, nivel, dificultad);
        }
        Set<Pregunta> preguntas_partida = new HashSet<>();

        if(preguntas_filtered.size() < (8 * numRondas)){
            throw new AdminBadRequestException("No hay suficientes preguntas");
        }else{
            Random random = new Random();
            do{
                int numeroAleatorio = random.nextInt(preguntas_filtered.size());
                preguntas_partida.add(preguntas_filtered.get(numeroAleatorio));
            }while (preguntas_partida.size() < (8 * numRondas));
        }
      ;  Optional<Admin> optionalAdmin = adminRepository.findById(idAdmin);
        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();
            Partida new_partida = new Partida(id, preguntas_partida, titulo, numVidas, numRondas, admin);
            for (Pregunta pregunta : preguntas_partida) {
                pregunta.getPartidas().add(new_partida); // Agrega la partida a la colección de partidas en cada pregunta
            }

            new_partida.getPreguntas().addAll(preguntas_partida); // Agrega todas las preguntas seleccionadas a la partida

            partidaRepository.save(new_partida); // Guarda la nueva partida
            return new_partida;
        } else {
            throw new AdminBadRequestException("admin no existente");
        }
    }

    public void update(Partida partida) {
        partidaRepository.save(partida);
    }
}
