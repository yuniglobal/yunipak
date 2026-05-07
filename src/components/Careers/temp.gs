// Google Apps Script for Job & Internship Applications
// Deploy as Web App (Execute as: Me, Access: Anyone)

// Sheet names
const APPLICATIONS_SHEET = "JobApplications";

// Main function to handle POST requests
function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    const data = e.parameter;
    
    // Get last row for serial number
    const lastRow = sheet.getLastRow();
    const serialNo = lastRow === 0 ? 1 : lastRow;
    
    // Prepare row data
    const rowData = [
      serialNo,                                    // Sr. No
      new Date(),                                  // Application Date
      data.timestamp || new Date().toISOString(),  // Timestamp
      data.status || "pending",                    // Status
      data.positionTitle || "",                    // Position Applied
      data.positionId || "",                       // Position ID
      data.fullName || "",                         // Full Name
      data.fatherName || "",                       // Father's Name
      data.cnic || "",                             // CNIC
      data.dateOfBirth || "",                      // Date of Birth
      data.gender || "",                           // Gender
      data.email || "",                            // Email
      data.phoneNumber || "",                      // Phone Number
      data.alternatePhone || "",                   // Alternate Phone
      data.city || "",                             // City
      data.province || "",                         // Province
      data.currentAddress || "",                   // Current Address
      data.permanentAddress || "",                 // Permanent Address
      data.experience || "",                       // Years of Experience
      data.isCurrentlyEmployed || "",              // Currently Employed
      data.currentSalary || "",                    // Current Salary
      data.expectedSalary || "",                  // Expected Salary
      data.noticePeriod || "",                     // Notice Period
      data.highestDegree || "",                    // Highest Degree
      data.university || "",                       // University
      data.yearOfCompletion || "",                 // Year of Completion
      data.cgpa || "",                             // CGPA/Percentage
      data.technicalSkills || "",                  // Technical Skills
      data.certifications || "",                   // Certifications
      data.languagesSpoken || "",                  // Languages Spoken
      data.linkedinProfile || "",                  // LinkedIn Profile
      data.portfolioUrl || "",                     // Portfolio/GitHub
      data.referenceName || "",                    // Reference Name
      data.referenceContact || "",                 // Reference Contact
      data.referenceRelation || "",                // Reference Relation
      data.hearAboutUs || "",                      // How did they hear
      data.additionalInfo || "",                   // Additional Information
      "Pending Review",                            // Admin Notes
      new Date().toLocaleString()                  // Submission Date
    ];
    
    sheet.appendRow(rowData);
    
    // Send confirmation email (don't wait for it)
    try {
      sendConfirmationEmail(data);
    } catch(emailError) {
      console.log("Email error: " + emailError);
    }
    
    // Return success response with CORS headers
    return createJSONResponse({
      success: true, 
      message: "Application submitted successfully",
      serialNo: serialNo
    });
    
  } catch (error) {
    return createJSONResponse({
      success: false, 
      error: error.toString()
    });
  }
}

// Helper function to create JSON response with CORS headers
function createJSONResponse(data) {
  const response = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  
  // Add CORS headers using setHeaders method
  if (response.setHeaders) {
    response.setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
  }
  
  return response;
}

// Handle OPTIONS requests for CORS preflight
function doOptions() {
  const response = ContentService.createTextOutput("");
  if (response.setHeaders) {
    response.setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    });
  }
  response.setMimeType(ContentService.MimeType.TEXT);
  return response;
}

// Function to handle GET requests (for testing)
function doGet() {
  return createJSONResponse({
    status: "active",
    message: "Career Application API is running",
    timestamp: new Date().toISOString(),
    endpoints: {
      post: "Submit job application",
      get: "Check API status"
    }
  });
}

