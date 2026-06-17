import { useState, useRef } from 'react';

interface Props { apiUrl: string; }

const roles = [
  { group: 'Media & Production', items: [
    { name: 'Videographer — Main Stage', desc: 'Fixed camera coverage of all on-stage sessions, keynotes and ceremonies' },
    { name: 'Videographer — Roaming & Workshops', desc: 'Crowd energy, workshop rooms, networking zones and event atmosphere' },
    { name: 'Photographer — Stage & Ceremonies', desc: 'High-resolution stills of speakers, panels, awards and key moments' },
    { name: 'Photographer — Candid & Crowd', desc: 'Audience reactions, peer interactions, workshop participation and event energy' },
    { name: 'BTS Videographer', desc: 'Behind-the-scenes content — team moments, setup, crew interactions and Stories content' },
    { name: 'Short-Form Content Creator (Reels / TikTok)', desc: 'Vertical video, fast mobile edits, trend-aware content — 3 to 5 clips per day' },
  ]},
  { group: 'Post-Production', items: [
    { name: 'Video Editor — Live On-Site', desc: 'Same-day recap reels and hype cuts, Day 1 recap published within 2 hours of close' },
    { name: 'Video Editor — Post-Production', desc: 'Full highlight video, promo packages and post-event content delivery' },
    { name: 'Graphic Designer', desc: 'Social posts, standees, certificates, stage backdrop, speaker cards and branded event materials' },
  ]},
  { group: 'Marketing & Communications', items: [
    { name: 'Social Media Manager', desc: 'Publishing posts, managing stories, live coverage and real-time audience engagement' },
    { name: 'Content & Copywriter', desc: 'Captions, announcements, WhatsApp broadcasts, scheduling and content queue management' },
  ]},
  { group: 'Operations & On-Ground', items: [
    { name: 'Logistics Coordinator', desc: 'Setup, teardown, equipment movement, vendor coordination and inter-team communication' },
    { name: 'Stage & AV Technician', desc: 'Slides, microphone switching, sound levels, lighting cues and live AV troubleshooting' },
    { name: 'Programme Coordinator (Off-Stage)', desc: 'Speaker queue management, schedule adherence and last-minute programme changes' },
    { name: 'VIP & Protocol Volunteer', desc: 'Escorting VIP guests, green room coordination and high-profile guest management' },
    { name: 'Operations Volunteer — General', desc: 'On-ground runner, crowd flow, directional assistance and general support' },
    { name: 'Security Volunteer — Male', desc: 'Entry points, credential checks, crowd control and emergency response support' },
  ]},
];

const cities = ['Islamabad','Rawalpindi','Lahore','Peshawar','Faisalabad','Karachi','Multan','Quetta','Other'];

