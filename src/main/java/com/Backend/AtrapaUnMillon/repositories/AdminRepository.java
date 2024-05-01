package com.Backend.AtrapaUnMillon.repositories;

import com.Backend.AtrapaUnMillon.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsernameAndPassword(String username, String password);
}
