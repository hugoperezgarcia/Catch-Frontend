package com.Backend.AtrapaUnMillon.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Pregunta")
public class Pregunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "pregunta")
    private String pregunta;
    @Column(name = "respuestaCorrecta")
    private String respuestaCorrecta;
    @Column(name = "respuesta1")
    private String respuesta1;
    @Column(name = "respuesta2")
    private String respuesta2;
    @Column(name = "respuesta3")
    private String respuesta3;
    @Column(name = "nivel")
    private String nivel;
    @Column(name = "dificultad")
    private String dificultad;
    @Column(name = "asignatura")
    private String asignatura;
    @Column(name = "tiempo")
    private int tiempo;
    @Column(name = "imagenPregunta")
    private byte[] imagen;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idAdmin")
    @JsonBackReference
    private Admin admin;
    @ManyToMany(mappedBy = "preguntas")
    @JsonBackReference
    private Set<Partida> partidas;

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Pregunta(String pregunta, String respuestaCorrecta, String respuesta1,
                    String respuesta2, String respuesta3, String nivel,
                    String dificultad, String asignatura, int tiempo,
                    byte[] imagen, Admin admin) {
        this.pregunta = pregunta;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuesta1 = respuesta1;
        this.respuesta2 = respuesta2;
        this.respuesta3 = respuesta3;
        this.nivel = nivel;
        this.dificultad = dificultad;
        this.asignatura = asignatura;
        this.tiempo = tiempo;
        this.imagen = imagen;
        this.admin = admin;
        this.partidas = new HashSet<>();
    }
}


