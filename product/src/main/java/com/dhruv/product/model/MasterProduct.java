package com.dhruv.product.model;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MasterProduct extends Product {
    private List<Category> categories;
    private BaseProduct baseProduct;
    
    public MasterProduct(Product product) {
        this.setId(product.getId());
        this.setName(product.getName());
        this.setImage(product.getImage());
        this.setDateFirstAvailable(product.getDateFirstAvailable());
        this.setAvailable(product.isAvailable());
        this.setDescription(product.getDescription());
        this.setBaseProductId(product.getBaseProductId());
    }
}
