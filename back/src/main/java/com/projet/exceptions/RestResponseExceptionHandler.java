package com.projet.exceptions;

import com.projet.dtos.Message;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@ControllerAdvice
@ResponseStatus
public class RestResponseExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        Map<String, String> details = new HashMap<>();
        BindingResult result = ex.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();
        for (FieldError error : fieldErrors) {
            details.put(error.getField(), error.getDefaultMessage());
        }
        return new ResponseEntity(details, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MembreNonTrouveException.class)
    public ResponseEntity<Message> handleMembreNonTrouveException(MembreNonTrouveException ex) {
        Message message = new Message();
        message.setMessage(ex.getMessage());
        message.setStatus(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(OffreNonTrouveException.class)
    public ResponseEntity<Message> handleOffreNonTrouveException(OffreNonTrouveException ex) {
        Message message = new Message();
        message.setMessage(ex.getMessage());
        message.setStatus(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
}
