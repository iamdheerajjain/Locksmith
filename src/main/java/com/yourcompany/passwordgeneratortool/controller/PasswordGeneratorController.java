package com.yourcompany.passwordgeneratortool.controller;

import com.yourcompany.passwordgeneratortool.model.Characters;
import com.yourcompany.passwordgeneratortool.model.Password;
import com.yourcompany.passwordgeneratortool.model.MailRequest;
import com.yourcompany.passwordgeneratortool.model.EmailConfig;
import com.yourcompany.passwordgeneratortool.service.PasswordGeneratorService;
import com.yourcompany.passwordgeneratortool.service.PasswordMailService;
import com.yourcompany.passwordgeneratortool.service.EmailConfigService;
import com.yourcompany.passwordgeneratortool.service.PasswordHistoryService;
import com.yourcompany.passwordgeneratortool.service.PasswordTemplateService;
import com.yourcompany.passwordgeneratortool.service.PasswordExpirationService;
import com.yourcompany.passwordgeneratortool.service.ExportService;
import com.yourcompany.passwordgeneratortool.model.PasswordHistory;
import com.yourcompany.passwordgeneratortool.model.PasswordTemplate;
import com.yourcompany.passwordgeneratortool.model.PasswordExpiration;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/")
public class PasswordGeneratorController {

    private final PasswordGeneratorService passwordGeneratorService;
    private final PasswordMailService mailService;
    private final EmailConfigService emailConfigService;
    private final PasswordHistoryService passwordHistoryService;
    private final PasswordTemplateService passwordTemplateService;
    private final PasswordExpirationService passwordExpirationService;
    private final ExportService exportService;

    public PasswordGeneratorController(PasswordGeneratorService passwordGeneratorService, 
                                    PasswordMailService mailService, 
                                    EmailConfigService emailConfigService,
                                    PasswordHistoryService passwordHistoryService,
                                    PasswordTemplateService passwordTemplateService,
                                    PasswordExpirationService passwordExpirationService,
                                    ExportService exportService) {
        this.passwordGeneratorService = passwordGeneratorService;
        this.mailService = mailService;
        this.emailConfigService = emailConfigService;
        this.passwordHistoryService = passwordHistoryService;
        this.passwordTemplateService = passwordTemplateService;
        this.passwordExpirationService = passwordExpirationService;
        this.exportService = exportService;
    }

    @PostMapping
    public String generatePassword(@RequestBody Characters characters, HttpServletRequest request){
        String password = passwordGeneratorService.generatePassword(characters);
        String strength = passwordGeneratorService.strengthVerifier(new Password(password));
        
        // Add to password history
        String sessionId = getOrCreateSessionId(request);
        passwordHistoryService.addPasswordToHistory(sessionId, password, strength);
        
        return password;
    }
    
    @PostMapping("/suggest")
    public String generateVeryStrongPassword(HttpServletRequest request) {
        String password = passwordGeneratorService.generateSuggestPassword();
        String strength = passwordGeneratorService.strengthVerifier(new Password(password));
        
        // Add to password history
        String sessionId = getOrCreateSessionId(request);
        passwordHistoryService.addPasswordToHistory(sessionId, password, strength);
        
        return password;
    }
    
    @PostMapping("/template/{templateName}")
    public String generatePasswordFromTemplate(@PathVariable String templateName, HttpServletRequest request) {
        PasswordTemplate template = passwordTemplateService.getTemplateByName(templateName);
        if (template == null) {
            throw new IllegalArgumentException("Template not found: " + templateName);
        }
        
        String password = passwordGeneratorService.generatePassword(template.getCharacters());
        String strength = passwordGeneratorService.strengthVerifier(new Password(password));
        
        // Add to password history
        String sessionId = getOrCreateSessionId(request);
        passwordHistoryService.addPasswordToHistory(sessionId, password, strength);
        
        return password;
    }

    @PostMapping("/verifier")
    public String strengthVerifier(@RequestBody Password password){
        return passwordGeneratorService.strengthVerifier(password);
    }

    @PostMapping("/mail")
    public ResponseEntity<String> sendToEmail(@RequestBody MailRequest mailRequest, HttpServletRequest request){
        try {
            String sessionId = getOrCreateSessionId(request);
            mailService.sendingMail(mailRequest, sessionId);
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send email: " + e.getMessage());
        }
    }
    
