package com.Backend.AtrapaUnMillon.repositories;

import com.Backend.AtrapaUnMillon.models.Partida;
import com.Backend.AtrapaUnMillon.models.Pregunta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PreguntaRepository extends JpaRepository<Pregunta, Long> {
    List<Pregunta> findByAdminId(Long idAdmin);

    List<Pregunta> findPartidaByNivelAndDificultadAndAsignatura(String nivel, String dificultad, String asignatura);

    List<Pregunta> findPreguntaByAsignatura(String asignatura);

    List<Pregunta> findPreguntaByNivel(String nivel);

    List<Pregunta> findPreguntaByDificultad(String dificultad);

    List<Pregunta> findPreguntaByDificultadAndAsignatura(String dificultad, String asignatura);

    List<Pregunta> findPreguntaByDificultadAndNivel(String dificultad, String nivel);

    List<Pregunta> findPreguntaByAsignaturaAndNivel(String asignatura, String nivel);

    List<Pregunta> findPreguntaByAsignaturaAndNivelAndDificultad(String asignatura, String nivel, String dificultad);
}
