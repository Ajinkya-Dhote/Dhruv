package com.dhruv.disocvery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class DisocveryApplication {

	public static void main(String[] args) {
		SpringApplication.run(DisocveryApplication.class, args);
	}

}
