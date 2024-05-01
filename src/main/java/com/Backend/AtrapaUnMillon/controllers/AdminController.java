package com.Backend.AtrapaUnMillon.controllers;


import com.Backend.AtrapaUnMillon.exceptions.AdminBadRequestException;
import com.Backend.AtrapaUnMillon.models.Admin;
import com.Backend.AtrapaUnMillon.services.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Operation(summary = "Obtiene todos los administradores", tags = {"admins"})
    @ApiResponse(responseCode = "200", description = "Listado de admins")
    @ApiResponse(responseCode = "404", description = "No hay admins")
    @GetMapping("/admins")
    public List<Admin> getAllAlumnos(){
        return adminService.getAllAdmins();
    }

    @Operation(summary = "Inicio de sesión", tags = {"admins"})
    @ApiResponse(responseCode = "200", description = "Admin encontrado")
    @ApiResponse(responseCode = "404", description = "Credenciales incorrectas")
    @GetMapping("/login")
    public ResponseEntity<Admin> login(
                        @RequestParam String username,
                        @RequestParam String password)
    {
        Admin admin = adminService.login(username, password);
        if(admin != null){
            return new ResponseEntity<>(admin, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Get admin por id", tags = {"admins"})
    @ApiResponse(responseCode = "200", description = "Admin encontrado")
    @Parameter(name = "id", required = true, description = "ID del admin", example = "1")
    @ApiResponse(responseCode = "404", description = "Admin no encontrado")
    @GetMapping("/admin/{id}")
    public ResponseEntity<Admin> login(@PathVariable Long id)
    {
        Optional<Admin> optionalAdmin = adminService.getById(id);
        if(optionalAdmin.isPresent()){
            Admin admin = optionalAdmin.get();
            return new ResponseEntity<>(admin, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Regsitro", tags = {"admins"})
    @ApiResponse(responseCode = "200", description = "Admin registrado")
    @ApiResponse(responseCode = "404", description = "Credenciales incorrectas")
    @PostMapping("/signin")
    public ResponseEntity<Admin> register(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String key)
    {
        try{
            Admin admin = adminService.signIn(username, password, key);
            return new ResponseEntity<>(admin, HttpStatus.OK);
        }catch(AdminBadRequestException error){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
