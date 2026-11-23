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

I'm currently an Application Developer at IBM, delivering a self-service, multi-cloud Database-as-a-Service platform for Lumen Technologies across Azure and AWS that cuts database provisioning from weeks to minutes. Before that, I spent nearly three years at Citywide Eye Care: first as the sole engineer behind a production EMR and practice-management platform (React/TypeScript, FastAPI, PostgreSQL, AWS) that cut physician documentation time by 82%, then as an AI Engineer building RemitAI, an agentic claims-denial platform on AWS Bedrock that reduced denials 15% and recovered $25K+ in denied revenue.

I've also built AI-driven tools, from lead-discovery pipelines to an AI clinical scribe on Claude and AWS Bedrock. I earned my B.S. in Software Engineering from Rochester Institute of Technology and am pursuing an M.S. in Computer Science at Georgia Tech, focusing on machine learning and AI-driven systems.`,

  projects: [
    {
      title: "Custom EMR System",
      artist: "Citywide Eye Care",
      album: "Production Systems",
      duration: "Aug 2023 - Jun 2025",
      description: "EMR and practice-management platform, shipped as sole engineer, spanning charting, scheduling, billing, claims, and telephony for 60–90 weekly visits, with template-driven charting, version history, and WebSocket real-time collaboration; led its zero-downtime on-prem-to-AWS migration with HIPAA controls",
      impact: "82% documentation time reduction",
      tech: ["FastAPI", "PostgreSQL", "React", "TypeScript", "AWS"],
      type: "Full-Stack Development",
      projectUrl: "https://www.citywideeyecare.com/",
      companyLogo: "/citywide-logo.png"
    },
    {
      title: "Multi-Cloud DBaaS Platform",
      artist: "IBM",
      album: "Cloud Automation",
      duration: "Jun 2026 - Present",
      description: "Self-service, multi-cloud Database-as-a-Service platform for Lumen Technologies across Azure and AWS, driven by a 10-stage GitHub Actions pipeline (ServiceNow, EfficientIP IPAM, Terraform, Ansible/AWX) with automated Oracle right-sizing and secure-by-default IaC on Azure Verified Modules; adopted by every Lumen DBA team",
      impact: "Provisioning cut from weeks to minutes",
      tech: ["Azure", "AWS", "Terraform", "Ansible/AWX", "GitHub Actions", "ServiceNow", "Oracle"],
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
      artist: "Citywide Eye Care",
      album: "Healthcare AI",
      duration: "Jun 2025 - Jun 2026",
      description: "Agentic claims-denial platform on AWS Bedrock (BAA): Amazon Nova Pro parses EOB/ERA documents and Claude reasons over denials, grounded in Postgres payer-rule tables and past denial cases, returning CARC/RARC codes, root cause, corrective action, and an appeal draft; recovered $25K+ in denied revenue",
      impact: "15% fewer claim denials",
      tech: ["FastAPI", "PostgreSQL", "React", "Claude API", "AWS Bedrock", "Amazon Nova Pro"],
      type: "AI & Healthcare",
      repoUrl: "https://github.com/Jonathanz4344/RemitAI",
      companyLogo: "/citywide-logo.png"
    },
    {
      title: "AI Clinical Scribe",
      artist: "Citywide Eye Care",
      album: "Healthcare AI",
      duration: "Jun 2025 - Jun 2026",
      description: "Speech-to-text clinical scribe built with Claude on AWS Bedrock that maps physician dictation to structured chart fields and auto-navigates exam sections inside the EMR",
      impact: "60% charting time reduction",
      tech: ["Claude API", "AWS Bedrock", "Speech-to-Text", "React", "FastAPI"],
      type: "AI & Healthcare",
      companyLogo: "/citywide-logo.png"
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
      role: "Application Developer – Cloud Full Stack",
      company: "IBM",
      period: "Aug 2026 - Present",
      location: "Baton Rouge, LA",
      logo: "/ibm-logo.png",
      highlights: [
        "Delivered a self-service, multi-cloud Database-as-a-Service platform for Lumen Technologies across Azure and AWS, cutting provisioning from weeks to minutes; adopted by every Lumen DBA team, with 100+ of 1,600+ databases migrated since launch",
        "Built the migration, Oracle sizing, and onboarding stages of a 10-stage GitHub Actions orchestration pipeline integrating ServiceNow, EfficientIP IPAM, Terraform, and Ansible/AWX with gated plan/apply",
        "Standardized secure-by-default IaC on Azure Verified Modules with private endpoints, Key Vault secret management, Entra ID RBAC, and Terraform native tests, TFLint, and actionlint in CI",
        "Partnered with Lumen's DBA, Cloud Center of Excellence, networking, and HCA teams; recognized by Lumen's VP of Cloud & AI, who called the DBaaS transformation an \"amazing outcome\""
      ]
    },
    {
      role: "Application Developer – Azure Cloud Migration",
      company: "IBM",
      period: "Jun 2026 - Aug 2026",
      location: "Baton Rouge, LA",
      logo: "/ibm-logo.png",
      highlights: [
        "Owned the Oracle-to-Azure migration path for ~800 Oracle databases, engineering a right-sizing engine (Bash, Azure Resource SKUs API) that maps live CPU, SGA, and PGA telemetry to E-series VM SKUs and Pure Storage LUN layouts",
        "Engineered license-compliant Oracle placement on Azure Dedicated Host groups via SKU-generation and capacity-aware selection",
        "Implemented fail-closed migration controls: atomic record claims against the production DBA portal and step-level AWX validation"
      ]
    },
    {
      role: "AI Engineer",
      company: "Citywide Eye Care",
      period: "Jun 2025 - Jun 2026",
      location: "Great Neck, NY",
      logo: "/citywide-logo.png",
      highlights: [
        "Built RemitAI, an agentic claims-denial platform on AWS Bedrock (BAA), drawing on prior medical-billing experience: Amazon Nova Pro for low-cost multimodal EOB/ERA parsing and Claude Sonnet for denial reasoning, routed by task for cost and accuracy",
        "Designed a retrieval-augmented pipeline grounding Claude in Postgres payer-rule tables and historical denial cases, returning schema-validated structured outputs: CARC/RARC codes, root cause, corrective action, and appeal draft",
        "Tuned prompts and payer rules to ~99% rule-check accuracy on a curated test set; reached 92% denial-prediction accuracy in live use, validated by biller and physician review and improving as the knowledge base learns from each new denial",
        "Reduced claim denials 15%, recovered $25K+ in denied revenue, and cut biller time on denials 90% across 60–90 weekly claims, keeping PHI out of prompts (codes, modifiers, payer, and amounts only) with human approval before submission",
        "Built an AI clinical scribe (speech-to-text with Claude on Bedrock) that maps dictation to structured chart fields and auto-navigates exam sections, cutting physician charting time an additional 60%"
      ]
    },
    {
      role: "Full-Stack Software Engineer",
      company: "Citywide Eye Care",
      period: "Aug 2023 - Jun 2025",
      location: "Great Neck, NY",
      logo: "/citywide-logo.png",
      highlights: [
        "Architected and shipped, as sole engineer, an EMR and practice-management platform (React/TypeScript, FastAPI, PostgreSQL, AWS) spanning charting, scheduling, billing, claims, and telephony for 60–90 weekly visits",
        "Cut physician documentation time 82% with template-driven charting, full version history, and WebSocket real-time collaboration with pessimistic edit locking",
        "Designed a dual-audience architecture isolating staff and patient traffic by hostname, route, and credential, with single-use tokenized access for patient intake",
        "Led a zero-downtime on-prem-to-AWS migration (EC2, RDS, S3, Amplify, API Gateway) with HIPAA controls (Cognito MFA, RBAC, IP allowlisting, append-only audit logs)",
        "Cut API latency from 5–6 s to sub-second by eliminating N+1 query patterns on RDS with batched loading",
        "Automated front-desk workflows (ordering, e-signature intake, barcode ID scanning, order-linked inventory), cutting order time 70% and inventory discrepancies 80% while nearly eliminating paper intake"
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
