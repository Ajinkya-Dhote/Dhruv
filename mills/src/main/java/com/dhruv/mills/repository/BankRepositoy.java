package com.dhruv.mills.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhruv.mills.service.model.Bank;

@Repository
public interface BankRepositoy extends CrudRepository<Bank, Integer> {

}
