package com.dhruv.product.model;

import lombok.*;

import org.apache.commons.lang3.builder.ToStringExclude;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.Nullable;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    String name;
    String image;

    Double steps;


    @Column(name="date_first_available")
    @CreatedDate
    Date dateFirstAvailable;

    boolean available;

    String description;

    // TODO: Create an Enum for product type
    String type;
    
    String subtype;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    List<Category> categories = new ArrayList<>();
}
