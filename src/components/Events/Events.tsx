import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../AnimatedTitle";
import AnimatedBackground from "../AnimatedBackground";
import { MapPin, CreditCard, UserCheck, ShieldCheck, Calendar, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Blog type definition
interface BlogPost {
  id: string;
  title: string;
  category: string;
  icon: string;
  colorClass: string;
  description: string;
  date: string;
  readTime: string;
  imageUrl: string;
  author: string;
  externalLink?: string;
}

interface EnrollmentData {
  fullName: string;
  fatherName: string;
  cnic: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phoneNumber: string;
  alternatePhone: string;
  currentAddress: string;
  city: string;
  province: string;
  highestQualification: string;
  institution: string;
  yearOfCompletion: string;
  percentage: string;
  courseId: string;
  courseTitle: string;
  coursePrice: string;
  paymentMethod: string;
  bankName: string;
  bankAccountTitle: string;
  bankAccountNumber: string;
  transactionId: string;
  transactionDate: string;
  transactionAmount: string;
  currentEmployment: string;
  organization: string;
  designation: string;
  hearAboutUs: string;
  referralCode: string;
  whyJoin: string;
  declaration: boolean;
  timestamp: string;
  status: string;
}

const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbxv3FVEPexjV4hLcAWNj6FafStyFzqzrJWzo-Zk8FJFOWkxw-mh9bxNi-ZYbwnLHyfzxg/exec';

const blogPosts: BlogPost[] = [
  {
    id: "blog-yunity-2026",
    title: "Through the Viewfinder: 48 Hours at YUNIty",
    category: "Summit",
    icon: "fa-camera",
    colorClass: "brand",
    description: "A raw, behind-the-scenes look at the two days of chaos, caffeine, and creative sparks that defined YUNIty, through the eyes of the camera guy.",
    date: "May 18, 2026",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop&auto=format",
    author: "Camera Guy",
  },
  {
    id: "gallery-yunity-2026",
    title: "YUNIty 2026: Interactive Memory Cloud",
    category: "Summit",
    icon: "fa-camera",
    colorClass: "brand",
    description: "Launch the high-fidelity interactive gallery of the YUNIty event. Walk through the captured frames of our collective story.",
    date: "May 18, 2026",
    readTime: "Interactive Showcase",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format",
    author: "Camera Guy",
  },
  {
    id: "blog-7",
    title: "Upcoming Summer Trainings Trailer",
    category: "Summit",
    icon: "fa-rocket",
    colorClass: "brand",
    description: "A first look at the upcoming summer trainings lineup, plus the Open Learning Weekend preview for students and professionals.",
    date: "May 29, 2026",
    readTime: "2 min read",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format",
    author: "Events Team",
  },
  {
    id: "blog-1",
    title: "NCAT 2026 at NASTP",
    category: "Tech Conference",
    icon: "fa-network-wired",
    colorClass: "brand",
    description: "YUNI is organizing the National Conference of Applied Technology focusing on cybersecurity.",
    date: "March 15, 2026",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format",
    author: "YUNI Team",
  },
  {
    id: "blog-2",
    title: "Winter Warmth Drive",
    category: "CSR Initiative",
    icon: "fa-hand-holding-heart",
    colorClass: "blue",
    description: "The YUNI community came together to distribute essential winter supplies to roadside communities.",
    date: "January 10, 2026",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&auto=format",
    author: "CSR Team",
  },
  {
    id: "blog-3",
    title: "Cybersecurity Bootcamp Graduation",
    category: "Education",
    icon: "fa-graduation-cap",
    colorClass: "brand",
    description: "First cohort of ethical hacking students complete their training with 100% certification success rate.",
    date: "February 28, 2026",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop&auto=format",
    author: "Academics Team",
  },
  {
    id: "blog-4",
    title: "AI in Fintech Summit",
    category: "Industry Event",
    icon: "fa-robot",
    colorClass: "brand",
    description: "Exploring the intersection of artificial intelligence and financial technology in Pakistan.",
    date: "April 2, 2026",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&auto=format",
    author: "Tech Team",
  },
  {
    id: "blog-5",
    title: "Community Iftar Gathering",
    category: "Community",
    icon: "fa-users",
    colorClass: "blue",
    description: "YUNI hosted a massive community iftar bringing together students, mentors, and industry leaders.",
    date: "March 25, 2026",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop&auto=format",
    author: "Community Team",
  },
  {
    id: "blog-6",
    title: "Partnership with AWS Educate",
    category: "Partnership",
    icon: "fa-handshake",
    colorClass: "brand",
    description: "YUNI becomes official AWS Educate partner, bringing cloud computing resources to students.",
    date: "February 14, 2026",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format",
    author: "Partnerships Team",
  },
];

const galleryImages = [
  { id: 'g1', src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80", alt: "Morning setups", size: "md" as const, x: 10, y: 15 },
  { id: 'g2', src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80", alt: "Workshop launch", size: "lg" as const, x: 38, y: 10 },
  { id: 'g3', src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80", alt: "Waiting booth", size: "sm" as const, x: 15, y: 55 },
  { id: 'g4', src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80", alt: "Pitching whiteboard", size: "lg" as const, x: 68, y: 15 },
  { id: 'g5', src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80", alt: "Moiz surprise birthday", size: "md" as const, x: 45, y: 65 },
  { id: 'g6', src: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&auto=format&fit=crop&q=80", alt: "Sunday morning kickoff", size: "sm" as const, x: 82, y: 52 },
  { id: 'g7', src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80", alt: "Moiz session hype", size: "md" as const, x: 28, y: 45 },
  { id: 'g8', src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80", alt: "Refreshment breaks", size: "sm" as const, x: 65, y: 50 },
  { id: 'g9', src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80", alt: "Grand lobby wrap", size: "lg" as const, x: 42, y: 45 }
];

const Blog: React.FC = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState<"intel" | "registration" | "yunity-blog" | "yunity-gallery">("intel");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [visiblePosts, setVisiblePosts] = useState<number>(6);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (currentView === "yunity-gallery") {
      const cards = document.querySelectorAll('.memory-card');
      if (cards.length > 0) {
        gsap.fromTo(cards,
          {
            opacity: 0,
            scale: 0.5,
            y: 40
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: "back.out(1.7)"
          }
        );
      }
    }
  }, [currentView]);

  const [formData, setFormData] = useState<EnrollmentData>({
    fullName: "", fatherName: "", cnic: "", dateOfBirth: "", gender: "",
    email: "", phoneNumber: "", alternatePhone: "", currentAddress: "",
    city: "", province: "Punjab", highestQualification: "", institution: "",
    yearOfCompletion: "", percentage: "", courseId: "summit-2026", courseTitle: "Future-Ready Summit",
    coursePrice: "500", paymentMethod: "bank", bankName: "", bankAccountTitle: "",
    bankAccountNumber: "", transactionId: "", transactionDate: "",
    transactionAmount: "500", currentEmployment: "", organization: "",
    designation: "", hearAboutUs: "", referralCode: "", whyJoin: "",
    declaration: false, timestamp: new Date().toISOString(), status: "pending",
  });

  // Filter categories
  const categories = ["all", "Summit", "Tech Conference", "CSR Initiative", "Education", "Industry Event", "Community", "Partnership"];

  const filteredPosts = activeFilter === "all"
    ? blogPosts
    : blogPosts.filter(post => post.category === activeFilter);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('register') === 'summit') {
      setCurrentView("registration");
    }
  }, [location]);

  useEffect(() => {
    if (currentView === "intel") {
    const cards = document.querySelectorAll('.blog-card');
    if (cards.length > 0) {
      gsap.fromTo(cards,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
          filter: "blur(10px)"
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".blog-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    }
  }, [displayedPosts, currentView]);

  const getCategoryColor = (colorClass: string): string => {
    return colorClass === "brand" ? "var(--pk-green)" : "var(--pk-green-light)";
  };

  const getCategoryIcon = (icon: string): string => {
    const iconMap: { [key: string]: string } = {
      "fa-network-wired": "🌐",
      "fa-hand-holding-heart": "🤝",
      "fa-graduation-cap": "🎓",
      "fa-robot": "🤖",
      "fa-users": "👥",
      "fa-handshake": "🤝",
      "fa-rocket": "🚀",
      "fa-camera": "📷",
    };
    return iconMap[icon] || "📰";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleRegister = () => {
    setCurrentView("registration");
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const submitData = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, String(value));
      });

      await fetch(GOOGLE_SHEETS_API, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: submitData,
      });
      setSubmitStatus({ type: 'success', message: 'Registration transmitted successfully! See you at the Summit.' });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Data sync failed. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRegistrationView = () => (
    <div className="registration-view">
      <div className="registration-container-premium">
        <button onClick={() => setCurrentView("intel")} className="cancel-btn-tech">CANCEL</button>
        <h2 className="registration-title-tech">Summit <span className="text-gradient">Registration</span> Gateway</h2>
        
        <div className="summit-schedule-premium">
          <div className="schedule-badge">
            <Calendar size={16} />
            <span>16-17 May, 2026 (Sat-Sun)</span>
          </div>
          <div className="schedule-badge">
            <Clock size={16} />
            <span>09:00 AM - 06:00 PM (PST)</span>
          </div>
          <div className="schedule-badge">
            <MapPin size={16} />
            <span>NICAT, Rawalpindi</span>
          </div>
        </div>

        {submitStatus && (
          <div className={`status-banner-tech ${submitStatus.type}`}>
            <span className="icon">{submitStatus.type === 'success' ? '✓' : '⚠'}</span>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="registration-form-premium">
          <div className="form-grid-premium">
            <div className="form-left-col">
              <section className="form-section-tech">
                <h3 className="section-header-tech"><CreditCard size={20} /> 1. Payment Protocol</h3>
                <div className="payment-nodes">
                  <div 
                    className={`payment-node-card ${formData.paymentMethod === 'bank' ? 'active-node' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'bank' }))}
                  >
                    <h4>Bank Alfalah</h4>
                    <div className="node-details">
                      <p><span>Title:</span> YUNI (SMC-PRIVATE) LIMITED</p>
                      <p><span>Account No:</span> 0140-1010831162</p>
                      <p><span>Branch:</span> Rawalpindi</p>
                    </div>
                  </div>
                  <div 
                    className={`payment-node-card ${formData.paymentMethod === 'nayapay' ? 'active-node' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'nayapay' }))}
                  >
                    <h4>NayaPay</h4>
                    <div className="node-details">
                      <p><span>Title:</span> YUNI (SMC-PRIVATE) LIMITED</p>
                      <p><span>Account No:</span> 03185861446</p>
                      <p><span>Type:</span> Wallet / Mobile</p>
                    </div>
                  </div>
                </div>

                <div className="input-group-tech">
                  <div className="field-tech">
                    <label>Network</label>
                    <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} required>
                      <option value="bank">Bank Alfalah</option>
                      <option value="nayapay">NayaPay</option>
                    </select>
                  </div>
                  <div className="field-tech">
                    <label>TXN ID / Hash</label>
                    <input type="text" name="transactionId" placeholder="Enter RefID" value={formData.transactionId} onChange={handleInputChange} required />
                  </div>
                  <div className="field-tech">
                    <label>Timestamp</label>
                    <input type="date" name="transactionDate" value={formData.transactionDate} onChange={handleInputChange} required />
                  </div>
                  <div className="field-tech">
                    <label>Credits (PKR)</label>
                    <input type="text" name="transactionAmount" value={formData.transactionAmount} readOnly />
                  </div>
                </div>
              </section>
            </div>

            <div className="form-right-col">
              <section className="form-section-tech">
                <h3 className="section-header-tech"><UserCheck size={20} /> 2. Identity Sync</h3>
                <div className="input-group-tech">
                  <div className="field-tech full"><label>Full Legal Name</label><input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required /></div>
                  <div className="field-tech"><label>CNIC (Verified)</label><input type="text" name="cnic" placeholder="XXXXX-XXXXXXX-X" value={formData.cnic} onChange={handleInputChange} required /></div>
                  <div className="field-tech"><label>Email Address</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required /></div>
                  <div className="field-tech full"><label>Comms (WhatsApp)</label><input type="tel" name="phoneNumber" placeholder="03XXXXXXXXX" value={formData.phoneNumber} onChange={handleInputChange} required /></div>
                </div>
              </section>

            </div>
          </div>

          <section className="form-section-tech validation-section-premium">
            <h3 className="section-header-tech"><ShieldCheck size={20} /> 3. Validation</h3>
            <div className="validation-content-premium">
              <div className="declaration-tech">
                <label className="checkbox-tech">
                  <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleInputChange} required />
                  <span className="checkmark-tech"></span>
                  I confirm my participation in the Summit.
                </label>
              </div>
              <div className="form-actions-tech">
                <button type="submit" className="submit-btn-premium" disabled={isSubmitting}>
                  {isSubmitting ? 'Syncing...' : 'Confirm Registration'}
                </button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );


  const renderYunityBlogView = () => (
    <div className="yunity-blog-detail-view animate-fade-in-up">
      <div className="blog-detail-container-premium">
        <button onClick={() => { setCurrentView("intel"); window.scrollTo(0, 0); }} className="back-btn-tech">
          <span className="arrow">←</span> BACK TO INTEL
        </button>

        <header className="blog-detail-header">
          <span className="blog-category-badge-premium" style={{ background: 'var(--pk-green)' }}>
            <span className="badge-icon">📷</span>
            <span className="badge-text">Summit Behind-the-Scenes</span>
          </span>
          <h1 className="blog-detail-title">
            Through the Viewfinder: <span className="text-gradient">48 Hours of Chaos, Caffeine, and Creative Spark at YUNIty</span>
          </h1>
          <div className="blog-detail-meta">
            <span className="meta-author">By the Camera Guy</span>
            <span className="meta-separator">/</span>
            <span className="meta-date">May 18, 2026</span>
            <span className="meta-separator">/</span>
            <span className="meta-readtime">8 min read</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="blog-detail-featured-image">
          <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&auto=format&fit=crop&q=80" alt="YUNIty Event Viewfinder" />
          <div className="scanline-overlay"></div>
          <div className="image-vignette"></div>
        </div>

        {/* Article Body */}
        <div className="blog-detail-body">
          <div className="blog-day-section">
            <h2 className="day-title"><span className="text-gradient">DAY 1</span> : Saturday, May 16th</h2>
            <h3 className="section-subtitle">08:00 AM — Morning Setup Chaos</h3>
            <p>
              Fingers were freezing, making it a pain to dial in the exposure. By 8 AM, the lobby was a total madhouse—less tech summit, more like a logistics warehouse gone wild. Tripod bags, slider cases, and loose batteries were piled up by the doors. The YUNIty crew was running around with walkie-talkies, taping down thick power lines with rolls of gaffer tape, while volunteers in slightly oversized t-shirts tried to sort out the registration spreadsheets.
            </p>
            <p>
              I grabbed my camera. Through the viewfinder, the lobby was just a blur of high-contrast motion. I spun the focus ring, catching a volunteer trying to balance a stack of lanyards while taking a desperate sip of black coffee. *Click.* Frame one: the raw, tired, caffeine-fueled start of Day 1.
            </p>

            <div className="blog-image-wrapper">
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80" alt="Volunteers setting up the event space" />
              <span className="image-caption">Frame #01: Morning rush and setup.</span>
            </div>

            <h3 className="section-subtitle">10:00 AM — Main Stage Kickoff</h3>
            <p>
              By 10, the vibe completely shifted. The setup noise settled into a low, excited buzz inside the main hall. When the stage lights kicked on and the opening slides hit the screen, I was already huddled in the corner, kneeling on the hard concrete with my 70-200mm lens ready to go.
            </p>
            <p>
              The workshops started without warning. Luckily, these weren't those dry corporate presentations where the speaker reads bullet points. The speakers were walking the stage, gesture-heavy, getting right in the crowd's face. I tracked the front rows: rows of students leaning in, laptops casting a cool glow on their faces, furiously copying down code blocks and system diagrams. Every time a new concept dropped, you could hear the collective rustle of notebooks and rapid typing—it was like a satisfying background track.
            </p>

            <div className="blog-image-wrapper">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80" alt="Students focused on their screens during the workshop" />
              <span className="image-caption">Frame #02: Focus and ambient glow during workshops.</span>
            </div>

            <h3 className="section-subtitle">The Beanbag Sanctuary</h3>
            <p>
              Right outside the main hall was the ultimate chill spot: the waiting area. If you wanted to see what YUNIty was actually about, this was the place. My favorite shots of the day came from this little sunlit nook, which was basically just a pile of beanbags, empty cans, and laptops balanced on knees.
            </p>
            <p>
              I swapped to a wide 24mm lens to capture the chaos. People who were complete strangers two hours ago were sitting shoulder-to-shoulder on the floor, debating IDE themes, compiler errors, and where to get the best wings in town. No corporate hierarchy, no egos—just mentors in hoodies sitting on the floor with nervous freshmen, laughing over database horror stories.
            </p>

            <div className="blog-image-wrapper">
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80" alt="Attendees collaborating in the waiting booth" />
              <span className="image-caption">Frame #03: Casual networking and team banter.</span>
            </div>

            <h3 className="section-subtitle">Late Afternoon — Whiteboards & Pressure</h3>
            <p>
              When the afternoon sun started hitting the windows, the mood turned serious. The pitching challenge was announced, and the room split into messy working groups. The whiteboards came out in force.
            </p>
            <p>
              You could practically feel the stress in the air. I walked slow through the rows, trying to shoot silently. I got shots of marker ink on glass, fingers flying on keyboards, and foreheads creased in deep concentration. Groups huddled around laptops in circles on the floor like campfires. They had to condense complex tech stacks into a three-minute pitch, and the time limit was definitely getting to them. No tech-glamour here—just raw, gritty teamwork.
            </p>

            <div className="blog-image-wrapper">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80" alt="Teammates hashing out ideas on a whiteboard" />
              <span className="image-caption">Frame #04: Distilling systems under time pressure.</span>
            </div>

            <h3 className="section-subtitle">Midnight Surprise</h3>
            <p>
              By midnight, the place went quiet, but the core YUNIty crew was still in the main hub, buried in empty pizza boxes and energy drink cans. Exhaustion was hitting hard, but we had one last thing to do.
            </p>
            <p>
              Out of nowhere, the lights cut out. A flickering orange glow came from the hallway. It was Moiz carrying a birthday cake. I cranked my ISO to 6400, opened my lens wide open to f/1.8, and prayed the autofocus would hold. The candle shadows danced on everyone's faces as we sang. I just kept firing the shutter, capturing Moiz's shocked face and the tired smiles around him. It was a nice, warm break in a crazy weekend sprint.
            </p>

            <div className="blog-image-wrapper">
              <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&auto=format&fit=crop&q=80" alt="Moiz blowing out birthday candles at midnight" />
              <span className="image-caption">Frame #05: Midnight candles and team celebrations.</span>
            </div>
          </div>

          <hr className="blog-divider" />

          <div className="blog-day-section">
            <h2 className="day-title"><span className="text-gradient">DAY 2</span> : Sunday, May 17th</h2>

            <h3 className="section-subtitle">09:00 AM — The Second Wind</h3>
            <p>
              Sunday morning felt heavy. My camera bag felt three times heavier than yesterday. People stumbled in slowly, bloodshot eyes, holding paper cups of hot chai. We were running on fumes, but everyone knew Day 2 was the final stretch.
            </p>
            <p>
              I stood by the entrance, shooting arrivals: people rubbing their eyes, yawning, but still throwing a tired peace sign at the camera. Wiped down the lenses, cleared the SD cards, popped in fresh batteries, and we were back in action.
            </p>

            <div className="blog-image-wrapper">
              <img src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1000&auto=format&fit=crop&q=80" alt="Sunrise coffee cups and morning arrivals" />
              <span className="image-caption">Frame #06: Coffee first, compile later.</span>
            </div>

            <h3 className="section-subtitle">The Morning Wake-up Call</h3>
            <p>
              Any remaining sleepiness evaporated the second Moiz grabbed the mic. Seriously, I don't know what caffeine he was on, but the energy was wild. In five minutes flat, he had everyone out of their chairs doing ridiculous physical icebreakers to wake up.
            </p>
            <p>
              I ran along the walls, trying to shoot the madness. The hall was a wall of noise—laughing, shouting, doing bizarre hand signs. Got some great shots of genuine, unpolished smiles: people cracking up, pointing at each other, and high-fiving. The ice didn't just break; it shattered.
            </p>

            <div className="blog-image-wrapper">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80" alt="Students high fiving and laughing in icebreaker" />
              <span className="image-caption">Frame #07: Hype circles and morning energy.</span>
            </div>

            <h3 className="section-subtitle">Fueling Up</h3>
            <p>
              Then, lunchtime—the best part. A huge spread of hot food, snacks, and cold drinks showed up, and all the intense coding focus vanished into a noisy lunch chat.
            </p>
            <p>
              I snapped shots of plates piled dangerously high, guys leaning against columns talking with their hands, and teams posing with their custom flags. It was the complete opposite of the quiet workspaces—loud, warm, smelling of spices and fresh mint mocktails.
            </p>

            <div className="blog-image-wrapper">
              <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1000&auto=format&fit=crop&q=80" alt="A spread of snacks and tea at the refreshment break" />
              <span className="image-caption">Frame #08: Lunch breaks and team syncs.</span>
            </div>

            <h3 className="section-subtitle">The Infamous Taste Test</h3>
            <p>
              We had to capture the drink experiment. The crew had set up a table of home-brewed, neon-colored energy drinks and weird herbal teas, daring people to try them. The faces they made were absolute gold.
            </p>
            <p>
              I stood a few feet back with a fast shutter speed, waiting for the exact split-second they took a sip. They'd expect normal sweet juice, then get hit with sour vinegar or random spices. Got some hilarious frames: squinted eyes, wrinkled noses, and instant shock, followed by everyone laughing. Easily the funniest moment of the afternoon.
            </p>

            {/* Collage Section */}
            <div className="drink-collage-grid">
              <div className="collage-card"><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" alt="Grimace 1" /></div>
              <div className="collage-card"><img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop" alt="Grimace 2" /></div>
              <div className="collage-card"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" alt="Grimace 3" /></div>
              <div className="collage-card"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" alt="Grimace 4" /></div>
            </div>
            <span className="image-caption text-center">Frame #09: Taste-test reactions: squinting eyes and pure shock.</span>

            <div className="gallery-cta-card card-glow-border">
              <div className="gallery-cta-content">
                <h3>YUNIty 2026 Interactive Memory Cloud</h3>
                <p>Step into our fully interactive, high-fidelity visual archive. Hover to focus, zoom, and explore the raw frames of the weekend.</p>
                <button onClick={() => { setCurrentView("yunity-gallery"); window.scrollTo(0, 0); }} className="read-more-btn-tech" style={{ margin: '0 auto' }}>
                  Launch Memory Cloud <span className="arrow">→</span>
                </button>
              </div>
            </div>

            <h3 className="section-subtitle" style={{ marginTop: '5rem' }}>The Post-Event Collapse</h3>
            <p>
              Once the pitches were done, winners announced, and the crowd went home, the venue suddenly went dead silent. Just the YUNIty crew and volunteers left. We didn't pack up right away. We just collapsed on the cool lobby floor, leaning against the pillars.
            </p>
            <p>
              I set my camera on a gear bag, threw on a wide lens, and set the self-timer to join the shot. No posed smiles here—just slouched shoulders, messy hair, and genuine smiles of relief. We sat in a circle around the gear, recounting the absolute chaos of the last 48 hours. For me, that was the realest photo of the whole event: a completely exhausted team, tight-knit, sharing the quiet after the storm.
            </p>

            <div className="blog-image-wrapper">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80" alt="The YUNIty core team sitting on the floor smiling" />
              <span className="image-caption">Frame #10: The final lobby sit-down group wrap.</span>
            </div>
          </div>
        </div>

        <button onClick={() => { setCurrentView("intel"); window.scrollTo(0, 0); }} className="back-btn-tech bottom-back">
          ← BACK TO INTEL
        </button>
      </div>
    </div>
  );

  const renderYunityGalleryView = () => (
    <div className="yunity-gallery-view animate-fade-in-up">
      <div className="gallery-container-premium">
        <button onClick={() => { setCurrentView("intel"); window.scrollTo(0, 0); }} className="back-btn-tech">
          <span className="arrow">←</span> BACK TO INTEL
        </button>

        <header className="gallery-header-premium">
          <span className="blog-category-badge-premium" style={{ background: 'var(--pk-green)' }}>
            <span className="badge-icon">📷</span>
            <span className="badge-text">Interactive Showcase</span>
          </span>
          <h1 className="gallery-title-premium">
            YUNIty 2026: <span className="text-gradient">Memory Cloud</span>
          </h1>
          <p className="gallery-subtitle-premium">
            An interactive, high-fidelity visual archive. Hover over the floating frames to bring key moments into sharp focus, clearing the lens depth-of-field and enlarging the memory.
          </p>
        </header>

        {/* Interactive Gallery Cloud */}
        <div className="gallery-cloud-viewport" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <div className="cloud-ambient-glow"></div>
          {galleryImages.map((photo) => {
            const randomRot = (photo.id === 'g1' ? 4 : photo.id === 'g2' ? -3 : photo.id === 'g3' ? 5 : photo.id === 'g4' ? -6 : photo.id === 'g5' ? 2 : photo.id === 'g6' ? -4 : photo.id === 'g7' ? 6 : photo.id === 'g8' ? -2 : 3);
            return (
              <div
                key={photo.id}
                className={`memory-card size-${photo.size}`}
                style={{
                  left: `${photo.x}%`,
                  top: `${photo.y}%`,
                  transform: `rotate(${randomRot}deg)`,
                  '--card-rotation': `${randomRot}deg`,
                } as React.CSSProperties}
              >
                <div className="card-inner">
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <div className="vignette"></div>
                  <div className="scanlines"></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="gallery-footer-actions">
          <button onClick={() => { setCurrentView("yunity-blog"); window.scrollTo(0, 0); }} className="back-btn-tech" style={{ margin: '0 auto' }}>
            READ THE STORY <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );


  return (
    <section className="events-premium-section">
      <AnimatedBackground />
      {/* Background Light Orbs */}

      {currentView === "registration" ? (
        renderRegistrationView()
      ) : currentView === "yunity-blog" ? (
        renderYunityBlogView()
      ) : currentView === "yunity-gallery" ? (
        renderYunityGalleryView()
      ) : (
        <div className="events-container">
        {/* Header */}
        <div className="title-wrapper">
          <AnimatedTitle>Intelligence & Events</AnimatedTitle>
          <p className="events-subtitle-tech">Tracking the digital frontier and community milestones in real-time.</p>
        </div>

        {/* Category Filters */}
        <div className="filter-container-premium">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn-events ${activeFilter === category ? "active" : ""}`}
              onClick={() => {
                setActiveFilter(category);
                setVisiblePosts(6);
              }}
            >
              <span className="btn-text">{category === "all" ? "All Updates" : category}</span>
              <span className="btn-glow"></span>
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="blog-grid-premium">
          {displayedPosts.map((post) => (
            <article
              key={post.id}
              className={`blog-card-premium card-glow-border ${post.id === "blog-yunity-2026" || post.id === "gallery-yunity-2026" ? "clickable-card" : ""}`}
              onClick={() => {
                if (post.id === "blog-yunity-2026") {
                  setCurrentView("yunity-blog");
                  window.scrollTo(0, 0);
                } else if (post.id === "gallery-yunity-2026") {
                  setCurrentView("yunity-gallery");
                  window.scrollTo(0, 0);
                }
              }}
            >
              <div className="blog-card-inner">
                <div className="blog-card-image">
                  <img src={post.imageUrl} alt={post.title} loading="lazy" />
                  <div className="scanline-overlay"></div>
                  <div className="image-vignette"></div>
                  <span
                    className="blog-category-badge-premium"
                    style={{ background: getCategoryColor(post.colorClass) }}
                  >
                    <span className="badge-icon">{getCategoryIcon(post.icon)}</span>
                    <span className="badge-text">{post.category}</span>
                  </span>
                </div>
                <div className="blog-card-content">
                  <div className="blog-meta-premium">
                    <span className="meta-item date">{post.date}</span>
                    <span className="meta-separator">/</span>
                    <span className="meta-item read-time">{post.readTime}</span>
                  </div>
                  <h3 className="blog-title-tech">{post.title}</h3>
                  <p className="blog-description-tech">{post.description}</p>
                  <div className="blog-footer-tech">
                    <div className="author-info">
                      <div className="author-avatar-tech">{post.author.charAt(0)}</div>
                      <span className="author-name">{post.author}</span>
                    </div>
                    {post.id === "blog-yunity-2026" ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentView("yunity-blog");
                          window.scrollTo(0, 0);
                        }}
                        className="read-more-btn-tech"
                      >
                        Read Full Story <span className="arrow">→</span>
                      </button>
                    ) : post.id === "gallery-yunity-2026" ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentView("yunity-gallery");
                          window.scrollTo(0, 0);
                        }}
                        className="read-more-btn-tech"
                      >
                        Launch Gallery <span className="arrow">→</span>
                      </button>
                    ) : post.externalLink ? (
                      <button 
                        onClick={handleRegister}
                        className="read-more-btn-tech"
                      >
                        Register Now <span className="arrow">→</span>
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {filteredPosts.length > visiblePosts && (
          <div className="load-more-container-tech">
            <button
              className="load-more-btn-premium"
              onClick={() => setVisiblePosts(prev => prev + 6)}
            >
              Fetch More Intel
            </button>
          </div>
        )}
      </div>
    )}

      <style>{`
        .events-premium-section {
          min-height: 100vh;
          background: transparent;
          font-family: 'Inter', sans-serif;
          color: var(--text-primary);
          padding-top: 8rem;
          padding-bottom: 8rem;
          position: relative;
          z-index: 1;
        }

        .events-container {
          max-width: 90rem;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .events-subtitle-premium {
          color: var(--text-secondary);
          font-size: 1.15rem;
          margin-top: 1.5rem;
          opacity: 0.8;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
          text-align: center;
        }

        /* --- Filters --- */
        .filter-container-premium {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 5rem;
        }

        .filter-btn-events {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.8rem 1.8rem;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s var(--transition-smooth);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .filter-btn-events:hover {
          border-color: var(--pk-green);
          color: var(--pk-green);
          transform: translateY(-3px);
        }

        .filter-btn-events.active {
          background: var(--pk-green);
          border-color: var(--pk-green);
          color: var(--text-primary);
          box-shadow: 0 10px 25px var(--pk-green-glow);
        }

        /* --- Grid --- */
        .blog-grid-premium {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 3rem;
        }

        /* --- Cards --- */
        .blog-card-premium {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border-radius: 2.5rem;
          overflow: hidden;
          border: 1px solid var(--glass-border);
          transition: all 0.6s var(--transition-smooth);
          display: flex;
          flex-direction: column;
        }

        .blog-card-inner {
          position: relative;
          z-index: 2;
          background: transparent;
        }

        .blog-card-premium:hover {
          transform: translateY(-15px);
          border-color: var(--pk-green);
          box-shadow: 0 40px 80px var(--glass-shadow);
        }

        .blog-card-image {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
        }

        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.5s var(--transition-smooth);
          filter: brightness(0.9) contrast(1.1);
        }

        .blog-card-premium:hover .blog-card-image img {
          transform: scale(1.1);
        }

        .scanline-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%);
          background-size: 100% 4px;
          pointer-events: none;
          opacity: 0.3;
        }

        .image-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.5) 100%);
          pointer-events: none;
        }

        .blog-category-badge-premium {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          color: var(--text-primary);
          padding: 0.6rem 1.2rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 20px var(--glass-shadow);
          border: 1px solid var(--glass-border);
        }

        .blog-card-content {
          padding: 2.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .blog-meta-premium {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .meta-item.read-time { color: var(--pk-green); }

        .blog-title-tech {
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 1.2rem;
          color: var(--text-primary);
          line-height: 1.2;
          transition: color 0.3s ease;
        }

        .blog-card-premium:hover .blog-title-tech {
          color: var(--pk-green);
        }

        .blog-description-tech {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 2.5rem;
          font-size: 1.05rem;
          flex: 1;
        }

        .blog-footer-tech {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border-light);
        }

        .author-info { display: flex; align-items: center; gap: 0.8rem; }
        .author-avatar-tech { 
          width: 32px; height: 32px; background: var(--pk-green); color: #fff; 
          border-radius: 50%; display: flex; align-items: center; justify-content: center; 
          font-weight: 900; font-size: 0.8rem;
        }
        .author-name { color: var(--text-secondary); font-size: 0.9rem; font-weight: 600; }

        .read-more-btn-tech {
          background: transparent; border: none; color: var(--pk-green); font-weight: 800; 
          cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;
        }
        .read-more-btn-tech:hover { transform: translateX(8px); color: var(--pk-green-light); }

        /* --- Load More --- */
        .load-more-container-tech { text-align: center; margin-top: 6rem; }
        .load-more-btn-premium { 
          background: rgba(0, 230, 118, 0.05); border: 2px solid var(--pk-green); 
          color: var(--pk-green); font-weight: 900; padding: 1.5rem 4rem; border-radius: 1.5rem; 
          font-size: 1.1rem; cursor: pointer; transition: all 0.4s var(--transition-smooth);
          text-transform: uppercase; letter-spacing: 0.2em;
        }
        .load-more-btn-premium:hover { 
          background: var(--pk-green); color: #fff; box-shadow: 0 15px 40px var(--pk-green-glow); 
          transform: translateY(-5px); 
        }

        @media (max-width: 768px) {
          .blog-grid-premium { grid-template-columns: 1fr; }
          .detail-panel-premium { padding: 2rem; }
        }

        .summit-highlight-banner {
          background: rgba(0, 230, 118, 0.05);
          border: 1px solid var(--pk-green);
          border-radius: 20px;
          padding: 1.5rem 2.5rem;
          margin-bottom: 4rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .summit-highlight-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(0, 230, 118, 0.1), transparent);
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }

        .summit-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        .summit-tag {
          background: var(--pk-green);
          color: #000;
          font-weight: 900;
          font-size: 0.7rem;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          text-transform: uppercase;
        }

        .summit-text h3 {
          font-size: 1.4rem;
          margin: 0;
          color: var(--text-primary);
        }

        .summit-text p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0.2rem 0 0;
          font-weight: 600;
        }

        .summit-btn {
          background: var(--pk-green);
          color: #000;
          padding: 0.8rem 1.5rem;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.9rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .summit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px var(--pk-green-glow);
        }

        @media (max-width: 1024px) {
          .summit-content { flex-direction: column; text-align: center; gap: 1rem; }
          .summit-highlight-banner { padding: 2rem; }
        }

        @media (max-width: 768px) {
          .events-container,
          .trainings-view,
          .registration-view {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .filter-container-premium {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
          }

          .filter-btn-events {
            flex: 0 0 auto;
            padding: 0.8rem 1rem;
          }

          .blog-grid-premium {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .blog-card-image {
            height: 220px;
          }

          .blog-card-content {
            padding: 1.5rem;
          }

          .blog-title-tech {
            font-size: 1.45rem;
          }

          .blog-description-tech {
            font-size: 0.98rem;
          }

          .blog-footer-tech {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .summit-highlight-banner {
            padding: 1.25rem;
            margin-bottom: 2.5rem;
          }

          .summit-text h3 {
            font-size: 1.2rem;
          }

          .registration-view {
            padding-top: 6rem;
          }

          .registration-container-premium {
            border-radius: 2rem;
            padding: 1.5rem;
          }

          .summit-schedule-premium {
            gap: 0.75rem;
            margin-bottom: 2rem;
          }

          .cancel-btn-tech {
            position: static;
            margin-left: auto;
            margin-bottom: 1rem;
          }

          .form-grid-premium,
          .input-group-tech,
          .form-row-premium {
            grid-template-columns: 1fr;
          }

          .form-section-tech {
            padding: 1.25rem;
          }

          .section-header-tech {
            gap: 0.5rem;
            font-size: 1rem;
          }
        }

        /* --- Registration Form Styles --- */
        .registration-view { 
          padding: 8rem 2rem 5rem; 
          max-width: 1400px; 
          margin: 0 auto; 
          animation: fadeIn 0.6s ease; 
          width: 100%; 
          display: flex;
          justify-content: center;
          box-sizing: border-box; 
        }
        .registration-container-premium { 
          background: var(--glass-bg); 
          backdrop-filter: blur(40px); 
          border-radius: 4rem; 
          padding: 5rem 5%; 
          border: 1px solid var(--glass-border); 
          position: relative; 
          box-shadow: 0 50px 100px rgba(0,0,0,0.5); 
          width: 100%; 
          max-width: 100%;
          box-sizing: border-box; 
          display: flex;
          flex-direction: column;
        }
        .registration-title-tech { 
          font-size: clamp(2rem, 5vw, 3.5rem); 
          font-weight: 900; 
          margin-bottom: 2rem; 
          text-align: center; 
          color: var(--pk-green); 
          text-transform: uppercase; 
          letter-spacing: 0.2em; 
          text-shadow: 0 0 30px var(--pk-green-glow-subtle); 
          line-height: 1.2; 
        }

        .summit-schedule-premium {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 5rem;
        }
        .schedule-badge {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 0.6rem 1.2rem;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }
        .schedule-badge svg { color: var(--pk-green); }

        .cancel-btn-tech { position: absolute; top: 3rem; right: 4rem; background: rgba(255, 50, 50, 0.05); border: 1px solid rgba(255, 50, 50, 0.2); color: #ff4d4d; padding: 0.8rem 1.6rem; border-radius: 15px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.1em; z-index: 10; }
        .cancel-btn-tech:hover { background: #ff4d4d; color: #fff; box-shadow: 0 0 20px rgba(255, 77, 77, 0.4); transform: translateY(-2px); }

        .form-grid-premium { 
          display: grid; 
          grid-template-columns: repeat(2, minmax(0, 1fr)); 
          gap: 4rem; 
          width: 100%; 
          align-items: start; 
          margin-bottom: 3rem; 
          box-sizing: border-box;
        }
        .section-header-tech { font-size: 1.2rem; font-weight: 800; color: var(--pk-green); margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center; gap: 0.8rem; }
        .form-section-tech { margin-bottom: 2rem; }

        .validation-section-premium { 
          border-top: 1px solid var(--glass-border); 
          padding-top: 3rem; 
          margin-top: 1rem;
        }
        .validation-content-premium {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .payment-nodes { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
        .payment-node-card { background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); padding: 2rem; border-radius: 25px; transition: all 0.3s ease; cursor: pointer; }
        .payment-node-card:hover { border-color: rgba(0, 230, 118, 0.5); background: rgba(255, 255, 255, 0.05); }
        .payment-node-card.active-node { border-color: var(--pk-green); background: rgba(0, 230, 118, 0.05); box-shadow: 0 10px 30px rgba(0, 230, 118, 0.1); }
        .payment-node-card h4 { margin: 0 0 1.2rem; font-size: 1.2rem; color: var(--pk-green); font-weight: 900; text-transform: uppercase; }
        .node-details p { margin: 0.6rem 0; font-size: 1rem; color: var(--text-secondary); }
        .node-details span { color: var(--text-tertiary); font-weight: 700; width: 100px; display: inline-block; }

        .input-group-tech { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2rem; width: 100%; box-sizing: border-box; }
        .field-tech { display: flex; flex-direction: column; gap: 0.6rem; }
        .field-tech.full { grid-column: span 2; }
        .field-tech label { font-size: 0.85rem; font-weight: 800; color: var(--text-tertiary); text-transform: uppercase; margin-left: 0.5rem; letter-spacing: 0.05em; }
        .field-tech input, .field-tech select { background: var(--bg-elevated); border: 1px solid var(--border-light); padding: 1.2rem 1.5rem; border-radius: 15px; color: var(--text-primary); font-size: 1.05rem; transition: all 0.3s ease; width: 100%; box-sizing: border-box; }
        .field-tech select { color-scheme: dark; }
        .field-tech select option { background: var(--bg-elevated); color: var(--text-primary); }
        .field-tech input:focus, .field-tech select:focus { border-color: var(--pk-green); background: var(--bg-elevated); outline: none; box-shadow: 0 0 20px var(--pk-green-glow-subtle); transform: translateY(-2px); }

        .declaration-tech { margin-bottom: 2.5rem; }
        .checkbox-tech { display: flex; align-items: center; gap: 1rem; cursor: pointer; color: var(--text-secondary); font-weight: 600; font-size: 0.95rem; }
        .checkbox-tech input { width: 20px; height: 20px; accent-color: var(--pk-green); }

        .submit-btn-premium { width: 100%; background: var(--pk-green); color: #000; padding: 1.2rem; border-radius: 15px; font-weight: 900; font-size: 1.1rem; border: none; cursor: pointer; transition: all 0.4s ease; text-transform: uppercase; letter-spacing: 0.1em; }
        .submit-btn-premium:hover:not(:disabled) { transform: translateY(-5px); box-shadow: 0 20px 40px var(--pk-green-glow); }
        .submit-btn-premium:disabled { opacity: 0.5; cursor: not-allowed; }

        .status-banner-tech { padding: 1.2rem; border-radius: 15px; margin-bottom: 3rem; display: flex; align-items: center; gap: 1rem; font-weight: 700; }
        .status-banner-tech.success { background: rgba(0, 230, 118, 0.1); color: var(--pk-green); border: 1px solid var(--pk-green); }
        .status-banner-tech.error { background: rgba(255, 77, 77, 0.1); color: #ff4d4d; border: 1px solid #ff4d4d; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 900px) {
          .form-grid-premium { grid-template-columns: 1fr; gap: 2rem; }
          .registration-container-premium { padding: 2rem; }
        }

        /* --- YUNIty Blog Detail View --- */
        .yunity-blog-detail-view {
          padding: 2rem 0;
          color: var(--text-primary);
        }

        .blog-detail-container-premium {
          max-width: 54rem;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .back-btn-tech {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.8rem 1.6rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.05em;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 3rem;
        }

        .back-btn-tech:hover {
          border-color: var(--pk-green);
          color: var(--pk-green);
          background: rgba(0, 230, 118, 0.05);
          transform: translateX(-4px);
        }

        .back-btn-tech.bottom-back {
          margin-top: 4rem;
          margin-bottom: 0;
        }

        .blog-detail-header {
          margin-bottom: 3rem;
        }

        .blog-detail-title {
          font-size: 3rem;
          font-weight: 900;
          line-height: 1.2;
          margin: 1.5rem 0;
          letter-spacing: -0.02em;
        }

        .blog-detail-meta {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.85rem;
          color: var(--text-tertiary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .meta-separator {
          color: rgba(255, 255, 255, 0.15);
        }

        .blog-detail-featured-image {
          position: relative;
          width: 100%;
          height: 480px;
          border-radius: 2rem;
          overflow: hidden;
          border: 1px solid var(--glass-border);
          margin-bottom: 4rem;
        }

        .blog-detail-featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blog-detail-body {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .blog-day-section {
          margin-bottom: 4rem;
        }

        .day-title {
          font-size: 2.2rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-top: 3rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .section-subtitle {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .blog-image-wrapper {
          position: relative;
          width: 100%;
          margin: 2.5rem 0;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid var(--glass-border);
        }

        .blog-image-wrapper img {
          width: 100%;
          height: auto;
          display: block;
          filter: brightness(0.95);
        }

        .image-caption {
          display: block;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-tertiary);
          margin-top: 1rem;
          font-style: italic;
        }

        .blog-divider {
          border: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--glass-border), transparent);
          margin: 4rem 0;
        }

        /* --- Drink Reactions Grid --- */
        .drink-collage-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin: 2.5rem 0 1rem;
        }

        .collage-card {
          aspect-ratio: 1;
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.4s ease;
        }

        .collage-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(20%) contrast(1.05);
          transition: all 0.4s ease;
        }

        .collage-card:hover {
          transform: translateY(-5px) scale(1.05);
          border-color: var(--pk-green);
          box-shadow: 0 10px 25px rgba(0, 230, 118, 0.15);
        }

        .collage-card:hover img {
          filter: grayscale(0%) contrast(1.1);
        }

        @media (max-width: 600px) {
          .drink-collage-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.8rem;
          }
        }

        /* --- Gallery Memory Cloud --- */
        .gallery-cloud-viewport {
          position: relative;
          width: 100%;
          height: 80vh;
          min-height: 600px;
          background: rgba(255, 255, 255, 0.01);
          overflow: hidden;
          border-radius: 2rem;
          border: 1px solid var(--glass-border);
          margin: 3rem 0;
        }

        .cloud-ambient-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 60%;
          background: radial-gradient(circle, rgba(0, 230, 118, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .memory-card {
          position: absolute;
          transition: z-index 0s, filter 0.5s ease, opacity 0.5s ease;
          z-index: 2;
          cursor: pointer;
        }

        .memory-card.size-sm { width: 140px; height: 100px; }
        .memory-card.size-md { width: 220px; height: 160px; }
        .memory-card.size-lg { width: 320px; height: 220px; }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          background: rgba(255, 255, 255, 0.02);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
        }

        .memory-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(40%) contrast(1.1) brightness(0.85);
          transition: filter 0.5s ease, transform 0.8s ease;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 50%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
        }

        .scanlines {
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.12) 50%), 
                      linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          background-size: 100% 3px, 3px 100%;
          pointer-events: none;
          opacity: 0.45;
        }

        /* Hover focal mechanics */
        .gallery-cloud-viewport:hover .memory-card {
          filter: blur(2px) grayscale(80%) brightness(0.6);
          opacity: 0.4;
        }

        .gallery-cloud-viewport .memory-card:hover {
          z-index: 50;
          filter: blur(0px) grayscale(0%) brightness(1.1);
          opacity: 1;
        }

        .gallery-cloud-viewport .memory-card:hover .card-inner {
          transform: scale(1.18) rotate(0deg) translateY(-10px);
          border-color: var(--pk-green, #00e676);
          box-shadow: 0 20px 45px rgba(0, 230, 118, 0.25);
        }

        .gallery-cloud-viewport .memory-card:hover img {
          transform: scale(1.05);
        }

        .clickable-card {
          cursor: pointer;
        }

        .gallery-container-premium {
          max-width: 90rem;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .gallery-header-premium {
          text-align: center;
          margin-top: 2rem;
          margin-bottom: 3rem;
        }

        .gallery-title-premium {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .gallery-subtitle-premium {
          color: var(--text-secondary);
          font-size: 1.15rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .gallery-footer-actions {
          display: flex;
          justify-content: center;
          margin-top: 4rem;
          gap: 2rem;
        }

        .gallery-cta-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          border-radius: 1.5rem;
          padding: 2.5rem;
          margin: 5rem 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .gallery-cta-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(0, 230, 118, 0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .gallery-cta-content h3 {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .gallery-cta-content p {
          color: var(--text-secondary);
          margin-bottom: 1.8rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        /* Responsive memory cloud behavior */
        @media (max-width: 768px) {
          .gallery-cloud-viewport {
            height: auto;
            min-height: auto;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            padding: 1.5rem;
          }
          .memory-card {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 1.5 !important;
            transform: none !important;
          }
          .gallery-cloud-viewport:hover .memory-card {
            filter: none !important;
            opacity: 1 !important;
          }
          .gallery-cloud-viewport .memory-card:hover .card-inner {
            transform: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Blog;