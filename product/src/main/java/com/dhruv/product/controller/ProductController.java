package com.dhruv.product.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.MasterProduct;
import com.dhruv.product.model.Product;
import com.dhruv.product.services.MasterProductService;
import com.dhruv.product.services.ProductService;

/**
 * 
 * @author ajinkya
 *
 */
@RestController
@RequestMapping("")
public class ProductController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);
    
    @Autowired
    private ProductService service;

    @Autowired
    private MasterProductService masterProductService;

    @GetMapping()
    public ResponseEntity<List<MasterProduct>> getAllBaseProduct() throws ProductException {
        LOGGER.debug("Getting all products");
        return new ResponseEntity<>(masterProductService.process(service.findAll()), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MasterProduct> getBaseProductById(@PathVariable("id") Integer id) throws ProductException {
        LOGGER.debug("Getting product for id: {}", id);
        Product product = service.findById(id);
        if (product != null) {
            return new ResponseEntity<>(masterProductService.process(product), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @PostMapping()
    public ResponseEntity<Product> create(@RequestBody Product product) throws ProductException {
        LOGGER.debug("Creating base product: {}", product);
        service.save(product);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    
    @PutMapping()
    public ResponseEntity<Product> update(@RequestBody Product product) throws ProductException {
        LOGGER.debug("Updating product: {}", product);
        service.update(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") Integer id) throws ProductException {
        LOGGER.debug("Deleteing product for id: {}", id);
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
