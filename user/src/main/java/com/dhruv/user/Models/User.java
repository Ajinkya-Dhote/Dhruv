package com.dhruv.user.Models;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("users")
public class User {

    @Id
    private String id;

    private String firstName;
    private String lastName;

    @NotNull
    private String mailId;

    @NotNull
    private Long phoneNumber;

    @NotNull
    private String password;
    private String userType;


}
