package com.dhruv.product.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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
import com.dhruv.product.model.RawProduct;
import com.dhruv.product.services.RawProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

/**
 * 
 * @author ajinkya
 *
 */

@RestController
@RequestMapping("/product/raw")
public class RawProductController {
	private static final Logger LOGGER = LoggerFactory.getLogger(RawProductController.class);

	@Autowired
	RawProductService service;
	
	@Operation(summary = "Get all Raw Product")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "raw products found ")})
	@GetMapping()
	public ResponseEntity<List<RawProduct>> getAll() {
		
		return new ResponseEntity<List<RawProduct>>(service.getAll(), HttpStatus.OK);
		
	}
	
	@Operation(summary = "Get Raw Product by id")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "raw product found "),
							@ApiResponse(responseCode = "404", description = "raw product not found "),
							@ApiResponse(responseCode = "500", description = "Error while findind raw product")})
	@GetMapping("/{id}")
	public ResponseEntity<RawProduct> getbyId(@Parameter(description = "product id", required = true, schema = @Schema(implementation = String.class)) @PathVariable("id") String id) {
		
		RawProduct product;
		try {
			product = service.getbyId(id);
		} catch (DataAccessException | ProductException e) {
			LOGGER.error("Cannot get raw product", e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if (product == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<RawProduct>(product, HttpStatus.OK);
		
	}

	@Operation(summary = "Create Raw Product")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "raw product created "),
			@ApiResponse(responseCode = "404", description = "parametr missing"),
			@ApiResponse(responseCode = "500", description = "Internal server error") })
	@PostMapping()
	public ResponseEntity<String> create(
			@Parameter(description = "Product Json", required = true, schema = @Schema(implementation = RawProduct.class)) @RequestBody RawProduct rawProduct) {
		LOGGER.debug("Creating raw product: {}", rawProduct);

		if (rawProduct == null) {
			return new ResponseEntity<String>("Parameter missing", HttpStatus.NOT_FOUND);
		}

		try {
			service.create(rawProduct);
			return new ResponseEntity<String>("Raw product created", HttpStatus.CREATED);
		} catch (DataAccessException | ProductException e) {
			LOGGER.error("Cannot save raw product", e);
			return new ResponseEntity<String>("Cannot save raw product", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteById(@PathVariable("id") String id) {
		if (id == null) {
			return new ResponseEntity<String>("No id passed", HttpStatus.NOT_FOUND);
		}
		try {
			boolean result = service.deleteById(id);
			if (result) {
				return new ResponseEntity<String>("Raw product deleted", HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Raw product cannot deleted", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (DataAccessException | ProductException e) {
			LOGGER.error("Cannot delete raw product", e);
			return new ResponseEntity<String>("Raw product cannot deleted", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/")
	public ResponseEntity<String> update(@RequestBody RawProduct rawProduct) {
		LOGGER.info("Updating product");
		try {
			String id = rawProduct.getId();
			String name = rawProduct.getName();
			Double quantity = rawProduct.getQuantity();
			LOGGER.info("raw product: {} - {} - {}", id, name, quantity);
			service.update(id, name, quantity);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception ex) {
			LOGGER.error("Error occurred while updating product", ex);
			return new ResponseEntity<String>("Error occurred while updating product",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
