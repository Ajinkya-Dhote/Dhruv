package com.dhruv.product.Util;

public class ProductException extends Exception {
    boolean formatted;

    private static final long serialVersionUID = 1L;

    public ProductException() {
        super();
    }

    public ProductException(String arg0, Throwable arg1) {
        super(arg0, arg1);
    }

    public ProductException(boolean hasFormattedMessage, String arg0) {
        super(arg0);

        this.formatted = hasFormattedMessage;
    }

    public ProductException(String arg0) {
        super(arg0);
    }

    public ProductException(Throwable arg0) {
        super(arg0);
    }

    public boolean isFormatted() {
        return formatted;
    }

    public void setFormatted(boolean formatted) {
        this.formatted = formatted;
    }
}
