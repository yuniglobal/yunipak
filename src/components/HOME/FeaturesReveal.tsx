import { useEffect } from 'react';
import type { ReactElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image1 from '../../assets/1.webp';
import Image2 from '../../assets/2.webp';
import Image3 from '../../assets/3.jpg';
import Image4 from '../../assets/1.avif';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  id: number;
  image: string;
  title: string;
  description: string;
  align: 'left' | 'right';
}

const featuresData: FeatureItem[] = [
  {
    id: 1,
    image: Image1,
    title: 'Khudi → Self-Mastery',
    description: 'Build confidence, discipline, and clarity. Discover your worth and stop chasing shortcuts.',
    align: 'left',
  },
  {
    id: 2,
    image: Image2,
    title: 'Skills → Economic Power',
    description: 'Learn practical skills in tech, marketing, and freelancing. Turn learning into earning.',
    align: 'right',
  },
  {
    id: 3,
    image: Image3,
    title: 'Technology → National Growth',
    description: 'Master cybersecurity, AI, and development. Transform Pakistan from users to builders.',
    align: 'left',
  },
  {
    id: 4,
    image: Image4,
    title: 'Unity → Collective Strength',
    description: 'Connect with like-minded youth. Collaborate, grow together, and multiply opportunities.',
    align: 'right',
  },
];

const FeaturesReveal = (): ReactElement => {
  const animateFrom = (elem: HTMLElement, direction: number = 1): void => {
    let x = 0;
    let y = direction * 100;
    if (elem.classList.contains('gs_reveal_fromLeft')) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains('gs_reveal_fromRight')) {
      x = 100;
      y = 0;
    }
    gsap.fromTo(
      elem,
      { x, y, autoAlpha: 0 },
      { duration: 1.25, x: 0, y: 0, autoAlpha: 1, ease: 'expo', overwrite: 'auto' }
    );
  };

  const hide = (elem: HTMLElement): void => {
    gsap.set(elem, { autoAlpha: 0 });
  };

  useEffect(() => {
    const revealElements = gsap.utils.toArray<HTMLElement>('.gs_reveal');
    revealElements.forEach((elem) => {
      hide(elem);
      ScrollTrigger.create({
        trigger: elem,
        onEnter: () => animateFrom(elem),
        onEnterBack: () => animateFrom(elem, -1),
        onLeave: () => hide(elem),
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="content">
      <style>{`
        body {
          font-weight: 300;
          margin: 0;
          background-color: #000000;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
        }

        .content {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .content__hero {
          height: 15vh;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .content__heading {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (min-width: 768px) {
          .content__heading {
            font-size: 3rem;
          }
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .features__item {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 2rem;
          min-height: auto;
          padding: 2rem 0;
          border-top: 1px solid rgba(16, 185, 129, 0.15);
        }

        .features__item:last-child {
          border-bottom: 1px solid rgba(16, 185, 129, 0.15);
        }

        .features__item--left {
          flex-direction: row;
        }

        .features__item--right {
          flex-direction: row-reverse;
        }

        .features__image {
          flex: 1 1 40%;
          position: relative;
        }

        .features__card {
          border-radius: 1rem;
          overflow: hidden;
          position: relative;
          aspect-ratio: 1 / 1;
          background: #1a1a1a;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .features__card:hover {
          transform: scale(0.98);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .features__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .features__content {
          flex: 1 1 55%;
        }

        .features__title {
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (min-width: 768px) {
          .features__title {
            font-size: 1.8rem;
          }
        }

        .features__description {
          line-height: 1.6;
          font-size: 1rem;
          color: #cbd5e1;
          font-weight: 400;
        }

        @media (min-width: 768px) {
          .features__description {
            font-size: 1.05rem;
          }
        }

        .gs_reveal {
          opacity: 0;
          visibility: hidden;
          will-change: transform, opacity;
        }

        .spacer {
          height: 2rem;
        }

        @media (max-width: 768px) {
          .features__item {
            padding: 1.5rem 0;
            gap: 1.5rem;
          }
          .features__item--left,
          .features__item--right {
            flex-direction: column;
            text-align: center;
          }
          .features__content {
            text-align: center;
          }
          .features__title {
            font-size: 1.3rem;
          }
          .features__description {
            font-size: 0.95rem;
          }
          .content__hero {
            height: 12vh;
          }
          .content__heading {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .features__item {
            padding: 1rem 0;
          }
          .content__hero {
            height: 10vh;
          }
          .content__heading {
            font-size: 1.5rem;
          }
          .features__title {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <div className="content__hero">
        <h1 className="content__heading gs_reveal">
          Our Four Pillars
        </h1>
      </div>

      <div className="features">
        {featuresData.map((item) => (
          <div
            key={item.id}
            className={`features__item features__item--${item.align}`}
          >
            <div className="features__image">
              <div className="features__card gs_reveal gs_reveal_fromLeft">
                <img
                  className="features__img"
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="features__content">
              <h2 className="features__title gs_reveal gs_reveal_fromRight">
                {item.title}
              </h2>
              <p className="features__description gs_reveal gs_reveal_fromRight">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="spacer" />
    </div>
  );
};

export default FeaturesReveal;