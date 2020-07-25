package com.dhruv.product.model;

import java.time.LocalDateTime;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * 
 * @author ajinkya
 *
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Product {
    private Integer id;
    private String name;
    private String image;
    private LocalDateTime dateFirstAvailable;
    private boolean available;
    private String description;
    private Integer baseProductId;
}
