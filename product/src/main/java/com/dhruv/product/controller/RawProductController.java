package com.dhruv.product.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;
import com.dhruv.product.model.RawProduct;
import com.dhruv.product.services.RawProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
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
	
	@Operation(summary = "Create Raw Product")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "raw producs found ")})
	@GetMapping()
	public ResponseEntity<List<RawProduct>> getAll() {
		
		return new ResponseEntity<List<RawProduct>>(service.getAll(), HttpStatus.OK);
		
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

}
