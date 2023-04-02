package com.bossmode.backend.dto;

public class UserDetailsDto {

    private String name;
    private String email;
    private String address;
    private String zipCode;

    public UserDetailsDto(String name, String email, String address, String zipCode) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.zipCode = zipCode;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public String getZipCode() {
        return zipCode;
    }
}