const TeamForm = ({ apiUrl }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [cvFileName, setCvFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [form, setForm] = useState({
    firstName: '', lastName: '', cnic: '', whatsapp: '', email: '',
    gender: '', age: '', city: '',
    background: '', institution: '', department: '', semester: '',
    jobTitle: '', hoursPerDay: '', daysPerWeek: '', dailyJune: '',
    selectedRoles: [] as string[],
    skills: '', eventExp: '', portfolioLink: '',
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

  const toggleRole = (role: string) => {
    setForm(p => {
      if (p.selectedRoles.includes(role)) {
        return { ...p, selectedRoles: p.selectedRoles.filter(r => r !== role) };
      }
      if (p.selectedRoles.length >= 2) {
        alert('You can select a maximum of 2 roles.');
        return p;
      }
      return { ...p, selectedRoles: [...p.selectedRoles, role] };
    });
    setErrors(p => ({ ...p, selectedRoles: false }));
  };

  const handleScroll = () => {
    for (let i = 4; i >= 1; i--) {
      const el = document.getElementById(`team-sec${i}`);
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
    if (!form.age.trim()) errs.age = true;
    if (!form.city) errs.city = true;
    if (!form.background) errs.background = true;
    if (!form.hoursPerDay) errs.hoursPerDay = true;
    if (!form.daysPerWeek) errs.daysPerWeek = true;
    if (!form.dailyJune) errs.dailyJune = true;
    if (!form.selectedRoles.length) errs.selectedRoles = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const el = document.querySelector('.yunity-field.invalid, .has-error');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setIsSubmitting(true);
    try {
      // Upload CV if present
      let cvUrl = '';
      const file = fileRef.current?.files?.[0];
      if (file) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(file);
        });
        const fileData = new URLSearchParams();
        fileData.append('formType', 'fileUpload');
        fileData.append('fileName', file.name);
        fileData.append('mimeType', file.type);
        fileData.append('base64Data', base64);
        fileData.append('folder', 'YunityTeamCVs');
        await fetch(apiUrl, { method: 'POST', mode: 'no-cors', body: fileData });
        cvUrl = `[Uploaded: ${file.name}]`;
      }

      const submitData = new URLSearchParams();
      submitData.append('formType', 'yunityTeamApplication');
      submitData.append('timestamp', new Date().toISOString());
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'selectedRoles') {
          submitData.append('roles', (value as string[]).join(', '));
        } else {
          submitData.append(key, String(value));
        }
      });
      submitData.append('cvFile', cvUrl);

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
        <h2>Application Submitted</h2>
        <p>Thank you for applying to Team YUNI-TY 2026. Our team will review your application and reach out on WhatsApp within 48 hours to schedule your interview.</p>
      </div>
    );
  }

  return (
    <>
      {/* Progress Bar */}
      <div className="yunity-prog" onScroll={handleScroll}>
        <div className="yunity-prog-inner">
          <div className="yunity-steps">
            {[1,2,3,4].map(i => (
              <div key={i} className={`yunity-step ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`} />
            ))}
          </div>
          <div className="yunity-prog-lbl">Step <span>{currentStep}</span> of 4</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate onScrollCapture={handleScroll}>
        {/* SEC 1: PERSONAL */}
        <div className="yunity-section" id="team-sec1">
          <div className="yunity-sec-head">
            <div className="yunity-sec-num">1</div>
            <div className="yunity-sec-title">Personal Information</div>
          </div>

          <div className="yunity-row">
            <div className={`yunity-field ${errors.firstName ? 'invalid' : ''}`}>
              <label className="yunity-label">First Name <span className="req">*</span></label>
              <input className="yunity-input" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Your first name" />
              <div className="yunity-err">Required</div>
            </div>
            <div className={`yunity-field ${errors.lastName ? 'invalid' : ''}`}>
              <label className="yunity-label">Last Name <span className="req">*</span></label>
              <input className="yunity-input" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Your last name" />
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
                <option value="" disabled>Select gender</option>
                <option>Male</option><option>Female</option><option>Prefer not to say</option>
              </select>
              <div className="yunity-err">Required</div>
            </div>
            <div className={`yunity-field ${errors.age ? 'invalid' : ''}`}>
              <label className="yunity-label">Age <span className="req">*</span></label>
              <input className="yunity-input" value={form.age} onChange={e => set('age', e.target.value)} placeholder="Your age" />
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
        </div>

        {/* SEC 2: BACKGROUND */}
        <div className="yunity-section" id="team-sec2">
          <div className="yunity-sec-head">
            <div className="yunity-sec-num">2</div>
            <div className="yunity-sec-title">Background</div>
          </div>

          <div className={`yunity-field ${errors.background ? 'invalid' : ''}`}>
            <label className="yunity-label">I am currently a <span className="req">*</span></label>
            <div className="yunity-pills">
              {['Student', 'Working Professional', 'Both'].map(v => (
                <div className="yunity-pill" key={v}>
                  <input type="radio" name="background" id={`bg-${v}`} value={v} checked={form.background === v} onChange={() => set('background', v)} />
                  <label htmlFor={`bg-${v}`}>{v}</label>
                </div>
              ))}
            </div>
            <div className="yunity-err" style={errors.background ? { display: 'block' } : {}}>Please select one</div>
          </div>

          {(form.background === 'Student' || form.background === 'Both') && (
            <>
              <div className="yunity-field">
                <label className="yunity-label">University / College <span className="opt">(optional)</span></label>
                <input className="yunity-input" value={form.institution} onChange={e => set('institution', e.target.value)} placeholder="Name of your institution" />
              </div>
              <div className="yunity-row">
                <div className="yunity-field">
                  <label className="yunity-label">Department / Stream <span className="opt">(optional)</span></label>
                  <input className="yunity-input" value={form.department} onChange={e => set('department', e.target.value)} placeholder="e.g. Computer Science" />
                </div>
                <div className="yunity-field">
                  <label className="yunity-label">Semester / Year <span className="opt">(optional)</span></label>
                  <select className="yunity-select" value={form.semester} onChange={e => set('semester', e.target.value)}>
                    <option value="" disabled>Select</option>
                    {['1st Semester','2nd Semester','3rd Semester','4th Semester','5th Semester','6th Semester','7th Semester','8th Semester','1st Year (College)','2nd Year (College)','Final Year'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          {(form.background === 'Working Professional' || form.background === 'Both') && (
            <div className="yunity-field">
              <label className="yunity-label">Current Job Title / Profession <span className="opt">(optional)</span></label>
              <input className="yunity-input" value={form.jobTitle} onChange={e => set('jobTitle', e.target.value)} placeholder="e.g. Freelance Videographer, Marketing Executive" />
            </div>
          )}

          <div className="yunity-row">
            <div className={`yunity-field ${errors.hoursPerDay ? 'invalid' : ''}`}>
              <label className="yunity-label">Hours available per day <span className="req">*</span></label>
              <select className="yunity-select" value={form.hoursPerDay} onChange={e => set('hoursPerDay', e.target.value)}>
                <option value="" disabled>Select</option>
                <option>2 – 3 hours</option><option>3 – 4 hours</option><option>4 – 5 hours</option><option>5+ hours</option>
              </select>
              <div className="yunity-err">Required</div>
            </div>
            <div className={`yunity-field ${errors.daysPerWeek ? 'invalid' : ''}`}>
              <label className="yunity-label">Days available per week <span className="req">*</span></label>
              <select className="yunity-select" value={form.daysPerWeek} onChange={e => set('daysPerWeek', e.target.value)}>
                <option value="" disabled>Select</option>
                <option>1 – 2 days</option><option>3 days</option><option>4 days</option><option>5+ days</option>
              </select>
              <div className="yunity-err">Required</div>
            </div>
          </div>

          <div className={`yunity-field ${errors.dailyJune ? 'invalid' : ''}`}>
            <label className="yunity-label">Available daily from 20th June onwards? <span className="req">*</span></label>
            <div className="yunity-pills">
              {['Yes', 'No'].map(v => (
                <div className="yunity-pill" key={v}>
                  <input type="radio" name="dailyJune" id={`dj-${v}`} value={v} checked={form.dailyJune === v} onChange={() => set('dailyJune', v)} />
                  <label htmlFor={`dj-${v}`}>{v}</label>
                </div>
              ))}
            </div>
            <div className="yunity-err" style={errors.dailyJune ? { display: 'block' } : {}}>Please select one</div>
          </div>
        </div>

        {/* SEC 3: ROLE */}
        <div className="yunity-section" id="team-sec3">
          <div className="yunity-sec-head">
            <div className="yunity-sec-num">3</div>
            <div className="yunity-sec-title">Role Preference</div>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 16, lineHeight: 1.7 }}>
            Select <strong style={{ color: 'var(--text-primary)' }}>up to 2 roles</strong> you are most suited for. Final assignments are confirmed after your interview.
          </p>

          <div className={`yunity-field ${errors.selectedRoles ? 'invalid' : ''}`}>
            <div className="yunity-role-table">
              {roles.map(group => (
                <div key={group.group}>
                  <div className="yunity-role-group">{group.group}</div>
                  {group.items.map(role => (
                    <label className="yunity-role-row" key={role.name}>
                      <div className="yunity-role-check">
                        <input type="checkbox" checked={form.selectedRoles.includes(role.name)} onChange={() => toggleRole(role.name)} />
                      </div>
                      <div className="yunity-role-info">
                        <div className="yunity-role-name" style={form.selectedRoles.includes(role.name) ? { color: 'var(--pk-green)' } : {}}>{role.name}</div>
                        <div className="yunity-role-desc">{role.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              ))}
            </div>
            <div className="yunity-err" style={errors.selectedRoles ? { display: 'block', marginTop: 8 } : { marginTop: 8 }}>Please select at least one role</div>
          </div>
        </div>

        {/* SEC 4: EXPERIENCE */}
        <div className="yunity-section" id="team-sec4">
          <div className="yunity-sec-head">
            <div className="yunity-sec-num">4</div>
            <div className="yunity-sec-title">Skills & Experience</div>
          </div>

          <div className="yunity-field">
            <label className="yunity-label">Relevant Skills <span className="opt">(optional)</span></label>
            <input className="yunity-input" value={form.skills} onChange={e => set('skills', e.target.value)} placeholder="e.g. Premiere Pro, DSLR, Canva, Photoshop, event coordination..." />
          </div>

          <div className="yunity-field">
            <label className="yunity-label">Previous Event Experience <span className="opt">(optional)</span></label>
            <textarea className="yunity-textarea" value={form.eventExp} onChange={e => set('eventExp', e.target.value)} placeholder={"List any events you've worked on. Include the event name, your role, and what you did.\n\ne.g. NUST Procom 2024 — Photography Lead."} />
          </div>

          <div className="yunity-field">
            <label className="yunity-label">Portfolio or CV Link <span className="opt">(optional)</span></label>
            <input className="yunity-input" value={form.portfolioLink} onChange={e => set('portfolioLink', e.target.value)} placeholder="Behance, LinkedIn, Google Drive, Instagram..." />
          </div>

          <div className="yunity-field">
            <label className="yunity-label">Upload CV or Portfolio <span className="opt">(optional)</span></label>
            <div className="yunity-file-zone" onClick={() => fileRef.current?.click()}>
              <input type="file" ref={fileRef} accept=".pdf,.doc,.docx,image/*,.zip" onChange={e => setCvFileName(e.target.files?.[0]?.name || '')} />
              <div style={{ fontSize: 22, marginBottom: 6 }}>📎</div>
              <div className="yunity-file-hint">Click to upload &nbsp;·&nbsp; <span>PDF, Word, Image or ZIP</span></div>
              <div className="yunity-file-hint" style={{ marginTop: 3 }}>Max 10MB</div>
              <div className="yunity-file-name">{cvFileName && `✓ ${cvFileName}`}</div>
            </div>
          </div>
        </div>

        <div className="yunity-submit-wrap">
          <button type="submit" className="yunity-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
          <p className="yunity-submit-note">
            Applications are reviewed by our team. You will be contacted on WhatsApp within 48 hours to schedule your interview.<br />
            All team members receive an official YUNI-TY 2026 certificate regardless of role.
          </p>
        </div>
      </form>
    </>
  );
};

export default TeamForm;
