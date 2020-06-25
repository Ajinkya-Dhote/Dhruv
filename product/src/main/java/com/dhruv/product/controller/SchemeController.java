package com.dhruv.product.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhruv.product.model.Scheme;
import com.dhruv.product.services.SchemeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
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
@RequestMapping("/scheme")
public class SchemeController {
	private static final Logger LOGGER = LoggerFactory.getLogger(SchemeController.class);
	
	@Autowired
	SchemeService service;
	
//	@ExceptionHandler
//    public ResponseEntity<String> error() {
//        return new ResponseEntity<>("Something went wrong", HttpStatus.NOT_IMPLEMENTED);
//    }
	
	@Operation(description = "Get All Schemes")
	@ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "schemes found",
            		content = @Content(array = @ArraySchema(schema = @Schema(implementation = Scheme.class)))),
    })
	@GetMapping("")
	public ResponseEntity<List<Scheme>> getAllSchemes() {
		return new ResponseEntity<>(service.getAllSchemes(), HttpStatus.OK);
	}
	
	@Operation(description = "Get All Schemes for a product")
	@ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "schemes found",
            		content = @Content(array = @ArraySchema(schema = @Schema(implementation = Scheme.class)))),
    })
	@GetMapping("/{product_id}")
	public ResponseEntity<List<Scheme>> getAllSchemesForProduct(
			@Parameter(description="Id of the product. Cannot be empty.", required=true)
			@PathVariable("product_id") String productId) {
		return new ResponseEntity<>(service.getAllSchemesForProduct(productId), HttpStatus.OK);
	}
	
	@Operation(description = "Createl Schemes for a product")
	@ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "schemes created")
    })
	@PostMapping("/create")
	public ResponseEntity<String> createScheme(@RequestBody List<Scheme> schemes) {

		LOGGER.info("Savign product scheme: {}", schemes);
		
		Integer result = service.createScheme(schemes);
		
		if (result == null) {
			return new ResponseEntity<>("Error while creating scheme", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>("Scheme created", HttpStatus.CREATED);
	}
}
	
