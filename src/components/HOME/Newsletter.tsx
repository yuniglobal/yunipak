'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <>
      <style>{`
        .newsletter-wrapper {
          padding: 4rem 1.5rem;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .newsletter-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 4rem 3rem;
          width: 100%;
          max-width: 800px;
          text-align: center;
        }

        .newsletter-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .newsletter-sub {
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 2.5rem;
        }

        .newsletter-form {
          display: flex;
          gap: 12px;
          max-width: 520px;
          margin: 0 auto;
          flex-wrap: wrap;
          justify-content: center;
        }

        .newsletter-input {
          flex: 1;
          min-width: 240px;
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          color: #ffffff;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .newsletter-input::placeholder {
          color: #4b5563;
        }

        .newsletter-input:focus {
          border-color: #10b981;
        }

        .newsletter-btn {
          padding: 14px 28px;
          background: #10b981;
          border: none;
          border-radius: 12px;
          color: #000000;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          opacity: 0.85;
        }

        .success-msg {
          color: #10b981;
          font-size: 1rem;
          font-weight: 600;
          margin-top: 1rem;
        }

        @media (max-width: 640px) {
          .newsletter-card {
            padding: 2.5rem 1.5rem;
          }
          .newsletter-form {
            flex-direction: column;
          }
          .newsletter-input {
            min-width: 100%;
          }
          .newsletter-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="newsletter-wrapper">
        <div className="newsletter-card">
          <h2 className="newsletter-title">Join the Inner Circle</h2>
          <p className="newsletter-sub">
            Get early access to tech insights and NASTP events.
          </p>

          {subscribed ? (
            <p className="success-msg">✅ You're in! Welcome to the Inner Circle.</p>
          ) : (
            <div className="newsletter-form">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              />
              <button className="newsletter-btn" onClick={handleSubscribe}>
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}