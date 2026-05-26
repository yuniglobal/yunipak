import React, { useState } from 'react';
import { Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const WORKSHOPS = [
  { id: 'ai', name: 'Artificial Intelligence', template: '/certificates/Artificial Intelligence.png' },
  { id: 'cyber', name: 'Cyber Security', template: '/certificates/Cyber Security.png' },
  { id: 'languages', name: 'Languages', template: '/certificates/Languages.png' },
  { id: 'marketing', name: 'Softskills and Digital Marketing', template: '/certificates/Softskills and Digital Marketing.png' },
  { id: 'web', name: 'Web Development', template: '/certificates/Web Development.png' },
];

const CertificateForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    refNo: '',
    phone: '',
    workshop: WORKSHOPS[0].id,
    declaration: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    setError(null);
  };

  const generateCertificate = async (studentName: string, refNo: string, workshopName: string, templatePath: string) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = templatePath;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = '#1a365d';
        ctx.textAlign = 'center';
        
        // Student Name
        ctx.font = 'bold 140px "Segoe UI", Arial, sans-serif';
        ctx.fillText(studentName.toUpperCase(), canvas.width / 2, 1200);

        // Workshop Name
        ctx.fillStyle = '#2d3748';
        ctx.font = 'italic 70px "Segoe UI", Arial, sans-serif';
        ctx.fillText(workshopName, canvas.width / 2, 1550);

        // Reference Number (Bottom Left)
        ctx.textAlign = 'left';
        ctx.fillStyle = '#a0aec0';
        ctx.font = '30px "Segoe UI", Arial, sans-serif';
        ctx.fillText(`Certificate ID: ${refNo}`, 200, canvas.height - 150);

        const link = document.createElement('a');
        link.download = `Certificate_${studentName.replace(/\s+/g, '_')}_${workshopName.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        resolve();
      };

      img.onerror = () => reject(new Error('Failed to load certificate template'));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.declaration) {
      setError('Please confirm the declaration to proceed.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('Initiating verification for:', formData.refNo);
      const response = await fetch('/api/verify-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refNo: formData.refNo,
          name: formData.name,
          phone: formData.phone
        }),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Verification result:', result);

      if (response.ok && result.valid) {
        const workshop = WORKSHOPS.find(w => w.id === formData.workshop);
        if (workshop) {
          console.log('Generating certificate for workshop:', workshop.name);
          await generateCertificate(result.student.name, result.student.refNo, workshop.name, workshop.template);
          setSuccess(true);
        }
      } else {
        setError(result.error || 'Verification failed. Please check your details.');
      }
    } catch (err) {
      console.error('Submit Error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="certificate-form-protocol max-w-2xl mx-auto">
      <style>{`
        .certificate-form-protocol {
          width: 100%;
        }

        .protocol-section {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 2rem;
          padding: 3rem;
        }

        .protocol-header {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--pk-green);
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .input-group-protocol {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .field-protocol {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .field-protocol.full {
          grid-column: span 2;
        }

        .field-protocol label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-left: 0.5rem;
        }

        .field-protocol input, 
        .field-protocol select {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          border-radius: 1rem;
          padding: 1.1rem;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .field-protocol input:focus, 
        .field-protocol select:focus {
          outline: none;
          border-color: var(--pk-green);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 15px rgba(0, 230, 118, 0.1);
        }

        .declaration-protocol {
          margin-top: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 1.25rem;
          border: 1px dashed var(--border-light);
        }

        .checkbox-protocol {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          cursor: pointer;
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .checkbox-protocol input {
          width: 1.25rem;
          height: 1.25rem;
          accent-color: var(--pk-green);
          margin-top: 0.1rem;
          cursor: pointer;
        }

        .protocol-submit-btn {
          width: 100%;
          background: var(--pk-green);
          color: #fff;
          padding: 1.4rem;
          border-radius: 1.25rem;
          font-size: 1rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 2rem;
          box-shadow: 0 10px 20px rgba(0, 230, 118, 0.15);
        }

        .protocol-submit-btn:hover:not(:disabled) {
          background: var(--pk-green-light);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px var(--pk-green-glow);
        }

        .protocol-submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(1);
        }

        .status-msg-protocol {
          margin-top: 1.5rem;
          padding: 1.25rem;
          border-radius: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .status-msg-protocol.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
        }

        .status-msg-protocol.success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          color: #4ade80;
        }
      `}</style>

      <form onSubmit={handleSubmit} className="protocol-section">
        <h3 className="protocol-header">CERTIFICATE VERIFICATION PROTOCOL</h3>
        <div className="input-group-protocol">
          <div className="field-protocol full">
            <label>FULL LEGAL NAME</label>
            <input 
              type="text" 
              name="name" 
              placeholder="EXACTLY AS REGISTERED" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="field-protocol">
            <label>REFERENCE NO</label>
            <input 
              type="text" 
              name="refNo" 
              placeholder="YUNI-XXXXX" 
              value={formData.refNo} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="field-protocol">
            <label>PASSCODE (PHONE)</label>
            <input 
              type="text" 
              name="phone" 
              placeholder="03XXXXXXXXX" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="field-protocol full">
            <label>WORKSHOP PROTOCOL</label>
            <select name="workshop" value={formData.workshop} onChange={handleChange} required>
              {WORKSHOPS.map(w => (
                <option key={w.id} value={w.id} className="bg-slate-900 text-white">
                  {w.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="declaration-protocol">
          <label className="checkbox-protocol">
            <input 
              type="checkbox" 
              name="declaration" 
              checked={formData.declaration} 
              onChange={handleChange} 
              required 
            />
            <span>I confirm that the credentials provided are accurate and I am the authorized recipient of this certification.</span>
          </label>
        </div>

        {error && (
          <div className="status-msg-protocol error">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="status-msg-protocol success">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            Validation Complete. Certificate Generated.
          </div>
        )}

        <button type="submit" className="protocol-submit-btn" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              SYNCING...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              INITIALIZE SYNC & DOWNLOAD
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CertificateForm;
