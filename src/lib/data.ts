import {
  LucideIcon,
  UserRound,
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle,
} from "lucide-react";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  imageUrl?: string;
  qualifications?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  imageUrl?: string;
}

export interface ContactInfo {
  icon: LucideIcon;
  title: string;
  details: string[];
}

export const services: Service[] = [
  {
    id: 1,
    title: "Property Development",
    description:
      "Residential, commercial, and mixed-use projects from concept to completion.",
  },
  {
    id: 2,
    title: "Building Construction",
    description:
      "High-quality construction services with experienced professionals.",
  },
  {
    id: 3,
    title: "Renovation Works",
    description: "Transforming outdated structures into modern spaces.",
  },
  {
    id: 4,
    title: "Interior & Exterior Design",
    description:
      "Aesthetic and functional designs tailored to client preferences.",
  },
  {
    id: 5,
    title: "Land Sales & Documentation",
    description: "Verified plots with comprehensive documentation assistance.",
  },
  {
    id: 6,
    title: "Property Sales",
    description: "Brokerage services for buying and selling properties.",
  },
  {
    id: 7,
    title: "Project Management",
    description:
      "Coordinated oversight ensuring timely and budget-friendly project delivery.",
  },
  {
    id: 8,
    title: "Procurement & Material Supply",
    description: "Sourcing quality materials at competitive prices.",
  },
  {
    id: 9,
    title: "Property Evaluation & Investment Advisory",
    description:
      "Accurate appraisals and market insights for informed decisions.",
  },
  {
    id: 10,
    title: "Property & Facility Management",
    description:
      "Comprehensive management services for property upkeep and profitability.",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Da'sayonce Mini-Estate",
    description:
      "A gated estate featuring modern homes with top-tier amenities.",
    location: "Mowe, Ogun State",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Residential Renovation",
    description:
      "A complete transformation of a private residence into a smart luxury home.",
    location: "Gwarimpa, Abuja",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Mixed-use Plaza",
    description:
      "A contemporary commercial space housing boutiques, cafés, and offices.",
    location: "Lekki Phase 1, Lagos",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Luxury Apartments",
    description:
      "2- and 3-bedroom units with premium finishes and smart interiors.",
    location: "Wuye, Abuja",
    imageUrl: "/placeholder.svg",
  },
];

export const leadershipTeam: {
  executiveManagement: TeamMember[];
  projectConstruction: TeamMember[];
  realEstate: TeamMember[];
  designPlanning: TeamMember[];
  supportServices: TeamMember[];
  securityLogistics: TeamMember[];
} = {
  executiveManagement: [
    {
      id: 1,
      name: "Engr. Olusayo Taiwo Okusanya",
      position: "MD/CEO",
      qualifications: "MNSE, COREN",
      department: "Executive Management",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Mrs. Adedayo Okusanya",
      position: "Chief Operating Officer",
      qualifications: "BSc, MBA",
      department: "Executive Management",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Mr. Oguneye A. Olutope",
      position: "Chief Financial Officer",
      qualifications: "BSc, MBA",
      department: "Executive Management",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Mr. Agboola Olalekan Sulaimon",
      position: "Chief Marketing Officer",
      qualifications: "BSc, MBA",
      department: "Executive Management",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Engr. Adaraloye Temidayo",
      position: "Chief Technical Officer",
      qualifications: "FNSE, COREN",
      department: "Executive Management",
      imageUrl: "/placeholder.svg",
    },
  ],
  projectConstruction: [
    {
      id: 6,
      name: "Engr. Giwa Ibrahim Adebayo",
      position: "Project Director",
      qualifications: "FNSE, COREN",
      department: "Project & Construction",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Engr. David Adediran",
      position: "Construction Manager",
      qualifications: "MNSE",
      department: "Project & Construction",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Engr. Bernard Olatunji",
      position: "Project Manager",
      qualifications: "FNSE",
      department: "Project & Construction",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 9,
      name: "Engr. Adetola Gafar",
      position: "Site Engineer/Supervisor",
      qualifications: "MIE",
      department: "Project & Construction",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 10,
      name: "Engr. Olugbenga Oshin",
      position: "Quantity Surveyor",
      qualifications: "MSNE",
      department: "Project & Construction",
      imageUrl: "/placeholder.svg",
    },
  ],
  realEstate: [
    {
      id: 11,
      name: "Realtor Ebenezer Ilupeju",
      position: "Real Estate Manager",
      qualifications: "REDAN",
      department: "Real Estate",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 12,
      name: "Realtor Adekunle Alliu",
      position: "Property/Facility Manager",
      department: "Real Estate",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 13,
      name: "Surv. Sodiq Adegunwa Mayowa",
      position: "Estate Surveyor & Valuer",
      qualifications: "NIS, RSV",
      department: "Real Estate",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 14,
      name: "Mrs. Folusho Mogaji",
      position: "Sales & Leasing Officer",
      qualifications: "BSc, MBA",
      department: "Real Estate",
      imageUrl: "/placeholder.svg",
    },
  ],
  designPlanning: [
    {
      id: 15,
      name: "Arc. Femi Ajayi",
      position: "Architect/Design Lead",
      qualifications: "MNIA, ARCON",
      department: "Design & Planning",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 16,
      name: "Mr. Kehinde Agbejule",
      position: "Interior & Exterior Designer",
      qualifications: "IID, MIDAN, MBA",
      department: "Design & Planning",
      imageUrl: "/placeholder.svg",
    },
  ],
  supportServices: [
    {
      id: 17,
      name: "Mr. Olusola Odunukan",
      position: "Procurement Manager",
      qualifications: "BSc, MBA",
      department: "Support Services",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 18,
      name: "Barr. Samuel Barkingson",
      position: "Legal Adviser/Company Secretary",
      qualifications: "LL.B, B.L",
      department: "Support Services",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 19,
      name: "Resource Intermediaries Limited (RIL)",
      position: "Human Resources Management Agency",
      department: "Support Services",
    },
    {
      id: 20,
      name: "Miss Yetunde Oshiyemi",
      position: "Safety Manager/HSE Officer",
      qualifications: "ISPON",
      department: "Support Services",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 21,
      name: "Mr. Christian Olumide Daniels",
      position: "ICT Manager",
      qualifications: "MNCS, CPN",
      department: "Support Services",
      imageUrl: "/placeholder.svg",
    },
  ],
  securityLogistics: [
    {
      id: 22,
      name: "Rtd. Boge Wemimo Raphael",
      position: "Chief Security Officer (CSO)",
      department: "Security & Logistics",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 23,
      name: "Mr. Oluwole Emmanuel Hassan",
      position: "Logistics/Transport Officer",
      department: "Security & Logistics",
      imageUrl: "/placeholder.svg",
    },
  ],
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Prince Adedayo LADEGALGA Chairman\nAspirant)",
    location: "Lagos",
    text: "When you talk of transparent transactions, seamless land procurement and genuine documentation, give it to them.",
  },
  {
    id: 2,
    name: "Mrs. Kehinde Awomodu",
    location: "Canada based",
    text: "They built my dream home in Nigeria. Every detail was a masterpiece. Makes me always want to visit Nigeria.",
  },
  {
    id: 3,
    name: "Mr Bode Awomodu",
    location: "Lagos",
    text: "Da'sayonce is not just a real estate company, but a guardian angel to all of your real estate dreams and aspirations, they will guide you through it whilst making you achieve beyond your expectations, I got all my choice properties from them and all my building projects handled by them",
  },
  {
    id: 4,
    name: "Mr Ajibola Laoke",
    location: "Port Harcourt",
    text: "Da'sayonce transformed my dad's 20-year-old home into a modern masterpiece. Their professionalism and attention to detail were beyond expectations.",
  },
];

