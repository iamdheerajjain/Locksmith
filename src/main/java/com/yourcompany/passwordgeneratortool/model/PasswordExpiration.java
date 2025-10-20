package com.yourcompany.passwordgeneratortool.model;

import java.time.LocalDateTime;

public class PasswordExpiration {
    private String password;
    private LocalDateTime generatedAt;
    private LocalDateTime expiresAt;
    private String description;
    
    public PasswordExpiration() {
    }
    
    public PasswordExpiration(String password, LocalDateTime generatedAt, LocalDateTime expiresAt, String description) {
        this.password = password;
        this.generatedAt = generatedAt;
        this.expiresAt = expiresAt;
        this.description = description;
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
    
    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }
    
    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
}