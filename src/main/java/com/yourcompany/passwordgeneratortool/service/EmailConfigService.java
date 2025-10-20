package com.yourcompany.passwordgeneratortool.service;

import com.yourcompany.passwordgeneratortool.model.EmailConfig;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class EmailConfigService {
    
    // Store email configurations per session/user
    private final Map<String, EmailConfig> emailConfigs = new ConcurrentHashMap<>();
    
    // Default configuration for Gmail
    private final EmailConfig defaultConfig = new EmailConfig(
        "smtp.gmail.com",
        587,
        "",
        "",
        true,
        "noreply@passwordgenerator.com",
        "Password Generator"
    );
    
    public void saveEmailConfig(String sessionId, EmailConfig config) {
        emailConfigs.put(sessionId, config);
    }
    
    public EmailConfig getEmailConfig(String sessionId) {
        return emailConfigs.getOrDefault(sessionId, defaultConfig);
    }
    
    public boolean hasValidEmailConfig(String sessionId) {
        EmailConfig config = getEmailConfig(sessionId);
        return config != null && 
               config.getUsername() != null && !config.getUsername().isEmpty() &&
               config.getPassword() != null && !config.getPassword().isEmpty();
    }
    
    public void clearEmailConfig(String sessionId) {
        emailConfigs.remove(sessionId);
    }
}
