package com.yourcompany.passwordgeneratortool.model;

public class Password {
    private String checkPassword;
    
    public Password() {
    }
    
    public Password(String checkPassword) {
        this.checkPassword = checkPassword;
    }
    
    public String getCheckPassword() {
        return checkPassword;
    }
    
    public void setCheckPassword(String checkPassword) {
        this.checkPassword = checkPassword;
    }
}