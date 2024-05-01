package com.Backend.AtrapaUnMillon.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "Admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (name = "username")
    private String username;
    @Column (name = "password")
    private String password;
    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Pregunta> preguntas;
    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Partida> partidas;

    public Admin(){}
    public Admin(String username, String password){
        this.password = password;
        this.username = username;
        this.preguntas = new ArrayList<Pregunta>();
        this.partidas = new ArrayList<Partida>();
    }
}
