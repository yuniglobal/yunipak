import { useLayoutEffect } from 'react';

const RegistrationTeam = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="registration-page-wrapper">
      <style>{`
        .registration-page-wrapper {
          padding-top: calc(var(--banner-height, 0px) + 140px);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        @media (max-width: 768px) {
          .registration-page-wrapper {
            padding-top: calc(var(--banner-height, 0px) + 100px);
          }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: '900px', padding: '0 15px', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Event Team <span style={{ color: 'var(--pk-green)' }}>Registration</span>
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Please fill out the form below to register your team.
        </p>
        
        <div style={{ 
          background: 'var(--glass-bg)', 
          backdropFilter: 'blur(25px) saturate(200%)',
          borderRadius: '24px', 
          border: '1px solid var(--glass-border)',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}>
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSd-Crrom74gDny7YoGfsbIFkbfpZ_abt9YIJW3pdD-l35FoDA/viewform?embedded=true" 
            width="100%" 
            height="1200" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            style={{ border: 'none', display: 'block' }}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default RegistrationTeam;
