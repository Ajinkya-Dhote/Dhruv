package com.dhruv.user.Sevices;

import com.dhruv.user.Models.User;
import com.dhruv.user.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User setUserData(User user){
        user.setId(UUID.randomUUID().toString());
        return userRepo.save(user);
    }

    public User getUserByMail(String id) {
        return userRepo.findById(id).get();
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User updateUser(String id, User user) {
        User updateUser = userRepo.findById(id).get();
        if(updateUser != null){
            updateUser.setFirstName(user.getFirstName());
            updateUser.setLastName(user.getLastName());
            updateUser.setMailId(user.getMailId());
            updateUser.setPhoneNumber(user.getPhoneNumber());

        }
        return updateUser;
    }


}
