package com.dhruv.product.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Scheme {
    String id;
    @Column(name ="product_id")
    private String productId;
    Comparator comparator;
    private Double discount;
    Double x;
    Double y;
}
