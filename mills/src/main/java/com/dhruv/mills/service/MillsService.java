package com.dhruv.mills.service;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.dhruv.mills.service.model.Mill;

public interface MillsService {

	List<Mill> getAllMills();

	Mill retrivewMillByName(String millName);

	Mill saveMill(Mill mill);

	boolean deleteMillById(int id);

}