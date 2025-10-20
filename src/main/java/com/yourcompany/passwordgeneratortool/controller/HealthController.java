package com.yourcompany.passwordgeneratortool.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("application", "Locksmith Password Generator");
        return response;
    }

    @GetMapping("/actuator/health")
    public Map<String, Object> actuatorHealth() {
        Map<String, Object> response = new HashMap<>();
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        response.put("status", "UP");
        response.put("components", status);
        return response;
    }
}