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

	@ExceptionHandler
	public ResponseEntity<String> error() {
		return new ResponseEntity<>("Something went wrong", HttpStatus.NOT_IMPLEMENTED);
	}

	@Operation(summary = "Get All Products list")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "products found", content = @Content(array = @ArraySchema(schema = @Schema(implementation = Product.class)))), })
	@GetMapping()
	public ResponseEntity<List<Product>> getAllProduct() {
		LOGGER.debug("Finding all products");

		try {
			return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
		} catch (ProductException e) {
			LOGGER.error("No Product found in databse, returning empty set");
			return new ResponseEntity<>(Arrays.asList(), HttpStatus.OK);
		}
	}

	@Operation(summary = "Get Product for given id")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "products found", content = @Content(schema = @Schema(implementation = Product.class))),
			@ApiResponse(responseCode = "404", description = "unable to find product"),
			@ApiResponse(responseCode = "500", description = "Interbal server error") })
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProductById(
			@Parameter(description = "product id", required = true, schema = @Schema(implementation = String.class)) @PathVariable("id") String id) {
		LOGGER.debug("getting product by id: {}", id);
		try {
			Optional<Product> user = service.findById(id);
			if (user.isPresent()) {
				return new ResponseEntity<>(user.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (ProductException ex) {
			LOGGER.error("Error occurred while getting product for id: {}", id, ex);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Operation(summary = "Create new product")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "product created") })
	@PostMapping()
	public ResponseEntity<String> create(
			@Parameter(description = "Product to add", required = true, schema = @Schema(implementation = Product.class)) @Valid @RequestBody Product product) {
		LOGGER.info("creating product");
		try {
			service.save(product);
			return new ResponseEntity<>("Product created", HttpStatus.CREATED);
		} catch (Exception ex) {
			LOGGER.error("Error occurred while creating product", ex);
			return new ResponseEntity<String>("Error occurred while creating product",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@Operation(summary = "Update existin product")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "product updated"),
			@ApiResponse(responseCode = "500", description = "Error occurred while updating product") })
	@PutMapping("/")
	public ResponseEntity<String> update(@RequestBody Map<String, Object> params) {
		LOGGER.info("Updating product");
		try {
			String id = (String) params.get("id");
			String name = (String) params.get("name");
			Double price = Double.parseDouble((String) params.get("price"));
			Double quantity = Double.parseDouble((String) params.get("quantity"));
			LOGGER.info("product: {} - {} - {} - {}", id, name, price, quantity);
			service.update(id, name, price, quantity);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception ex) {
			LOGGER.error("Error occurred while updating product", ex);
			return new ResponseEntity<String>("Error occurred while updating product",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Operation(summary = "Delete existing product")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "product deleted"),
			@ApiResponse(responseCode = "404", description = "product not found"),
			@ApiResponse(responseCode = "500", description = "Error occurred while updating product") })
	@DeleteMapping("/{id}")
	public ResponseEntity<String> update(
			@Parameter(description = "product id", required = true, schema = @Schema(implementation = String.class)) @PathVariable int id) {
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
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
