import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { refNo, name, phone, workshops = [] } = req.body;

  if (!refNo || !name || !phone) {
    return res.status(400).json({ error: 'Reference Number, Name, and Phone Number (passcode) are required' });
  }

  try {
    const dataPath = path.join(process.cwd(), 'api/data/students.json');
    const downloadsPath = path.join(process.cwd(), 'api/data/downloads.json');
    
    const students = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    let downloads = {};
    try {
      if (fs.existsSync(downloadsPath)) {
        downloads = JSON.parse(fs.readFileSync(downloadsPath, 'utf8'));
      }
    } catch (e) {
      console.error('Error reading downloads file:', e);
    }

    const student = students.find(s => 
      s.refNo.toLowerCase() === refNo.toLowerCase() && 
      s.phone.replace(/[\s-]/g, '') === phone.replace(/[\s-]/g, '')
    );

    if (student) {
      const studentKey = student.refNo.toUpperCase();
      const studentDownloads = downloads[studentKey] || [];

      // Get unique requested workshops to avoid duplicate counting
      const uniqueRequestedWorkshops = [...new Set(workshops)];

      // Calculate how many NEW unique workshops are being requested
      const newWorkshops = uniqueRequestedWorkshops.filter(w => !studentDownloads.includes(w));
      const totalCount = studentDownloads.length + newWorkshops.length;

      if (totalCount > 3) {
        const remaining = 3 - studentDownloads.length;
        return res.status(403).json({ 
          error: `Certificate limit exceeded. You have already downloaded ${studentDownloads.length} unique certificate(s). You can only download ${remaining} more. Total allowed: 3.` 
        });
      }

      // Update downloads record
      if (newWorkshops.length > 0) {
        downloads[studentKey] = [...studentDownloads, ...newWorkshops];
        try {
          fs.writeFileSync(downloadsPath, JSON.stringify(downloads, null, 2));
        } catch (e) {
          console.error('Error writing downloads file:', e);
          // We continue even if writing fails, but in a real environment this should be handled
        }
      }

      return res.status(200).json({ 
        valid: true, 
        student: {
          name: student.name,
          refNo: student.refNo
        } 
      });
    } else {
      return res.status(401).json({ error: 'Invalid Reference Number or Passcode (Phone Number).' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
