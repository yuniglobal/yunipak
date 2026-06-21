import Trainings from "../components/Courses/trainings";
import SummerCamp from "../components/Courses/summercamp";

export default function TrainingsPage() {
  return (
    <main>
      <Trainings />
      <SummerCamp />
      
      <section className="section-container" style={{ padding: '8rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">5K+</div>
            <div className="stat-label">Trained</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Trainings</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Success</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>

        <style>{`
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          @media (min-width: 1024px) {
            .stats-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          .stat-item {
            padding: 3rem 1.5rem;
            text-align: center;
            border-radius: var(--card-radius);
            background: var(--bg-secondary);
            border: 1px solid var(--border-light);
            transition: all 0.4s var(--transition-smooth);
          }

          .stat-item:hover {
            background: var(--bg-primary);
            border-color: var(--pk-green);
            transform: translateY(-10px);
            box-shadow: 0 20px 40px var(--glass-shadow);
          }

          .stat-number {
            font-size: 3.5rem;
            font-weight: 900;
            color: var(--pk-green);
            line-height: 1;
            margin-bottom: 0.5rem;
          }

          .stat-label {
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-size: 0.75rem;
            color: var(--text-tertiary);
          }

          @media (max-width: 768px) {
            .stats-grid {
              grid-template-columns: 1fr;
            }
            .stat-item {
              padding: 1.5rem;
            }
          }
        `}</style>
      </section>
    </main>
  );
}