// Function to send confirmation email
function sendConfirmationEmail(data) {
  // Check if email exists
  if (!data.email) {
    console.log("No email provided, skipping confirmation");
    return;
  }
  
  const subject = `Application Received - ${data.positionTitle || "Position"} | YUNI Education`;
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
      <div style="background: #000; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #0ae448; margin: 0;">YUNI Education</h1>
      </div>
      <div style="background: #fff; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #000;">Application Received ✅</h2>
        <p>Dear <strong>${escapeHtml(data.fullName) || "Applicant"}</strong>,</p>
        <p>Thank you for applying for the position of <strong>${escapeHtml(data.positionTitle) || "the position"}</strong> at YUNI Education.</p>
        
        <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0ae448;">Application Details:</h3>
          <p><strong>Position:</strong> ${escapeHtml(data.positionTitle) || "N/A"}</p>
          <p><strong>Experience:</strong> ${escapeHtml(data.experience) || "N/A"}</p>
          <p><strong>Expected Salary:</strong> ${escapeHtml(data.expectedSalary) || "N/A"}</p>
          <p><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Our HR team will review your application within 5-7 business days</li>
          <li>Shortlisted candidates will be contacted for an interview</li>
          <li>You will receive updates via email about your application status</li>
        </ol>
        
        <p>You can check your application status anytime by emailing us at <a href="mailto:careers@yunipakistan.com">careers@yunipakistan.com</a></p>
        
        <hr style="margin: 20px 0;">
        
        <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2e7d32;">About YUNI Education:</h3>
          <p><strong>📍 Location:</strong> NASTP, Pakistan</p>
          <p><strong>🌐 Website:</strong> www.yunipakistan.com</p>
          <p><strong>📧 Email:</strong> careers@yunipakistan.com</p>
        </div>
        
        <hr style="margin: 20px 0;">
        
        <p style="font-size: 12px; color: #666;">Need help? Contact us at +92 300 1234567 or reply to this email.</p>
      </div>
    </div>
  `;
  
  const textBody = `Application Received - ${data.positionTitle || "Position"}\n\n` +
    `Dear ${data.fullName || "Applicant"},\n\n` +
    `Thank you for applying for ${data.positionTitle || "the position"} at YUNI Education.\n\n` +
    `Application Details:\n` +
    `Position: ${data.positionTitle || "N/A"}\n` +
    `Experience: ${data.experience || "N/A"}\n` +
    `Expected Salary: ${data.expectedSalary || "N/A"}\n\n` +
    `Next Steps:\n` +
    `1. Our HR team will review your application within 5-7 business days\n` +
    `2. Shortlisted candidates will be contacted for an interview\n` +
    `3. You will receive updates via email about your application status\n\n` +
    `Need help? Contact us at careers@yunipakistan.com`;
  
  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody,
      body: textBody,
      name: "YUNI Education - Careers"
    });
  } catch (error) {
    console.log("Email sending failed: " + error);
  }
}

// Helper function to escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Function to create or get the sheet
function getOrCreateSheet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(APPLICATIONS_SHEET);
    
    if (!sheet) {
      sheet = ss.insertSheet(APPLICATIONS_SHEET);
      
      // Add headers
      const headers = [
        "Sr. No", "Application Date", "Timestamp", "Status", "Position Applied", "Position ID",
        "Full Name", "Father's Name", "CNIC", "Date of Birth", "Gender", "Email",
        "Phone Number", "Alternate Phone", "City", "Province", "Current Address", 
        "Permanent Address", "Years of Experience", "Currently Employed", "Current Salary",
        "Expected Salary", "Notice Period", "Highest Degree", "University",
        "Year of Completion", "CGPA/Percentage", "Technical Skills", "Certifications",
        "Languages Spoken", "LinkedIn Profile", "Portfolio/GitHub", "Reference Name",
        "Reference Contact", "Reference Relation", "How did you hear?", "Additional Info",
        "Admin Notes", "Submission Date"
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange("1:1").setFontWeight("bold").setBackground("#0ae448").setFontColor("#000000");
      sheet.setFrozenRows(1);
      
      // Add data validation for Status column
      const statusRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(["pending", "reviewing", "shortlisted", "rejected", "hired"], true)
        .build();
      sheet.getRange("D2:D").setDataValidation(statusRule);
      
      // Add data validation for Experience column
      const experienceRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(["Fresher", "1-2 years", "3-5 years", "6-8 years", "9+ years"], true)
        .build();
      sheet.getRange("S2:S").setDataValidation(experienceRule);
      
      // Format the date columns
      sheet.getRange("B:B").setNumberFormat("yyyy-mm-dd hh:mm:ss");
      
      // Auto-resize columns
      for (let i = 1; i <= headers.length; i++) {
        sheet.autoResizeColumn(i);
      }
    }
    
    return sheet;
  } catch (error) {
    console.log("Error creating sheet: " + error);
    throw error;
  }
}

// Function to update application status (for admin use)
function updateStatus(serialNo, newStatus, adminNotes = "") {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(APPLICATIONS_SHEET);
  if (!sheet) return false;
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const serialCol = headers.indexOf("Sr. No") + 1;
  const statusCol = headers.indexOf("Status") + 1;
  const notesCol = headers.indexOf("Admin Notes") + 1;
  const emailCol = headers.indexOf("Email") + 1;
  const nameCol = headers.indexOf("Full Name") + 1;
  const positionCol = headers.indexOf("Position Applied") + 1;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][serialCol - 1] == serialNo) {
      sheet.getRange(i + 1, statusCol).setValue(newStatus);
      if (adminNotes) {
        sheet.getRange(i + 1, notesCol).setValue(adminNotes);
      }
      
      // Send status update email
      const email = data[i][emailCol - 1];
      const name = data[i][nameCol - 1];
      const position = data[i][positionCol - 1];
      
      if (email) {
        sendStatusUpdateEmail(email, name, position, newStatus, adminNotes);
      }
      return true;
    }
  }
  return false;
}

// Function to send status update email
function sendStatusUpdateEmail(email, name, position, status, notes) {
  let subject = "";
  let statusColor = "";
  let statusMessage = "";
  let actionItems = "";
  
  switch(status) {
    case "reviewing":
      subject = "Application Under Review - YUNI Education";
      statusColor = "#f59e0b";
      statusMessage = "Your application is currently under review by our hiring team.";
      actionItems = "We will contact you soon if your profile matches our requirements.";
      break;
    case "shortlisted":
      subject = "Congratulations! You've Been Shortlisted 🎉";
      statusColor = "#0ae448";
      statusMessage = "Great news! Your application has been shortlisted for the next stage.";
      actionItems = "Our HR team will contact you within 2-3 business days to schedule an interview.";
      break;
    case "rejected":
      subject = "Application Update - YUNI Education";
      statusColor = "#ff4444";
      statusMessage = "Thank you for your interest, but we have decided to move forward with other candidates.";
      actionItems = "We encourage you to apply for future positions that match your skills. Keep an eye on our careers page!";
      break;
    case "hired":
      subject = "Welcome to YUNI Education! 🎊";
      statusColor = "#0ae448";
      statusMessage = "Congratulations! We are pleased to offer you the position.";
      actionItems = "You will receive an official offer letter and onboarding details within 24 hours.";
      break;
    default:
      return;
  }
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
      <div style="background: #000; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #0ae448; margin: 0;">YUNI Education</h1>
      </div>
      <div style="background: #fff; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: ${statusColor};">Application Status Update</h2>
        <p>Dear <strong>${escapeHtml(name) || "Applicant"}</strong>,</p>
        <p>${statusMessage}</p>
        
        <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0ae448;">Application Details:</h3>
          <p><strong>Position:</strong> ${escapeHtml(position) || "N/A"}</p>
          <p><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${status.toUpperCase()}</span></p>
          ${notes ? `<p><strong>Note from HR:</strong> ${escapeHtml(notes)}</p>` : ""}
        </div>
        
        <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2e7d32;">Next Steps:</h3>
          <p>${actionItems}</p>
        </div>
        
        <hr style="margin: 20px 0;">
        
        <p style="font-size: 12px; color: #666;">Questions? Contact us at <a href="mailto:careers@yunipakistan.com">careers@yunipakistan.com</a></p>
      </div>
    </div>
  `;
  
  const textBody = `Application Status Update - ${position}\n\n` +
    `Dear ${name || "Applicant"},\n\n` +
    `${statusMessage}\n\n` +
    `Position: ${position || "N/A"}\n` +
    `Status: ${status.toUpperCase()}\n` +
    (notes ? `HR Note: ${notes}\n\n` : "\n") +
    `Next Steps: ${actionItems}\n\n` +
    `Questions? Contact us at careers@yunipakistan.com`;
  
  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody,
      body: textBody,
      name: "YUNI Education - HR Team"
    });
  } catch (error) {
    console.log("Status email failed: " + error);
  }
}

