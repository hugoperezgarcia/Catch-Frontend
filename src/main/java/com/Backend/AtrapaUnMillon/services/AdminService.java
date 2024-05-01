package com.Backend.AtrapaUnMillon.services;

import com.Backend.AtrapaUnMillon.exceptions.AdminBadRequestException;
import com.Backend.AtrapaUnMillon.models.Admin;
import com.Backend.AtrapaUnMillon.repositories.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAllAdmins(){
        return adminRepository.findAll();
    }

    public Admin login(String username, String password){
        return adminRepository.findByUsernameAndPassword(username, password);
    }

    public Optional<Admin> getById (Long id){
        return adminRepository.findById(id);
    }

    public Admin signIn(String username, String password, String key){
        final String hiddenKey = "PROFECHULO24";
        if(!key.equals(hiddenKey)){
            throw new AdminBadRequestException("Clave inválida");
        }
        Admin admin = new Admin(username, password);
        return adminRepository.save(admin);
    }
}
