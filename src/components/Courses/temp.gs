// Google Apps Script for Course Registrations
// Deploy as Web App (Execute as: Me, Access: Anyone)

// Sheet names
const REGISTRATION_SHEET = "CourseRegistrations";

// Main function to handle POST requests
function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    
    // Support both URL-encoded/form parameters and JSON payloads
    let data;
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }
    
    // Get last row for serial number
    const lastRow = sheet.getLastRow();
    const serialNo = lastRow === 0 ? 1 : lastRow;
    
    // Prepare row data
    const rowData = [
      serialNo,                                    // Sr. No
      new Date(),                                  // Registration Date
      data.timestamp || new Date().toISOString(),  // Timestamp
      data.status || "pending",                    // Status
      data.courseTitle || "",                      // Course Name
      data.courseId || "",                         // Course ID
      data.coursePrice || "",                      // Course Price
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
      data.highestQualification || "",             // Highest Qualification
      data.institution || "",                      // Institution
      data.yearOfCompletion || "",                 // Year of Completion
      data.percentage || "",                       // Percentage/CGPA
      data.currentEmployment || "",                // Employment Status
      data.organization || "",                     // Organization
      data.designation || "",                      // Designation
      data.paymentMethod || "",                    // Payment Method
      data.bankName || "",                         // Bank Name
      data.bankAccountTitle || "",                 // Bank Account Title
      data.bankAccountNumber || "",                // Bank Account Number
      data.transactionId || "",                    // Transaction ID
      data.transactionDate || "",                  // Transaction Date
      data.transactionAmount || "",                // Transaction Amount
      data.hearAboutUs || "",                      // How did they hear
      data.referralCode || "",                     // Referral Code
      data.whyJoin || "",                          // Why they want to join
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
      message: "Registration submitted successfully",
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
    message: "Course Registration API is running",
    timestamp: new Date().toISOString()
  });
}

// Function to send confirmation email
function sendConfirmationEmail(data) {
  // Check if email exists
  if (!data.email) {
    console.log("No email provided, skipping confirmation");
    return;
  }
  
  const subject = `Registration Received - ${data.courseTitle || "Course"} | YUNI Education`;
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
      <div style="background: #000; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #0ae448; margin: 0;">YUNI Education</h1>
      </div>
      <div style="background: #fff; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #000;">Registration Received ✅</h2>
        <p>Dear <strong>${escapeHtml(data.fullName) || "Student"}</strong>,</p>
        <p>Thank you for registering for <strong>${escapeHtml(data.courseTitle) || "the course"}</strong>.</p>
        
        <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0ae448;">Registration Details:</h3>
          <p><strong>Course:</strong> ${escapeHtml(data.courseTitle) || "N/A"}</p>
          <p><strong>Transaction ID:</strong> ${escapeHtml(data.transactionId) || "N/A"}</p>
          <p><strong>Amount Paid:</strong> ${escapeHtml(data.transactionAmount) || escapeHtml(data.coursePrice) || "N/A"}</p>
          <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Our team will verify your payment within 24-48 hours</li>
          <li>You will receive login credentials for our Learning Management System (LMS)</li>
          <li>Course access will be granted upon approval</li>
        </ol>
        
        <p>You can check your registration status anytime by emailing us at <a href="mailto:support@yunipk.com">support@yunipk.com</a></p>
        
        <hr style="margin: 20px 0;">
        
        <p style="font-size: 12px; color: #666;">Need help? Contact us at +92 300 1234567 or reply to this email.</p>
      </div>
    </div>
  `;
  
  const textBody = `Registration Received - ${data.courseTitle || "Course"}\n\n` +
    `Dear ${data.fullName || "Student"},\n\n` +
    `Thank you for registering for ${data.courseTitle || "the course"}.\n\n` +
    `Next Steps:\n` +
    `1. Our team will verify your payment within 24-48 hours\n` +
    `2. You will receive login credentials for our LMS\n` +
    `3. Course access will be granted upon approval\n\n` +
    `Need help? Contact us at support@yunipk.com`;
  
  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody,
      body: textBody,
      name: "YUNI Education"
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
    let sheet = ss.getSheetByName(REGISTRATION_SHEET);
    
    if (!sheet) {
      sheet = ss.insertSheet(REGISTRATION_SHEET);
      
      // Add headers
      const headers = [
        "Sr. No", "Registration Date", "Timestamp", "Status", "Course Name", "Course ID",
        "Course Price", "Full Name", "Father's Name", "CNIC", "Date of Birth", "Gender",
        "Email", "Phone Number", "Alternate Phone", "City", "Province", "Current Address",
        "Highest Qualification", "Institution", "Year of Completion", "Percentage/CGPA",
        "Employment Status", "Organization", "Designation", "Payment Method", "Bank Name",
        "Bank Account Title", "Bank Account Number", "Transaction ID", "Transaction Date",
        "Transaction Amount", "How did you hear?", "Referral Code", "Why join?", 
        "Admin Notes", "Submission Date"
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange("1:1").setFontWeight("bold").setBackground("#0ae448").setFontColor("#000000");
      sheet.setFrozenRows(1);
      
      // Add data validation for Status column
      const statusRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(["pending", "approved", "rejected"], true)
        .build();
      sheet.getRange("D2:D").setDataValidation(statusRule);
      
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

// Function to update registration status (for admin use)
function updateStatus(serialNo, newStatus, adminNotes = "") {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REGISTRATION_SHEET);
  if (!sheet) return false;
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const serialCol = headers.indexOf("Sr. No") + 1;
  const statusCol = headers.indexOf("Status") + 1;
  const notesCol = headers.indexOf("Admin Notes") + 1;
  const emailCol = headers.indexOf("Email") + 1;
  const nameCol = headers.indexOf("Full Name") + 1;
  const courseCol = headers.indexOf("Course Name") + 1;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][serialCol - 1] == serialNo) {
      sheet.getRange(i + 1, statusCol).setValue(newStatus);
      if (adminNotes) {
        sheet.getRange(i + 1, notesCol).setValue(adminNotes);
      }
      
      // Send status update email
      const email = data[i][emailCol - 1];
      const name = data[i][nameCol - 1];
      const course = data[i][courseCol - 1];
      
      if (email) {
        sendStatusUpdateEmail(email, name, course, newStatus, adminNotes);
      }
      return true;
    }
  }
  return false;
}

// Function to send status update email
function sendStatusUpdateEmail(email, name, course, status, notes) {
  let subject = "";
  let statusColor = "";
  let statusMessage = "";
  
  if (status === "approved") {
    subject = "Registration Approved - Access Granted! 🎉";
    statusColor = "#0ae448";
    statusMessage = "Congratulations! Your registration has been APPROVED. You now have access to your course.";
  } else if (status === "rejected") {
    subject = "Registration Update - Action Required";
    statusColor = "#ff4444";
    statusMessage = "We regret to inform you that your registration requires additional information.";
  } else {
    return;
  }
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
      <div style="background: #000; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #0ae448; margin: 0;">YUNI Education</h1>
      </div>
      <div style="background: #fff; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: ${statusColor};">${status === "approved" ? "Approved! ✅" : "Update Required ℹ️"}</h2>
        <p>Dear <strong>${escapeHtml(name) || "Student"}</strong>,</p>
        <p>${statusMessage}</p>
        
        <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0ae448;">Registration Status:</h3>
          <p><strong>Course:</strong> ${escapeHtml(course) || "N/A"}</p>
          <p><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${status.toUpperCase()}</span></p>
          ${notes ? `<p><strong>Note from Admin:</strong> ${escapeHtml(notes)}</p>` : ""}
        </div>
        
        ${status === "approved" ? `
        <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2e7d32;">Login Details:</h3>
          <p><strong>Portal:</strong> <a href="https://lms.yunipk.com">https://lms.yunipk.com</a></p>
          <p><strong>Username:</strong> ${escapeHtml(email)}</p>
          <p><strong>Password:</strong> Check your SMS for login credentials</p>
        </div>
        ` : `
        <p>Please contact our support team at <a href="mailto:support@yunipk.com">support@yunipk.com</a> for further assistance.</p>
        `}
        
        <hr style="margin: 20px 0;">
        
        <p style="font-size: 12px; color: #666;">Need help? Contact us at +92 300 1234567</p>
      </div>
    </div>
  `;
  
  const textBody = `${status === "approved" ? "Registration Approved" : "Registration Update"}\n\n` +
    `Dear ${name || "Student"},\n\n` +
    `${statusMessage}\n\n` +
    `Course: ${course || "N/A"}\n` +
    `Status: ${status.toUpperCase()}\n` +
    (notes ? `Admin Note: ${notes}\n\n` : "\n") +
    `Need help? Contact support@yunipk.com`;
  
  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody,
      body: textBody,
      name: "YUNI Education"
    });
  } catch (error) {
    console.log("Status email failed: " + error);
  }
}

