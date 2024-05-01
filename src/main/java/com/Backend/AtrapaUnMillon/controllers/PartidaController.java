package com.Backend.AtrapaUnMillon.controllers;

import com.Backend.AtrapaUnMillon.exceptions.AdminBadRequestException;
import com.Backend.AtrapaUnMillon.exceptions.PreguntaBadRequestException;
import com.Backend.AtrapaUnMillon.exceptions.ResponseWrapper;
import com.Backend.AtrapaUnMillon.models.Jugador;
import com.Backend.AtrapaUnMillon.models.Partida;
import com.Backend.AtrapaUnMillon.models.Pregunta;
import com.Backend.AtrapaUnMillon.services.JugadorService;
import com.Backend.AtrapaUnMillon.services.PartidaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PartidaController {

    @Autowired
    private PartidaService partidaService;

    @Autowired
    private JugadorService jugadorService;
    @Operation(summary = "Crea una partida", tags = {"partidas"})
    @PostMapping("/create")
    public ResponseEntity<Partida> crearPartida(@RequestParam(required = false) String nivel,
                                                @RequestParam(required = false) String dificultad,
                                                @RequestParam(required = false) String  asignatura,
                                               @RequestParam int numRondas,
                                               @RequestParam int numVidas,
                                               @RequestParam String titulo,
                                               @RequestParam Long idAdmin){
        try{
            Partida partida = partidaService.createPartida(nivel, dificultad, asignatura, numRondas,numVidas, titulo, idAdmin );
            return new ResponseEntity<>(partida, HttpStatus.OK);
        }catch (AdminBadRequestException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Obtiene una partida por id", tags = {"partidas"})
    @ApiResponse(responseCode = "200", description = "Pregunta")
    @ApiResponse(responseCode = "404", description = "No hay preguntas")
    @Parameter(name = "id", required = true, description = "ID de la pregunta", example = "1")
    @GetMapping("/partida/{id}")
    public ResponseEntity<Partida> getPartida(@PathVariable String id){
        try{
            Partida partida = partidaService.getPartida(id);
            return new ResponseEntity<>(partida, HttpStatus.OK);
        }catch (PreguntaBadRequestException exception){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "Introduce un usuario", tags = {"partidas"})
    @ApiResponse(responseCode = "200", description = "Partida editada")
    @ApiResponse(responseCode = "400", description = "Error al editar partida")
    @Parameter(name = "partidaId", required = true, description = "ID de la partida")
    @Parameter(name = "nickname", required = true, description = "nick del jugador")
    @PutMapping("/pregunta/{partidaId}/{nickname}")
    public ResponseEntity<ResponseWrapper<Partida>> updatePartida(@PathVariable String partidaId,
                                                                  @PathVariable String nickname) {
        ResponseWrapper<Partida> response = new ResponseWrapper<>();

        try {
            Partida partida = partidaService.getPartida(partidaId);
            Jugador new_jugador = jugadorService.crearJugador(nickname, partida);
            List<Jugador> jugadores_partida = partida.getJugadores();
            jugadores_partida.add(new_jugador);
            partida.setJugadores(jugadores_partida);
            partidaService.update(partida);

            response.setData(partida);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (AdminBadRequestException e) {
            response.setErrorMessage(e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }


}
