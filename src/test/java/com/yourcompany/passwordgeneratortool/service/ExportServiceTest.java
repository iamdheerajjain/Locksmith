package com.yourcompany.passwordgeneratortool.service;

import com.yourcompany.passwordgeneratortool.model.PasswordHistory;
import com.yourcompany.passwordgeneratortool.model.PasswordExpiration;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ExportServiceTest {

    private final ExportService exportService = new ExportService();

    @Test
    void testExportHistoryToPdf() throws Exception {
        // Create test data
        List<PasswordHistory> historyList = new ArrayList<>();
        historyList.add(new PasswordHistory("Password123!", LocalDateTime.now(), "Strong"));
        historyList.add(new PasswordHistory("AnotherPass456@", LocalDateTime.now().minusDays(1), "Very Strong"));

        // Test PDF export
        byte[] pdfContent = exportService.exportHistoryToPdf(historyList);
        assertNotNull(pdfContent);
        assertTrue(pdfContent.length > 0);
    }

    @Test
    void testExportHistoryToCsv() throws Exception {
        // Create test data
        List<PasswordHistory> historyList = new ArrayList<>();
        historyList.add(new PasswordHistory("Password123!", LocalDateTime.now(), "Strong"));
        historyList.add(new PasswordHistory("AnotherPass456@", LocalDateTime.now().minusDays(1), "Very Strong"));

        // Test CSV export
        String csvContent = exportService.exportHistoryToCsv(historyList);
        assertNotNull(csvContent);
        assertFalse(csvContent.isEmpty());
        assertTrue(csvContent.contains("Password,Strength,Generated At"));
    }

    @Test
    void testExportExpirationsToPdf() throws Exception {
        // Create test data
        List<PasswordExpiration> expirationList = new ArrayList<>();
        expirationList.add(new PasswordExpiration("Password123!", LocalDateTime.now(), LocalDateTime.now().plusDays(90), "Email account"));
        expirationList.add(new PasswordExpiration("AnotherPass456@", LocalDateTime.now().minusDays(1), LocalDateTime.now().plusDays(60), "Bank account"));

        // Test PDF export
        byte[] pdfContent = exportService.exportExpirationsToPdf(expirationList);
        assertNotNull(pdfContent);
        assertTrue(pdfContent.length > 0);
    }

    @Test
    void testExportExpirationsToCsv() throws Exception {
        // Create test data
        List<PasswordExpiration> expirationList = new ArrayList<>();
        expirationList.add(new PasswordExpiration("Password123!", LocalDateTime.now(), LocalDateTime.now().plusDays(90), "Email account"));
        expirationList.add(new PasswordExpiration("AnotherPass456@", LocalDateTime.now().minusDays(1), LocalDateTime.now().plusDays(60), "Bank account"));

        // Test CSV export
        String csvContent = exportService.exportExpirationsToCsv(expirationList);
        assertNotNull(csvContent);
        assertFalse(csvContent.isEmpty());
        assertTrue(csvContent.contains("Password,Description,Generated At,Expires At"));
    }

    @Test
    void testExportEmptyLists() throws Exception {
        // Test with empty lists
        List<PasswordHistory> emptyHistoryList = new ArrayList<>();
        List<PasswordExpiration> emptyExpirationList = new ArrayList<>();

        // Test PDF exports with empty lists
        byte[] pdfHistoryContent = exportService.exportHistoryToPdf(emptyHistoryList);
        assertNotNull(pdfHistoryContent);
        assertTrue(pdfHistoryContent.length > 0); // Should still generate a PDF with just headers

        byte[] pdfExpirationContent = exportService.exportExpirationsToPdf(emptyExpirationList);
        assertNotNull(pdfExpirationContent);
        assertTrue(pdfExpirationContent.length > 0); // Should still generate a PDF with just headers

        // Test CSV exports with empty lists
        String csvHistoryContent = exportService.exportHistoryToCsv(emptyHistoryList);
        assertNotNull(csvHistoryContent);
        assertFalse(csvHistoryContent.isEmpty());
        assertTrue(csvHistoryContent.contains("Password,Strength,Generated At"));

        String csvExpirationContent = exportService.exportExpirationsToCsv(emptyExpirationList);
        assertNotNull(csvExpirationContent);
        assertFalse(csvExpirationContent.isEmpty());
        assertTrue(csvExpirationContent.contains("Password,Description,Generated At,Expires At"));
    }
}