// Function to create a menu in Google Sheets
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📊 Application Manager')
    .addItem('📝 View Pending Applications', 'showPendingApplications')
    .addItem('📈 Generate Report', 'generateReport')
    .addSeparator()
    .addItem('📊 Filter by Position', 'showPositionFilter')
    .addSeparator()
    .addItem('ℹ️ Help', 'showHelp')
    .addToUi();
}

// Helper functions for the menu
function showPendingApplications() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(APPLICATIONS_SHEET);
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Sheet not found. Please submit at least one application first.");
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  const pending = data.filter((row, index) => index > 0 && row[3] === "pending");
  const reviewing = data.filter((row, index) => index > 0 && row[3] === "reviewing");
  
  const ui = SpreadsheetApp.getUi();
  ui.alert(`Application Status Summary`, 
    `📊 TOTAL APPLICATIONS: ${data.length - 1}\n\n` +
    `🟡 Pending Review: ${pending.length}\n` +
    `🔵 Under Review: ${reviewing.length}\n` +
    `🟢 Shortlisted: ${data.filter((row, i) => i > 0 && row[3] === "shortlisted").length}\n` +
    `🔴 Rejected: ${data.filter((row, i) => i > 0 && row[3] === "rejected").length}\n` +
    `⭐ Hired: ${data.filter((row, i) => i > 0 && row[3] === "hired").length}`, 
    ui.ButtonSet.OK);
}

