package com.projet.exceptions;

public class MembreNonTrouveException extends Exception {
    public MembreNonTrouveException() {
        super();
    }

    public MembreNonTrouveException(String message) {
        super(message);
    }

    public MembreNonTrouveException(String message, Throwable cause) {
        super(message, cause);
    }

    public MembreNonTrouveException(Throwable cause) {
        super(cause);
    }
}
