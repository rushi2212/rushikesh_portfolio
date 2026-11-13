import React, { useState, useEffect, useRef } from "react";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Phone,
  Linkedin,
  Award,
  Calendar,
  MapPin,
  Code,
  Users,
  Zap,
  Server,
  Bot,
  Eye,
  Send,
  User,
  MessageCircle,
  CheckCircle2,
  Instagram,
  Menu,
  X,
} from "lucide-react";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoicePending, setIsVoicePending] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [activeSection, setActiveSection] = useState("about");
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const audioRef = useRef(null);
  const introAudioUrlRef = useRef(null);
  const introAudioPromiseRef = useRef(null);
  const loadIntroAudioRef = useRef(null);
  const voiceRequestRef = useRef(0);

  loadIntroAudioRef.current = () => {
    if (introAudioUrlRef.current) return Promise.resolve(introAudioUrlRef.current);
    if (!introAudioPromiseRef.current) {
      introAudioPromiseRef.current = fetch(
        "/api/intro-voice?v=fPIfC3elMLbN9tNwMXkw-intro-v2",
      )
        .then((response) => {
          if (
            !response.ok ||
            !response.headers.get("content-type")?.includes("audio")
          ) {
            return response.json().catch(() => ({})).then((errorBody) => {
              const providerCode = errorBody.providerCode
                ? ` (ElevenLabs code: ${errorBody.providerCode})`
                : "";
              throw new Error(
                `${errorBody.error || "ElevenLabs audio is not available."}${providerCode}`,
              );
            });
          }
          return response.blob();
        })
        .then((audioBlob) => {
          const audioUrl = URL.createObjectURL(audioBlob);
          introAudioUrlRef.current = audioUrl;
          return audioUrl;
        })
        .catch((error) => {
          introAudioPromiseRef.current = null;
          throw error;
        });
    }
    return introAudioPromiseRef.current;
  };

  const handleRobotClick = () => {
    if (isSpeaking) {
      voiceRequestRef.current += 1;
      audioRef.current?.pause();
      audioRef.current = null;
      setIsSpeaking(false);
      setIsVoicePending(false);
      setVoiceError("");
      return;
    }

    const requestId = voiceRequestRef.current + 1;
    voiceRequestRef.current = requestId;
    setIsSpeaking(true);
    setIsVoicePending(false);
    setVoiceError("");

    const playAudio = (audioUrl) => {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => {
        if (voiceRequestRef.current === requestId) setIsSpeaking(false);
        audioRef.current = null;
      };
      audio.onerror = () => {
        audioRef.current = null;
        if (voiceRequestRef.current === requestId) {
          setIsSpeaking(false);
          setIsVoicePending(true);
          setVoiceError("ElevenLabs audio could not be played. Click the robot to retry.");
        }
      };
      audio.play().catch((error) => {
        if (voiceRequestRef.current !== requestId) return;
        audioRef.current = null;
        if (error.name === "NotAllowedError") {
          setIsSpeaking(false);
          setIsVoicePending(true);
          setVoiceError("Click the robot again to allow audio playback.");
        } else {
          setIsSpeaking(false);
          setIsVoicePending(true);
          setVoiceError("ElevenLabs audio could not be played. Click the robot to retry.");
        }
      });
    };

    if (introAudioUrlRef.current) {
      playAudio(introAudioUrlRef.current);
      return;
    }

    loadIntroAudioRef.current()
      .then((audioUrl) => {
        if (voiceRequestRef.current === requestId) playAudio(audioUrl);
      })
      .catch((error) => {
        if (voiceRequestRef.current !== requestId) return;
        setIsSpeaking(false);
        setIsVoicePending(true);
        setVoiceError(error.message || "ElevenLabs is unavailable. Check the API key and server setup.");
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");
    try {
      const response = await fetch("https://formspree.io/f/mvgqojob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [currentCertificate, setCurrentCertificate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = true;
  const navLinkClass = (sectionId) =>
    `portfolio-nav-link${activeSection === sectionId ? " is-active" : ""}`;

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      if (introAudioUrlRef.current) URL.revokeObjectURL(introAudioUrlRef.current);
    },
    [],
  );

  useEffect(() => {
    if (submitStatus !== "success") return undefined;
    const timer = setTimeout(() => setSubmitStatus(""), 6000);
    return () => clearTimeout(timer);
  }, [submitStatus]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const sectionIds = ["about", "skills", "projects", "achievements", "certifications", "contact"];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isLoading) return undefined;

    const targets = document.querySelectorAll(
      "section[id], section[id] .grid > div, section[id] .grid > a, section[id] .grid > article, #projects .project-feature-row",
    );
    if (!("IntersectionObserver" in window)) return undefined;

    document.documentElement.classList.add("motion-enabled");
    const spotlightTargets = document.querySelectorAll(
      "#projects .grid > div, #skills .grid > div",
    );
    const updateSpotlight = (event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
      event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
    };
    spotlightTargets.forEach((target) => {
      target.addEventListener("pointermove", updateSpotlight, { passive: true });
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      spotlightTargets.forEach((target) => {
        target.removeEventListener("pointermove", updateSpotlight);
      });
      document.documentElement.classList.remove("motion-enabled");
    };
  }, [isLoading]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      setCursor({
        x: event.clientX,
        y: event.clientY,
        visible: true,
      });
    };

    const handlePointerLeave = () => {
      setCursor((currentCursor) => ({
        ...currentCursor,
        visible: false,
      }));
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const certificates = [
    {
      id: 1,
      title: "PVGHackHub 2025 Winner",
      organization:
        "Pune Vidyarthi Griha's College of Engineering & S.S. Dhamankar Institute of Management, Nashik",
      date: "Oct 2025",
      image: "/pvg-hackhub.png",
    },
    {
      id: 2,
      title: "HACKRON 2.0 - 2nd Position",
      organization:
        "Newton School of Technology & Ajeenkya DY Patil University",
      date: "Jan 2026",
      image: "/hackron-certificate.png",
    },
    {
      id: 3,
      title: "Hack Your Path 6.0",
      organization: "Hyderabad Institute Of Technology & Management",
      date: "May 2025",
      image: "/hack-your-path.jpg",
    },
    {
      id: 4,
      title: "Hacksagon",
      organization: "ABV.IIITM IEEE Student Branch",
      date: "June 2025",
      image: "/hacksagon.png",
    },
    {
      id: 5,
      title: "MERN Stack Course",
      organization: "Tutedude",
      date: "May 2025",
      image: "/tutedude-mern.png",
      certificateId: "TD-RUSH-ME-2152",
    },
    {
      id: 6,
      title: "Agentic AI Workshop",
      organization: "Progression School",
      date: "July 2025",
      certificateId: "GCO-2303-251",
      image: "/Ai-workshop.jpg",
    },
    {
      id: 7,
      title: "React.js Course",
      organization: "Tutedude",
      date: "May 2025",
      image: "/certificateReact.jpg",
      certificateId: "TD-RUSH-RJ-1252",
    },
    {
      id: 8,
      title: "N8N Course",
      organization: "Tutedude",
      date: "Aug 2026",
      image: "/tutedude-n8n.png",
      certificateId: "TD-RUSH-CR-1621",
    },
    {
      id: 9,
      title: "Vector Databases for RAG: An Introduction",
      organization: "IBM",
      date: "Jul 2026",
      image: "/ibm.png",
    },
    {
      id: 10,
      title: "DevOps Course",
      organization: "Tutedude",
      date: "Sep 2026",
      image: "/tutedude_devops.png",
      certificateId: "TD-RUSH-DO-1605",
    },
  ];
  const projects = [
    {
      id: 0,
      title: "CareerPilot AI",
      subtitle: "AI-Powered Career Development Platform",
      description:
        "An AI-powered career workspace that helps job seekers assess their resumes, build targeted skills, practice interviews, discover jobs, and manage applications.",
      features: [
        "AI tutor and quizzes",
        "Resume analysis",
        "Personalized learning roadmap",
        "Mock interviews",
        "Job search and application tracking",
        "Document Q&A",
      ],
      tech: [
        "React",
        "TypeScript",
        "FastAPI",
        "PostgreSQL",
        "Groq API",
        "Qdrant",
        "FastEmbed",
        "Docker",
        "Vercel",
        "Render",
      ],
      link: "https://career-pilot-ai-nine-psi.vercel.app/",
      image: "/careerpilot.png",
    },
    {
      id: 1,
      title: "MindSpace",
      subtitle: "Unified AI Workspace for Creators",
      date: "Nov 2025",
      description:
        "AI-powered creative workspace integrating text generation, image synthesis, audio generation, and brainstorming tools in one platform.",
      features: [
        "AI text generation",
        "Image & audio synthesis",
        "MindMap builder",
        "Real-time AI assistance",
      ],
      tech: [
        "React",
        "FastAPI",
        "Google Gemini",
        "Hugging Face",
        "AI Image Generation",
        "AI Audio Generation",
      ],
      link: "https://mind-space-one-mu.vercel.app/",
      image: "/mindspace.png",
    },
    {
      id: 2,
      title: "DisasterConnect",
      subtitle: "AI-Powered Emergency Response Platform",
      date: "2025",
      description:
        "AI-driven disaster management platform for real-time emergency coordination, damage assessment, and incident tracking.",
      features: [
        "AI disaster detection",
        "Real-time operations map",
        "NLP incident verification",
        "WebSocket live tracking",
      ],
      tech: [
        "React",
        "Node.js",
        "MongoDB",
        "FastAPI",
        "TensorFlow",
        "PyTorch",
        "Socket.io",
      ],
      link: "https://disastermanager.onrender.com/",
      image: "/disasterconnect.png",
    },
    {
      id: 3,
      title: "Crop Calendar",
      subtitle: "AI-Powered Agritech Platform",
      date: "Jan 2026",
      description:
        "Full-stack agritech platform helping farmers optimize crop cycles using AI-driven insights and real-time agricultural data.",
      features: [
        "Dynamic crop scheduling",
        "Weather integration",
        "AI crop recommendations",
        "Real-time agricultural insights",
      ],
      tech: [
        "MongoDB",
        "Express.js",
        "React.js",
        "Node.js",
        "AI-driven Insights",
      ],
      link: "https://team-fab-5-agritech.vercel.app/dashboard",
      image: "/crop-calendar.png",
    },
    {
      id: 4,
      title: "CureHub",
      subtitle: "Hospital Management System",
      date: "May 2025",
      description:
        "Comprehensive hospital management system for streamlined patient data management.",
      features: [
        "Patient data management",
        "User authentication",
        "Real-time updates",
        "Medical records",
      ],
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
      link: "https://curehub-bfrb.onrender.com",
      image: "/curehub.png",
    },
    {
      id: 5,
      title: "AI DSA Mentor",
      subtitle: "AI-Powered DSA Learning Platform",
      date: "2025",
      description:
        "Interactive AI-powered DSA learning platform that generates topic notes, quizzes, resources, and personalized coding assistance.",
      features: [
        "AI-generated DSA notes",
        "Resource recommendations",
        "AI doubt solver",
        "Quiz generation & progress tracking",
      ],
      tech: ["React", "FastAPI", "Google Gemini", "Groq"],
      link: "https://ai-dsa-mentor-seven.vercel.app/",
      image: "/ai-dsa-mentor.png",
    },
    {
      id: 6,
      title: "PostCraft Pro",
      subtitle: "AI-Powered Social Media Post Generator",
      date: "July 2025",
      description:
        "AI-driven web tool using Flask and Google Gemini for generating platform-specific social media posts with instant summaries.",
      features: [
        "Instant summary generation",
        "One-click copy",
        "Responsive UI",
        "Multi-platform support",
      ],
      tech: ["Flask", "HTML", "CSS", "Google Gemini", "Tavily API"],
      link: "https://post-agent.onrender.com",
      image: "/postcraft.png",
      github: "#",
    },
    {
      id: 7,
      title: "GreenPulse",
      subtitle: "Sustainable E-commerce Platform",
      date: "June 2025",
      description:
        "Eco-friendly e-commerce platform with carbon footprint tracking and green leaderboard using MERN stack.",
      features: [
        "Carbon footprint tracking",
        "Green leaderboard",
        "Razorpay integration",
        "Eco-friendly products",
      ],
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Razorpay"],
      link: "https://greenpulse-45fd.onrender.com",
      image: "/greenpulse.png",
      github: "#",
    },
  ];

  const skills = [
    {
      category: "Frontend Development",
      items: [
        "React.js",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
      ],
      icon: <Code size={24} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Backend Development",
      items: [
        "Node.js",
        "Express.js",
        "Java",
        "Python",
        "Flask",
        "FastAPI",
        "RESTful APIs",
        "Postman",
      ],
      icon: <Server size={24} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      category: "Database & Vector Search",
      items: [
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "ChromaDB",
        "FAISS",
        "Git",
        "GitHub",
      ],
      icon: <Zap size={24} />,
      color: "from-purple-500 to-pink-500",
    },
    {
      category: "AI Technologies",
      items: [
        "LangChain",
        "LangGraph",
        "Agentic AI",
        "RAG",
        "Machine Learning",
        "MCP",
        "n8n",
      ],
      icon: <Bot size={24} />,
      color: "from-orange-500 to-red-500",
    },
    {
      category: "Cloud & DevOps",
      items: [
        "AWS EC2",
        "AWS S3",
        "AWS IAM",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Terraform",
        "Linux Basics",
      ],
      icon: <Server size={24} />,
      color: "from-slate-500 to-slate-700",
    },
  ];

  const achievements = [
    {
      title: "Winner",
      event: "PVG HackHub 2025 - National Level 24-Hour Hackathon",
      domain: "Web Development",
      organizer:
        "Pune Vidyarthi Griha’s College of Engineering & S.S. Dhamankar Institute of Management, Nashik",
      date: "Oct 2025",
      description:
        "Won the Offline Round in Web Development domain by building and presenting an innovative project under intense 24-hour hackathon conditions.",
      image: "/pvg.jpeg",
    },
    {
      title: "2nd Place Winner",
      event: "HACKRON 2.0 - 24 Hour Hackathon",
      organizer: "Newton School of Technology & Ajeenkya DY Patil University",
      date: "Jan 2026",
      description:
        "Built Crop Calendar & Farming Assistant — an AI-powered AgriTech solution for crop planning, pest prediction, market price forecasting, and contextual farming assistance.",
      image: "/teckron.jpeg",
    },

    {
      title: "Special Prize Winner",
      event: "Hack Your Path 6.0 Hackathon",
      theme: "FinTech Theme",
      date: "May 2025",
      description: "Developed CureHub - Hospital Management System",
      image: "/hitam.jpeg",
    },
    {
      title: "Finalist",
      event: "HACKSAGON 2025, ABV-IIITM Gwalior",
      note: "Selected among 600+ participating teams",
      date: "June 2025",
      description: "Showcased innovative AI-powered solutions",
      image: "/hacksagon.jpeg",
    },
    {
      title: "Participant",
      event: "WEB DASH 2025, IEEE Jamia Millia Islamia",
      date: "June 2025",
      description: "Competed in web development challenges",
    },
  ];

  const nextCertificate = () => {
    setCurrentCertificate((prev) => (prev + 1) % certificates.length);
  };

  const prevCertificate = () => {
    setCurrentCertificate(
      (prev) => (prev - 1 + certificates.length) % certificates.length,
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_25%),linear-gradient(135deg,_#020617,_#0f172a)]"></div>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-35">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-400/15 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Main content */}
        <div className="text-center relative z-10 px-6">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-500 blur-xl opacity-35 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-2xl"></div>
              <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-300 border-r-blue-400 animate-spin"></div>
              <div
                className="absolute inset-3 rounded-full border-2 border-transparent border-b-indigo-300 animate-spin"
                style={{
                  animationDuration: "1.6s",
                  animationDirection: "reverse",
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold tracking-[0.35em] text-white/80">
                RR
              </div>
            </div>
          </div>

          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <p className="text-cyan-200 text-sm uppercase tracking-[0.4em] mb-2">
                Preparing portfolio
              </p>
            </div>

            <div className="w-full mx-auto space-y-3">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_24px_rgba(56,189,248,0.45)]"
                  style={{ width: "78%" }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-300">
                <span>Assets</span>
                <span>Theme</span>
                <span>Layout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-indigo-300 rounded-full opacity-40 animate-ping delay-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-[#050816] text-slate-100"
          : "bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900"
      }`}
      style={{
        colorScheme: "dark",
        "--cursor-x": `${cursor.x}px`,
        "--cursor-y": `${cursor.y}px`,
      }}
    >
      <div className="code-atmosphere" aria-hidden="true">
        <span className="code-symbol code-symbol-one">&lt;/&gt;</span>
        <span className="code-symbol code-symbol-two">&#123; &#125;</span>
        <span className="code-symbol code-symbol-three">⌘</span>
        <span className="code-symbol code-symbol-four">();</span>
        <div className="code-terminal">
          <div className="code-terminal-bar"><i></i><i></i><i></i></div>
          <div className="code-terminal-lines"><i></i><i></i><i></i><i></i><i></i></div>
        </div>
        <div className="code-trace code-trace-one"></div>
        <div className="code-trace code-trace-two"></div>
      </div>
      <div className="ambient-robots">
        <button
          type="button"
          className={`robot-3d-companion${isSpeaking ? " is-speaking" : ""}${isVoicePending ? " is-pending" : ""}`}
          aria-label={isSpeaking ? "Stop introduction" : isVoicePending ? "Play introduction" : "Hear my introduction"}
          aria-pressed={isSpeaking}
          onClick={handleRobotClick}
          style={{
            "--scroll-offset": `${Math.sin(scrollY / 140) * 14}px`,
            "--scroll-tilt": `${Math.cos(scrollY / 180) * 8}deg`,
          }}
        >
          <i className="robot-3d-shadow"></i>
          <i className="robot-3d-antenna"><i></i></i>
          <i className="robot-3d-ear robot-3d-ear-left"></i>
          <i className="robot-3d-ear robot-3d-ear-right"></i>
          <i className="robot-3d-head">
            <i className="robot-3d-face">
              <i className="robot-3d-eye robot-3d-eye-left"></i>
              <i className="robot-3d-eye robot-3d-eye-right"></i>
              <i className="robot-3d-mouth"></i>
            </i>
          </i>
          <i className="robot-3d-neck"></i>
          <i className="robot-3d-arm robot-3d-arm-left"></i>
          <i className="robot-3d-arm robot-3d-arm-right"></i>
          <i className="robot-3d-body">
            <i className="robot-3d-core"></i>
            <i className="robot-3d-panel-light"></i>
          </i>
          <i className="robot-3d-leg robot-3d-leg-left"></i>
          <i className="robot-3d-leg robot-3d-leg-right"></i>
          <i className="robot-3d-foot robot-3d-foot-left"></i>
          <i className="robot-3d-foot robot-3d-foot-right"></i>
        </button>
        {isVoicePending && (
          <span className="robot-voice-hint" role="status">
            {voiceError || "Click the robot to retry the introduction."}
          </span>
        )}
      </div>
      <div
        className={
          isDark
            ? "pointer-events-none fixed left-0 top-0 z-[9999] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/60 shadow-[0_0_18px_rgba(34,211,238,0.35)] md:block"
            : "pointer-events-none fixed left-0 top-0 z-[9999] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/50 shadow-[0_0_18px_rgba(37,99,235,0.22)] md:block"
        }
        style={{
          transform: `translate(${cursor.x}px, ${cursor.y}px) translate(-50%, -50%)`,
          opacity: cursor.visible ? 1 : 0,
          transition: "transform 80ms linear, opacity 220ms ease",
        }}
      />

      {/* Navigation */}
      <nav
        aria-label="Primary navigation"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? isDark
              ? "bg-slate-950/85 backdrop-blur-md shadow-2xl shadow-black/20 border-b border-white/5"
              : "bg-white/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#about" className="portfolio-nav-brand flex items-center gap-3" aria-label="Rushikesh Raut, home">
              <div className="portfolio-nav-monogram flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-white font-bold shadow-lg shadow-cyan-500/20">
                RR
              </div>
              <div className="flex flex-col gap-1 leading-none">
                <span className="portfolio-nav-name">Rushikesh Raut</span>
                <span className="portfolio-nav-role">FULL STACK · AI ENGINEER</span>
              </div>
            </a>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#about"
                  className={navLinkClass("about")}
                  aria-current={activeSection === "about" ? "location" : undefined}
                >
                  About
                </a>
                <a
                  href="#skills"
                  className={navLinkClass("skills")}
                  aria-current={activeSection === "skills" ? "location" : undefined}
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  className={navLinkClass("projects")}
                  aria-current={activeSection === "projects" ? "location" : undefined}
                >
                  Projects
                </a>
                <a
                  href="#achievements"
                  className={navLinkClass("achievements")}
                  aria-current={activeSection === "achievements" ? "location" : undefined}
                >
                  Achievements
                </a>
                <a
                  href="#certifications"
                  className={navLinkClass("certifications")}
                  aria-current={activeSection === "certifications" ? "location" : undefined}
                >
                  Certifications
                </a>
                <a
                  href="#contact"
                  className={`portfolio-nav-cta${activeSection === "contact" ? " is-active" : ""}`}
                  aria-current={activeSection === "contact" ? "location" : undefined}
                >
                  Contact
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className={
                isDark
                  ? "inline-flex md:hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md transition-all hover:border-blue-400/40 hover:bg-white/10"
                  : "inline-flex md:hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-800 shadow-sm transition-all hover:border-blue-400/40 hover:bg-slate-200"
              }
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          <div
            id="mobile-navigation"
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMobileMenuOpen
                ? "max-h-96 opacity-100 mt-4"
                : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={
                isDark
                  ? "space-y-2 rounded-2xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur-md"
                  : "space-y-2 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-md"
              }
            >
              {[
                ["#about", "About"],
                ["#skills", "Skills"],
                ["#projects", "Projects"],
                ["#achievements", "Achievements"],
                ["#certifications", "Certifications"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`portfolio-mobile-link${activeSection === href.slice(1) ? " is-active" : ""}${href === "#contact" ? " is-contact" : ""}`}
                  aria-current={activeSection === href.slice(1) ? "location" : undefined}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="container mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <div className="space-y-6">
              <div
                className={
                  isDark
                    ? "inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200"
                    : "inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700"
                }
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.8)]"></span>
                coder mode
              </div>
              <h1
                className={
                  isDark
                    ? "text-5xl lg:text-6xl font-bold text-slate-100 leading-tight"
                    : "text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
                }
              >
                Rushikesh
                <span className="block text-cyan-400">Raut</span>
              </h1>
              <p
                className={
                  isDark
                    ? "text-xl text-slate-300 leading-relaxed"
                    : "text-xl text-slate-600 leading-relaxed"
                }
              >
                Computer Engineering Graduate & Full-Stack Developer passionate
                about creating innovative solutions with AI and modern web
                technologies.
              </p>
              <p
                className={
                  isDark
                    ? "text-lg text-slate-400 leading-relaxed"
                    : "text-lg text-slate-500 leading-relaxed"
                }
              >
                Graduated in Computer Engineering from GCOEARA, Pune with a 9.32
                CGPA, experienced in MERN stack, AI integration, and modern web
                development.
              </p>
              <div
                className={
                  isDark
                    ? "inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-300 shadow-lg shadow-black/10"
                    : "inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-lg shadow-slate-200/60"
                }
              >
                <span className="font-semibold text-cyan-400">&lt;/&gt;</span>
                <span>
                  Building clean, scalable interfaces and AI-powered apps
                </span>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="mailto:rushikesh220703@gmail.com"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg"
                >
                  <Mail size={20} />
                  Get In Touch
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full transition-all transform hover:scale-105"
                >
                  <Eye size={20} />
                  View Work
                </a>
                <a
                  href="/Rushikesh_Resume.pdf"
                  download="Rushikesh_Resume.pdf"
                  className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full transition-all transform hover:scale-105"
                >
                  <Download size={20} />
                  Resume
                </a>
              </div>
              <div className="flex flex-wrap gap-6 pt-4 text-slate-500">
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+91-8459829900</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Pune, India</span>
                </div>
                <a
                  href="https://linkedin.com/in/rushikeshraut2212"
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="hero-photo-wrap relative flex w-full max-w-lg items-center justify-center py-10 -translate-y-2 sm:-translate-y-4 lg:translate-y-0">
              <div
                className={
                  isDark
                    ? "absolute left-0 top-1/2 h-56 w-24 -translate-y-1/2 rounded-full bg-cyan-400/30 blur-3xl"
                    : "absolute left-0 top-1/2 h-56 w-24 -translate-y-1/2 rounded-full bg-cyan-300/35 blur-3xl"
                }
              ></div>
              <div
                className={
                  isDark
                    ? "absolute right-0 top-1/2 h-56 w-24 -translate-y-1/2 rounded-full bg-blue-500/25 blur-3xl"
                    : "absolute right-0 top-1/2 h-56 w-24 -translate-y-1/2 rounded-full bg-blue-300/30 blur-3xl"
                }
              ></div>
              <div
                className={
                  isDark
                    ? "absolute inset-x-10 bottom-4 h-16 rounded-full bg-slate-900/20 blur-2xl"
                    : "absolute inset-x-10 bottom-4 h-16 rounded-full bg-slate-300/30 blur-2xl"
                }
              ></div>
              <img
                src="/rushikesh.png"
                alt="Rushikesh Raut"
                className={
                  isDark
                    ? "relative z-10 w-full max-w-md rounded-[1.75rem] object-cover object-top shadow-[0_24px_70px_rgba(15,23,42,0.25)]"
                    : "relative z-10 w-full max-w-md rounded-[1.75rem] object-cover object-top"
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section (swapped) */}
      <section id="achievements" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Achievements & Recognition
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Awards and recognitions received for innovative projects and
              technical excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-100"
              >
                {achievement.image && (
                  <div className="w-full h-44 sm:h-56 lg:h-48 bg-slate-100">
                    <img
                      src={achievement.image}
                      alt={achievement.event}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Award size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {achievement.title}
                    </h3>
                  </div>
                  {achievement.amount && (
                    <div className="text-green-600 font-semibold mb-2">
                      {achievement.amount}
                    </div>
                  )}
                  <p className="text-slate-600 mb-2 font-medium">
                    {achievement.event}
                  </p>
                  {achievement.note && (
                    <p className="text-slate-500 text-sm mb-2">
                      {achievement.note}
                    </p>
                  )}
                  <p className="text-slate-500 text-sm mb-4">
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar size={14} />
                    {achievement.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />

      {/* Certificates Section */}
      <section id="certifications" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Certifications
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Professional certifications and training programs completed
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div
              className={
                isDark
                  ? "bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
                  : "bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
              }
            >
              <div className="flex flex-col gap-4 p-4 sm:p-6 md:min-h-[500px]">
                <div className="flex-1 w-full">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-6 w-full h-72 sm:h-64 md:h-72 lg:h-64">
                      <img
                        src={certificates[currentCertificate].image}
                        alt={certificates[currentCertificate].title}
                        className={
                          isDark
                            ? "w-full max-w-[92vw] sm:max-w-full max-h-full object-contain rounded-lg shadow-lg"
                            : "w-full max-w-[92vw] sm:max-w-full max-h-full object-contain rounded-lg"
                        }
                      />
                    </div>
                    <div className="mb-5 flex items-center justify-center gap-3">
                      <button
                        onClick={prevCertificate}
                        className={
                          isDark
                            ? "p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-all transform hover:scale-110 flex-shrink-0"
                            : "p-3 rounded-full bg-white/70 hover:bg-white transition-all transform hover:scale-110 flex-shrink-0 border border-slate-200"
                        }
                      >
                        <ChevronLeft size={24} className="text-slate-600" />
                      </button>
                      <div className="flex gap-2">
                        {certificates.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentCertificate(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              index === currentCertificate
                                ? "bg-blue-600"
                                : "bg-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={nextCertificate}
                        className={
                          isDark
                            ? "p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-all transform hover:scale-110 flex-shrink-0"
                            : "p-3 rounded-full bg-white/70 hover:bg-white transition-all transform hover:scale-110 flex-shrink-0 border border-slate-200"
                        }
                      >
                        <ChevronRight size={24} className="text-slate-600" />
                      </button>
                    </div>
                    <div className="min-h-[140px] flex flex-col justify-center">
                      <h3
                        className={
                          isDark
                            ? "text-xl sm:text-2xl font-bold mb-2 text-slate-800"
                            : "text-xl sm:text-2xl font-bold mb-2 text-slate-900"
                        }
                      >
                        {certificates[currentCertificate].title}
                      </h3>
                      <p
                        className={
                          isDark
                            ? "text-base sm:text-xl text-blue-600 font-medium mb-2"
                            : "text-base sm:text-xl text-blue-700 font-medium mb-2"
                        }
                      >
                        {certificates[currentCertificate].organization}
                      </p>
                      <p
                        className={
                          isDark
                            ? "text-sm sm:text-base text-slate-600 mb-2"
                            : "text-sm sm:text-base text-slate-500 mb-2"
                        }
                      >
                        {certificates[currentCertificate].date}
                      </p>
                      <div className="h-6 flex items-center justify-center">
                        {certificates[currentCertificate].certificateId && (
                          <p
                            className={
                              isDark
                                ? "text-xs sm:text-sm text-slate-500 bg-slate-50 px-3 py-1 rounded-full"
                                : "text-xs sm:text-sm text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100"
                            }
                          >
                            ID: {certificates[currentCertificate].certificateId}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  isDark
                    ? "flex justify-center pb-6"
                    : "flex justify-center pb-6 pt-2"
                }
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Professional Experience
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Hands-on experience in web development and software engineering
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Users size={32} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-slate-800">
                    Frontend Web Development Intern
                  </h3>
                  <p className="text-xl text-blue-600 font-medium mb-2">
                    CODTECH IT SOLUTIONS
                  </p>
                  <p className="text-slate-600 mb-4">
                    January 2025 - February 2025
                  </p>
                  <div className="space-y-3 text-slate-600">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <p>
                        Developed and deployed multiple web applications
                        including interactive quiz app, real-time chat
                        application, professional portfolio webpage, and
                        comprehensive e-learning platform UI
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <p>
                        Enhanced technical skills in React.js, JavaScript, and
                        responsive design principles while collaborating
                        effectively in an Agile development environment
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <p>
                        Focused on optimizing user experience and application
                        performance through modern web development best
                        practices
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Education
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Academic background and relevant coursework
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-slate-800">
                  Bachelor of Engineering in Computer Engineering
                </h3>
                <p className="text-xl text-blue-600 font-medium mb-2">
                  Government College of Engineering and Research, Avasari
                  (GCOEARA)
                </p>
                <p className="text-slate-600 mb-6">
                  Pune, India • Graduated: 2026 • CGPA: 9.32
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "Data Structures & Algorithms",
                    "Web Development",
                    "Database Systems",
                    "Artificial Intelligence",
                    "Software Engineering",
                    "Computer Networks",
                  ].map((course, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next
              project.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                <div className="space-y-4 mb-8">
                  <a
                    href="mailto:rushikesh220703@gmail.com"
                    className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors group"
                  >
                    <div className="bg-blue-600 p-3 rounded-full group-hover:bg-blue-700 transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-slate-300">
                        rushikesh220703@gmail.com
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://linkedin.com/in/rushikeshraut2212"
                    className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors group"
                  >
                    <div className="bg-blue-600 p-3 rounded-full group-hover:bg-blue-700 transition-colors">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-sm text-slate-300">
                        Connect with me
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/8459829900"
                    className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors group"
                  >
                    <div className="bg-green-600 p-3 rounded-full group-hover:bg-green-700 transition-colors">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm text-slate-300">
                        Message me directly
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.instagram.com/rushikesh_22_12?igsh=a24zbmpuenltMTN"
                    className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors group"
                  >
                    <div className="bg-pink-600 p-3 rounded-full group-hover:bg-pink-700 transition-colors">
                      <Instagram size={20} />
                    </div>
                    <div>
                      <div className="font-medium">Instagram</div>
                      <div className="text-sm text-slate-300">Follow me</div>
                    </div>
                  </a>
                </div>
                <div className="text-center lg:text-left">
                  <a
                    href="mailto:rushikesh220703@gmail.com"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105"
                  >
                    <Mail size={16} />
                    Quick Email
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Your Email
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Your Message
                    </label>
                    <div className="relative">
                      <MessageCircle
                        className="absolute left-3 top-3 text-slate-400"
                        size={18}
                      />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>

                  {submitStatus === "success" && (
                    <div className="form-success-toast" role="status" aria-live="polite">
                      <CheckCircle2 className="form-success-icon" size={24} aria-hidden="true" />
                      <div className="form-success-copy">
                        <p className="font-semibold">Message sent</p>
                        <p>I’ll get back to you as soon as I can.</p>
                      </div>
                      <button
                        type="button"
                        className="form-success-dismiss"
                        aria-label="Dismiss notification"
                        onClick={() => setSubmitStatus("")}
                      >
                        <X size={17} aria-hidden="true" />
                      </button>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="bg-red-600 text-white p-4 rounded-lg text-center">
                      <p className="font-medium">Something went wrong!</p>
                      <p className="text-sm text-red-100">
                        Please try again or email me directly.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-slate-400 mb-4">
              © 2025 Rushikesh Raut. Crafted with passion and modern web
              technologies.
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="mailto:rushikesh220703@gmail.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://linkedin.com/in/rushikeshraut2212"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;


