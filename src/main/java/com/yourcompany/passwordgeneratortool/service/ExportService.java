package com.yourcompany.passwordgeneratortool.service;

import com.yourcompany.passwordgeneratortool.model.PasswordHistory;
import com.yourcompany.passwordgeneratortool.model.PasswordExpiration;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExportService {
    
    /**
     * Export password history to PDF
     * @param historyList list of password history entries
     * @return byte array of PDF content
     * @throws IOException if there's an error creating the PDF
     */
    public byte[] exportHistoryToPdf(List<PasswordHistory> historyList) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);
            
            PDPageContentStream contentStream = new PDPageContentStream(document, page);
            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);
            contentStream.newLineAtOffset(50, 750);
            contentStream.showText("Password History Report");
            contentStream.endText();
            
            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA, 12);
            contentStream.newLineAtOffset(50, 720);
            
            int yPosition = 700;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            
            // Handle case when there's no data
            if (historyList.isEmpty()) {
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("No password history available");
                yPosition -= 20;
            } else {
                for (PasswordHistory history : historyList) {
                    if (yPosition < 50) {
                        // Create new page if we're near the bottom
                        contentStream.endText();
                        contentStream.close();
                        
                        page = new PDPage();
                        document.addPage(page);
                        contentStream = new PDPageContentStream(document, page);
                        contentStream.beginText();
                        contentStream.setFont(PDType1Font.HELVETICA, 12);
                        contentStream.newLineAtOffset(50, 750);
                        yPosition = 730;
                    }
                    
                    String line = String.format("Password: %s | Strength: %s | Generated: %s", 
                        history.getPassword(), 
                        history.getStrength(), 
                        history.getGeneratedAt().format(formatter));
                    
                    contentStream.newLineAtOffset(0, -20);
                    contentStream.showText(line);
                    yPosition -= 20;
                }
            }
            
            contentStream.endText();
            contentStream.close();
            
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        }
    }
    
    /**
     * Export password history to CSV
     * @param historyList list of password history entries
     * @return CSV content as string
     * @throws IOException if there's an error creating the CSV
     */
    public String exportHistoryToCsv(List<PasswordHistory> historyList) throws IOException {
        StringWriter writer = new StringWriter();
        CSVFormat format = CSVFormat.DEFAULT.builder()
                .setHeader("Password", "Strength", "Generated At")
                .build();
        
        try (CSVPrinter printer = new CSVPrinter(writer, format)) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            
            // Handle case when there's no data
            if (historyList.isEmpty()) {
                printer.printRecord("No password history available", "", "");
            } else {
                for (PasswordHistory history : historyList) {
                    printer.printRecord(
                        history.getPassword(),
                        history.getStrength(),
                        history.getGeneratedAt().format(formatter)
                    );
                }
            }
        }
        
        return writer.toString();
    }
    
    /**
     * Export password expirations to PDF
     * @param expirationList list of password expiration entries
     * @return byte array of PDF content
     * @throws IOException if there's an error creating the PDF
     */
    public byte[] exportExpirationsToPdf(List<PasswordExpiration> expirationList) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);
            
            PDPageContentStream contentStream = new PDPageContentStream(document, page);
            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);
            contentStream.newLineAtOffset(50, 750);
            contentStream.showText("Password Expiration Report");
            contentStream.endText();
            
            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA, 12);
            contentStream.newLineAtOffset(50, 720);
            
            int yPosition = 700;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            
            // Handle case when there's no data
            if (expirationList.isEmpty()) {
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("No password expirations available");
                yPosition -= 20;
            } else {
                for (PasswordExpiration expiration : expirationList) {
                    if (yPosition < 50) {
                        // Create new page if we're near the bottom
                        contentStream.endText();
                        contentStream.close();
                        
                        page = new PDPage();
                        document.addPage(page);
                        contentStream = new PDPageContentStream(document, page);
                        contentStream.beginText();
                        contentStream.setFont(PDType1Font.HELVETICA, 12);
                        contentStream.newLineAtOffset(50, 750);
                        yPosition = 730;
                    }
                    
                    String line = String.format("Password: %s | Description: %s | Generated: %s | Expires: %s", 
                        expiration.getPassword(), 
                        expiration.getDescription(),
                        expiration.getGeneratedAt().format(formatter),
                        expiration.getExpiresAt().format(formatter));
                    
                    contentStream.newLineAtOffset(0, -20);
                    contentStream.showText(line);
                    yPosition -= 20;
                }
            }
            
            contentStream.endText();
            contentStream.close();
            
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        }
    }
    
    /**
     * Export password expirations to CSV
     * @param expirationList list of password expiration entries
     * @return CSV content as string
     * @throws IOException if there's an error creating the CSV
     */
    public String exportExpirationsToCsv(List<PasswordExpiration> expirationList) throws IOException {
        StringWriter writer = new StringWriter();
        CSVFormat format = CSVFormat.DEFAULT.builder()
                .setHeader("Password", "Description", "Generated At", "Expires At")
                .build();
        
        try (CSVPrinter printer = new CSVPrinter(writer, format)) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            
            // Handle case when there's no data
            if (expirationList.isEmpty()) {
                printer.printRecord("No password expirations available", "", "", "");
            } else {
                for (PasswordExpiration expiration : expirationList) {
                    printer.printRecord(
                        expiration.getPassword(),
                        expiration.getDescription(),
                        expiration.getGeneratedAt().format(formatter),
                        expiration.getExpiresAt().format(formatter)
                    );
                }
            }
        }
        
        return writer.toString();
    }
}