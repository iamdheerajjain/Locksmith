package com.yourcompany.passwordgeneratortool.service;

import com.yourcompany.passwordgeneratortool.model.PasswordHistory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PasswordHistoryService {
    
    // In-memory storage for password history, keyed by session ID
    private final Map<String, List<PasswordHistory>> passwordHistoryMap = new ConcurrentHashMap<>();
    
    /**
     * Add a password to the history for a specific session
     * @param sessionId the session ID
     * @param password the generated password
     * @param strength the password strength
     */
    public void addPasswordToHistory(String sessionId, String password, String strength) {
        passwordHistoryMap.computeIfAbsent(sessionId, k -> new ArrayList<>());
        
        PasswordHistory history = new PasswordHistory(password, LocalDateTime.now(), strength);
        passwordHistoryMap.get(sessionId).add(history);
        
        // Keep only the last 10 passwords for each session
        if (passwordHistoryMap.get(sessionId).size() > 10) {
            passwordHistoryMap.get(sessionId).remove(0);
        }
    }
    
    /**
     * Get password history for a specific session
     * @param sessionId the session ID
     * @return list of password history entries
     */
    public List<PasswordHistory> getPasswordHistory(String sessionId) {
        return passwordHistoryMap.getOrDefault(sessionId, new ArrayList<>());
    }
    
    /**
     * Clear password history for a specific session
     * @param sessionId the session ID
     */
    public void clearPasswordHistory(String sessionId) {
        passwordHistoryMap.remove(sessionId);
    }
}