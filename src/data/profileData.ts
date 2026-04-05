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
  about: `A full-stack software engineer who builds reliable, real-world systems with a focus on usability and impact. I enjoy taking complex problems, breaking them down, and shipping software that actually gets used.

My past experiences include production applications ranging from healthcare EMR platforms to AI-powered CRM tools, building across the stack with FastAPI, PostgreSQL, React, TypeScript, and AWS. I led the development of a live EMR system used daily in a medical clinical setting, helping reduce documentation time, improve data reliability, and streamline workflows for doctors and staff.

I've also built AI-driven automation and lead-discovery features that significantly reduce manual effort and improve operational efficiency. I earned my B.S. in Software Engineering from Rochester Institute of Technology and will be furthering my education with an M.S. in Computer Science at Georgia Tech, where I plan to focus on machine learning and AI-driven systems.`,

  projects: [
    {
      title: "Custom EMR System",
      artist: "Citywide Eye Care",
      album: "Production Systems",
      duration: "Aug 2024 - Present",
      description: "Leading development of a custom EMR system used daily in a live optometry clinic, replacing manual PDF and Word based clinical documentation workflows",
      impact: "75% documentation time reduction",
      tech: ["FastAPI", "PostgreSQL", "React", "TypeScript", "AWS"],
      type: "Full-Stack Development",
      projectUrl: "https://www.citywideeyecare.com/",
      companyLogo: "/citywide-logo.png"
    },
    {
      title: "AI-Powered CRM Platform",
      artist: "ZALA (Senior Capstone)",
      album: "Real Estate Tech",
      duration: "Aug 2025 - May 2026",
      description: "Production-ready CRM for real estate with AI lead discovery integrating OpenAI, Google Places, Geocoding, and Brave Search",
      impact: "60% reduction in manual research",
      tech: ["FastAPI", "PostgreSQL", "OpenAI", "React", "TypeScript"],
      type: "AI Integration",
      repoUrl: "https://github.com/Jonathanz4344/BigRealEstate"
    },
    {
      title: "AI Health Chatbot",
      artist: "Citywide Eye Care",
      album: "Patient Care Solutions",
      duration: "May 2024 - July 2024",
      description: "Patient-facing AI chatbot automating FAQs and symptom triage using Python and Gemini API, reducing front-desk workload",
      impact: "~50% workload reduction",
      tech: ["Python", "Gemini API", "Next.js", "Material UI"],
      type: "AI & Healthcare",
      repoUrl: "https://www.citywideeyecare.com/",
      companyLogo: "/citywide-logo.png"
    },
    {
      title: "SEO-Optimized Clinic Website",
      artist: "Citywide Eye Care",
      album: "Web Development",
      duration: "May 2024 - July 2024",
      description: "Modern Next.js website rebuilt for performance, accessibility, and search engine optimization, driving increased organic traffic and patient engagement",
      impact: "Increased organic traffic & inquiries",
      tech: ["Next.js", "React", "Material UI", "SEO", "AWS"],
      type: "Frontend Development",
      repoUrl: "https://www.citywideeyecare.com/",
      companyLogo: "/citywide-logo.png"
    },
    {
      title: "Spotify-Inspired Portfolio",
      artist: "Personal Project",
      album: "Creative Development",
      duration: "Jan 2026",
      description: "Interactive developer portfolio designed with Spotify's UI/UX as inspiration, featuring dynamic animations and responsive design",
      impact: "Unique personal branding",
      tech: ["React", "TypeScript", "Vite", "CSS"],
      type: "Frontend Development",
      companyLogo: "/profile.png"
    },
    {
      title: "Automation & Analytics Platform",
      artist: "ADP",
      album: "Enterprise Solutions",
      duration: "Jun 2023 - Aug 2023",
      description: "Built status-reporting system reducing manual reporting effort by 20% and optimized Jenkins CI/CD pipeline for faster deployments",
      impact: "30% deployment time reduction",
      tech: ["Jenkins", "MySQL", "AWS S3", "Splunk", "Dynatrace"],
      type: "Infrastructure",
      companyLogo: "/adp-logo.png"
    }
  ],

  skills: {
    "Languages": ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
    "Backend / Systems": ["FastAPI", "Node.js", "Express.js", "REST APIs", "JWT", "OAuth2", "Pydantic", "SQLAlchemy"],
    "Frontend": ["React", "Material UI", "Next.js"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB"],
    "Cloud / Infrastructure": ["AWS", "EC2", "S3", "RDS", "Cognito", "API Gateway", "Amplify", "Lambda", "Secrets Manager", "VPC","CI/CD"],
    "Tools": ["Anthropic API", "OpenAI API", " Gemini API", "Jenkins", "Splunk", "Dynatrace"]
  },

  experience: [
    {
      role: "Full-Stack Software Engineer",
      company: "Citywide Eye Care",
      period: "Jan 2024 - Present",
      location: "Great Neck, NY",
      logo: "/citywide-logo.png",
      highlights: [
        "Lead end-to-end development of a production EMR platform used daily in a live healthcare environment, migrating from on-premise servers to AWS cloud infrastructure (EC2, RDS, S3, Cognito, API Gateway, Amplify)",
        "Architected a secure, HIPAA-compliant cloud backend with FastAPI + PostgreSQL on AWS, implementing multi-layer security: IP whitelisting, Cognito JWT authentication, and role-based access control.",
        "Built structured clinical charting workflows with auto-save and copy-forward, reducing documentation time by 75%",
        " Designed cloud-native document storage using S3 with pre-signed URLs, migrating patient attachments from local storage to secure, scalable cloud storage.",
        "Deployed production infrastructure with AWS Amplify (React frontend), API Gateway with DDoS protection, and WireGuard VPN for secure remote staff access.",
        "Collaborated closely with clinicians and staff to gather requirements, deploy updates, and support live cloud-based production usage."
      ]
    },
    {
      role: "Full-Stack Software Engineer",
      company: "ZALA (Client Contract – AI-Enabled CRM Platform)",
      period: "Aug 2025 - Present",
      location: "Rochester, NY",
      highlights: [
        "Built a production-ready CRM platform for a real estate employer as part of a 5-person team, supporting lead, property, campaign, and agent workflows",
        "Designed and implemented a FastAPI + PostgreSQL backend with normalized schemas and complex relationships across core business entities",
        "Developed AI-powered lead discovery pipelines integrating Google Places, Geocoding, Brave Search, and OpenAI, reducing manual prospect research by 60%",
        "Built responsive React + TypeScript interfaces including Kanban-style deal pipelines and map-based lead search, collaborating in Agile sprints with shared architectural ownership"
      ]
    },
    {
      role: "Software Engineer Intern",
      company: "Citywide Eye Care",
      period: "Sep 2023 - Dec 2023",
      location: "Great Neck, NY",
      logo: "/citywide-logo.png",
      highlights: [
        "Developed a patient-facing AI health chatbot using Python and Gemini API, automating FAQs and symptom triage and reducing front-desk workload by ~50%",
        "Rebuilt the clinic website using Next.js (React) and Material UI, improving accessibility, page load performance, and SEO, leading to increased organic traffic and patient inquiries",
        "Implemented appointment scheduling and digital intake workflows, increasing patient conversion rates by ~25%",
        "Deployed and supported production services on AWS (EC2, S3, RDS, Secrets Manager)"
      ]
    },
    {
      role: "Application Developer Intern",
      company: "ADP",
      period: "Jun 2023 - Aug 2023",
      location: "Roseland, NJ",
      logo: "/adp-logo.png",
      highlights: [
        "Built a status-reporting system, reducing manual reporting effort and improving decision turnaround by 20%",
        "Optimized CI/CD pipeline using Jenkins, reducing deployment time by 30%",
        "Improved MySQL query performance and cloud integrations (S3, Splunk, Dynatrace) to support internal analytics",
        "Recognized by leadership for improving team workflow efficiency and operational visibility"
      ]
    }
  ],

  education: [
    {
      school: "Rochester Institute of Technology",
      degree: "B.S. in Software Engineering",
      status: "Expected May 2026",
      logo: "/rit-logo.png"
    },
    {
      school: "Georgia Institute of Technology",
      degree: "M.S. in Computer Science",
      status: "Admitted, Fall 2026",
      logo: "/gt-logo.png"
    }
  ]
};
