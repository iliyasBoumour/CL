package com.projet.exceptions;

public class AssociationNotFound extends Exception {
    public AssociationNotFound() {
        super();
    }

    public AssociationNotFound(String message) {
        super(message);
    }

    public AssociationNotFound(String message, Throwable cause) {
        super(message, cause);
    }

    public AssociationNotFound(Throwable cause) {
        super(cause);
    }
}