// Function to create a menu in Google Sheets
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📊 Registration Manager')
    .addItem('📝 View Pending Registrations', 'showPendingRegistrations')
    .addItem('📈 Generate Report', 'generateReport')
    .addSeparator()
    .addItem('ℹ️ Help', 'showHelp')
    .addToUi();
}

// Helper functions for the menu
function showPendingRegistrations() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REGISTRATION_SHEET);
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Sheet not found. Please submit at least one registration first.");
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  const pending = data.filter((row, index) => index > 0 && row[3] === "pending");
  
  const ui = SpreadsheetApp.getUi();
  ui.alert(`Pending Registrations: ${pending.length}`, 
    `${pending.length} registrations waiting for approval.\n\nUse the Status column dropdown to approve/reject registrations.`, 
    ui.ButtonSet.OK);
}

function generateReport() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REGISTRATION_SHEET);
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Sheet not found. No data to report.");
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    SpreadsheetApp.getUi().alert("No registrations found yet.");
    return;
  }
  
  const stats = {
    total: data.length - 1,
    pending: 0,
    approved: 0,
    rejected: 0
  };
  
  for (let i = 1; i < data.length; i++) {
    const status = data[i][3];
    if (status === "pending") stats.pending++;
    else if (status === "approved") stats.approved++;
    else if (status === "rejected") stats.rejected++;
  }
  
  const ui = SpreadsheetApp.getUi();
  ui.alert("Registration Report", 
    `📊 REGISTRATION STATISTICS\n\n` +
    `Total Registrations: ${stats.total}\n` +
    `🟡 Pending: ${stats.pending}\n` +
    `🟢 Approved: ${stats.approved}\n` +
    `🔴 Rejected: ${stats.rejected}`, 
    ui.ButtonSet.OK);
}

function showHelp() {
  const ui = SpreadsheetApp.getUi();
  ui.alert("How to Use", 
    "📋 Registration Management System\n\n" +
    "1. Registrations are automatically added to this sheet\n" +
    "2. Use the Status column dropdown to approve/reject registrations\n" +
    "3. Approved students will receive automatic email with login details\n" +
    "4. Use filters to sort by status, course, or date\n\n" +
    "📧 For support: support@yunipk.com\n" +
    "🌐 Website: www.yunipk.com", 
    ui.ButtonSet.OK);
}