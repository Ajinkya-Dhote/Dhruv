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
public class BaseProduct {

    private Integer id;
    private String name;
}
