package com.dhruv.product.repository;

import com.dhruv.product.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface ProductRepository extends MongoRepository<Product, String> {
}
