package com.dhruv.product.controller;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;
import com.dhruv.product.services.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;

@RestController("/")
public class ProductController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService service;

    @ExceptionHandler
    public ResponseEntity<String> error() {
        return new ResponseEntity<>("Something went wrong", HttpStatus.NOT_IMPLEMENTED);
    }

    @GetMapping()
    public ResponseEntity getAllProduct() {
        LOGGER.debug("Finding all products");

        try {
            return new ResponseEntity(service.findAll(), HttpStatus.FOUND);
        } catch (ProductException e) {
            LOGGER.error("No Product found in databse, returning empty set");
            return new ResponseEntity(Arrays.asList(), HttpStatus.FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Integer id) {
        LOGGER.debug("getting product by id: {}", id);
        try {
            Optional<Product> user =  service.findById(id);
            if (user.isPresent()) {
                return new ResponseEntity(user.get(), HttpStatus.FOUND);
            } else {
                return new ResponseEntity("No Product found",HttpStatus.NOT_FOUND);
            }
        } catch (ProductException ex) {
            LOGGER.error("Error occurred while getting product for id: {}", id, ex);
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<String> create(@RequestBody Product product) {
        LOGGER.info("creating product");
        try {
            service.save(product);
            return new ResponseEntity<>("Product created", HttpStatus.CREATED);
        } catch (Exception ex) {
            LOGGER.error("Error occurred while creating product", ex);
            return new ResponseEntity("Error occurred while creating product", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> update (@PathVariable int id) {
        LOGGER.debug("delete product");
        try {
            boolean isDeleted = service.delete(id);
            if (isDeleted) {
                return new ResponseEntity<String>("Product deleted", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("Product not deleted", HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            LOGGER.error("Error occurred while deleting product", ex);
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
