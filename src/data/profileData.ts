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
      artist: "ZLA (Senior Capstone)",
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
      title: "RemitAI",
      artist: "Personal Project",
      album: "Healthcare AI",
      duration: "2025",
      description: "HIPAA-compliant AI platform for healthcare RCM using Amazon Nova Pro on AWS Bedrock (BAA); processes EOB/ERA PDFs via multimodal pipeline, classifies denials by CARC/RARC codes, generates appeal strategies, and builds a self-learning payer knowledge base",
      impact: "Automated denial management",
      tech: ["FastAPI", "PostgreSQL", "React", "TypeScript", "AWS Bedrock", "Amazon Nova Pro"],
      type: "AI & Healthcare"
    },
    {
      title: "Enlighten Learning",
      artist: "Personal Project",
      album: "Nonprofit Tech",
      duration: "2025",
      description: "Full-stack nonprofit site built in React, TypeScript, and Material UI with serverless API integration (Google Apps Script), dark/light mode, animated UI, and donation tracking; supports tutoring programs for students in underserved communities across Long Island",
      impact: "Community education support",
      tech: ["React", "TypeScript", "Material UI", "Google Apps Script"],
      type: "Full-Stack Development"
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
    "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Material UI", "React Query", "Framer Motion"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB"],
    "Cloud / Infrastructure": ["AWS (EC2, RDS, S3, Bedrock, Cognito, API Gateway, Amplify, Lambda, Secrets Manager, VPC)", "Terraform", "WireGuard VPN"],
    "AI / ML": ["Amazon Nova Pro", "Anthropic API", "OpenAI API", "Gemini API", "Prompt Engineering", "Multimodal LLMs"],
    "Tools & Compliance": ["Jenkins", "Splunk", "Dynatrace", "HIPAA Compliance", "BAA", "pdf2image", "asyncpg"]
  },
  

  experience: [
    {
      role: "Full-Stack Software Engineer",
      company: "Citywide Eye Care",
      period: "Jan 2024 - Present",
      location: "Great Neck, NY",
      logo: "/citywide-logo.png",
      highlights: [
        "Lead engineer for a production EMR platform used daily by clinical staff, architecting a zero-downtime migration from on-premise servers to AWS (EC2, RDS, S3, Cognito, API Gateway, Amplify)",
        "Owned HIPAA security architecture end to end: Cognito JWT auth, IP whitelisting, role-based access control, and WireGuard VPN, passing all external compliance reviews with zero audit findings",
        "Reduced physician documentation time by 75% by engineering structured charting workflows with auto-save, copy-forward, and S3-backed document storage via pre-signed URLs",
        "Partnered directly with clinicians to define requirements and iterate on features, accelerating feedback cycles and cutting rework across all major releases"
      ]
    },
    {
      role: "Full-Stack Software Engineer",
      company: "ZLA (Client Contract – AI-Enabled CRM Platform)",
      period: "Aug 2025 - Present",
      location: "Rochester, NY",
      highlights: [
        "Built a production CRM from scratch on a 5-person Agile team, delivering lead management, property tracking, campaign workflows, and agent dashboards within tight contract timelines",
        "Engineered an AI-powered lead discovery pipeline integrating Google Places API, Geocoding, Brave Search, and OpenAI, cutting manual prospect research time by 60%",
        "Architected a normalized FastAPI and PostgreSQL backend with complex relational schemas; built a React/TypeScript frontend with Kanban pipelines and map-based lead search",
        "• Provisioned and managed AWS infrastructure with Terraform (Amplify, EC2 with Elastic IP, API Gateway, Lambda) and built anadmin dashboard for one-click backend server management"
      ]
    },
    {
      role: "Software Engineer Intern",
      company: "Citywide Eye Care",
      period: "Sep 2023 - Dec 2023",
      location: "Great Neck, NY",
      logo: "/citywide-logo.png",
      highlights: [
        "Built and deployed an AI health chatbot using Python and Gemini API, autonomously handling patient FAQs and symptom triage, cutting front-desk call volume by 50%",
        "Rebuilt the patient-facing website in Next.js and Material UI, improving SEO and driving a 25% increase in appointment conversion rates",
        "Implemented digital intake and scheduling workflows on AWS (EC2, S3, RDS, Secrets Manager), replacing all manual paper-based processes"
      ]
    },
    {
      role: "Application Developer Intern",
      company: "ADP",
      period: "Jun 2023 - Aug 2023",
      location: "Roseland, NJ",
      logo: "/adp-logo.png",
      highlights: [
        "Built an automated status-reporting tool adopted across the team, eliminating manual report generation and cutting decision turnaround time by 20%",
        "Reduced deployment time by 30% by optimizing the Jenkins CI/CD pipeline and improving MySQL query performance across internal analytics integrations",
        "Enhanced S3, Splunk, and Dynatrace integrations supporting internal analytics; recognized by engineering leadership for measurable impact on team velocity"
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
