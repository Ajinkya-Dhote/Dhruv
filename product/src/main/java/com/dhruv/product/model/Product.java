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
@Table(name = "products")
public class Product {
    @NonNull
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
