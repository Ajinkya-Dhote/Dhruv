package com.dhruv.user.Repositories;


import com.dhruv.user.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String> {

    @Query("{ 'mailId' : ?0 }")
    User findByMail(String mail);



}
