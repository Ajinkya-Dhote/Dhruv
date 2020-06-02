package com.dhruv.user.Controllers;

import com.dhruv.user.Models.User;
import com.dhruv.user.Sevices.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<User> setUser(@RequestBody User user) {
        return new ResponseEntity<User>(userService.setUserData(user), HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<User> getUserData(@RequestParam(value = "id") String id){
        return new ResponseEntity<User>(userService.getUserByMail(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestParam(value = "id" ) String id,
                                           @RequestBody User user){
        return new ResponseEntity<User>(userService.updateUser(id, user), HttpStatus.OK);
    }

}
