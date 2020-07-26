package com.dhruv.product.services;

import java.util.List;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.MasterProduct;
import com.dhruv.product.model.Product;

public interface MasterProductService {

    List<MasterProduct> process(List<Product> findAll) throws ProductException;

    MasterProduct process(Product product);

}
