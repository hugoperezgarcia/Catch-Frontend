package com.Backend.AtrapaUnMillon.services;

import com.Backend.AtrapaUnMillon.exceptions.AdminBadRequestException;
import com.Backend.AtrapaUnMillon.models.Admin;
import com.Backend.AtrapaUnMillon.models.Csv;
import com.Backend.AtrapaUnMillon.models.Pregunta;
import com.Backend.AtrapaUnMillon.repositories.AdminRepository;
import com.Backend.AtrapaUnMillon.repositories.CsvRepository;
import com.Backend.AtrapaUnMillon.repositories.PreguntaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Optional;

@Service
public class CsvService {

    @Autowired
    private CsvRepository csvRepository;

    @Autowired
    private AdminRepository adminRepository;

    public void procesarAsignarPreguntas(MultipartFile file) throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");

                Csv csv = new Csv();


                Long adminId = Long.parseLong(data[0]);
                Optional<Admin> adminOptional = adminRepository.findById(adminId);
                if (adminOptional.isPresent()) {
                    Admin admin = adminOptional.get();
                    csv.setAdmin(admin);

                    csv.setAsignatura(data[1]);
                    csv.setDificultad(data[2]);
                    csv.setNivel(data[3]);
                    csv.setEnunciado(data[4]);
                    csv.setRespuestaCorrecta(data[5]);
                    csv.setRespuesta1(data[6]);
                    csv.setRespuesta2(data[7]);
                    csv.setRespuesta3(data[8]);
                    csv.setTiempo(Integer.parseInt(data[9]));


                    csvRepository.save(csv);
                } else {
                    throw new AdminBadRequestException("No se encontró un administrador con el ID especificado");
                }
            }
        } catch (IOException e) {
            throw new IOException("Error al procesar el archivo CSV: " + e.getMessage());
        }
    }
}
