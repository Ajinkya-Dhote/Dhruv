package com.dhruv.product.services;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<Product> findAll();

    Optional<Product> findById(String id) throws ProductException;

    Product save(Product product) throws ProductException;

    Product update(Product product) throws ProductException;

    boolean delete(String id) throws  ProductException;
}
