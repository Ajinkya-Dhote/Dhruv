package com.dhruv.product.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "Product")
public class Product {

    @Id
    String id;

    @NonNull
    String name;

    String description;

    // TODO: Create an Enum for product type
    String type;
}
