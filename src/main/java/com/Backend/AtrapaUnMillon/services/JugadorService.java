package com.Backend.AtrapaUnMillon.services;

import com.Backend.AtrapaUnMillon.exceptions.AdminBadRequestException;
import com.Backend.AtrapaUnMillon.models.Jugador;
import com.Backend.AtrapaUnMillon.models.Partida;
import com.Backend.AtrapaUnMillon.repositories.JugadorRepository;
import com.Backend.AtrapaUnMillon.repositories.PartidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JugadorService {
    @Autowired
    private JugadorRepository jugadorRepository;

    @Autowired
    private PartidaService partidaService;
    public Jugador crearJugador(String nickname, Partida partida){
        for(Jugador jugador : partida.getJugadores()){
            if(nickname.equals(jugador.getNombre())){
                throw new AdminBadRequestException("Este nickname ya existe");
            }
        }
        Jugador nuevo_jugador = new Jugador(nickname, partida);
        jugadorRepository.save(nuevo_jugador);
        return nuevo_jugador;
    }

    public Jugador getJugador(String partidaId, String nickname) {
        Partida partida = partidaService.getPartida(partidaId);
        Optional<Jugador> existing_jugador = jugadorRepository.findByNombreAndPartida(nickname, partida);
        if(existing_jugador.isPresent()){
            Jugador jugador = existing_jugador.get();
            return jugador;
        }else{
            throw new AdminBadRequestException("Jugador no encontrado");
        }
    }

    public void update(Jugador jugador) {
        jugadorRepository.save(jugador);
    }
}
