import { useState, useRef } from 'react';

interface Props { apiUrl: string; }

// University data
const universities: Record<string, string[]> = {
  'Islamabad / Rawalpindi': ['NUST — National University of Sciences & Technology','COMSATS University Islamabad','Quaid-i-Azam University','International Islamic University Islamabad','Air University Islamabad','Bahria University Islamabad','Capital University of Science & Technology','Foundation University Islamabad','Riphah International University Islamabad','Federal Urdu University Islamabad','Pir Mehr Ali Shah Arid Agriculture University Rawalpindi','University of Wah','Fatima Jinnah Women University Rawalpindi','Rawalpindi Medical University','National University of Medical Sciences','FAST-NUCES Islamabad','National Defence University Islamabad','PIEAS'],
  'Punjab': ['University of the Punjab Lahore','UET Lahore','LUMS','FAST-NUCES Lahore','COMSATS University Lahore','University of Central Punjab','Government College University Lahore','University of Agriculture Faisalabad','GCU Faisalabad','University of Sargodha','BZU Multan','University of Gujrat','University of Sialkot','Beaconhouse National University'],
  'Sindh': ['University of Karachi','NED University','IBA Karachi','Aga Khan University','FAST-NUCES Karachi','Dow University','SZABIST','Mehran University Jamshoro','Sukkur IBA University'],
  'KPK': ['University of Peshawar','UET Peshawar','COMSATS University Abbottabad','Abdul Wali Khan University Mardan','GIKI','University of Swat','Pak-Austria Fachhochschule Haripur'],
  'Balochistan': ['University of Balochistan Quetta','BUITEMS','University of Turbat'],
  'AJK / GB': ['University of Azad Jammu & Kashmir','Karakoram International University Gilgit'],
};

const departments = ['Computer Science','Software Engineering','Information Technology','Cyber Security','Artificial Intelligence','Data Science','Electrical Engineering','Mechanical Engineering','Civil Engineering','Business Administration (BBA)','MBA','Economics','Media & Communication','Law / LLB','Medicine / MBBS','Architecture','Design / Fine Arts','Mathematics','Physics','Psychology','Education','Other'];

const cities = ['Islamabad','Rawalpindi','Lahore','Karachi','Peshawar','Quetta','Multan','Faisalabad','Sialkot','Gujranwala','Hyderabad','Abbottabad','Mardan','Bahawalpur','Sargodha','Sukkur','Larkana','Mirpur AJK','Muzaffarabad','Gilgit','Other'];

const workshops = [
  { id: 'ws1', pillar: 'Tech', name: 'AI & Next Generation Software Engineering' },
  { id: 'ws2', pillar: 'Tech', name: 'Full Stack Web3 & Decentralized Apps' },
  { id: 'ws3', pillar: 'Tech', name: 'Next Gen Software Security & Ethical Hacking' },
  { id: 'ws4', pillar: 'Tech', name: 'UI/UX Design & Design Systems' },
  { id: 'ws5', pillar: 'Corporate', name: 'Financial Literacy & Tax Planning' },
  { id: 'ws6', pillar: 'Corporate', name: 'Startup Legalities & Intellectual Property' },
  { id: 'ws7', pillar: 'Corporate', name: 'Freelancing Architecture & Global Client Acquisition' },
  { id: 'ws8', pillar: 'Corporate', name: 'Confident Interview Technique & Personal Branding' },
  { id: 'ws9', pillar: 'Grooming', name: 'Speech Fluency & Public Speaking' },
  { id: 'ws10', pillar: 'Grooming', name: "The Gentleman's Edge — Etiquette & Mannerisms" },
  { id: 'ws11', pillar: 'PFS', name: 'PFS Masterclass — Cinematography / Film Production' },
  { id: 'ws12', pillar: 'PFS', name: 'Narrative Engineering & Script Writing' },
];

const boards = [
  { group: 'Federal', items: ['Federal Board (FBISE) Islamabad'] },
  { group: 'Punjab', items: ['BISE Lahore','BISE Rawalpindi','BISE Gujranwala','BISE Faisalabad','BISE Multan','BISE Sargodha','BISE Bahawalpur'] },
  { group: 'Sindh', items: ['BISE Karachi','BISE Hyderabad','BISE Sukkur','Aga Khan Board'] },
  { group: 'KPK', items: ['BISE Peshawar','BISE Abbottabad','BISE Mardan','BISE Swat'] },
  { group: 'Balochistan', items: ['BISE Quetta'] },
  { group: 'AJK', items: ['AJK Board'] },
  { group: 'O/A Level', items: ['Cambridge International (O/A Level)'] },
];

