package com.yourcompany.passwordgeneratortool.model;

import java.time.LocalDateTime;

public class PasswordHistory {
    private String password;
    private LocalDateTime generatedAt;
    private String strength;
    
    public PasswordHistory() {
    }
    
    public PasswordHistory(String password, LocalDateTime generatedAt, String strength) {
        this.password = password;
        this.generatedAt = generatedAt;
        this.strength = strength;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }
    
    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }
    
    public String getStrength() {
        return strength;
    }
    
    public void setStrength(String strength) {
        this.strength = strength;
    }
}