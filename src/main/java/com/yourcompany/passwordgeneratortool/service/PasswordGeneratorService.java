package com.yourcompany.passwordgeneratortool.service;

import com.yourcompany.passwordgeneratortool.model.Characters;
import com.yourcompany.passwordgeneratortool.model.Password;
import org.passay.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class PasswordGeneratorService {
    private final Random random = new Random();
    private final PasswordGenerator passwordGenerator = new PasswordGenerator();

    public String generatePassword(Characters characters) {
        List<CharacterRule> rules = new ArrayList<>();
        
        // Collect enabled character rules
        if (Boolean.TRUE.equals(characters.getCapitalAlphabet())) {
            rules.add(new CharacterRule(EnglishCharacterData.UpperCase, 1));
        }
        if (Boolean.TRUE.equals(characters.getSmallAlphabet())) {
            rules.add(new CharacterRule(EnglishCharacterData.LowerCase, 1));
        }
        if (Boolean.TRUE.equals(characters.getNumber())) {
            rules.add(new CharacterRule(EnglishCharacterData.Digit, 1));
        }
        if (Boolean.TRUE.equals(characters.getSpecialCharacter())) {
            rules.add(new CharacterRule(EnglishCharacterData.Special, 1));
        }

        // Ensure we have at least one character type selected
        if (rules.isEmpty()) {
            throw new IllegalArgumentException("At least one character type must be selected");
        }

        // Generate password ensuring all selected character types are included
        return passwordGenerator.generatePassword(characters.getPasswordLength(), rules);
    }

    public String generateSuggestPassword() {
        return generatePassword(getCharacters(getRandomIntegerValue()));
    }

    private Characters getCharacters(int passwordLength) {
        Characters characters = new Characters();
        characters.setCapitalAlphabet(true);
        characters.setSmallAlphabet(true);
        characters.setNumber(true);
        characters.setSpecialCharacter(true);
        characters.setPasswordLength(passwordLength);
        return characters;
    }

    public String strengthVerifier(Password password) {
        String passwordString = password.getCheckPassword();
        
        // Calculate password strength score
        int score = calculatePasswordScore(passwordString);
        
        // Convert score to strength level
        if (score >= 70) {
            return "very strong";
        } else if (score >= 50) {
            return "strong";
        } else if (score >= 30) {
            return "good";
        } else if (score >= 15) {
            return "fair";
        } else {
            return "poor";
        }
    }

    private int calculatePasswordScore(String password) {
        int score = 0;
        
        // Length bonus (up to 40 points)
        if (password.length() >= 12) {
            score += 40;
        } else if (password.length() >= 8) {
            score += 25;
        } else if (password.length() >= 6) {
            score += 15;
        } else if (password.length() >= 4) {
            score += 5;
        }
        
        // Character variety bonuses
        boolean hasLower = false;
        boolean hasUpper = false;
        boolean hasDigit = false;
        boolean hasSpecial = false;
        
        String specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        
        for (char c : password.toCharArray()) {
            if (Character.isLowerCase(c)) {
                hasLower = true;
            } else if (Character.isUpperCase(c)) {
                hasUpper = true;
            } else if (Character.isDigit(c)) {
                hasDigit = true;
            } else if (specialChars.indexOf(c) != -1) {
                hasSpecial = true;
            }
        }
        
        // Award points for character variety
        if (hasLower) score += 15;
        if (hasUpper) score += 15;
        if (hasDigit) score += 15;
        if (hasSpecial) score += 15;
        
        // Bonus for using all character types (even for short passwords)
        if (hasLower && hasUpper && hasDigit && hasSpecial) {
            score += 20;
        }
        
        // Penalty for common patterns
        if (password.toLowerCase().contains("password")) score -= 15;
        if (password.contains("123")) score -= 10;
        if (password.contains("abc")) score -= 10;
        
        // Penalty for repeated characters
        for (int i = 0; i < password.length() - 2; i++) {
            if (password.charAt(i) == password.charAt(i + 1) && 
                password.charAt(i) == password.charAt(i + 2)) {
                score -= 10;
                break;
            }
        }
        
        // Ensure score is within bounds
        return Math.max(0, Math.min(100, score));
    }

    private static String getPasswordStrength(boolean numberPresent, boolean upperCasePresent, boolean lowerCasePresent, boolean specialCharacterPresent, boolean minLength) {
        if (numberPresent && upperCasePresent && lowerCasePresent && specialCharacterPresent && minLength)
            return "very strong";
        else if (minLength && (upperCasePresent && lowerCasePresent) && (numberPresent || specialCharacterPresent))
            return "strong";
        else if (minLength && ((upperCasePresent && lowerCasePresent) || (numberPresent || specialCharacterPresent)))
            return "good";
        return "poor";
    }

    private int getRandomIntegerValue() {
        return random.nextInt(16, 24);
    }
}