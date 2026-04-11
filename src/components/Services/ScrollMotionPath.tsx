import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ScrollMotionPath = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const motionPathRef = useRef<SVGPathElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  const createTimeline = useCallback(() => {
    if (!mainRef.current || !boxRef.current || !motionPathRef.current) return;

    ctxRef.current?.revert();
    ScrollTrigger.getAll().forEach(st => st.kill());

    const ctx = gsap.context(() => {
      const box = boxRef.current!;
      const main = mainRef.current!;
      const overlay = overlayRef.current!;
      const motionPath = motionPathRef.current!;

      const containers = gsap.utils.toArray<HTMLElement>('.container');
      if (containers.length === 0) return;

      const mainRect = main.getBoundingClientRect();
      const boxWidth = box.offsetWidth;
      const boxHeight = box.offsetHeight;

      const points: { x: number; y: number }[] = [];
      containers.forEach((container) => {
        const rect = container.getBoundingClientRect();
        points.push({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      });

      const relativePoints = points.map(p => ({
        x: p.x - mainRect.left,
        y: p.y - mainRect.top,
      }));

      const rawPath = MotionPathPlugin.arrayToRawPath(relativePoints, { curviness: 1.2 });
      const pathString = MotionPathPlugin.rawPathToString(rawPath);
      motionPath.setAttribute('d', pathString);

      overlay.setAttribute('width', String(mainRect.width));
      overlay.setAttribute('height', String(mainRect.height));
      overlay.setAttribute('viewBox', `0 0 ${mainRect.width} ${mainRect.height}`);
      gsap.set(overlay, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: mainRect.width,
        height: mainRect.height,
      });

      const startPoint = relativePoints[0];
      gsap.set(box, {
        x: startPoint.x - boxWidth / 2,
        y: startPoint.y - boxHeight / 2,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containers[0] as HTMLElement,
          start: 'top center',
          endTrigger: containers[containers.length - 1] as HTMLElement,
          end: 'bottom center',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(box, {
        duration: 1,
        ease: 'none',
        motionPath: {
          path: motionPath,
          align: motionPath,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
      });

      ScrollTrigger.refresh();
    }, mainRef);

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => createTimeline(), 100);
    window.addEventListener('load', createTimeline);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('load', createTimeline);
    };
  }, [createTimeline]);

  useEffect(() => {
    const handleResize = () => createTimeline();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [createTimeline]);

  return (
    <>
      <style>{`
        .scroll-motion-root {
          width: 100%;
          background-color: #0e100f;
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 2px, transparent 2px),
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
          background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
          color: #efe;
          font-family: 'Inter', sans-serif;
        }
        .scroll-motion-root * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .scroll-motion-root .main {
          position: relative;
          height: 700vh;
        }
        .scroll-motion-root #overlay {
          position: absolute;
          top: 0;
          left: 0;
          background: transparent;
          opacity: 1;
          pointer-events: none;
          z-index: 5;
        }
        .scroll-motion-root .container {
          background: rgba(255, 255, 255, 0.1);
          position: absolute;
          width: 140px;
          height: 140px;
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .scroll-motion-root .container:after {
          position: absolute;
          font-size: 34px;
          color: rgba(255, 255, 255, 0.3);
          pointer-events: none;
        }
        .scroll-motion-root .initial { left: 70%; top: 7%; }
        .scroll-motion-root .second { left: 10%; top: 20%; }
        .scroll-motion-root .third { right: 10%; top: 35%; }
        .scroll-motion-root .fourth { left: 20%; top: 45%; }
        .scroll-motion-root .fifth { left: 70%; top: 60%; }
        .scroll-motion-root .sixth { left: 15%; top: 75%; }
        .scroll-motion-root .marker {
          width: 100px;
          height: 100px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
        }
        .scroll-motion-root .box {
          width: 100px;
          height: 100px;
          z-index: 10;
          border-radius: 10px;
          background-image: url("https://assets.codepen.io/16327/flair-26.png");
          background-size: contain;
          background-repeat: no-repeat;
          background-color: transparent;
          will-change: transform;
          position: absolute;
          top: 0;
          left: 0;
        }
        .custom-title {
          position: absolute;
          top: 2%;
          left: 5%;
          color: white;
          font-size: 4rem;
          z-index: 20;
          text-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        .custom-subtitle {
          position: absolute;
          bottom: 10%;
          right: 5%;
          color: #ccc;
          font-size: 1.2rem;
          text-align: right;
          z-index: 20;
          text-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        .custom-milestone {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translateX(-50%);
          color: #efe;
          font-size: 1.5rem;
          background: rgba(0,0,0,0.3);
          padding: 0.5rem 1rem;
          border-radius: 30px;
          z-index: 15;
          backdrop-filter: blur(4px);
        }

        /* --- Dynamic text block styles — no internal scroll, auto height, wider --- */
        .text-block {
          position: absolute;
          width: 600px;                /* Fixed width but wider */
          max-width: 90vw;             /* Prevent overflow on small screens */
          padding: 1.8rem 2rem;
          background: rgba(20, 30, 25, 0.75);
          backdrop-filter: blur(12px);
          border-left: 4px solid #7f9f7f;
          border-radius: 0 20px 20px 0;
          color: #efe;
          z-index: 15;
          box-shadow: 0 16px 32px rgba(0,0,0,0.4);
          pointer-events: none;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          /* No height restriction — grows with content */
        }

        .text-block-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .text-block-img {
          width: 70px;
          height: 70px;
          border-radius: 16px;
          object-fit: cover;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        .text-block h3 {
          font-size: 1.8rem;
          color: #b8d9b8;
          line-height: 1.2;
        }

        .text-block p {
          font-size: 1.36rem;
          line-height: 1.7;
          opacity: 0.95;
          /* No max-height, no overflow */
        }

        /* Green bullet points styling */
        .text-block ul {
          list-style: none;
          padding-left: 0;
          margin: 0.5rem 0;
        }
        .text-block li {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 0.6rem;
          padding-left: 1.5rem;
          position: relative;
        }
        .text-block li::before {
          content: "•";
          color: #7fbf7f;
          font-size: 1.6rem;
          position: absolute;
          left: 0;
          top: -0.1rem;
        }

        .learn-more {
          display: inline-block;
          margin-top: 0.5rem;
          font-size: 1.2rem;
          font-weight: 600;
          color: #b8d9b8;
          text-decoration: none;
          border-bottom: 2px solid #7f9f7f;
          align-self: flex-start;
          transition: all 0.2s ease;
          pointer-events: auto;
        }
        .learn-more:hover {
          color: #e2ffe2;
          border-bottom-color: #c8ffc8;
          transform: translateX(4px);
        }

        /* Position each block and center vertically relative to its container */
        .text-block.initial-text {
          right: calc(30% + 100px);
          top: 7%;
          transform: translateY(-50%);
        }
        .text-block.second-text {
          left: calc(10% + 180px);
          top: 21%;
          transform: translateY(-50%);
        }
        .text-block.third-text {
          right: calc(10% + 180px);
          top: 36%;
          transform: translateY(-50%);
        }
        .text-block.fourth-text {
          left: calc(20% + 180px);
          top: 46%;
          transform: translateY(-50%);
        }
        .text-block.fifth-text {
          right: calc(40% - 150px);
          top: 61%;
          transform: translateY(-50%);
        }
        .text-block.sixth-text {
          left: calc(15% + 180px);
          top: 76%;
          transform: translateY(-50%);
        }

        /* Responsive adjustments */
        @media (max-width: 1000px) {
          .text-block {
            width: 340px;
            padding: 1.4rem 1.6rem;
          }
          .text-block h3 { font-size: 1.5rem; }
          .text-block-img { width: 55px; height: 55px; }
          .text-block li { font-size: 1rem; }
        }

        @media (max-width: 700px) {
          .text-block {
            width: 280px;
            padding: 1.2rem;
          }
        }

        @media (max-width: 500px) {
          .text-block {
            width: 240px;
          }
        }
      `}</style>

      <div className="scroll-motion-root">
        <div className="main" ref={mainRef}>
          <svg id="overlay" ref={overlayRef} xmlns="http://www.w3.org/2000/svg">
            <path id="motionPath" ref={motionPathRef} stroke="none" fill="none" />
          </svg>

          <div className="box" ref={boxRef} />

          {/* The path-defining containers */}
          <div className="container initial" />
          <div className="container second"><div className="marker" /></div>
          <div className="container third"><div className="marker" /></div>
          <div className="container fourth"><div className="marker" /></div>
          <div className="container fifth"><div className="marker" /></div>
          <div className="container sixth"><div className="marker" /></div>

          {/* Block 1: Yuni-Buddy */}
          <div className="text-block initial-text">
            <div className="text-block-header">
              <img className="text-block-img" src="https://picsum.photos/seed/yuni-buddy/100/100" alt="Yuni-Buddy" />
              <h3>Yuni-Buddy (Parwaaz-e-Uqabi)</h3>
            </div>
            <p>
              Connect, earn, and grow globally. A community platform for opportunities, jobs, internships, leadership, and global networking.
            </p>
            <ul>
              <li>Global connectivity & earning opportunities</li>
              <li>Jobs / internships</li>
              <li>Leadership & community building</li>
              <li>Study abroad support</li>
            </ul>
            <a href="#" className="learn-more">Learn more →</a>
          </div>

          {/* Block 2: Yuni-Courses */}
          <div className="text-block second-text">
            <div className="text-block-header">
              <img className="text-block-img" src="https://picsum.photos/seed/yuni-courses/100/100" alt="Yuni-Courses" />
              <h3>Yuni-Courses (Umeed-e-Sahar)</h3>
            </div>
            <p>
              Practical, project-based courses taught by industry leaders. Build real skills, portfolios, and secure job-ready verification.
            </p>
            <ul>
              <li>Taught by CEOs, COOs, founders</li>
              <li>Project-based with hands-on experience</li>
              <li>Portfolio building & Yuni-Verification</li>
              <li>Course + internship pathway</li>
            </ul>
            <a href="#" className="learn-more">Learn more →</a>
          </div>

          {/* Block 3: Yuni-Coworking */}
          <div className="text-block third-text">
            <div className="text-block-header">
              <img className="text-block-img" src="https://picsum.photos/seed/yuni-coworking/100/100" alt="Yuni-Coworking" />
              <h3>Yuni-Coworking (Yuni-Anjuman)</h3>
            </div>
            <p>
              Collaborative workspaces for innovators, freelancers, and startups. A community-driven environment to create and grow.
            </p>
            <ul>
              <li>Flexible workspaces with global vibe</li>
              <li>Networking & mentorship for startups</li>
              <li>Skill workshops & events</li>
              <li>Blend of work, creativity & unity</li>
            </ul>
            <a href="#" className="learn-more">Learn more →</a>
          </div>

          {/* Block 4: Yuni-Tech & Marketing */}
          <div className="text-block fourth-text">
            <div className="text-block-header">
              <img className="text-block-img" src="https://picsum.photos/seed/yuni-tech/100/100" alt="Yuni-Tech & Marketing" />
              <h3>Yuni-Tech & Marketing (Taqat-e-Parwaaz)</h3>
            </div>
            <p>
              Digital agency boosting Pakistan's online presence. AI, automation, e-commerce, and innovative marketing for global reach.
            </p>
            <ul>
              <li>Web development & digital branding</li>
              <li>AI & automation services</li>
              <li>E-commerce enablement</li>
              <li>Global marketing strategies</li>
            </ul>
            <a href="#" className="learn-more">Learn more →</a>
          </div>

          {/* Block 5: Business Consultation */}
          <div className="text-block fifth-text">
            <div className="text-block-header">
              <img className="text-block-img" src="https://picsum.photos/seed/business-consult/100/100" alt="Business Consultation" />
              <h3>Business Consultation (Momin-e-Sana'at)</h3>
            </div>
            <p>
              Strategic guidance for entrepreneurs and businesses. Turn ideas into sustainable, ethical, and profitable ventures.
            </p>
            <ul>
              <li>Startup mentorship & business planning</li>
              <li>Market entry & growth strategies</li>
              <li>Financial & operational consulting</li>
              <li>Ethical leadership & national service</li>
            </ul>
            <a href="#" className="learn-more">Learn more →</a>
          </div>

          {/* Block 6: Completion (kept as is from original, but you can replace if needed) */}
          <div className="text-block sixth-text">
            <div className="text-block-header">
              <img className="text-block-img" src="https://picsum.photos/seed/completion/100/100" alt="Completion" />
              <h3>Completion</h3>
            </div>
            <p>
              The final steps are both sweet and bittersweet. We look back at the winding path, the ups and downs, the moments of doubt and triumph. 
              What once seemed like an endless odyssey now feels like a precious, fleeting chapter. The work is done—not perfectly, perhaps, but 
              authentically. We've left a mark, however small, on the world and on ourselves. There's a sense of peace and pride, mixed with the 
              quiet sadness of an ending. But every ending is also a beginning. The lessons learned, the connections made, the person we've become—these 
              are the true treasures. We take a final look at the path behind us, then turn to face the horizon ahead. The next journey is already 
              calling, and we're ready. This isn't goodbye; it's just the closing of one door and the opening of countless others.
            </p>
            <a href="#" className="learn-more">Learn more →</a>
          </div>

          {/* Custom global text */}
          <h1 className="custom-title">Our Services</h1>
        </div>
      </div>
    </>
  );
};

export default ScrollMotionPath;