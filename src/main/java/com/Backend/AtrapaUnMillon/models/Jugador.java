package com.Backend.AtrapaUnMillon.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "jugadores")
public class Jugador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nombre")
    private String nombre;
    @Column(name= "puntos")
    private int puntos;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_partida")
    @JsonBackReference
    Partida partida;

    public Jugador(String nickname, Partida partida){
        this.nombre = nickname;
        this.puntos = 0;
        this.partida = partida;
    }
}
