import type { ProfileData } from '@/types';

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

I'm currently an Application Developer at IBM, building the Oracle migration path of a self-service Azure DBaaS platform that cuts database provisioning from weeks to minutes. Before that, I was the sole engineer at Citywide Eye Care, where I designed and shipped a production EMR and practice-management system (React/TypeScript, FastAPI, PostgreSQL, AWS) that cut physician documentation time by 85% and passed every HIPAA compliance review with zero findings.

I've also built AI-driven tools, from lead-discovery pipelines to a claims-denial agent on Claude and AWS Bedrock. I earned my B.S. in Software Engineering from Rochester Institute of Technology and am pursuing an M.S. in Computer Science at Georgia Tech, focusing on machine learning and AI-driven systems.`,

  projects: [
    {
      title: "Custom EMR System",
      artist: "Citywide Eye Care",
      album: "Production Systems",
      duration: "Jan 2024 - Jun 2026",
      description: "Production EMR and practice-management system for 60–90 patient visits a week, with structured charting, optical ordering, billing, inventory, and a login-free patient intake flow with e-signatures; led its zero-downtime on-prem-to-AWS migration",
      impact: "85% documentation time reduction",
      tech: ["FastAPI", "PostgreSQL", "React", "TypeScript", "AWS"],
      type: "Full-Stack Development",
      projectUrl: "https://www.citywideeyecare.com/",
      companyLogo: "/citywide-logo.png"
    },
    {
      title: "Self-Service Azure DBaaS",
      artist: "IBM",
      album: "Cloud Automation",
      duration: "Jun 2026 - Present",
      description: "Oracle migration path of a self-service Azure DBaaS platform for Lumen Technologies, with automated VM right-sizing from live on-prem metrics, license-compliant placement on dedicated hosts, and fail-closed protection against duplicate migrations",
      impact: "Provisioning cut from weeks to minutes",
      tech: ["Azure", "Terraform", "Ansible/AWX", "GitHub Actions", "ServiceNow", "Oracle"],
      type: "Infrastructure",
      companyLogo: "/ibm-logo.png"
    },
    {
      title: "AI-Powered CRM Platform",
      artist: "ZLA (Senior Capstone)",
      album: "Real Estate Tech",
      duration: "Aug 2025 - May 2026",
      description: "Production CRM with lead pipelines, campaign workflows, and map-based search, plus an AI lead discovery pipeline integrating Google Places, Brave Search, and OpenAI",
      impact: "60% reduction in manual research",
      tech: ["FastAPI", "PostgreSQL", "OpenAI", "React", "TypeScript", "Terraform"],
      type: "AI Integration",
      repoUrl: "https://github.com/Jonathanz4344/BigRealEstate"
    },
    {
      title: "RemitAI",
      artist: "Personal Project",
      album: "Healthcare AI",
      duration: "2025",
      description: "HIPAA-compliant claims-denial agent on Claude and Amazon Nova Pro (AWS Bedrock, BAA) that reads EOB/ERA PDFs, classifies denials by CARC/RARC codes, drafts appeal strategies, and learns payer patterns over time",
      impact: "Automated denial management",
      tech: ["FastAPI", "PostgreSQL", "React", "Claude API", "AWS Bedrock", "Amazon Nova Pro"],
      type: "AI & Healthcare",
      repoUrl: "https://github.com/Jonathanz4344/RemitAI"
    },
    {
      title: "AI Health Chatbot",
      artist: "Citywide Eye Care",
      album: "Patient Care Solutions",
      duration: "May 2024 - July 2024",
      description: "Serverless patient-facing chat assistant on the Gemini API that answers patient FAQs and handles symptom triage, reducing front-desk workload",
      impact: "50% fewer front-desk calls",
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
      description: "Next.js rebuild of the patient-facing website for performance, accessibility, and search engine optimization, driving more patient engagement and bookings",
      impact: "25% more appointment conversions",
      tech: ["Next.js", "React", "Material UI", "SEO", "AWS"],
      type: "Frontend Development",
      repoUrl: "https://www.citywideeyecare.com/",
      companyLogo: "/citywide-logo.png"
    },
    {
      title: "Enlighten Learning",
      artist: "Personal Project",
      album: "Nonprofit Tech",
      duration: "2025",
      description: "Co-founded a nonprofit tutoring platform with donation tracking and program management; trained volunteers on AI tools and taught sessions for underserved students across Long Island",
      impact: "Community education support",
      tech: ["React", "TypeScript", "Claude API", "Material UI"],
      type: "Full-Stack Development",
      projectUrl: "https://enlightenlearning.vercel.app"
    },
    {
      title: "Spotify-Inspired Portfolio",
      artist: "Personal Project",
      album: "Creative Development",
      duration: "Jan 2026",
      description: "Interactive developer portfolio designed with Spotify's UI/UX as inspiration, featuring an audio visualizer, framer-motion animations, and responsive design",
      impact: "Unique personal branding",
      tech: ["Next.js", "React", "TypeScript", "Framer Motion", "CSS"],
      type: "Frontend Development",
      companyLogo: "/profile.png"
    },
    {
      title: "Automation & Analytics Platform",
      artist: "ADP",
      album: "Enterprise Solutions",
      duration: "Jun 2023 - Aug 2023",
      description: "Automated service-health reporting tool integrated with Splunk and Dynatrace, plus Jenkins CI/CD pipeline optimization and MySQL query tuning",
      impact: "20% faster incident response",
      tech: ["Jenkins", "MySQL", "AWS S3", "Splunk", "Dynatrace"],
      type: "Infrastructure",
      companyLogo: "/adp-logo.png"
    }
  ],

  skills: {
    "Languages": ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
    "Backend / Systems": ["FastAPI", "Node.js", "Express.js", "REST APIs", "JWT", "OAuth2", "Pydantic", "SQLAlchemy", "Spring Boot"],
    "Frontend": ["React", "Next.js", "Tailwind CSS", "Material UI", "React Query", "Framer Motion"],
    "Databases": ["PostgreSQL", "Oracle", "MySQL", "MongoDB"],
    "Cloud / Infrastructure": ["AWS (EC2, RDS, S3, Bedrock, Cognito, API Gateway, Amplify, Lambda, Secrets Manager, VPC)", "Azure (App Service, Blob Storage, Functions, API Management, Key Vault, Active Directory, Virtual Network)", "Terraform", "Ansible/AWX", "GitHub Actions", "WireGuard VPN"],
    "AI / ML": ["Claude API","Amazon Nova Pro", "OpenAI API", "Gemini API", "Whisper", "Prompt Engineering", "Multimodal LLMs", "Agentic Pipelines"],
    "Tools & Compliance": ["Jenkins", "Splunk", "Dynatrace", "HIPAA Compliance", "BAA", "Docker", "ServiceNow"]
  },
  

  experience: [
    {
      role: "Application Developer",
      company: "IBM",
      period: "Jun 2026 - Present",
      location: "Baton Rouge, LA",
      logo: "/ibm-logo.png",
      highlights: [
        "Cut database provisioning for Lumen Technologies from weeks in the DBA backlog to minutes by building the Oracle migration path of a self-service Azure DBaaS platform (ServiceNow, GitHub Actions, Terraform, Ansible/AWX)",
        "Automated Oracle VM right-sizing from live on-prem metrics, replacing manual sizing for stacked and RAC databases",
        "Designed production safeguards for automated migrations: license-compliant Oracle placement on dedicated hosts and fail-closed protection against duplicate migrations",
        "Surfaced hidden failures in 12-job AWX onboarding workflows via step-level tracking; wrote a 57-error-code runbook"
      ]
    },
    {
      role: "Full-Stack Software Engineer",
      company: "Citywide Eye Care",
      period: "Jan 2024 - Jun 2026",
      location: "Great Neck, NY",
      logo: "/citywide-logo.png",
      highlights: [
        "Sole engineer embedded with clinical staff; designed and shipped a production EMR and practice-management system (React/TypeScript, FastAPI, PostgreSQL) for 60–90 patient visits a week and led its zero-downtime on-prem-to-AWS migration",
        "Cut physician documentation time 85% with structured charting (copy-forward, autosave, version history), and drove adoption through staff training and in-app guided tutorials",
        "Digitized optical ordering, billing, and a login-free patient intake flow with e-signatures, cutting front-desk time on orders and payments 75%, intake paperwork 95%, and order pickup from 5 minutes to 1",
        "Cut inventory discrepancies 85% by linking stock directly to optical orders so counts update automatically with every sale",
        "Owned HIPAA security end to end (Cognito MFA, RBAC, IP allowlisting, WireGuard VPN, audit logging), passing all external compliance reviews with zero findings"
      ]
    },
    {
      role: "Full-Stack Software Engineer",
      company: "ZLA - Senior Capstone Project",
      period: "Aug 2025 - May 2026",
      location: "Rochester, NY",
      highlights: [
        "Shipped a production CRM for ZLA on a 5-person Agile team (React/TypeScript, FastAPI, PostgreSQL, Terraform on AWS) with lead pipelines, campaign workflows, and map-based search",
        "Engineered an AI lead discovery pipeline (Google Places, Brave Search, OpenAI) that cut manual prospect research 60%"
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
        "Cut incident response time 20% with an automated service-health reporting tool integrated with Splunk and Dynatrace",
        "Cut release cycle time 30% by optimizing Jenkins CI/CD pipelines and tuning MySQL queries"
      ]
    }
  ],

  education: [
        {
      school: "Georgia Institute of Technology",
      degree: "M.S. in Computer Science",
      status: "Expected May 2028",
      logo: "/gt-logo.png"
    },
    {
      school: "Rochester Institute of Technology",
      degree: "B.S. in Software Engineering",
      status: "May 2026",
      logo: "/rit-logo.png"
    }
  ],

  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Issued Oct 2026",
      tier: "platinum",
      badge: "/certs/aws-cloud-practitioner.png",
      verifyUrl: "https://www.credly.com/badges/cec5f5bb-8de4-4bdb-b994-146167076610/public_url"
    },
    {
      name: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      date: "Issued Jul 2026",
      tier: "platinum",
      badge: "/certs/azure-fundamentals.svg",
      verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/JonathanZhu-7642/96474D632106D51E?sharingId=4E70970DC850604"
    },
    {
      name: "Certified Partner Specialist: Gemini Enterprise Agent Development",
      issuer: "Google Cloud",
      date: "Issued Jul 2026",
      tier: "platinum",
      badge: "/certs/gemini-agent-dev.png",
      verifyUrl: "https://www.credly.com/badges/93febdb2-7a93-4b92-8859-c593377a1d25/public_url"
    },
    {
      name: "Certified Partner Specialist: Gemini Enterprise Deployment",
      issuer: "Google Cloud",
      date: "Issued Jul 2026",
      tier: "platinum",
      badge: "/certs/gemini-deployment.png",
      verifyUrl: "https://www.credly.com/badges/3dd2687d-c36d-42cb-878b-7b191a3705fe/public_url"
    },
    {
      name: "Claude Partner Badge: Claude Code",
      issuer: "Anthropic",
      date: "Issued Jul 2026",
      tier: "platinum",
      badge: "/certs/claude-code.png",
      verifyUrl: "https://www.credly.com/badges/543ed9b8-b3e1-4f64-9ddb-62a12b271717/public_url"
    },
    {
      name: "IBM Generative & Agentic AI Developer",
      issuer: "IBM",
      date: "Issued Jul 2026",
      tier: "gold",
      badge: "/certs/ibm-genai-developer.png",
      verifyUrl: "https://www.credly.com/badges/e12267e3-37e4-4a74-a942-5f3f64342ac7/public_url"
    }
  ]
};
