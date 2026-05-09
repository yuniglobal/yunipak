'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "What is the difference between Online, Hybrid, and On-Site?",
    answer: "Online is fully remote via our LMS. Hybrid combines online learning with occasional in-person sessions at NASTP. On-Site is fully in-person at our Islamabad campus."
  },
  {
    question: "Do I get a certificate upon completion?",
    answer: "Yes! All students receive an industry-recognized certificate upon successfully completing their course and assessments."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <style>{`
        .faq-section {
          max-width: 720px;
          margin: 0 auto;
          padding: 8rem 1.5rem;
        }

        .faq-title {
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          font-weight: 900;
          text-align: center;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 3rem;
        }

        .faq-item {
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          margin-bottom: 12px;
          overflow: hidden;
          transition: border-color 0.3s ease;
          background: rgba(255, 255, 255, 0.02);
        }

        .faq-item:hover {
          border-color: rgba(16, 185, 129, 0.3);
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          gap: 1rem;
        }

        .faq-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #ffffff;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .faq-icon.open {
          border-color: #10b981;
          color: #10b981;
          transform: rotate(45deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.35s ease;
          padding: 0 1.5rem;
          color: #9ca3af;
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .faq-answer.open {
          max-height: 200px;
          padding: 0 1.5rem 1.25rem;
        }
      `}</style>

      <div className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>

        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggle(index)}
            >
              {faq.question}
              <span className={`faq-icon ${openIndex === index ? 'open' : ''}`}>
                +
              </span>
            </button>
            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}