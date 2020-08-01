package com.dhruv.mills.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.constraints.NotNull;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhruv.mills.repository.MillsRepository;
import com.dhruv.mills.service.model.Address;
import com.dhruv.mills.service.model.Bank;
import com.dhruv.mills.service.model.Mill;

@Service
public class MillsServiceImpl {

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	MillsRepository millsRepository;

	public List<Mill> getAllMills() {
		logger.info("Getting list of all mills");
		List<Mill> millList = new ArrayList<>();
		logger.info("list for mill name {}", millList.get(0).getMillName());
		millsRepository.findAll().forEach(millList::add);
		logger.info("List of mills :  {}", millList);
		return millList;
	}

	public Mill retrivewMillByName(String millName) {
		Mill mill = null;
		if (!millName.isEmpty()) {
			logger.info("Get mill by name {}", millName);
			mill = millsRepository.findByMillName(millName);
			logger.info(" mill by name found {} ", millName);
		}
		return mill;
	}

	public Mill saveMill(Mill mill) {
		Mill millObject = createMillObject(mill);
		Mill savedMill = millsRepository.save(millObject);
		logger.info("mill saved  {}", savedMill.getMillName());
		return savedMill;
	}

	private Mill createMillObject(Mill mill) {

		Mill customMillObj = new Mill();
		Address address = new Address();
		Bank bank = new Bank();

		address.setAddressLine1(mill.getAddress().getAddressLine1());
		address.setAddressLine2(mill.getAddress().getAddressLine2());
		address.setAddressLine3(mill.getAddress().getAddressLine3());
		address.setArea(mill.getAddress().getArea());
		address.setCity(mill.getAddress().getCity());
		address.setLandmark(mill.getAddress().getLandmark());
		address.setPinCode(mill.getAddress().getPinCode());
		address.setState(mill.getAddress().getState());
		address.setLatitude(mill.getAddress().getLatitude());
		address.setLongitude(mill.getAddress().getLongitude());

		bank.setId(mill.getBank().getId());
		bank.setBankName(mill.getBank().getBankName());
		bank.setAccountNo(mill.getBank().getAccountNo());
		bank.setIfscCode(mill.getBank().getIfscCode());
		bank.setUpiId(mill.getBank().getUpiId());

		customMillObj.setId(mill.getId());
		customMillObj.setMillName(mill.getMillName());
		customMillObj.setOwnerFirstName(mill.getOwnerFirstName());
		customMillObj.setOwnerLastName(mill.getOwnerLastName());
		customMillObj.setContactNo(mill.getContactNo());
		customMillObj.setEmail(mill.getEmail());
		customMillObj.setNumberOfMachine(mill.getNumberOfMachine());
		customMillObj.setNoOfWorkers(mill.getNoOfWorkers());
		customMillObj.setAddress(address);
		customMillObj.setBank(bank);

		return customMillObj;
	}

	public boolean deleteMillById(@NotNull int id) {
		Mill mill = millsRepository.findById(id);
		if (null != mill) {
			millsRepository.deleteById(id);
			logger.info("mill details deleted : {}", mill.getMillName());
			return true;
		}
		return false;

	}

}
