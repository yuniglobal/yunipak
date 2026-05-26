import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { refNo, name, phone } = req.body;

  if (!refNo || !name || !phone) {
    return res.status(400).json({ error: 'Reference Number, Name, and Phone Number (passcode) are required' });
  }

  try {
    const dataPath = path.join(process.cwd(), 'api/data/students.json');
    const students = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    const student = students.find(s => 
      s.refNo.toLowerCase() === refNo.toLowerCase() && 
      s.phone.replace(/[\s-]/g, '') === phone.replace(/[\s-]/g, '')
    );

    if (student) {
      // Note: We don't strictly require name match if the refNo and phone (passcode) match, 
      // but it's good practice to return the canonical name from the record for the certificate.
      return res.status(200).json({ 
        valid: true, 
        student: {
          name: student.name, // Return the name from the Excel sheet
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
