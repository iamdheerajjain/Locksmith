package com.yourcompany.passwordgeneratortool.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailConfig {
    private String smtpHost;
    private int smtpPort;
    private String username;
    private String password;
    private boolean useTls;
    private String fromEmail;
    private String fromName;
}
