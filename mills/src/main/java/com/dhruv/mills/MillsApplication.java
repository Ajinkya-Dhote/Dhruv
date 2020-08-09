package com.dhruv.mills;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Mills APi", description = "API tp access mills capapbilities"))
public class MillsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MillsApplication.class, args);
	}

}
