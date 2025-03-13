package com.example.demo.Controlers;

import com.example.demo.Certificate;
import com.example.demo.Repos.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/certificates")
public class CertificateController {

    // Absolute path for the uploads directory (Make sure it points to the correct location on your system)
    private static final String UPLOADS_DIR = "C:/Users/sathi/Documents/workspace-spring-tool-suite-4-4.27.0.RELEASE/crud/uploads/";  // Adjust this path to your local system

    @Autowired
    private CertificateRepository certificateRepository;

    @PostMapping("/generate")
    public ResponseEntity<String> generateCertificate(@RequestParam String registrationNumber,
                                                      @RequestParam String studentName,
                                                      @RequestParam String course,
                                                      @RequestParam String endDate,
                                                      @RequestParam("pdf") MultipartFile pdfFile) {
        // Check if the registration number already exists
        if (certificateRepository.findByRegistrationNumber(registrationNumber) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Certificate with this registration number already exists.");
        }

        try {
            // Generate PDF file name based on registration number
            String pdfFileName = registrationNumber + "_certificate.pdf";

            // Define the absolute path for storing the PDF
            Path pdfPath = Paths.get(UPLOADS_DIR + pdfFileName);

            // Ensure the uploads directory exists
            File uploadsDirectory = new File(UPLOADS_DIR);
            if (!uploadsDirectory.exists()) {
                uploadsDirectory.mkdirs();  // Create the directory if it doesn't exist
            }

            // Save the uploaded PDF file to the absolute path
            pdfFile.transferTo(pdfPath.toFile());

            // Save certificate details in the database
            Certificate certificate = new Certificate();
            certificate.setRegistrationNumber(registrationNumber);
            certificate.setCourse(course);
            certificate.setEndDate(endDate);
            certificate.setPdfFileName(pdfFileName);

            certificateRepository.save(certificate);

            return ResponseEntity.ok("Certificate generated and stored successfully: " + pdfFileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving the PDF: " + e.getMessage());
        }
    }
    
    @GetMapping("/download/{registrationNumber}")
    public ResponseEntity<?> downloadCertificate(@PathVariable String registrationNumber) {
        // Find certificate by registration number
        Certificate certificate = certificateRepository.findByRegistrationNumber(registrationNumber);
        
        if (certificate == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Certificate not found for registration number: " + registrationNumber);
        }

        // Get the file path
        Path pdfPath = Paths.get(UPLOADS_DIR + certificate.getPdfFileName());
        File pdfFile = pdfPath.toFile();

        // Check if the file exists
        if (!pdfFile.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("PDF file not found for registration number: " + registrationNumber);
        }

        try {
            // Read file bytes
            byte[] fileBytes = java.nio.file.Files.readAllBytes(pdfPath);

            // Return response with file content
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=" + certificate.getPdfFileName())
                    .body(fileBytes);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while reading the file: " + e.getMessage());
        }
    }
    
    @GetMapping("/details/{registrationNumber}")
    public ResponseEntity<?> getCertificateDetails(@PathVariable String registrationNumber) {
        // Find certificate by registration number
        Certificate certificate = certificateRepository.findByRegistrationNumber(registrationNumber);

        if (certificate == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Certificate not found for registration number: " + registrationNumber);
        }

        // Return certificate details as a JSON response
        return ResponseEntity.ok(certificate);
    }


}
