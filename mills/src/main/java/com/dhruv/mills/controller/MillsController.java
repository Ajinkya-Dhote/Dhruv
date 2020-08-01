package com.dhruv.mills.controller;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dhruv.mills.exception.MillNotFoundException;
import com.dhruv.mills.service.impl.MillsServiceImpl;
import com.dhruv.mills.service.model.Mill;

/**
 * This class represents API services for mills component
 * 
 * @author Vishwas
 *
 */
@RestController("/")
public class MillsController {

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	MillsServiceImpl millService;

	@GetMapping("mills")
	public ResponseEntity<List<Mill>> getAllMillsDetails() throws MillNotFoundException {
		List<Mill> millsList = millService.getAllMills();
		if (millsList.isEmpty()) {
			logger.info("Exception caught Mill not found");
			throw new MillNotFoundException("Mill not found");
		}
		return new ResponseEntity<List<Mill>>(millsList, HttpStatus.OK);

	}

	@GetMapping("mills/{name}")
	public ResponseEntity<Mill> getMillByName(@PathVariable("name") String millName) throws MillNotFoundException {
		Mill millByName = millService.retrivewMillByName(millName);
		if (null == millByName) {
			throw new MillNotFoundException("Mill information not present");
		}
		return new ResponseEntity<Mill>(millByName, HttpStatus.OK);
	}

	@PostMapping("mills")
	public ResponseEntity<Mill> addMill(@Valid @RequestBody Mill mill) throws Exception {

		Mill saveMill = millService.saveMill(mill);

		if (saveMill == null) {
			throw new Exception("mill not saved");
		}
		return new ResponseEntity<Mill>(saveMill, HttpStatus.CREATED);
	}

	@DeleteMapping("mills/{id}")
	public ResponseEntity<Object> deleteMill(@NotNull @PathVariable("id") int id) throws MillNotFoundException {
		if (!millService.deleteMillById(id)) {
			throw new MillNotFoundException("Mill to be deleted is not preset ");
		}
		return new ResponseEntity<>("Mill details removed", HttpStatus.ACCEPTED);
	}

}
