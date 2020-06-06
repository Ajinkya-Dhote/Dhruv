package com.dhruv.product.model;

import lombok.*;

import javax.persistence.Column;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Product {
    @NonNull
    Integer id;
    String name;
    Double price;

    @Column(name="date_first_available")
    Date dateFirstAvailable;

    boolean available;

    String description;

    // TODO: Create an Enum for product type
    String type;
}
