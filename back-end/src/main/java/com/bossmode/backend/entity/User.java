package com.bossmode.backend.entity;
import javax.persistence.*;
import java.io.Serializable;
/*
CREATE TABLE Persons IF NOT EXISTS(
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);
*/
@Entity
@Table(name = "user")

public class User implements Serializable{
    private static final long serialVersionUID = 2652327633296064143L;


    @Id
    private String email;
    private String name;
    private String password;
    private boolean enabled;
    private String address;
    private String zipCode;


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZipCode() {
        return zipCode;
    }
    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

}