const IndividualForm = ({ apiUrl }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [instType, setInstType] = useState('');
  const [sidFileName, setSidFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [form, setForm] = useState({
    firstName: '', lastName: '', cnic: '', whatsapp: '', email: '',
    gender: '', age: '', city: '', milGov: '',
    instType: '', institution: '', campus: '', department: '', semester: '',
    collegeName: '', grade: '', board: '', collegeStream: '',
    attendDays: '',
    workshops: [] as string[],
  });

  const set = (name: string, value: string) => {
    setForm(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: false }));
  };

  const formatCnic = (v: string) => {
    let d = v.replace(/[^0-9]/g, '');
    if (d.length > 5) d = d.slice(0, 5) + '-' + d.slice(5);
    if (d.length > 13) d = d.slice(0, 13) + '-' + d.slice(13);
    return d.slice(0, 15);
  };

  const toggleWorkshop = (ws: string) => {
    setForm(p => ({
      ...p,
      workshops: p.workshops.includes(ws)
        ? p.workshops.filter(w => w !== ws)
        : [...p.workshops, ws]
    }));
    setErrors(p => ({ ...p, workshops: false }));
  };

  const handleScroll = () => {
    for (let i = 5; i >= 1; i--) {
      const el = document.getElementById(`ind-sec${i}`);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.6) {
        setCurrentStep(i);
        break;
      }
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, boolean> = {};
    if (!form.firstName.trim()) errs.firstName = true;
    if (!form.lastName.trim()) errs.lastName = true;
    if (!form.cnic.trim()) errs.cnic = true;
    if (!form.whatsapp.trim()) errs.whatsapp = true;
    if (!form.email.trim()) errs.email = true;
    if (!form.gender) errs.gender = true;
    if (!form.age) errs.age = true;
    if (!form.city) errs.city = true;
    if (!form.milGov) errs.milGov = true;
    if (!instType) errs.instType = true;
    if (instType === 'University') {
      if (!form.institution) errs.institution = true;
      if (!form.department) errs.department = true;
      if (!form.semester) errs.semester = true;
    }
    if (instType === 'College') {
      if (!form.collegeName.trim()) errs.collegeName = true;
      if (!form.grade) errs.grade = true;
      if (!form.board) errs.board = true;
      if (!form.collegeStream) errs.collegeStream = true;
    }
    if (!fileRef.current?.files?.length) errs.studentId = true;
    if (!form.attendDays) errs.attendDays = true;
    if (!form.workshops.length) errs.workshops = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const el = document.querySelector('.yunity-field.invalid');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setIsSubmitting(true);
    try {
      // Upload file to Drive via Google Apps Script
      let studentIdUrl = '';
      const file = fileRef.current?.files?.[0];
      if (file) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(file);
        });
        // Send file as base64 with separate request
        const fileData = new URLSearchParams();
        fileData.append('formType', 'fileUpload');
        fileData.append('fileName', file.name);
        fileData.append('mimeType', file.type);
        fileData.append('base64Data', base64);
        fileData.append('folder', 'YunityStudentIDs');
        await fetch(apiUrl, { method: 'POST', mode: 'no-cors', body: fileData });
        studentIdUrl = `[Uploaded: ${file.name}]`;
      }

      const submitData = new URLSearchParams();
      submitData.append('formType', 'yunityRegistration');
      submitData.append('timestamp', new Date().toISOString());
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'workshops') {
          submitData.append(key, (value as string[]).join(', '));
        } else {
          submitData.append(key, String(value));
        }
      });
      submitData.append('instType', instType);
      submitData.append('studentIdFile', studentIdUrl);

      await fetch(apiUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: submitData });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
      alert('Error submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="yunity-success">
        <div className="yunity-success-icon">✅</div>
        <h2>Registration Submitted!</h2>
        <p>Your student ID is being verified. You'll receive a confirmation email within 24 hours. Check your WhatsApp too — we may reach out directly. 💚</p>
      </div>
    );
  }

  return (
    <>
      {/* Progress Bar */}
      <div className="yunity-prog" onScroll={handleScroll}>
        <div className="yunity-prog-inner">
          <div className="yunity-steps">
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`yunity-step ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`} />
            ))}
          </div>
          <div className="yunity-prog-lbl">Step <span>{currentStep}</span> of 5</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate onScrollCapture={handleScroll}>
        {/* SEC 1: PERSONAL */}
        <div className="yunity-section" id="ind-sec1">
          <div className="yunity-sec-head">
            <div className="yunity-sec-num">1</div>
            <div className="yunity-sec-title">Personal Information</div>
          </div>

          <div className="yunity-row">
            <div className={`yunity-field ${errors.firstName ? 'invalid' : ''}`}>
              <label className="yunity-label">First Name <span className="req">*</span></label>
              <input className="yunity-input" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="First name" />
              <div className="yunity-err">Required</div>
            </div>
            <div className={`yunity-field ${errors.lastName ? 'invalid' : ''}`}>
              <label className="yunity-label">Last Name <span className="req">*</span></label>
              <input className="yunity-input" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Last name" />
              <div className="yunity-err">Required</div>
            </div>
          </div>

          <div className="yunity-row">
            <div className={`yunity-field ${errors.cnic ? 'invalid' : ''}`}>
              <label className="yunity-label">CNIC Number <span className="req">*</span></label>
              <input className="yunity-input" value={form.cnic} onChange={e => set('cnic', formatCnic(e.target.value))} placeholder="XXXXX-XXXXXXX-X" maxLength={15} />
              <div className="yunity-err">Enter valid CNIC</div>
            </div>
            <div className={`yunity-field ${errors.whatsapp ? 'invalid' : ''}`}>
              <label className="yunity-label">WhatsApp Number <span className="req">*</span></label>
              <input className="yunity-input" value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="03XX-XXXXXXX" />
              <div className="yunity-err">Required</div>
            </div>
          </div>

          <div className={`yunity-field ${errors.email ? 'invalid' : ''}`}>
            <label className="yunity-label">Email Address <span className="req">*</span></label>
            <input className="yunity-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" />
            <div className="yunity-err">Required</div>
          </div>

          <div className="yunity-row">
            <div className={`yunity-field ${errors.gender ? 'invalid' : ''}`}>
              <label className="yunity-label">Gender <span className="req">*</span></label>
              <select className="yunity-select" value={form.gender} onChange={e => set('gender', e.target.value)}>
                <option value="" disabled>Select</option>
                <option>Male</option><option>Female</option><option>Prefer not to say</option>
              </select>
              <div className="yunity-err">Required</div>
            </div>
            <div className={`yunity-field ${errors.age ? 'invalid' : ''}`}>
              <label className="yunity-label">Age <span className="req">*</span></label>
              <input className="yunity-input" type="number" value={form.age} onChange={e => set('age', e.target.value)} placeholder="e.g. 20" min={14} max={35} />
              <div className="yunity-err">Required</div>
            </div>
          </div>

          <div className={`yunity-field ${errors.city ? 'invalid' : ''}`}>
            <label className="yunity-label">City <span className="req">*</span></label>
            <select className="yunity-select" value={form.city} onChange={e => set('city', e.target.value)}>
              <option value="" disabled>Select your city</option>
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
            <div className="yunity-err">Required</div>
          </div>

          <div className={`yunity-field ${errors.milGov ? 'invalid' : ''}`}>
            <label className="yunity-label">Are you a child of a military or government employee? <span className="req">*</span></label>
            <div className="yunity-pills">
              {['Yes', 'No'].map(v => (
                <div className="yunity-pill" key={v}>
                  <input type="radio" name="milGov" id={`mg${v}`} value={v} checked={form.milGov === v} onChange={() => set('milGov', v)} />
                  <label htmlFor={`mg${v}`}>{v}</label>
                </div>
              ))}
            </div>
            <div className="yunity-err" style={errors.milGov ? { display: 'block' } : {}}>Required</div>
          </div>
        </div>

        {/* SEC 2: ACADEMIC */}
        <div className="yunity-section" id="ind-sec2">
          <div className="yunity-sec-head">
            <div className="yunity-sec-num">2</div>
            <div className="yunity-sec-title">Academic Information</div>
          </div>

          <div className={`yunity-field ${errors.instType ? 'invalid' : ''}`}>
            <label className="yunity-label">I am currently studying at a <span className="req">*</span></label>
            <div className="yunity-pills">
              {['University', 'College'].map(v => (
                <div className="yunity-pill" key={v}>
                  <input type="radio" name="instType" id={`it${v}`} value={v} checked={instType === v} onChange={() => { setInstType(v); setErrors(p => ({...p, instType: false})); }} />
                  <label htmlFor={`it${v}`}>{v}</label>
                </div>
              ))}
            </div>
            <div className="yunity-err" style={errors.instType ? { display: 'block' } : {}}>Required</div>
          </div>

          {instType === 'University' && (
            <>
              <div className={`yunity-field ${errors.institution ? 'invalid' : ''}`}>
                <label className="yunity-label">University Name <span className="req">*</span></label>
                <select className="yunity-select" value={form.institution} onChange={e => set('institution', e.target.value)}>
                  <option value="" disabled>Select your university</option>
                  {Object.entries(universities).map(([region, unis]) => (
                    <optgroup key={region} label={`── ${region} ──`}>
                      {unis.map(u => <option key={u}>{u}</option>)}
                    </optgroup>
                  ))}
                  <option value="Other">Other — not listed</option>
                </select>
                <div className="yunity-err">Required</div>
              </div>
              <div className="yunity-field">
                <label className="yunity-label">Campus <span className="opt">(if applicable)</span></label>
                <input className="yunity-input" value={form.campus} onChange={e => set('campus', e.target.value)} placeholder="e.g. H-12 Main Campus" />
              </div>
              <div className="yunity-row">
                <div className={`yunity-field ${errors.department ? 'invalid' : ''}`}>
                  <label className="yunity-label">Department <span className="req">*</span></label>
                  <select className="yunity-select" value={form.department} onChange={e => set('department', e.target.value)}>
                    <option value="" disabled>Select</option>
                    {departments.map(d => <option key={d}>{d}</option>)}
                  </select>
                  <div className="yunity-err">Required</div>
                </div>
                <div className={`yunity-field ${errors.semester ? 'invalid' : ''}`}>
                  <label className="yunity-label">Semester <span className="req">*</span></label>
                  <select className="yunity-select" value={form.semester} onChange={e => set('semester', e.target.value)}>
                    <option value="" disabled>Select</option>
                    {['1st','2nd','3rd','4th','5th','6th','7th','8th','Final Year'].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <div className="yunity-err">Required</div>
                </div>
              </div>
            </>
          )}

          {instType === 'College' && (
            <>
              <div className={`yunity-field ${errors.collegeName ? 'invalid' : ''}`}>
                <label className="yunity-label">College Name <span className="req">*</span></label>
                <input className="yunity-input" value={form.collegeName} onChange={e => set('collegeName', e.target.value)} placeholder="Enter your college name" />
                <div className="yunity-err">Required</div>
              </div>
              <div className="yunity-row">
                <div className={`yunity-field ${errors.grade ? 'invalid' : ''}`}>
                  <label className="yunity-label">Grade / Class <span className="req">*</span></label>
                  <select className="yunity-select" value={form.grade} onChange={e => set('grade', e.target.value)}>
                    <option value="" disabled>Select</option>
                    <option>1st Year (11th)</option><option>2nd Year (12th)</option>
                  </select>
                  <div className="yunity-err">Required</div>
                </div>
                <div className={`yunity-field ${errors.board ? 'invalid' : ''}`}>
                  <label className="yunity-label">Board <span className="req">*</span></label>
                  <select className="yunity-select" value={form.board} onChange={e => set('board', e.target.value)}>
                    <option value="" disabled>Select your board</option>
                    {boards.map(b => (
                      <optgroup key={b.group} label={`── ${b.group} ──`}>
                        {b.items.map(i => <option key={i}>{i}</option>)}
                      </optgroup>
                    ))}
                    <option>Other</option>
                  </select>
                  <div className="yunity-err">Required</div>
                </div>
              </div>
              <div className={`yunity-field ${errors.collegeStream ? 'invalid' : ''}`}>
                <label className="yunity-label">Stream / Subject Group <span className="req">*</span></label>
                <select className="yunity-select" value={form.collegeStream} onChange={e => set('collegeStream', e.target.value)}>
                  <option value="" disabled>Select</option>
                  {['Pre-Engineering (FSc)','Pre-Medical (FSc)','ICS — Computer Science','ICS — Statistics','FA — General','Commerce (ICom)','O Level / A Level','Other'].map(s => <option key={s}>{s}</option>)}
                </select>
                <div className="yunity-err">Required</div>
              </div>
            </>
          )}
        </div>

        {/* SEC 3: STUDENT ID */}
        <div className="yunity-section" id="ind-sec3">
          <div className="yunity-sec-head">
            <div className="yunity-sec-num">3</div>
            <div className="yunity-sec-title">Student ID Verification</div>
          </div>
          <div className="yunity-notice">
            <p>Upload a clear photo of your <strong>student ID card</strong>. Make sure your name and institution are fully visible and readable.</p>
          </div>
          <div className={`yunity-field ${errors.studentId ? 'invalid' : ''}`}>
            <label className="yunity-label">Student ID Card Photo <span className="req">*</span></label>
            <div className="yunity-file-zone" onClick={() => fileRef.current?.click()}>
              <input type="file" ref={fileRef} accept="image/*,.pdf" onChange={e => { setSidFileName(e.target.files?.[0]?.name || ''); setErrors(p => ({...p, studentId: false})); }} />
              <div style={{ fontSize: 26, marginBottom: 6 }}>🪪</div>
              <div className="yunity-file-hint">Tap to upload &nbsp;·&nbsp; <span>JPG, PNG or PDF</span></div>
              <div className="yunity-file-hint" style={{ marginTop: 3 }}>Max 5MB &nbsp;·&nbsp; Card must be clearly visible</div>
              <div className="yunity-file-name">{sidFileName && `✓ ${sidFileName}`}</div>
            </div>
            <div className="yunity-err" style={errors.studentId ? { display: 'block' } : {}}>Please upload your student ID card</div>
          </div>
        </div>

        {/* SEC 4: ATTENDANCE */}
        <div className="yunity-section" id="ind-sec4">
          <div className="yunity-sec-head">
            <div className="yunity-sec-num">4</div>
            <div className="yunity-sec-title">Event Attendance</div>
          </div>
          <div className={`yunity-field ${errors.attendDays ? 'invalid' : ''}`}>
            <label className="yunity-label">Which day(s) will you be attending? <span className="req">*</span></label>
            <div className="yunity-pills">
              {[
                { val: 'Day 1 only — Saturday 27 June', label: 'Day 1 only — Saturday 27 June' },
                { val: 'Day 2 only — Sunday 28 June', label: 'Day 2 only — Sunday 28 June' },
                { val: 'Both days — 27 & 28 June', label: 'Both days — 27 & 28 June 🔥' },
              ].map(d => (
                <div className="yunity-pill" key={d.val}>
                  <input type="radio" name="attendDays" id={`ad-${d.val}`} value={d.val} checked={form.attendDays === d.val} onChange={() => set('attendDays', d.val)} />
                  <label htmlFor={`ad-${d.val}`}>{d.label}</label>
                </div>
              ))}
            </div>
            <div className="yunity-err" style={errors.attendDays ? { display: 'block' } : {}}>Please select which day(s) you are attending</div>
          </div>
        </div>

        {/* SEC 5: WORKSHOPS */}
        <div className="yunity-section" id="ind-sec5">
          <div className="yunity-sec-head">
            <div className="yunity-sec-num">5</div>
            <div className="yunity-sec-title">Workshop Selection</div>
          </div>
          <div className="yunity-notice">
            <p>Select the workshops you want to attend. <strong>Timings and room assignments will be emailed to you once confirmed.</strong> You can select from any pillar.</p>
          </div>
          <div className="yunity-ws-grid">
            {workshops.map(ws => (
              <div className="yunity-ws-item" key={ws.id}>
                <input type="checkbox" id={ws.id} checked={form.workshops.includes(ws.name)} onChange={() => toggleWorkshop(ws.name)} />
                <label htmlFor={ws.id}>
                  <span className="yunity-ws-pillar">{ws.pillar}</span>
                  <span className="yunity-ws-name">{ws.name}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="yunity-err" style={errors.workshops ? { display: 'block', marginTop: 10 } : { marginTop: 10 }}>Please select at least one workshop</div>
        </div>

        <div className="yunity-submit-wrap">
          <button type="submit" className="yunity-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Complete Registration →'}
          </button>
          <p className="yunity-submit-note">By registering you confirm you are a current student. Your ID will be verified before your confirmation is sent.</p>
        </div>
      </form>
    </>
  );
};

export default IndividualForm;
