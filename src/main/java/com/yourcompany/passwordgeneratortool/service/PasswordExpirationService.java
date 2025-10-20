package com.yourcompany.passwordgeneratortool.service;

import com.yourcompany.passwordgeneratortool.model.PasswordExpiration;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PasswordExpirationService {
    
    // In-memory storage for password expiration reminders, keyed by session ID
    private final Map<String, List<PasswordExpiration>> passwordExpirationMap = new ConcurrentHashMap<>();
    
    /**
     * Add a password expiration reminder for a specific session
     * @param sessionId the session ID
     * @param password the password
     * @param description description of the password
     * @param daysUntilExpiration number of days until the password expires
     */
    public void addPasswordExpiration(String sessionId, String password, String description, int daysUntilExpiration) {
        passwordExpirationMap.computeIfAbsent(sessionId, k -> new ArrayList<>());
        
        LocalDateTime generatedAt = LocalDateTime.now();
        LocalDateTime expiresAt = generatedAt.plusDays(daysUntilExpiration);
        
        PasswordExpiration expiration = new PasswordExpiration(password, generatedAt, expiresAt, description);
        passwordExpirationMap.get(sessionId).add(expiration);
        
        // Keep only the last 20 expiration reminders for each session
        if (passwordExpirationMap.get(sessionId).size() > 20) {
            passwordExpirationMap.get(sessionId).remove(0);
        }
    }
    
    /**
     * Get password expiration reminders for a specific session
     * @param sessionId the session ID
     * @return list of password expiration reminders
     */
    public List<PasswordExpiration> getPasswordExpirations(String sessionId) {
        return passwordExpirationMap.getOrDefault(sessionId, new ArrayList<>());
    }
    
    /**
     * Get upcoming password expirations (within 7 days) for a specific session
     * @param sessionId the session ID
     * @return list of upcoming password expirations
     */
    public List<PasswordExpiration> getUpcomingExpirations(String sessionId) {
        List<PasswordExpiration> allExpirations = getPasswordExpirations(sessionId);
        List<PasswordExpiration> upcomingExpirations = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sevenDaysFromNow = now.plusDays(7);
        
        for (PasswordExpiration expiration : allExpirations) {
            if (expiration.getExpiresAt().isAfter(now) && expiration.getExpiresAt().isBefore(sevenDaysFromNow)) {
                upcomingExpirations.add(expiration);
            }
        }
        
        return upcomingExpirations;
    }
    
    /**
     * Clear password expiration reminders for a specific session
     * @param sessionId the session ID
     */
    public void clearPasswordExpirations(String sessionId) {
        passwordExpirationMap.remove(sessionId);
    }
}