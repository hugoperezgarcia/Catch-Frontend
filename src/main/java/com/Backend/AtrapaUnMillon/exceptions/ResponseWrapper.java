package com.Backend.AtrapaUnMillon.exceptions;

import lombok.Data;

@Data
public class ResponseWrapper<T> {
    private T data;
    private String errorMessage;

    // Constructor, getters y setters
}
