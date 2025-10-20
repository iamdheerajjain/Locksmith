package com.yourcompany.passwordgeneratortool.service;

import com.yourcompany.passwordgeneratortool.model.MailRequest;
import com.yourcompany.passwordgeneratortool.model.EmailConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class PasswordMailService {

    private static final Logger logger = LoggerFactory.getLogger(PasswordMailService.class);

    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private EmailConfigService emailConfigService;

    public void sendingMail(MailRequest mailRequest, String sessionId) {
        try {
            EmailConfig emailConfig = emailConfigService.getEmailConfig(sessionId);
            
            if (!emailConfigService.hasValidEmailConfig(sessionId)) {
                throw new RuntimeException("Email configuration not found. Please configure your email settings first.");
            }
            
            // Create a dynamic mail sender with user's configuration
            JavaMailSender dynamicMailSender = createDynamicMailSender(emailConfig);
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(mailRequest.getEmail());
            message.setSubject("Your Generated Password - Password Generator Tool");
            message.setText(getEmailMessage(mailRequest));
            message.setFrom(emailConfig.getFromEmail());

            dynamicMailSender.send(message);
            logger.info("Email sent successfully to: {} using user's email configuration", mailRequest.getEmail());
        } catch (Exception e) {
            logger.error("Failed to send email to: {}. Error: {}", mailRequest.getEmail(), e.getMessage());
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        }
    }
    
    private JavaMailSender createDynamicMailSender(EmailConfig config) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(config.getSmtpHost());
        mailSender.setPort(config.getSmtpPort());
        mailSender.setUsername(config.getUsername());
        mailSender.setPassword(config.getPassword());

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", String.valueOf(config.isUseTls()));
        props.put("mail.smtp.starttls.required", String.valueOf(config.isUseTls()));
        props.put("mail.smtp.ssl.trust", config.getSmtpHost());
        props.put("mail.debug", "false");

        return mailSender;
    }

    private String getEmailMessage(MailRequest mailRequest) {
        return "Dear " + mailRequest.getName() + ",\n\n"
                + "Your new password has been generated successfully. Please find your password below:\n\n"
                + "Password: " + mailRequest.getPassword() + "\n\n"
                + "Security Tips:\n"
                + "- Keep this password secure and don't share it with anyone\n"
                + "- Consider changing it regularly\n"
                + "- Use a password manager to store it safely\n\n"
                + "If you have any questions or need further assistance, please feel free to contact us.\n\n"
                + "Best regards,\n"
                + "Password Generator Team";
    }
}
