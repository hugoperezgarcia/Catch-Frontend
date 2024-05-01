package com.Backend.AtrapaUnMillon.controllers;
import com.Backend.AtrapaUnMillon.services.CsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("api/csv")
public class CsvController {
    @Autowired
    private CsvService csvService;

    @PostMapping("/import")
    public ResponseEntity<String> importCsv(@RequestParam("file") MultipartFile file){
        if(file.isEmpty()){
            return ResponseEntity.badRequest().body("No se seleccionó ningun archivo CSV");
        }

        try{
            csvService.procesarAsignarPreguntas(file);
            return ResponseEntity.ok().body("El archivo se ha importado correctamente");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Se produjo un error al subir el archivo Csv" + e.getMessage());
        }
    }
}
