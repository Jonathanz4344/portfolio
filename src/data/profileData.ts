import type { ProfileData } from '../types';

export const profileData: ProfileData = {
  name: "Jonathan Zhu",
  title: "Full-Stack Software Engineer",
  email: "jzmz831@gmail.com",
  phone: "347-935-2158",
  github: "Jonathanz4344",
  githubUrl: "https://github.com/Jonathanz4344",
  linkedin: "jonathanzhuu",
  linkedinUrl: "https://linkedin.com/in/jonathanzhuu",
  about: `Full-Stack Software Engineer specializing in healthcare technology and AI integration. 
Currently leading development of a custom EMR system at Citywide Eye Care while completing 
my B.S. in Software Engineering at Rochester Institute of Technology. Admitted to Georgia 
Tech's M.S. in Computer Science program for Fall 2026. Passionate about building production 
systems that reduce manual workflows and improve operational efficiency through intelligent 
automation.`,

  projects: [
    {
      title: "Custom EMR System",
      artist: "Citywide Eye Care",
      album: "Production Systems",
      duration: "Aug 2024 - Present",
      description: "Leading development of a custom EMR system used daily in a live optometry clinic, replacing manual PDF and Word based clinical documentation workflows",
      impact: "75% documentation time reduction",
      tech: ["FastAPI", "PostgreSQL", "React", "TypeScript", "AWS"],
      type: "Full-Stack Development"
    },
    {
      title: "AI-Powered CRM Platform",
      artist: "ZALA (Senior Capstone)",
      album: "Real Estate Tech",
      duration: "Aug 2025 - May 2026",
      description: "Production-ready CRM for real estate with AI lead discovery integrating OpenAI, Google Places, Geocoding, and Brave Search",
      impact: "60% reduction in manual research",
      tech: ["FastAPI", "PostgreSQL", "OpenAI", "React", "TypeScript"],
      type: "AI Integration"
    },
    {
      title: "AI Health Chatbot",
      artist: "Citywide Eye Care",
      album: "Patient Care Solutions",
      duration: "May 2024 - July 2024",
      description: "Patient-facing AI chatbot automating FAQs and symptom triage using Python and Gemini API, reducing front-desk workload",
      impact: "~50% workload reduction",
      tech: ["Python", "Gemini API", "Next.js", "Material UI"],
      type: "AI & Healthcare"
    },
    {
      title: "CI/CD Pipeline Optimization",
      artist: "ADP",
      album: "DevOps Excellence",
      duration: "Jun 2023 - Aug 2023",
      description: "Built status-reporting system reducing manual reporting effort by 20% and optimized Jenkins CI/CD pipeline",
      impact: "30% deployment time reduction",
      tech: ["Jenkins", "MySQL", "AWS S3", "Splunk", "Dynatrace"],
      type: "Infrastructure"
    }
  ],

  skills: {
    "Languages": ["Python", "JavaScript", "TypeScript", "SQL"],
    "Backend / Systems": ["FastAPI", "Node.js", "Express.js", "REST APIs", "JWT", "OAuth2", "Pydantic", "SQLAlchemy"],
    "Frontend": ["React", "TypeScript", "Material UI", "Next.js"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB"],
    "Cloud / Infrastructure": ["AWS (EC2, S3, RDS, Lambda, Secrets Manager)", "CI/CD", "Jenkins"],
    "Tools": ["OpenAI & Gemini APIs", "Splunk", "Dynatrace"]
  },

  experience: [
    {
      role: "Full-Stack Software Engineer",
      company: "Citywide Eye Care",
      period: "Aug 2024 - Present",
      location: "Great Neck, NY",
      highlights: [
        "Leading development of a custom EMR system used daily in a live optometry clinic",
        "Architected FastAPI + PostgreSQL backend with role-based access control and audit logging",
        "Built structured clinical charting workflows with auto-save, reducing documentation time by 75%",
        "Designed automated hourly backup and recovery systems, reducing data loss risk to near zero"
      ]
    },
    {
      role: "Full-Stack Software Engineer",
      company: "ZALA (Senior Capstone - Real Client)",
      period: "Aug 2025 - May 2026",
      location: "Rochester, NY",
      highlights: [
        "Built production-ready CRM platform for real estate employer as part of a 5-person team",
        "Designed FastAPI + PostgreSQL backend with normalized schemas and complex relationships",
        "Developed AI-powered lead discovery pipelines integrating Google Places, Geocoding, Brave Search, and OpenAI",
        "Built responsive React + TypeScript interfaces including Kanban-style deal pipelines"
      ]
    },
    {
      role: "Software Engineer Intern",
      company: "Citywide Eye Care",
      period: "May 2024 - July 2024",
      location: "Great Neck, NY",
      highlights: [
        "Developed patient-facing AI health chatbot using Python and Gemini API",
        "Rebuilt clinic website using Next.js and Material UI, improving accessibility and SEO",
        "Implemented appointment scheduling and digital intake workflows, increasing patient conversion by ~25%"
      ]
    },
    {
      role: "Application Developer Intern",
      company: "ADP",
      period: "Jun 2023 - Aug 2023",
      location: "Roseland, NJ",
      highlights: [
        "Built status-reporting system, reducing manual reporting effort by 20%",
        "Optimized CI/CD pipeline using Jenkins, reducing deployment time by 30%",
        "Improved MySQL query performance and cloud integrations (S3, Splunk, Dynatrace)"
      ]
    }
  ],

  education: [
    {
      school: "Rochester Institute of Technology",
      degree: "B.S. in Software Engineering",
      status: "Expected May 2026"
    },
    {
      school: "Georgia Institute of Technology",
      degree: "M.S. in Computer Science",
      status: "Admitted, Fall 2026"
    }
  ]
};