    @PostMapping("/email-config")
    public ResponseEntity<String> saveEmailConfig(@RequestBody EmailConfig emailConfig, HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            emailConfigService.saveEmailConfig(sessionId, emailConfig);
            return ResponseEntity.ok("Email configuration saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to save email configuration: " + e.getMessage());
        }
    }
    
    @GetMapping("/email-config")
    public ResponseEntity<EmailConfig> getEmailConfig(HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            EmailConfig config = emailConfigService.getEmailConfig(sessionId);
            return ResponseEntity.ok(config);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @GetMapping("/email-config/status")
    public ResponseEntity<Boolean> getEmailConfigStatus(HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            boolean hasConfig = emailConfigService.hasValidEmailConfig(sessionId);
            return ResponseEntity.ok(hasConfig);
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }
    
    @GetMapping("/history")
    public ResponseEntity<List<PasswordHistory>> getPasswordHistory(HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            List<PasswordHistory> history = passwordHistoryService.getPasswordHistory(sessionId);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @DeleteMapping("/history")
    public ResponseEntity<String> clearPasswordHistory(HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            passwordHistoryService.clearPasswordHistory(sessionId);
            return ResponseEntity.ok("Password history cleared successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to clear password history: " + e.getMessage());
        }
    }
    
    @GetMapping("/templates")
    public ResponseEntity<List<PasswordTemplate>> getPasswordTemplates() {
        try {
            List<PasswordTemplate> templates = passwordTemplateService.getAllTemplates();
            return ResponseEntity.ok(templates);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @PostMapping("/expiration")
    public ResponseEntity<String> addPasswordExpiration(@RequestBody PasswordExpiration expiration, HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            passwordExpirationService.addPasswordExpiration(
                sessionId, 
                expiration.getPassword(), 
                expiration.getDescription(), 
                90 // Default to 90 days
            );
            return ResponseEntity.ok("Password expiration reminder added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to add password expiration reminder: " + e.getMessage());
        }
    }
    
    @GetMapping("/expiration")
    public ResponseEntity<List<PasswordExpiration>> getPasswordExpirations(HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            List<PasswordExpiration> expirations = passwordExpirationService.getPasswordExpirations(sessionId);
            return ResponseEntity.ok(expirations);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @GetMapping("/expiration/upcoming")
    public ResponseEntity<List<PasswordExpiration>> getUpcomingExpirations(HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            List<PasswordExpiration> upcomingExpirations = passwordExpirationService.getUpcomingExpirations(sessionId);
            return ResponseEntity.ok(upcomingExpirations);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @DeleteMapping("/expiration")
    public ResponseEntity<String> clearPasswordExpirations(HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            passwordExpirationService.clearPasswordExpirations(sessionId);
            return ResponseEntity.ok("Password expiration reminders cleared successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to clear password expiration reminders: " + e.getMessage());
        }
    }
    
    @GetMapping("/export/history/pdf")
    public ResponseEntity<byte[]> exportHistoryToPdf(HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            List<PasswordHistory> history = passwordHistoryService.getPasswordHistory(sessionId);
            byte[] pdfContent = exportService.exportHistoryToPdf(history);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "password-history.pdf");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfContent);
        } catch (Exception e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @GetMapping("/export/history/csv")
    public ResponseEntity<String> exportHistoryToCsv(HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            List<PasswordHistory> history = passwordHistoryService.getPasswordHistory(sessionId);
            String csvContent = exportService.exportHistoryToCsv(history);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("text/csv"));
            headers.setContentDispositionFormData("attachment", "password-history.csv");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(csvContent);
        } catch (Exception e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @GetMapping("/export/expiration/pdf")
    public ResponseEntity<byte[]> exportExpirationsToPdf(HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            List<PasswordExpiration> expirations = passwordExpirationService.getPasswordExpirations(sessionId);
            byte[] pdfContent = exportService.exportExpirationsToPdf(expirations);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "password-expirations.pdf");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfContent);
        } catch (Exception e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @GetMapping("/export/expiration/csv")
    public ResponseEntity<String> exportExpirationsToCsv(HttpServletRequest request) {
        try {
            String sessionId = getOrCreateSessionId(request);
            List<PasswordExpiration> expirations = passwordExpirationService.getPasswordExpirations(sessionId);
            String csvContent = exportService.exportExpirationsToCsv(expirations);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("text/csv"));
            headers.setContentDispositionFormData("attachment", "password-expirations.csv");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(csvContent);
        } catch (Exception e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(500).body(null);
        }
    }
    
    private String getOrCreateSessionId(HttpServletRequest request) {
        String sessionId = (String) request.getSession().getAttribute("sessionId");
        if (sessionId == null) {
            sessionId = UUID.randomUUID().toString();
            request.getSession().setAttribute("sessionId", sessionId);
        }
        return sessionId;
    }
}