function generateReport() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(APPLICATIONS_SHEET);
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Sheet not found. No data to report.");
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    SpreadsheetApp.getUi().alert("No applications found yet.");
    return;
  }
  
  // Calculate statistics
  const stats = {
    total: data.length - 1,
    pending: 0,
    reviewing: 0,
    shortlisted: 0,
    rejected: 0,
    hired: 0
  };
  
  const positions = {};
  const experience = {
    "Fresher": 0,
    "1-2 years": 0,
    "3-5 years": 0,
    "6-8 years": 0,
    "9+ years": 0
  };
  
  for (let i = 1; i < data.length; i++) {
    const status = data[i][3];
    const position = data[i][4];
    const exp = data[i][18];
    
    if (status === "pending") stats.pending++;
    else if (status === "reviewing") stats.reviewing++;
    else if (status === "shortlisted") stats.shortlisted++;
    else if (status === "rejected") stats.rejected++;
    else if (status === "hired") stats.hired++;
    
    if (position) {
      positions[position] = (positions[position] || 0) + 1;
    }
    
    if (exp && experience[exp] !== undefined) {
      experience[exp]++;
    }
  }
  
  // Create report sheet
  let reportSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ApplicationReport");
  if (reportSheet) {
    SpreadsheetApp.getActiveSpreadsheet().deleteSheet(reportSheet);
  }
  reportSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("ApplicationReport");
  
  // Add report data
  reportSheet.getRange("A1").setValue("APPLICATION REPORT").setFontWeight("bold").setFontSize(14);
  reportSheet.getRange("A3").setValue(`Generated on: ${new Date().toLocaleString()}`);
  
  // Summary statistics
  reportSheet.getRange("A5").setValue("SUMMARY STATISTICS").setFontWeight("bold").setBackground("#0ae448");
  reportSheet.getRange("A6").setValue("Total Applications:");
  reportSheet.getRange("B6").setValue(stats.total);
  reportSheet.getRange("A7").setValue("Pending Review:");
  reportSheet.getRange("B7").setValue(stats.pending);
  reportSheet.getRange("A8").setValue("Under Review:");
  reportSheet.getRange("B8").setValue(stats.reviewing);
  reportSheet.getRange("A9").setValue("Shortlisted:");
  reportSheet.getRange("B9").setValue(stats.shortlisted);
  reportSheet.getRange("A10").setValue("Rejected:");
  reportSheet.getRange("B10").setValue(stats.rejected);
  reportSheet.getRange("A11").setValue("Hired:");
  reportSheet.getRange("B11").setValue(stats.hired);
  
  // Positions breakdown
  reportSheet.getRange("A13").setValue("POSITIONS BREAKDOWN").setFontWeight("bold").setBackground("#0ae448");
  let row = 14;
  for (const [position, count] of Object.entries(positions)) {
    reportSheet.getRange(`A${row}`).setValue(position);
    reportSheet.getRange(`B${row}`).setValue(count);
    row++;
  }
  
  // Experience breakdown
  reportSheet.getRange(`A${row + 1}`).setValue("EXPERIENCE BREAKDOWN").setFontWeight("bold").setBackground("#0ae448");
  row = row + 2;
  for (const [exp, count] of Object.entries(experience)) {
    if (count > 0) {
      reportSheet.getRange(`A${row}`).setValue(exp);
      reportSheet.getRange(`B${row}`).setValue(count);
      row++;
    }
  }
  
  // Auto-resize columns
  reportSheet.autoResizeColumns(1, 2);
  
  SpreadsheetApp.getUi().alert("Report generated successfully! Check the 'ApplicationReport' tab.");
}

function showPositionFilter() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(APPLICATIONS_SHEET);
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Sheet not found.");
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  const positions = new Set();
  
  for (let i = 1; i < data.length; i++) {
    const position = data[i][4];
    if (position) positions.add(position);
  }
  
  let positionList = "Available Positions:\n\n";
  Array.from(positions).forEach(pos => {
    positionList += `• ${pos}\n`;
  });
  positionList += "\n\nUse Data → Filter views to filter by position.";
  
  SpreadsheetApp.getUi().alert("Position Filter Guide", positionList, SpreadsheetApp.getUi().ButtonSet.OK);
}

function showHelp() {
  const ui = SpreadsheetApp.getUi();
  ui.alert("How to Use - Application Manager", 
    "📋 APPLICATION MANAGEMENT SYSTEM\n\n" +
    "1. Applications are automatically added to the 'JobApplications' sheet\n" +
    "2. Use the Status column dropdown to update application status:\n" +
    "   • pending - New applications\n" +
    "   • reviewing - Under active review\n" +
    "   • shortlisted - Selected for interview\n" +
    "   • rejected - Not selected\n" +
    "   • hired - Position offered\n" +
    "3. Status updates automatically send email notifications\n" +
    "4. Use filters to sort by position, status, or experience\n" +
    "5. Generate reports from the menu for analytics\n\n" +
    "📧 For support: careers@yunipakistan.com\n" +
    "🌐 Website: www.yunipakistan.com", 
    ui.ButtonSet.OK);
}