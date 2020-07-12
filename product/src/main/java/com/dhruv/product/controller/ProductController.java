package com.dhruv.product.controller;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;
import com.dhruv.product.services.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * 
 * @author ajinkya
 *
 */
@RestController
@RequestMapping("/product")
public class ProductController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);

	@Autowired
	private ProductService service;
	
	@GetMapping("/")
	public ResponseEntity<List<Product>> getAllProducts() {

		return new ResponseEntity<List<Product>>(service.findAll(), HttpStatus.OK);
	}
	
	@PostMapping("/")
	public ResponseEntity<Product> createProduct(@RequestBody Product product) throws ProductException {
		return new ResponseEntity<>(service.save(product), HttpStatus.CREATED);
	}


}
