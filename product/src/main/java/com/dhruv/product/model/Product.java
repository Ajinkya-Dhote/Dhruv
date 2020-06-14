package com.dhruv.product.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Product extends Stock {
    @NonNull
    @Id
    Integer id;
    String name;
    Double price;

    @Column(name="date_first_available")
    @CreatedDate
    Date dateFirstAvailable;

    boolean available;

    String description;

    // TODO: Create an Enum for product type
    String type;
}
