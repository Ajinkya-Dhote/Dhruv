package com.dhruv.product.model;

public enum Comparator {
    LESS_THAN ("less than"),
    LESS_THAN_OR_EQUAL ("less than or equal"),
    IN_BETWEEN ("in between"),
    GREATER_THAN ("greater than"),
    GREATER_THAN_OR_EQUAL ("greater than or equal")
    ;

    private final String value;

    Comparator(String value) {
        this.value = value;
    }

    public String getComparatorValue() {
        return this.value;
    }
}
