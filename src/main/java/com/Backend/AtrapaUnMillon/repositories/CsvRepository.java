package com.Backend.AtrapaUnMillon.repositories;

import com.Backend.AtrapaUnMillon.models.Csv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CsvRepository extends  JpaRepository<Csv, Long> {

}