export const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    title: "Head Office",
    details: ["69, Ayangburen road, Ojogbe bus stop, Ikorodu."],
  },
  {
    icon: MapPin,
    title: "Branches",
    details: [
      "Abuja, Ogun, Ibadan, Port Harcourt, and other major cities across Nigeria",
    ],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["Sayonce99@gmail.com"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+234 8102 067 476", "+234 706 425 8898"],
  },
];

export const socialMedia = [
  {
    platform: "Instagram",
    handle: "@dasayoncerealestate",
    icon: Instagram,
    url: "https://instagram.com/dasayoncerealestate",
  },
  {
    platform: "Facebook",
    handle: "@dasayoncerealestate",
    icon: Facebook,
    url: "https://facebook.com/dasayoncerealestate",
  },
  {
    platform: "Twitter",
    handle: "@dasayoncerealestate",
    icon: Twitter,
    url: "https://twitter.com/dasayoncerealestate",
  },
  {
    platform: "LinkedIn",
    handle: "@dasayoncerealestate",
    icon: Linkedin,
    url: "https://linkedin.com/company/dasayoncerealestate",
  },
];

export const companyValues = [
  {
    title: "Integrity",
    description: "Transparency, ethics, and honesty in all dealings.",
  },
  {
    title: "Excellence",
    description: "Commitment to surpassing expectations.",
  },
  {
    title: "Innovation",
    description: "Embracing change and smart solutions.",
  },
  {
    title: "Client Satisfaction",
    description: "Prioritizing client needs and feedback.",
  },
  {
    title: "Safety",
    description: "Ensuring the well-being of lives and properties.",
  },
  {
    title: "Sustainability",
    description: "Building for present and future generations.",
  },
  {
    title: "Teamwork",
    description: "Collaborative efforts for superior results.",
  },
];

export const companyInfo = {
  name: "Da'sayonce Real Estate and Properties",
  slogan: "Transforming Spaces. Building Trust.",
  registrationNumber: "RC: 7115835",
  description:
    "Da'sayonce Real Estate and Properties is a Nigerian-owned company registered under the Corporate Affairs Commission (RC: 7115835). We specialize in Property Development, Construction, Renovation, Interior & Exterior Design, Land Sales & Documentation, Property Management, and Real Estate Consultancy. With our headquarters in Lagos and branches across major Nigerian cities, we are poised to transform the real estate landscape with projects that epitomize comfort, luxury, and sustainability.",
  vision:
    "To be a leading force in real estate innovation and project delivery in Africa, known for transformative spaces, client satisfaction, and sustainable growth.",
  mission:
    "To design, develop, and deliver real estate solutions that reflect quality, value, and client aspirations—while fostering community growth, industry leadership, and profitable investments for stakeholders.",
};

export const differentiators = [
  {
    title: "Innovative Designs",
    description: "Lifestyle-driven architecture",
  },
  {
    title: "Verified Properties",
    description: "Transparent documentation",
  },
  {
    title: "Experienced Professionals",
    description: "Multi-disciplinary team",
  },
  {
    title: "Affordable Luxury",
    description: "High quality across budgets",
  },
  {
    title: "Timely Delivery",
    description: "Punctual and precise",
  },
  {
    title: "After-sales Support",
    description: "Continued relationship post-handover",
  },
];
