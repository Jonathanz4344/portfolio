export interface Project {
  title: string;
  artist: string;
  album: string;
  duration: string;
  description: string;
  impact: string;
  tech: string[];
  type: string;
  projectUrl?: string;
  repoUrl?: string;
  companyLogo?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Education {
  school: string;
  degree: string;
  status: string;
  logo?: string;
}

export interface Skills {
  [category: string]: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  github: string;
  githubUrl: string;
  linkedin: string;
  linkedinUrl: string;
  about: string;
  projects: Project[];
  skills: Skills;
  experience: Experience[];
  education: Education[];
}
