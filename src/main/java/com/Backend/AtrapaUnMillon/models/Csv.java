package com.Backend.AtrapaUnMillon.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Csv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String enunciado;
    private String respuestaCorrecta;

    private String respuesta1;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEnunciado() {
        return enunciado;
    }

    public void setEnunciado(String enunciado) {
        this.enunciado = enunciado;
    }

    public String getRespuestaCorrecta() {
        return respuestaCorrecta;
    }

    public void setRespuestaCorrecta(String respuestaCorrecta) {
        this.respuestaCorrecta = respuestaCorrecta;
    }

    public String getRespuesta1() {
        return respuesta1;
    }

    public void setRespuesta1(String respuesta1) {
        this.respuesta1 = respuesta1;
    }

    public String getRespuesta2() {
        return respuesta2;
    }

    public void setRespuesta2(String respuesta2) {
        this.respuesta2 = respuesta2;
    }

    public String getRespuesta3() {
        return respuesta3;
    }

    public void setRespuesta3(String respuesta3) {
        this.respuesta3 = respuesta3;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public String getDificultad() {
        return dificultad;
    }

    public void setDificultad(String dificultad) {
        this.dificultad = dificultad;
    }

    public String getAsignatura() {
        return asignatura;
    }

    public void setAsignatura(String asignatura) {
        this.asignatura = asignatura;
    }

    public Integer getTiempo() {
        return tiempo;
    }

    public void setTiempo(Integer tiempo) {
        this.tiempo = tiempo;
    }

    private String respuesta2;

    private String respuesta3;

    private String nivel;

    private String dificultad;

    private String asignatura;

    private Integer tiempo;

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    private Admin admin;
}

