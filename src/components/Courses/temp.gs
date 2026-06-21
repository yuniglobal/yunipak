// Google Apps Script for Course and Event Registrations
// Deploy as Web App (Execute as: Me, Access: Anyone)

// Sheet names
const REGISTRATION_SHEET = "CourseRegistrations";
const EVENT_REGISTRATION_SHEET = "EventRegistrations";
const NEWSLETTER_SHEET = "Yuniverse";

// SPREADSHEET_ID: Paste your Google Sheet ID here if you deploy this as a Standalone Apps Script.
// Leave it blank if the script is container-bound to the spreadsheet (Extensions > Apps Script).
const SPREADSHEET_ID = "";

// Helper function to safely get the spreadsheet (supports both bound and standalone deployments)
function getSpreadsheet() {
  let ss = null;
  if (typeof SPREADSHEET_ID !== 'undefined' && SPREADSHEET_ID) {
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e) {
      console.log("Failed to open spreadsheet by ID: " + e.toString());
    }
  }
  if (!ss) {
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (e) {
      console.log("Failed to get active spreadsheet: " + e.toString());
    }
  }
  return ss;
}

// Helper function to parse URL-encoded query strings manually
function parseQueryString(queryString) {
  const params = {};
  if (!queryString) return params;
  const pairs = queryString.split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    if (pair.length > 0) {
      const key = decodeURIComponent(pair[0].replace(/\+/g, ' '));
      const value = pair.length > 1 ? decodeURIComponent(pair[1].replace(/\+/g, ' ')) : '';
      if (key) {
        params[key] = value;
      }
    }
  }
  return params;
}

// Main function to handle POST requests
function doPost(e) {
  try {
    // Support both URL-encoded/form parameters and JSON payloads
    let data = {};
    if (e && e.postData && e.postData.contents) {
      const contents = e.postData.contents;
      try {
        data = JSON.parse(contents);
      } catch (parseError) {
        try {
          data = parseQueryString(contents);
        } catch (queryError) {
          data = {};
        }
      }
    }
    
    // Fallback to e.parameter if parsed data is empty
    if (!data || Object.keys(data).length === 0) {
      data = (e && e.parameter) ? e.parameter : {};
    }
    
    // Route based on formType
    if (data.formType === 'newsletter') {
      return handleNewsletter(data);
    }
    
    // Route Event Registration
    if (data.formType === 'individual_event' || data.attendeeType || data.formId) {
      return handleEventRegistration(data);
    }
    
    // Default: Course Registration
    return handleCourseRegistration(data);
    
  } catch (error) {
    return createJSONResponse({
      success: false, 
      error: error.toString()
    });
  }
}

// =====================================================
// COURSE REGISTRATION HANDLER
// =====================================================

function handleCourseRegistration(data) {
  const sheet = getOrCreateCourseSheet();
  
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
}

function getOrCreateCourseSheet() {
  try {
    const ss = getSpreadsheet();
    if (!ss) {
      throw new Error("Could not access Google Spreadsheet.");
    }
    let sheet = ss.getSheetByName(REGISTRATION_SHEET);
    
    if (!sheet) {
      sheet = ss.insertSheet(REGISTRATION_SHEET);
      
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
      
      const statusRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(["pending", "approved", "rejected"], true)
        .build();
      sheet.getRange("D2:D").setDataValidation(statusRule);
      sheet.getRange("B:B").setNumberFormat("yyyy-mm-dd hh:mm:ss");
      
      for (let i = 1; i <= headers.length; i++) {
        sheet.autoResizeColumn(i);
      }
    }
    return sheet;
  } catch (error) {
    console.log("Error creating Course sheet: " + error);
    throw error;
  }
}

// =====================================================
// EVENT REGISTRATION HANDLER
// =====================================================

