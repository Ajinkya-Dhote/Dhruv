package com.dhruv.product.model;

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
public class Category {
    private Integer id;
    private Integer productId;
    private Unit unit;
    private Double quantity;
    private Double price;
}
