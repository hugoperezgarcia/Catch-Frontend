package com.Backend.AtrapaUnMillon.repositories;

import com.Backend.AtrapaUnMillon.models.Jugador;
import com.Backend.AtrapaUnMillon.models.Partida;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JugadorRepository extends JpaRepository<Jugador, Long> {
    Optional<Jugador> findByNombreAndPartida(String nombre, Partida partida);
}