function handleEventRegistration(data) {
  const sheet = getOrCreateEventSheet();
  
  const lastRow = sheet.getLastRow();
  const serialNo = lastRow === 0 ? 1 : lastRow;
  
  const typeChar = (data.attendeeType && data.attendeeType.toLowerCase().includes('student')) ? 'S' : 'O';
  const paddedNo = serialNo.toString().padStart(4, '0');
  const generatedFormId = `YUNITY-${typeChar}-${paddedNo}`;
  
  const rowData = [
    serialNo,                                    // Sr. No
    new Date(),                                  // Registration Date
    generatedFormId,                             // Form ID (YUNITY-P-xxxxS/O)
    "pending",                                   // Status
    data.fullName || "",                         // Full Name
    data.cnic || "",                             // CNIC
    data.email || "",                            // Email
    data.phone || "",                            // Phone Number
    data.gender || "",                           // Gender
    data.dob || "",                              // Date of Birth
    data.addressCity || "",                      // City
    data.attendeeType || "",                     // Attendee Type
    data.institute || "",                        // Institute
    data.hasStudentId || "",                     // Has Student ID
    data.studentIdNum || "",                     // Student ID Number
    data.day1 || "",                             // Attending Day 1
    data.day2 || "",                             // Attending Day 2
    data.day1Workshops || "",                    // Day 1 Workshops
    data.day2Workshops || "",                    // Day 2 Workshops
    data.price || "",                            // Amount Due
    data.paymentMethod || "",                    // Payment Method
    data.bankName || "",                         // Bank Name
    data.emContactName || "",                    // Emergency Contact Name
    data.emContactPhone || "",                   // Emergency Contact Phone
    data.travelFar || "",                        // Traveling from far
    data.referral || "",                         // Referral
    "Pending Review",                            // Admin Notes
    data.timestamp || new Date().toISOString()   // Timestamp
  ];
  
  sheet.appendRow(rowData);
  
  // Send confirmation email
  try {
    sendEventConfirmationEmail(data, generatedFormId);
  } catch(emailError) {
    console.log("Email error: " + emailError);
  }
  
  return createJSONResponse({
    success: true, 
    message: "Event Registration submitted successfully",
    formId: generatedFormId,
    serialNo: serialNo
  });
}

