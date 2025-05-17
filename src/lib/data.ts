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
    imageUrl: "data:image/jpeg;base64,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",
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
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Ff6febcd9b03646c7a31da804bffa9d57",
    },
    {
      id: 2,
      name: "Mrs. Adedayo Okusanya",
      position: "Chief Operating Officer",
      qualifications: "BSc, MBA",
      department: "Executive Management",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F8b75845076ce477ca1e9cee3cc4d84a0",
    },
    {
      id: 3,
      name: "Mr. Oguneye A. Olutope",
      position: "Chief Financial Officer",
      qualifications: "BSc, MBA",
      department: "Executive Management",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F28c3e45bc5fe4a6f9fac15cabb371334",
    },
    {
      id: 4,
      name: "Mr. Agboola Olalekan Sulaimon",
      position: "Chief Marketing Officer",
      qualifications: "BSc, MBA",
      department: "Executive Management",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F98b29385d8074ae78f646c13792bc909",
    },
    {
      id: 5,
      name: "Engr. Adaraloye Temidayo",
      position: "Chief Technical Officer",
      qualifications: "FNSE, COREN",
      department: "Executive Management",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fc13d6e2d724f4c5a8f4e59a4a30bea0e",
    },
  ],
  projectConstruction: [
    {
      id: 6,
      name: "Engr. Giwa Ibrahim Adebayo",
      position: "Project Director",
      qualifications: "FNSE, COREN",
      department: "Project & Construction",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fcaf8dcfe5e3e4f0cb9298515f66a4949",
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
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fd6e272c1d175432ca0f36cc4f3886d5b",
    },
    {
      id: 9,
      name: "Engr. Adetola Gafar",
      position: "Site Engineer/Supervisor",
      qualifications: "MIE",
      department: "Project & Construction",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F29d390d6d8e5413785d325312df6d57b",
    },
    {
      id: 10,
      name: "Engr. Olugbenga Oshin",
      position: "Quantity Surveyor",
      qualifications: "MSNE",
      department: "Project & Construction",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fb0d60192bbd64a39973142b52f1adf3c",
    },
  ],
  realEstate: [
    {
      id: 11,
      name: "Realtor Ebenezer Ilupeju",
      position: "Real Estate Manager",
      qualifications: "REDAN",
      department: "Real Estate",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F926d87f446b646759de11e2e58b69641",
    },
    {
      id: 12,
      name: "Realtor Adekunle Alliu",
      position: "Property/Facility Manager",
      department: "Real Estate",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F2ca26e5225e14bb1a5aeaec595cd7743",
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
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F9be48e173fe9424cb7c14ec0d06eb014",
    },
  ],
  designPlanning: [
    {
      id: 15,
      name: "Arc. Femi Ajayi",
      position: "Architect/Design Lead",
      qualifications: "MNIA, ARCON",
      department: "Design & Planning",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F28ea15f701bc4073babb83f61c08a840",
    },
    {
      id: 16,
      name: "Mr. Kehinde Agbejule",
      position: "Interior & Exterior Designer",
      qualifications: "IID, MIDAN, MBA",
      department: "Design & Planning",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fa71552972d3d4eccb6c467a45b33bc01",
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
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fd23c433096674c63a18a8150f0f9c2ea",
    },
    {
      id: 21,
      name: "Mr. Christian Olumide Daniels",
      position: "ICT Manager",
      qualifications: "MNCS, CPN",
      department: "Support Services",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Ffc85d92a82ca434e941f5758aa556acf",
    },
  ],
  securityLogistics: [
    {
      id: 22,
      name: "Rtd. Boge Wemimo Raphael",
      position: "Chief Security Officer (CSO)",
      department: "Security & Logistics",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F5c11606e5c8947d08cc62db2faf7d62f",
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
