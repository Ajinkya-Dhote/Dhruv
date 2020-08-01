package com.dhruv.mills.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhruv.mills.service.model.Mill;

@Repository
public interface MillsRepository extends CrudRepository<Mill, Integer> {

	Mill findByMillName(String millName);
	Mill findById(int id);
}