function getOrCreateEventSheet() {
  try {
    const ss = getSpreadsheet();
    if (!ss) {
      throw new Error("Could not access Google Spreadsheet.");
    }
    let sheet = ss.getSheetByName(EVENT_REGISTRATION_SHEET);
    
    if (!sheet) {
      sheet = ss.insertSheet(EVENT_REGISTRATION_SHEET);
      
      const headers = [
        "Sr. No", "Registration Date", "Registration ID", "Status", "Full Name", "CNIC", "Email",
        "Phone Number", "Gender", "Date of Birth", "City", "Attendee Type", "Institute", 
        "Has Student ID", "Student ID Number", "Attending Day 1", "Attending Day 2", 
        "Day 1 Workshops", "Day 2 Workshops", "Amount Due", "Payment Method", "Bank Name", 
        "Emergency Contact Name", "Emergency Contact Phone", "Traveling from far", "Referral", 
        "Admin Notes", "Timestamp"
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange("1:1").setFontWeight("bold").setBackground("#d4af37").setFontColor("#000000");
      sheet.setFrozenRows(1);
      
      const statusRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(["pending", "approved", "rejected"], true)
        .build();
      sheet.getRange("D2:D").setDataValidation(statusRule);
      sheet.getRange("B:B").setNumberFormat("yyyy-mm-dd hh:mm:ss");
      
      for (let i = 1; i <= headers.length; i++) {
        sheet.autoResizeColumn(i);
      }
    }
    return sheet;
  } catch (error) {
    console.log("Error creating Event sheet: " + error);
    throw error;
  }
}

// =====================================================
// NEWSLETTER SUBSCRIPTION HANDLER
// =====================================================

function getOrCreateNewsletterSheet() {
  const ss = getSpreadsheet();
  if (!ss) throw new Error("Cannot access spreadsheet");
  
  let sheet = ss.getSheetByName(NEWSLETTER_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(NEWSLETTER_SHEET);
    const headers = [
      "Sr. No", "Subscription Date", "Email", "Phone / WhatsApp", "Coupon Code", "Email Sent", "Timestamp"
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#008f4c").setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function handleNewsletter(data) {
  try {
    const sheet = getOrCreateNewsletterSheet();
    const email = data.email || "";
    const phone = data.phone || "";
    
    if (!email) {
      return createJSONResponse({ success: false, message: "Email is required." });
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const emailColumn = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
      for (var i = 0; i < emailColumn.length; i++) {
        if (emailColumn[i][0].toString().toLowerCase() === email.toLowerCase()) {
          return createJSONResponse({ 
            success: false, 
            message: "This email is already subscribed to Yuniverse." 
          });
        }
      }
    }
    
    const serialNo = lastRow === 0 ? 1 : lastRow;
    var emailSent = "No";
    try {
      sendNewsletterConfirmationEmail(email, phone);
      emailSent = "Yes";
    } catch (emailError) {
      emailSent = "Failed: " + emailError.toString();
    }
    
    const rowData = [
      serialNo, new Date(), email, phone, "", emailSent, data.timestamp || new Date().toISOString()
    ];
    sheet.appendRow(rowData);
    
    return createJSONResponse({ success: true, message: "Yuniverse subscription successful!" });
  } catch (error) {
    return createJSONResponse({ success: false, error: error.toString() });
  }
}

function sendNewsletterConfirmationEmail(email, phone) {
  var subject = "Welcome to YUNIVERSE! 🥳";
  var htmlBody = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>'
    + '<body style="margin:0;padding:0;background-color:#0a0d0b;font-family:Arial,Helvetica,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0d0b;padding:30px 0;"><tr><td align="center">'
    + '<table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;border:1px solid rgba(0,230,118,0.15);overflow:hidden;">'
    + '<tr><td style="background:linear-gradient(135deg,#008f4c,#00e676);padding:30px 40px;text-align:center;">'
    + '<h1 style="margin:0;color:#000;font-size:28px;font-weight:900;letter-spacing:-0.5px;">Yuniverse</h1>'
    + '<p style="margin:8px 0 0;color:rgba(0,0,0,0.7);font-size:14px;font-weight:600;">Welcome to the Community</p>'
    + '</td></tr><tr><td style="padding:40px 40px 30px;">'
    + '<h2 style="margin:0 0 12px;color:#fff;font-size:22px;font-weight:800;">Welcome to Yuniverse! 🥳</h2>'
    + '<p style="color:#a0aab2;font-size:16px;line-height:1.7;margin:0 0 25px;">'
    + "Thank you for subscribing to our newsletter. We're excited to have you as part of our community.<br><br>"
    + "Stay tuned for updates, exclusive opportunities, and content delivered straight to your inbox!</p>"
    + '<div style="text-align:center;margin:25px 0 15px 0;">'
    + '<a href="https://yuniglobal.com" style="display:inline-block;background:#008f4c;color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px;">Visit Yuniverse Website →</a>'
    + '</div><div style="text-align:center;margin:20px 0 30px;">'
    + '<p style="color:#a0aab2;font-size:12px;margin:0 0 12px 0;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">Connect with YUNI</p>'
    + '<table align="center" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr>'
    + '<td style="padding:0 8px;"><a href="https://www.linkedin.com/company/yuni-edtech/" style="display:inline-block;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#00e676;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">LinkedIn</a></td>'
    + '<td style="padding:0 8px;"><a href="https://www.instagram.com/yunipakistan" style="display:inline-block;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#00e676;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">Instagram</a></td>'
    + '<td style="padding:0 8px;"><a href="https://www.facebook.com/yunipakistan" style="display:inline-block;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#00e676;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">Facebook</a></td>'
    + '</tr></table></div></td></tr><tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">'
    + '<p style="color:#555;font-size:12px;margin:0;">Yuniverse | NASTP Rawalpindi | © 2026</p>'
    + '</td></tr></table></td></tr></table></body></html>';
  
  MailApp.sendEmail({ to: email, subject: subject, htmlBody: htmlBody });
}

// =====================================================
// UTILITIES & GENERAL HANDLERS
// =====================================================

function createJSONResponse(data) {
  const response = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  if (response.setHeaders) {
    response.setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
  }
  return response;
}

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

function doGet() {
  return createJSONResponse({
    status: "active",
    message: "Registration API is running",
    timestamp: new Date().toISOString()
  });
}

function sendConfirmationEmail(data) {
  if (!data.email) return;
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
    `Next Steps:\n1. Our team will verify your payment within 24-48 hours\n2. You will receive login credentials for our LMS\n3. Course access will be granted upon approval\n\nNeed help? Contact us at support@yunipk.com`;
  
  try {
    MailApp.sendEmail({ to: data.email, subject: subject, htmlBody: htmlBody, body: textBody, name: "YUNI Education" });
  } catch (error) {
    console.log("Email sending failed: " + error);
  }
}

function sendEventConfirmationEmail(data, formId) {
  if (!data.email) return;
  const subject = `Registration Received - YUNI-TY 2026 Event | YUNI Education`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
      <div style="background: #000; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #d4af37; margin: 0;">YUNI-TY 2026</h1>
      </div>
      <div style="background: #fff; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #000;">Registration Received ✅</h2>
        <p>Dear <strong>${escapeHtml(data.fullName) || "Attendee"}</strong>,</p>
        <p>Thank you for registering for <strong>YUNI-TY 2026</strong>.</p>
        
        <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #d4af37;">Registration Details:</h3>
          <p><strong>Registration ID:</strong> ${escapeHtml(formId)}</p>
          <p><strong>Attendee Type:</strong> ${escapeHtml(data.attendeeType) || "N/A"}</p>
          <p><strong>Full Name:</strong> ${escapeHtml(data.fullName) || "N/A"}</p>
          <p><strong>CNIC/B-Form:</strong> ${escapeHtml(data.cnic) || "N/A"}</p>
          <p><strong>Phone Number:</strong> ${escapeHtml(data.phone) || "N/A"}</p>
          <p><strong>City:</strong> ${escapeHtml(data.addressCity) || "N/A"}</p>
          <p><strong>Institute:</strong> ${escapeHtml(data.institute) || "N/A"}</p>
          ${data.day1 ? `<p><strong>Attending Day 1:</strong> ${escapeHtml(data.day1)}</p>` : ""}
          ${data.day1Workshops ? `<p><strong>Day 1 Workshops:</strong> ${escapeHtml(data.day1Workshops)}</p>` : ""}
          ${data.day2 ? `<p><strong>Attending Day 2:</strong> ${escapeHtml(data.day2)}</p>` : ""}
          ${data.day2Workshops ? `<p><strong>Day 2 Workshops:</strong> ${escapeHtml(data.day2Workshops)}</p>` : ""}
          <p><strong>Amount Due:</strong> ${escapeHtml(data.price) || "N/A"}</p>
          <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Your registration is now pending verification.</li>
          <li>Once your details are verified, you will receive an email with your official invitation.</li>
          <li>If verification fails, your registration will be rejected and you will be notified.</li>
        </ol>
        
        <p>Please save your Registration ID (<strong>${escapeHtml(formId)}</strong>) as it will be used as your official reference.</p>
        
        <p>You can check your registration status anytime by emailing us at <a href="mailto:info@yunipakistan.com">info@yunipakistan.com</a></p>
        <hr style="margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">Need help? Contact us at info@yunipakistan.com or reply to this email.</p>
      </div>
    </div>
  `;
  const textBody = `Registration Received - YUNI-TY 2026\n\n` +
    `Dear ${data.fullName || "Attendee"},\n\n` +
    `Thank you for registering for YUNI-TY 2026.\n\n` +
    `Registration ID: ${formId}\n\n` +
    `Next Steps:\n1. Your registration is now pending verification.\n2. Once verified, you will receive an official invitation.\n\nNeed help? Contact us at info@yunipakistan.com`;
  
  try {
    MailApp.sendEmail({ to: data.email, subject: subject, htmlBody: htmlBody, body: textBody, name: "YUNI Education" });
  } catch (error) {
    console.log("Email sending failed: " + error);
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📊 Registration Manager')
    .addItem('📝 View Pending Registrations', 'showPendingRegistrations')
    .addItem('📈 Generate Report', 'generateReport')
    .addSeparator()
    .addItem('ℹ️ Help', 'showHelp')
    .addToUi();
}

function showPendingRegistrations() {
  const ss = getSpreadsheet();
  if (!ss) return SpreadsheetApp.getUi().alert("Could not access Google Spreadsheet.");
  
  const courseSheet = ss.getSheetByName(REGISTRATION_SHEET);
  const eventSheet = ss.getSheetByName(EVENT_REGISTRATION_SHEET);
  
  let pendingCount = 0;
  if (courseSheet) {
    const data = courseSheet.getDataRange().getValues();
    pendingCount += data.filter((row, i) => i > 0 && row[3] === "pending").length;
  }
  if (eventSheet) {
    const data = eventSheet.getDataRange().getValues();
    pendingCount += data.filter((row, i) => i > 0 && row[3] === "pending").length;
  }
  
  const ui = SpreadsheetApp.getUi();
  ui.alert(`Pending Registrations: ${pendingCount}`, 
    `${pendingCount} registrations waiting for approval across all forms.\n\nUse the Status column dropdown to approve/reject registrations.`, 
    ui.ButtonSet.OK);
}

function generateReport() {
  const ss = getSpreadsheet();
  if (!ss) return SpreadsheetApp.getUi().alert("Could not access Google Spreadsheet.");
  
  let total = 0, pending = 0, approved = 0, rejected = 0;
  const sheets = [REGISTRATION_SHEET, EVENT_REGISTRATION_SHEET];
  
  sheets.forEach(name => {
    const sheet = ss.getSheetByName(name);
    if (sheet) {
      const data = sheet.getDataRange().getValues();
      total += data.length - 1;
      for (let i = 1; i < data.length; i++) {
        const status = data[i][3];
        if (status === "pending") pending++;
        else if (status === "approved") approved++;
        else if (status === "rejected") rejected++;
      }
    }
  });
  
  const ui = SpreadsheetApp.getUi();
  ui.alert("Registration Report", 
    `📊 REGISTRATION STATISTICS\n\n` +
    `Total Registrations: ${total}\n` +
    `🟡 Pending: ${pending}\n` +
    `🟢 Approved: ${approved}\n` +
    `🔴 Rejected: ${rejected}`, 
    ui.ButtonSet.OK);
}

function showHelp() {
  const ui = SpreadsheetApp.getUi();
  ui.alert("How to Use", 
    "📋 Registration Management System\n\n" +
    "1. Registrations are automatically added to the relevant sheets (CourseRegistrations or EventRegistrations)\n" +
    "2. Use the Status column dropdown to approve/reject registrations\n" +
    "3. Approved students will receive automatic emails\n\n" +
    "📧 For support: support@yunipk.com", 
    ui.ButtonSet.OK);
}

// Function to update registration status programmatically (for admin use)
function updateStatus(serialNo, newStatus, adminNotes = "", sheetName = REGISTRATION_SHEET) {
  const ss = getSpreadsheet();
  if (!ss) return false;
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return false;
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const serialCol = headers.indexOf("Sr. No") + 1;
  const statusCol = headers.indexOf("Status") + 1;
  const notesCol = headers.indexOf("Admin Notes") + 1;
  const emailCol = headers.indexOf("Email") + 1;
  const nameCol = headers.indexOf("Full Name") + 1;
  
  let itemNameCol = -1;
  if (sheetName === REGISTRATION_SHEET) {
    itemNameCol = headers.indexOf("Course Name") + 1;
  }
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][serialCol - 1] == serialNo) {
      sheet.getRange(i + 1, statusCol).setValue(newStatus);
      if (adminNotes && notesCol > 0) {
        sheet.getRange(i + 1, notesCol).setValue(adminNotes);
      }
      
      // Send status update email
      const email = data[i][emailCol - 1];
      const name = data[i][nameCol - 1];
      const itemName = itemNameCol > 0 ? data[i][itemNameCol - 1] : "YUNI-TY 2026 Event";
      
      if (email) {
        sendStatusUpdateEmail(email, name, itemName, newStatus, adminNotes);
      }
      return true;
    }
  }
  return false;
}

// Function to send status update email
function sendStatusUpdateEmail(email, name, itemName, status, notes) {
  let subject = "";
  let statusColor = "";
  let statusMessage = "";
  
  if (status === "approved") {
    subject = "Registration Approved - Access Granted! 🎉";
    statusColor = "#0ae448";
    statusMessage = `Congratulations! Your registration for <strong>${escapeHtml(itemName)}</strong> has been APPROVED.`;
  } else if (status === "rejected") {
    subject = "Registration Update - Action Required";
    statusColor = "#ff4444";
    statusMessage = `We regret to inform you that your registration for <strong>${escapeHtml(itemName)}</strong> requires additional information or correction.`;
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
          <p><strong>Item/Course:</strong> ${escapeHtml(itemName)}</p>
          <p><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${status.toUpperCase()}</span></p>
          ${notes ? `<p><strong>Note from Admin:</strong> ${escapeHtml(notes)}</p>` : ""}
        </div>
        
        ${status === "approved" ? `
        <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2e7d32;">Login Details:</h3>
          <p><strong>Portal:</strong> <a href="https://lms.yunipk.com">https://lms.yunipk.com</a></p>
          <p><strong>Username:</strong> ${escapeHtml(email)}</p>
          <p><strong>Password:</strong> Check your SMS/Email for login credentials</p>
        </div>
        ` : `
        <p>Please contact our support team at <a href="mailto:support@yunipk.com">support@yunipk.com</a> for further assistance.</p>
        `}
        
        <hr style="margin: 20px 0;">
        
        <p style="font-size: 12px; color: #666;">Need help? Contact us at support@yunipk.com</p>
      </div>
    </div>
  `;
  
  const textBody = `${status === "approved" ? "Registration Approved" : "Registration Update"}\n\n` +
    `Dear ${name || "Student"},\n\n` +
    `${statusMessage.replace(/<[^>]*>/g, '')}\n\n` +
    `Item: ${itemName}\n` +
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

// Trigger function that runs automatically on spreadsheet edits
function onEdit(e) {
  try {
    const range = e.range;
    const sheet = range.getSheet();
    const sheetName = sheet.getName();
    
    // Only check REGISTRATION_SHEET and EVENT_REGISTRATION_SHEET
    if (sheetName !== REGISTRATION_SHEET && sheetName !== EVENT_REGISTRATION_SHEET) {
      return;
    }
    
    const row = range.getRow();
    const col = range.getColumn();
    
    // Skip headers and multi-cell selections
    if (row === 1 || range.getNumRows() > 1 || range.getNumColumns() > 1) {
      return;
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // Status is in the "Status" column (typically column D / 4)
    const statusCol = headers.indexOf("Status") + 1;
    if (col === statusCol) {
      const newStatus = range.getValue();
      
      const serialCol = headers.indexOf("Sr. No") + 1;
      const emailCol = headers.indexOf("Email") + 1;
      const nameCol = headers.indexOf("Full Name") + 1;
      
      let itemName = "";
      if (sheetName === REGISTRATION_SHEET) {
        const courseCol = headers.indexOf("Course Name") + 1;
        itemName = data[row - 1][courseCol - 1];
      } else {
        // Event registration
        itemName = "YUNI-TY 2026 Event";
      }
      
      const email = data[row - 1][emailCol - 1];
      const name = data[row - 1][nameCol - 1];
      
      const notesCol = headers.indexOf("Admin Notes") + 1;
      const notes = notesCol > 0 ? data[row - 1][notesCol - 1] : "";
      
      if (email && (newStatus === "approved" || newStatus === "rejected")) {
        sendStatusUpdateEmail(email, name, itemName, newStatus, notes);
      }
    }
  } catch (error) {
    console.log("onEdit error: " + error.toString());
  }
}