import { useState } from 'react';
import IndividualForm from './IndividualForm';
import TeamForm from './TeamForm';

const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbxv3FVEPexjV4hLcAWNj6FafStyFzqzrJWzo-Zk8FJFOWkxw-mh9bxNi-ZYbwnLHyfzxg/exec';

const Registration = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'team'>('individual');

  return (
    <>
      <style>{`
        .reg-page { min-height: 100vh; background: var(--bg-primary); }

        /* HERO */
        .reg-hero {
          position: relative; overflow: hidden;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-light);
          padding: 8rem 1.5rem 3.5rem; text-align: center;
        }
        .reg-hero::before {
          content: ''; position: absolute; top: -120px; right: -120px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, var(--pk-green-glow) 0%, transparent 70%);
          pointer-events: none; opacity: 0.5;
        }
        .reg-hero::after {
          content: ''; position: absolute; bottom: -80px; left: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, var(--pk-green-glow-subtle) 0%, transparent 70%);
          pointer-events: none;
        }
        .reg-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--bg-elevated); border: 1px solid var(--border-light);
          border-radius: 100px; padding: 6px 16px; margin-bottom: 20px;
          font-size: 11px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: var(--pk-green);
        }
        .reg-hero h1 {
          font-family: 'Outfit', sans-serif; font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 900; line-height: 1.1; margin-bottom: 12px;
          color: var(--text-primary);
        }
        .reg-hero h1 span { color: var(--pk-green); }
        .reg-hero-sub {
          font-size: 14px; color: var(--text-tertiary); margin-bottom: 28px;
          max-width: 500px; margin-left: auto; margin-right: auto;
        }
        .reg-stats { display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; }
        .reg-stat-val {
          font-family: 'Outfit', sans-serif; font-size: 22px;
          font-weight: 800; color: var(--pk-green); line-height: 1;
        }
        .reg-stat-lbl {
          font-size: 10px; color: var(--text-tertiary);
          letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px;
        }

        /* TAB SWITCHER */
        .reg-tabs-wrap {
          position: sticky; top: 70px; z-index: 50;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-light);
          padding: 0 1.5rem;
        }
        .reg-tabs {
          max-width: 720px; margin: 0 auto;
          display: flex; gap: 0;
        }
        .reg-tab {
          flex: 1; padding: 16px 20px; text-align: center;
          font-size: 13px; font-weight: 700; letter-spacing: 0.5px;
          color: var(--text-tertiary); cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.25s ease; background: none; border-top: none;
          border-left: none; border-right: none;
          font-family: 'Inter', sans-serif;
        }
        .reg-tab:hover { color: var(--text-secondary); }
        .reg-tab.active {
          color: var(--pk-green);
          border-bottom-color: var(--pk-green);
          background: var(--pk-green-glow-subtle);
        }
        .reg-tab-icon { font-size: 18px; display: block; margin-bottom: 4px; }

        /* FORM CONTAINER */
        .reg-form-container {
          max-width: 720px; margin: 0 auto;
          padding: 36px 20px 80px;
        }

        /* SHARED FORM STYLES */
        .yunity-section { margin-bottom: 36px; }
        .yunity-sec-head {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px; padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
        }
        .yunity-sec-num {
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--pk-green); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800; flex-shrink: 0;
        }
        .yunity-sec-title {
          font-size: 13px; font-weight: 700; color: var(--text-primary);
          letter-spacing: 0.5px; text-transform: uppercase;
        }
        .yunity-field { margin-bottom: 18px; }
        .yunity-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media(max-width:560px){ .yunity-row { grid-template-columns: 1fr; } }
        .yunity-label {
          display: block; font-size: 12px; font-weight: 600;
          color: var(--text-secondary); margin-bottom: 7px;
        }
        .yunity-label .req { color: var(--pk-green); margin-left: 2px; }
        .yunity-label .opt { color: var(--text-tertiary); font-weight: 400; font-size: 11px; }
        .yunity-input, .yunity-select, .yunity-textarea {
          width: 100%; background: var(--bg-elevated);
          border: 1px solid var(--border-light); border-radius: 8px;
          color: var(--text-primary); font-family: 'Inter', sans-serif;
          font-size: 13px; padding: 11px 14px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
        }
        .yunity-input::placeholder, .yunity-textarea::placeholder {
          color: var(--text-tertiary); opacity: 0.5;
        }
        .yunity-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230c6238' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          padding-right: 36px;
        }
        .yunity-select option { background: var(--bg-elevated); }
        .yunity-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
        .yunity-input:focus, .yunity-select:focus, .yunity-textarea:focus {
          border-color: var(--pk-green);
          box-shadow: 0 0 0 3px var(--pk-green-glow-subtle);
        }
        .yunity-field.invalid .yunity-input,
        .yunity-field.invalid .yunity-select {
          border-color: #e05555;
        }
        .yunity-err {
          font-size: 11px; color: #e05555; margin-top: 5px; display: none;
        }
        .yunity-field.invalid .yunity-err { display: block; }

        /* PILLS */
        .yunity-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .yunity-pill { position: relative; }
        .yunity-pill input { position: absolute; opacity: 0; width: 0; height: 0; }
        .yunity-pill label {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--bg-elevated); border: 1px solid var(--border-light);
          border-radius: 6px; padding: 9px 14px; font-size: 12px;
          color: var(--text-tertiary); cursor: pointer;
          transition: all 0.15s; margin: 0; font-weight: 500;
        }
        .yunity-pill input:checked + label {
          background: var(--pk-green-glow-subtle);
          border-color: var(--pk-green); color: var(--pk-green); font-weight: 600;
        }
        .yunity-pill label:hover {
          border-color: var(--pk-green); color: var(--text-secondary);
        }

        /* WORKSHOP GRID */
        .yunity-ws-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        @media(max-width:560px){ .yunity-ws-grid { grid-template-columns: 1fr; } }
        .yunity-ws-item { position: relative; }
        .yunity-ws-item input { position: absolute; opacity: 0; width: 0; height: 0; }
        .yunity-ws-item label {
          display: flex; flex-direction: column; gap: 2px;
          background: var(--bg-elevated); border: 1px solid var(--border-light);
          border-radius: 8px; padding: 12px 14px; cursor: pointer;
          transition: all 0.15s; margin: 0; height: 100%;
        }
        .yunity-ws-item input:checked + label {
          background: var(--pk-green-glow-subtle);
          border-color: var(--pk-green);
        }
        .yunity-ws-item label:hover { border-color: var(--pk-green); }
        .yunity-ws-pillar {
          font-size: 9px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: var(--text-tertiary);
        }
        .yunity-ws-item input:checked + label .yunity-ws-pillar { color: var(--pk-green); }
        .yunity-ws-name {
          font-size: 11px; font-weight: 600;
          color: var(--text-secondary); line-height: 1.3;
        }
        .yunity-ws-item input:checked + label .yunity-ws-name { color: var(--text-primary); }

        /* ROLE TABLE */
        .yunity-role-table {
          border: 1px solid var(--border-light); border-radius: 10px; overflow: hidden;
        }
        .yunity-role-group {
          background: var(--bg-tertiary); padding: 8px 14px;
          font-size: 10px; font-weight: 700; color: var(--text-tertiary);
          letter-spacing: 1.5px; text-transform: uppercase;
          border-bottom: 1px solid var(--border-light);
        }
        .yunity-role-row {
          display: flex; align-items: flex-start; gap: 0;
          border-bottom: 1px solid var(--border-light);
          transition: background 0.12s; cursor: pointer;
        }
        .yunity-role-row:last-child { border-bottom: none; }
        .yunity-role-row:hover { background: var(--pk-green-glow-subtle); }
        .yunity-role-check {
          padding: 14px; display: flex; align-items: flex-start; padding-top: 16px;
        }
        .yunity-role-check input {
          width: 16px; height: 16px; accent-color: var(--pk-green);
          cursor: pointer; margin: 0; flex-shrink: 0;
        }
        .yunity-role-info { flex: 1; padding: 13px 14px 13px 0; }
        .yunity-role-name {
          font-size: 13px; font-weight: 600;
          color: var(--text-primary); margin-bottom: 3px;
        }
        .yunity-role-desc {
          font-size: 11px; color: var(--text-tertiary); line-height: 1.5;
        }

        /* FILE UPLOAD */
        .yunity-file-zone {
          background: var(--bg-elevated);
          border: 1.5px dashed var(--pk-green);
          border-radius: 10px; padding: 20px; text-align: center;
          cursor: pointer; transition: all 0.2s; opacity: 0.7;
        }
        .yunity-file-zone:hover {
          opacity: 1; background: var(--pk-green-glow-subtle);
        }
        .yunity-file-zone input { display: none; }
        .yunity-file-hint {
          font-size: 12px; color: var(--text-tertiary);
        }
        .yunity-file-hint span { color: var(--pk-green); font-weight: 600; }
        .yunity-file-name {
          font-size: 11px; color: var(--pk-green); margin-top: 6px; min-height: 16px;
        }

        /* NOTICE */
        .yunity-notice {
          background: var(--pk-green-glow-subtle);
          border: 1px solid var(--border-light);
          border-left: 3px solid var(--pk-green);
          border-radius: 8px; padding: 14px 16px; margin-bottom: 18px;
        }
        .yunity-notice p {
          font-size: 12px; color: var(--text-secondary); line-height: 1.7; margin: 0;
        }
        .yunity-notice strong { color: var(--pk-green); }

        /* PROGRESS */
        .yunity-prog {
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-light);
          padding: 14px 24px; position: sticky; top: 120px; z-index: 40;
        }
        .yunity-prog-inner { max-width: 720px; margin: 0 auto; }
        .yunity-steps { display: flex; gap: 5px; margin-bottom: 7px; }
        .yunity-step {
          flex: 1; height: 3px; background: var(--border-light);
          border-radius: 2px; transition: background 0.3s;
        }
        .yunity-step.done { background: var(--pk-green); }
        .yunity-step.active { background: var(--pk-green); opacity: 0.5; }
        .yunity-prog-lbl { font-size: 10px; color: var(--text-tertiary); }
        .yunity-prog-lbl span { color: var(--pk-green); font-weight: 600; }

        /* SUBMIT */
        .yunity-submit-wrap { margin-top: 36px; }
        .yunity-submit-btn {
          width: 100%; background: var(--pk-green); color: #fff;
          font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 800;
          padding: 16px; border: none; border-radius: 10px; cursor: pointer;
          letter-spacing: 0.5px; transition: all 0.2s; text-transform: uppercase;
        }
        .yunity-submit-btn:hover {
          background: var(--pk-green-light); color: #000;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px var(--pk-green-glow);
        }
        .yunity-submit-btn:disabled {
          opacity: 0.6; cursor: not-allowed; transform: none;
        }
        .yunity-submit-note {
          font-size: 11px; color: var(--text-tertiary);
          text-align: center; margin-top: 10px; line-height: 1.6;
        }

        /* SUCCESS */
        .yunity-success {
          text-align: center; padding: 80px 24px;
        }
        .yunity-success-icon { font-size: 56px; margin-bottom: 20px; }
        .yunity-success h2 {
          font-family: 'Outfit', sans-serif; font-size: 28px;
          font-weight: 800; color: var(--pk-green); margin-bottom: 12px;
        }
        .yunity-success p {
          font-size: 14px; color: var(--text-tertiary);
          line-height: 1.8; max-width: 420px; margin: 0 auto;
        }
      `}</style>

      <div className="reg-page">
        {/* HERO */}
        <div className="reg-hero">
          <div className="reg-eyebrow">NASTP · PSEB · Pakistan Film Society</div>
          <h1>YUNI-TY 2026<br /><span>Open Learning Weekend</span></h1>
          <p className="reg-hero-sub">
            27 – 28 June 2026 &nbsp;·&nbsp; NASTP Arena, Rawalpindi &nbsp;·&nbsp; Free Entry
          </p>
          <div className="reg-stats">
            <div><div className="reg-stat-val">2,000+</div><div className="reg-stat-lbl">Students</div></div>
            <div><div className="reg-stat-val">2</div><div className="reg-stat-lbl">Days</div></div>
            <div><div className="reg-stat-val">12</div><div className="reg-stat-lbl">Workshops</div></div>
            <div><div className="reg-stat-val">100%</div><div className="reg-stat-lbl">Free</div></div>
          </div>
        </div>

        {/* TABS */}
        <div className="reg-tabs-wrap">
          <div className="reg-tabs">
            <button
              className={`reg-tab ${activeTab === 'individual' ? 'active' : ''}`}
              onClick={() => setActiveTab('individual')}
            >
              <span className="reg-tab-icon">🎓</span>
              Event Registration
            </button>
            <button
              className={`reg-tab ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              <span className="reg-tab-icon">🤝</span>
              Join the Team
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="reg-form-container">
          {activeTab === 'individual'
            ? <IndividualForm apiUrl={GOOGLE_SHEETS_API} />
            : <TeamForm apiUrl={GOOGLE_SHEETS_API} />
          }
        </div>
      </div>
    </>
  );
};

export default Registration;
