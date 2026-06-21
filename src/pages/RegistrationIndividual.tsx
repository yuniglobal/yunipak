import { useLayoutEffect } from 'react';

const RegistrationIndividual = () => {
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
          Individual <span style={{ color: 'var(--pk-green)' }}>Registration</span>
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Please fill out the form below to register individually.
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
            src="/registration-form.html" 
            width="100%" 
            height="1500" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            style={{ border: 'none', display: 'block' }}
          >
            Loading form...
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default RegistrationIndividual;
