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
import com.dhruv.product.model.MasterProduct;
import com.dhruv.product.services.BaseProductService;
import com.dhruv.product.services.MasterProductService;

/**
 * 
 * @author ajinkya
 *
 */
@RestController
@RequestMapping("/base-product")
public class BaseProductController {
    private static final Logger LOGGER = LoggerFactory.getLogger(BaseProductController.class);

    @Autowired
    private BaseProductService service;
    
    @Autowired
    private MasterProductService masterProductService;

    @GetMapping()
    public ResponseEntity<List<BaseProduct>> getAllBaseProduct() throws ProductException {
        LOGGER.debug("Getting all base product");
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("{id}/product")
    public ResponseEntity<List<MasterProduct>> getAllProductsForBaseProduct(@PathVariable("id") Integer id) throws ProductException {
        LOGGER.debug("Getting all product for base product");
        return new ResponseEntity<>(masterProductService.process(service.findAllProducts(id)), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseProduct> getBaseProductById(@PathVariable("id") Integer id) throws ProductException {
        LOGGER.debug("Getting base product for id: {}", id);
        BaseProduct product = service.findById(id);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping()
    public ResponseEntity<BaseProduct> create(@RequestBody BaseProduct baseProduct) throws ProductException {
        LOGGER.debug("Creating base product: {}", baseProduct);
        service.save(baseProduct);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<BaseProduct> update(@RequestBody BaseProduct baseProduct) throws ProductException {
        LOGGER.debug("Updating base product: {}", baseProduct);
        service.update(baseProduct);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") Integer id) throws ProductException {
        LOGGER.debug("Deleteing base product for id: {}", id);
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
