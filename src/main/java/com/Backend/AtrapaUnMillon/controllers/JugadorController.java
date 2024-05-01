package com.Backend.AtrapaUnMillon.controllers;

import com.Backend.AtrapaUnMillon.exceptions.AdminBadRequestException;
import com.Backend.AtrapaUnMillon.exceptions.ResponseWrapper;
import com.Backend.AtrapaUnMillon.models.Jugador;
import com.Backend.AtrapaUnMillon.models.Partida;
import com.Backend.AtrapaUnMillon.services.JugadorService;
import com.Backend.AtrapaUnMillon.services.PreguntaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class JugadorController {
    @Autowired
    private JugadorService jugadorService;

    @Operation(summary = "Actualiza puntos de jugador", tags = {"jugadores"})
    @ApiResponse(responseCode = "200", description = "Jugador editado")
    @ApiResponse(responseCode = "400", description = "Error al editar jugador")
    @Parameter(name = "partidaId", required = true, description = "ID de la partida")
    @Parameter(name = "nickname", required = true, description = "nick del jugador")
    @Parameter(name = "puntos", required = true, description = "puntos del jugador")
    @PutMapping("/jugador/{partidaId}/{nickname}/{puntos}")
    public ResponseEntity<ResponseWrapper<Jugador>> updateJugador(@PathVariable String partidaId,
                                                                  @PathVariable String nickname,
                                                                  @PathVariable int puntos) {
        ResponseWrapper<Jugador> response = new ResponseWrapper<>();

        try {
            Jugador jugador = jugadorService.getJugador(partidaId, nickname);
            jugador.setPuntos(puntos);
            jugadorService.update(jugador);
            response.setData(jugador);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (AdminBadRequestException e) {
            response.setErrorMessage(e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}