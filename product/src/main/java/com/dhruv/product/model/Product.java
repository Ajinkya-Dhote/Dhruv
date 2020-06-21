package com.dhruv.product.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.Nullable;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Product {
    @NonNull
    @Id
    String id;
    String name;
    String image;

    @Column(name="base_quantity")
    Double baseQuantity;

    @Column(name="base_quantity_unit")
    Unit baseQuantityUnit;
    @Column(name="base_quantity_price")
    Double baseQuantityPrice;

    @Column(name="min_quantity")
    Double minQuantity;

    @Column(name="max_quantity")
    Double maxQuantity;
    Double steps;

    @Nullable
    Scheme scheme[];

    @Column(name="date_first_available")
    @CreatedDate
    Date dateFirstAvailable;

    boolean available;

    String description;

    // TODO: Create an Enum for product type
    String type;
}
