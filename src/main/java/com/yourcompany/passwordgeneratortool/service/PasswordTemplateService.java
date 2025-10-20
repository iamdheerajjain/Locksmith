package com.yourcompany.passwordgeneratortool.service;

import com.yourcompany.passwordgeneratortool.model.Characters;
import com.yourcompany.passwordgeneratortool.model.PasswordTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PasswordTemplateService {
    
    private final List<PasswordTemplate> templates = new ArrayList<>();
    
    public PasswordTemplateService() {
        // Initialize with default templates
        initializeTemplates();
    }
    
    private void initializeTemplates() {
        // WiFi Password Template
        Characters wifiChars = new Characters();
        wifiChars.setCapitalAlphabet(true);
        wifiChars.setSmallAlphabet(true);
        wifiChars.setNumber(true);
        wifiChars.setSpecialCharacter(true);
        wifiChars.setPasswordLength(16);
        
        PasswordTemplate wifiTemplate = new PasswordTemplate();
        wifiTemplate.setName("WiFi Password");
        wifiTemplate.setDescription("Strong password for WiFi networks");
        wifiTemplate.setCharacters(wifiChars);
        templates.add(wifiTemplate);
        
        // Banking Password Template
        Characters bankingChars = new Characters();
        bankingChars.setCapitalAlphabet(true);
        bankingChars.setSmallAlphabet(true);
        bankingChars.setNumber(true);
        bankingChars.setSpecialCharacter(true);
        bankingChars.setPasswordLength(20);
        
        PasswordTemplate bankingTemplate = new PasswordTemplate();
        bankingTemplate.setName("Banking Password");
        bankingTemplate.setDescription("Highly secure password for banking");
        bankingTemplate.setCharacters(bankingChars);
        templates.add(bankingTemplate);
        
        // Email Password Template
        Characters emailChars = new Characters();
        emailChars.setCapitalAlphabet(true);
        emailChars.setSmallAlphabet(true);
        emailChars.setNumber(true);
        emailChars.setSpecialCharacter(true);
        emailChars.setPasswordLength(18);
        
        PasswordTemplate emailTemplate = new PasswordTemplate();
        emailTemplate.setName("Email Password");
        emailTemplate.setDescription("Secure password for email accounts");
        emailTemplate.setCharacters(emailChars);
        templates.add(emailTemplate);
        
        // Social Media Password Template
        Characters socialChars = new Characters();
        socialChars.setCapitalAlphabet(true);
        socialChars.setSmallAlphabet(true);
        socialChars.setNumber(true);
        socialChars.setSpecialCharacter(false);
        socialChars.setPasswordLength(14);
        
        PasswordTemplate socialTemplate = new PasswordTemplate();
        socialTemplate.setName("Social Media");
        socialTemplate.setDescription("Password for social media accounts");
        socialTemplate.setCharacters(socialChars);
        templates.add(socialTemplate);
        
        // PIN Template
        Characters pinChars = new Characters();
        pinChars.setCapitalAlphabet(false);
        pinChars.setSmallAlphabet(false);
        pinChars.setNumber(true);
        pinChars.setSpecialCharacter(false);
        pinChars.setPasswordLength(6);
        
        PasswordTemplate pinTemplate = new PasswordTemplate();
        pinTemplate.setName("PIN");
        pinTemplate.setDescription("Numeric PIN for devices");
        pinTemplate.setCharacters(pinChars);
        templates.add(pinTemplate);
    }
    
    public List<PasswordTemplate> getAllTemplates() {
        return new ArrayList<>(templates);
    }
    
    public PasswordTemplate getTemplateByName(String name) {
        return templates.stream()
                .filter(template -> template.getName().equals(name))
                .findFirst()
                .orElse(null);
    }
}