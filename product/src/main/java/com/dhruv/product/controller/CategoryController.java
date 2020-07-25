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
import com.dhruv.product.model.BaseProduct;
import com.dhruv.product.model.Category;
import com.dhruv.product.services.CategoryService;

/**
 * 
 * @author ajinkya
 *
 */

@RestController
@RequestMapping("/product/category")
public class CategoryController {
    private static final Logger LOGGER = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    private CategoryService service;

    @GetMapping("/{product-id}")
    public ResponseEntity<List<Category>> getCategoryByProductId(@PathVariable("product-id") Integer id) throws ProductException {
        LOGGER.debug("Getting base product for id: {}", id);
        service.findByProductId(id);
        return new ResponseEntity<>(service.findByProductId(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<HttpStatus>create(@RequestBody Category category) throws ProductException {
        LOGGER.debug("creating new category for product");
        service.save(category);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    
    @PutMapping()
    public ResponseEntity<BaseProduct> update(@RequestBody Category category) throws ProductException {
        LOGGER.debug("Updating category for product: {}", category);
        service.update(category);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") Integer id) throws ProductException {
        LOGGER.debug("Deleteing category for id: {}", id);
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
