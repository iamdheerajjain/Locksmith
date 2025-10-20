package com.yourcompany.passwordgeneratortool.model;

public class Characters {
    private Boolean capitalAlphabet;
    private Boolean smallAlphabet;
    private Boolean number;
    private Boolean specialCharacter;
    private Integer passwordLength;
    
    public Characters() {
    }
    
    public Characters(Boolean capitalAlphabet, Boolean smallAlphabet, Boolean number, Boolean specialCharacter, Integer passwordLength) {
        this.capitalAlphabet = capitalAlphabet;
        this.smallAlphabet = smallAlphabet;
        this.number = number;
        this.specialCharacter = specialCharacter;
        this.passwordLength = passwordLength;
    }
    
    public Boolean getCapitalAlphabet() {
        return capitalAlphabet;
    }
    
    public void setCapitalAlphabet(Boolean capitalAlphabet) {
        this.capitalAlphabet = capitalAlphabet;
    }
    
    public Boolean getSmallAlphabet() {
        return smallAlphabet;
    }
    
    public void setSmallAlphabet(Boolean smallAlphabet) {
        this.smallAlphabet = smallAlphabet;
    }
    
    public Boolean getNumber() {
        return number;
    }
    
    public void setNumber(Boolean number) {
        this.number = number;
    }
    
    public Boolean getSpecialCharacter() {
        return specialCharacter;
    }
    
    public void setSpecialCharacter(Boolean specialCharacter) {
        this.specialCharacter = specialCharacter;
    }
    
    public Integer getPasswordLength() {
        return passwordLength;
    }
    
    public void setPasswordLength(Integer passwordLength) {
        this.passwordLength = passwordLength;
    }
}