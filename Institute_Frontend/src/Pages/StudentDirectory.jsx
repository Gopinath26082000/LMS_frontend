"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Modal,
  Box as MuiBox,
} from "@mui/material"
import AdminNavbar from "./AdminNavbar"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import axios from "axios"
import emailjs from "@emailjs/browser"


function StudentDirectory() {
  const [students, setStudents] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [endDate, setEndDate] = useState("")

  // Fetch data from the API
  useEffect(() => {
    fetch("http://localhost:6900/api/student/details")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data)
      })
      .catch((error) => {
        console.error("Error fetching student data:", error)
      })
  }, [])

  const sendEmailNotification = (student) => {
    const emailParams = {
      to_email: student.email, // Send email to the student's email
      student_name: student.name,
      registration_number: student.registrationNumber,
    }
  
    emailjs
      .send(
        "service_8ypsy1b", // Replace with your EmailJS Service ID
        "template_mp9d71h", // Replace with your EmailJS Template ID
        emailParams,
        "tTJDT70MATe3AXUh9" // Replace with your EmailJS Public Key
      )
      .then((response) => {
        console.log("Email sent successfully:", response)
      })
      .catch((error) => {
        console.error("Error sending email:", error)
      })
  }
  

  // Filter students based on the search query
  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Handle Modal Open and Close
  const handleOpenModal = (student) => {
    setSelectedStudent(student)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedStudent(null)
    setEndDate("")
  }

  // Generate Certificate using jsPDF
  const generateCertificate = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    })

    // Certificate dimensions
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 10

    // Add fancy border with gold color
    doc.setDrawColor(218, 165, 32) // Gold color
    doc.setLineWidth(1.5)

    // Outer border
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin)

    // Inner decorative border
    doc.setLineWidth(0.5)
    doc.rect(margin + 5, margin + 5, pageWidth - 2 * (margin + 5), pageHeight - 2 * (margin + 5))

    // Add corner decorations
    const cornerSize = 15

    // Top left corner
    doc.setLineWidth(0.7)
    doc.line(margin, margin + cornerSize, margin + cornerSize, margin)

    // Top right corner
    doc.line(pageWidth - margin - cornerSize, margin, pageWidth - margin, margin + cornerSize)

    // Bottom left corner
    doc.line(margin, pageHeight - margin - cornerSize, margin + cornerSize, pageHeight - margin)

    // Bottom right corner
    doc.line(pageWidth - margin - cornerSize, pageHeight - margin, pageWidth - margin, pageHeight - margin - cornerSize)

    // Add background pattern
    doc.setFillColor(250, 250, 250)
    doc.rect(margin + 5, margin + 5, pageWidth - 2 * (margin + 5), pageHeight - 2 * (margin + 5), "F")

    // Add watermark/background design
    doc.setGState(new doc.GState({ opacity: 0.1 }))
    doc.setFillColor(218, 165, 32)

    // Draw a large circle as watermark
    const centerX = pageWidth / 2
    const centerY = pageHeight / 2
    const radius = 50

    for (let i = 0; i < 360; i += 30) {
      const x = centerX + radius * Math.cos((i * Math.PI) / 180)
      const y = centerY + radius * Math.sin((i * Math.PI) / 180)
      doc.circle(x, y, 5, "F")
    }

    doc.setGState(new doc.GState({ opacity: 1.0 }))

    // Add header with institute name
    doc.setFont("helvetica", "bold")
    doc.setFontSize(28)
    doc.setTextColor(0, 51, 102) // Dark blue
    doc.text("ABC INSTITUTE OF TECHNOLOGY", pageWidth / 2, margin + 20, { align: "center" })

    // Add institute address
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100) // Dark gray
    doc.text("123 Education Avenue, Knowledge City, Country - 123456", pageWidth / 2, margin + 30, { align: "center" })
    doc.text("ISO 9001:2015 Certified | Established 1995", pageWidth / 2, margin + 38, { align: "center" })

    // Add horizontal decorative line
    doc.setDrawColor(218, 165, 32) // Gold
    doc.setLineWidth(1)
    doc.line(margin + 40, margin + 45, pageWidth - margin - 40, margin + 45)

    // Certificate title
    doc.setFont("times", "bold")
    doc.setFontSize(32)
    doc.setTextColor(128, 0, 0) // Maroon
    doc.text("Certificate of Completion", pageWidth / 2, margin + 65, { align: "center" })

    // Certificate number
    doc.setFont("courier", "italic")
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(
      `Certificate No: ${selectedStudent.registrationNumber}-${new Date().getFullYear()}`,
      pageWidth - margin - 10,
      margin + 15,
      { align: "right" },
    )

    // Certificate body text
    doc.setFont("times", "normal")
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text("This is to certify that", pageWidth / 2, margin + 85, { align: "center" })

    // Student name
    doc.setFont("times", "bold")
    doc.setFontSize(24)
    doc.setTextColor(0, 51, 102) // Dark blue
    doc.text(selectedStudent.name, pageWidth / 2, margin + 100, { align: "center" })

    // Underline the name
    const nameWidth = doc.getTextWidth(selectedStudent.name)
    doc.setDrawColor(0, 51, 102)
    doc.setLineWidth(0.5)
    doc.line(pageWidth / 2 - nameWidth / 2, margin + 102, pageWidth / 2 + nameWidth / 2, margin + 102)

    // Course details
    doc.setFont("times", "normal")
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text(`has successfully completed the course in`, pageWidth / 2, margin + 115, { align: "center" })

    // Course name
    doc.setFont("times", "bold")
    doc.setFontSize(20)
    doc.setTextColor(0, 51, 102)
    doc.text(selectedStudent.course, pageWidth / 2, margin + 130, { align: "center" })

    // Duration
    doc.setFont("times", "normal")
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text(`from ${selectedStudent.joiningDate} to ${endDate}`, pageWidth / 2, margin + 145, { align: "center" })

    // Additional text
    doc.setFontSize(12)
    doc.text(
      "with distinction and has demonstrated excellent proficiency in all required skills and knowledge.",
      pageWidth / 2,
      margin + 160,
      { align: "center" },
    )

    // Date of issue
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    doc.setFontSize(12)
    doc.text(`Issued on: ${today}`, margin + 40, pageHeight - margin - 35)

    // Signature placeholders
    doc.setFont("times", "bold")
    doc.setFontSize(12)

    // Director signature
    doc.setDrawColor(0, 0, 0)
    doc.setLineWidth(0.5)
    doc.line(margin + 30, pageHeight - margin - 25, margin + 90, pageHeight - margin - 25)
    doc.text("Director", margin + 60, pageHeight - margin - 20, { align: "center" })

    // Add a sample signature for Director (cursive style)
    doc.setFont("times", "italic")
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 150) // Dark blue for signature
    doc.text("Dr. J. Smith", margin + 60, pageHeight - margin - 30, { align: "center" })

    // Course coordinator signature
    doc.setFont("times", "bold")
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.line(pageWidth - margin - 100, pageHeight - margin - 25, pageWidth - margin - 20, pageHeight - margin - 25)
    doc.text("Course Coordinator", pageWidth - margin - 60, pageHeight - margin - 20, { align: "center" })

    // Add a sample signature for Course Coordinator (cursive style)
    doc.setFont("times", "italic")
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 150) // Dark blue for signature
    doc.text("Prof. A. Johnson", pageWidth - margin - 60, pageHeight - margin - 30, { align: "center" })

    // Add institute seal/logo
    doc.setDrawColor(0, 51, 102)
    doc.setLineWidth(0.5)
    doc.circle(pageWidth / 2, pageHeight - margin - 30, 15, "S")

    // Inner circle for seal
    doc.circle(pageWidth / 2, pageHeight - margin - 30, 10, "S")

    // Add text inside seal
    doc.setFontSize(6)
    doc.setTextColor(0, 51, 102)
    doc.text("OFFICIAL", pageWidth / 2, pageHeight - margin - 32, { align: "center" })
    doc.text("SEAL", pageWidth / 2, pageHeight - margin - 28, { align: "center" })

    // Add star pattern around seal
    const sealCenterX = pageWidth / 2
    const sealCenterY = pageHeight - margin - 30
    const sealRadius = 12

    doc.setLineWidth(0.2)
    for (let i = 0; i < 360; i += 45) {
      const radian = (i * Math.PI) / 180
      const x1 = sealCenterX + (sealRadius - 2) * Math.cos(radian)
      const y1 = sealCenterY + (sealRadius - 2) * Math.sin(radian)
      const x2 = sealCenterX + sealRadius * Math.cos(radian)
      const y2 = sealCenterY + sealRadius * Math.sin(radian)
      doc.line(x1, y1, x2, y2)
    }

    // Save the generated PDF in a Blob to send it to the server
    const pdfBlob = doc.output("blob")

    // Prepare the FormData to send the PDF to the backend
    const formData = new FormData()
    formData.append("registrationNumber", selectedStudent.registrationNumber)
    formData.append("studentName", selectedStudent.name)
    formData.append("course", selectedStudent.course)
    formData.append("endDate", endDate)
    formData.append("pdf", pdfBlob, `${selectedStudent.registrationNumber}_certificate.pdf`)

    // Send the PDF file to the backend
    axios
      .post("http://localhost:6900/api/certificates/generate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Certificate generated successfully:", response.data)
         // Send email after successful certificate generation
    sendEmailNotification(selectedStudent)
        handleCloseModal() // Close the modal after the certificate is generated
      })
      .catch((error) => {
        alert("Already certificate is generated for this student");
        console.error("Error generating certificate:", error)
      })
  }

  return (
    <div>
      <AdminNavbar />
      <Box sx={{ padding: 3, backgroundColor: "#f5f5f5" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", color: "#1976D2", fontSize: "22px" }}
        >
          STUDENT DIRECTORY
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search by Name or Registration Number"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 3, borderRadius: 3, fontSize: "14px" }}
        />

        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="student directory">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#1976d2",
                  "& th": {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "14px",
                  },
                }}
              >
                <TableCell>Registration Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joining Date</TableCell>
                <TableCell>Action</TableCell> {/* Action Column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow
                  key={student.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      transition: "background-color 0.3s ease",
                    },
                  }}
                >
                  <TableCell>{student.registrationNumber}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.contactNumber}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.status}</TableCell>
                  <TableCell>{student.joiningDate}</TableCell>
                  <TableCell>
                    {/* Generate Button */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(student)}
                      sx={{ fontSize: "12px" }}
                    >
                      Generate Certificate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal for End Date */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <MuiBox
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: "300px",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontSize: "14px" }}>
            Enter End Date
          </Typography>
          <TextField
            label="End Date"
            type="date"
            fullWidth
            variant="outlined"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ marginBottom: 2, fontSize: "14px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleCloseModal} sx={{ fontSize: "12px" }}>
              Cancel
            </Button>
            <Button onClick={generateCertificate} variant="contained" color="primary" sx={{ fontSize: "12px" }}>
              Generate
            </Button>
          </Box>
        </MuiBox>
      </Modal>
    </div>
  )
}

export default StudentDirectory

