package com.projet.exceptions;

public class DemandeNotFoundException extends Exception {

    public DemandeNotFoundException() {
        super();
    }

    public DemandeNotFoundException(String message) {
        super(message);
    }

    public DemandeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public DemandeNotFoundException(Throwable cause) {
        super(cause);
    }
}
