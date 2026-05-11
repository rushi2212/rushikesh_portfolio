import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
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
  Instagram,
  Moon,
  Sun,
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
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

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
  const [theme, setTheme] = useState("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [isDark, theme]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  ];
  const projects = [
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
      items: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
      icon: <Code size={24} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Backend Development",
      items: ["Node.js", "Express.js", "Python", "Flask", "RESTful APIs"],
      icon: <Server size={24} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      category: "Database & Cloud",
      items: ["MongoDB", "MySQL", "Firebase", "AWS", "Git"],
      icon: <Zap size={24} />,
      color: "from-purple-500 to-pink-500",
    },
    {
      category: "AI & ML Technologies",
      items: ["Google Gemini", "Tavily API", "ChatGPT", "OpenAI API"],
      icon: <Bot size={24} />,
      color: "from-orange-500 to-red-500",
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
    },
    {
      title: "2nd Place Winner",
      event: "HACKRON 2.0 - 24 Hour Hackathon",
      organizer: "Newton School of Technology & Ajeenkya DY Patil University",
      date: "Jan 2026",
      description:
        "Built Crop Calendar & Farming Assistant — an AI-powered AgriTech solution for crop planning, pest prediction, market price forecasting, and contextual farming assistance.",
    },

    {
      title: "Special Prize Winner",
      event: "Hack Your Path 6.0 Hackathon",
      theme: "FinTech Theme",
      date: "May 2025",
      description: "Developed CureHub - Hospital Management System",
    },
    {
      title: "Finalist",
      event: "HACKSAGON 2025, ABV-IIITM Gwalior",
      note: "Selected among 600+ participating teams",
      date: "June 2025",
      description: "Showcased innovative AI-powered solutions",
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
      style={{ colorScheme: theme }}
    >
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
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white font-bold shadow-lg shadow-blue-500/25">
                RR
              </div>
              <div
                className={
                  isDark
                    ? "text-lg font-semibold text-slate-100"
                    : "text-lg font-semibold text-slate-900"
                }
              >
                Rushikesh
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={() =>
                  setTheme((currentTheme) =>
                    currentTheme === "dark" ? "light" : "dark",
                  )
                }
                className={
                  isDark
                    ? "inline-flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md transition-all hover:border-blue-400/40 hover:bg-white/10"
                    : "inline-flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-800 shadow-sm transition-all hover:border-blue-400/40 hover:bg-slate-200"
                }
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#about"
                  className={
                    isDark
                      ? "text-slate-300 hover:text-cyan-300 transition-colors font-medium"
                      : "text-slate-600 hover:text-blue-600 transition-colors font-medium"
                  }
                >
                  About
                </a>
                <a
                  href="#skills"
                  className={
                    isDark
                      ? "text-slate-300 hover:text-cyan-300 transition-colors font-medium"
                      : "text-slate-600 hover:text-blue-600 transition-colors font-medium"
                  }
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  className={
                    isDark
                      ? "text-slate-300 hover:text-cyan-300 transition-colors font-medium"
                      : "text-slate-600 hover:text-blue-600 transition-colors font-medium"
                  }
                >
                  Projects
                </a>
                <a
                  href="#achievements"
                  className={
                    isDark
                      ? "text-slate-300 hover:text-cyan-300 transition-colors font-medium"
                      : "text-slate-600 hover:text-blue-600 transition-colors font-medium"
                  }
                >
                  Achievements
                </a>
                <a
                  href="#certifications"
                  className={
                    isDark
                      ? "text-slate-300 hover:text-cyan-300 transition-colors font-medium"
                      : "text-slate-600 hover:text-blue-600 transition-colors font-medium"
                  }
                >
                  Certifications
                </a>
                <button
                  type="button"
                  onClick={() =>
                    setTheme((currentTheme) =>
                      currentTheme === "dark" ? "light" : "dark",
                    )
                  }
                  className={
                    isDark
                      ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md transition-all hover:border-blue-400/40 hover:bg-white/10"
                      : "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-800 shadow-sm transition-all hover:border-blue-400/40 hover:bg-slate-200"
                  }
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <a
                  href="#contact"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all"
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
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          <div
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
                  className={
                    isDark
                      ? "block rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-cyan-300"
                      : "block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-700"
                  }
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
                Computer Engineering Student & Full-Stack Developer passionate
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
                Currently pursuing Computer Engineering at GCOEARA, Pune, with
                expertise in MERN stack, AI integration, and modern web
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
            <div className="relative flex w-full max-w-lg items-center justify-center py-10 -translate-y-2 sm:-translate-y-4 lg:translate-y-0">
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

      {/* Skills Section */}
      <section id="skills" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Technical Expertise
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Proficient in modern technologies and frameworks for full-stack
              development
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-100"
              >
                <div className="text-blue-600 mb-4">{skill.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-slate-800">
                  {skill.category}
                </h3>
                <div className="space-y-2">
                  {skill.items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Showcase of my latest work in web development and AI integration
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-slate-100 flex flex-col h-full"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                    {project.date}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-slate-800">
                      {project.title}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3 text-sm">
                      {project.subtitle}
                    </p>
                    <p className="text-slate-600 mb-4 leading-relaxed text-sm line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-slate-700 text-sm">
                        Key Features:
                      </h4>
                      <div className="grid grid-cols-1 gap-1">
                        {project.features.slice(0, 3).map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-slate-600"
                          >
                            <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all transform hover:scale-105 text-sm w-full justify-center"
                    >
                      <ExternalLink size={14} />
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
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
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-100"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Award size={24} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-slate-800">
                      {achievement.title}
                    </h3>
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
                    <p className="text-slate-500 text-sm mb-3">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Calendar size={14} />
                      {achievement.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                    <div className="flex items-center justify-center mb-6 w-full min-h-[18rem] sm:min-h-[22rem] md:min-h-[16rem] lg:min-h-[18rem]">
                      <img
                        src={certificates[currentCertificate].image}
                        alt={certificates[currentCertificate].title}
                        className={
                          isDark
                            ? "w-full max-w-[100%] max-h-[70vh] object-contain rounded-lg shadow-lg"
                            : "w-full max-w-[100%] max-h-[70vh] object-contain rounded-lg"
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
      <section className="bg-white py-20">
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
      <section className="py-20">
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
                  Pune, India • Expected Graduation: 2026
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
                    <div className="bg-green-600 text-white p-4 rounded-lg text-center">
                      <p className="font-medium">Message sent successfully!</p>
                      <p className="text-sm text-green-100">
                        I'll get back to you soon.
                      </p>
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
