package com.projet.exceptions;

public class OffreNonTrouveException extends Exception{

    public OffreNonTrouveException() {
        super();
    }

    public OffreNonTrouveException(String message) {
        super(message);
    }

    public OffreNonTrouveException(String message, Throwable cause) {
        super(message, cause);
    }

    public OffreNonTrouveException(Throwable cause) {
        super(cause);
    }
}
