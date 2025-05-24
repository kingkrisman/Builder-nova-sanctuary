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
    imageUrl:
      "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    title: "Residential Renovation",
    description:
      "A complete transformation of a private residence into a smart luxury home.",
    location: "Gwarimpa, Abuja",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F2ce7c0f2c70641d99e4f2828d417e38f",
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
      imageUrl:
        "https://cdn.builder.io/o/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F95bda75a03094482abcea80e628e3280?alt=media&token=3fbdb1b2-d3e9-4242-9292-4888d89b4cd1&apiKey=aeee31fcf1114fceb0dea40aa0430358",
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

export interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: string;
  salary?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  deadline?: string;
  postedDate: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  date: string;
  author: string;
  authorRole?: string;
  authorImageUrl?: string;
  readTime: number;
  tags: string[];
}

export const jobListings: JobListing[] = [
  {
    id: 1,
    title: "Senior Project Manager",
    department: "Project & Construction",
    location: "Lagos, Nigeria",
    type: "Full-time",
    experience: "5+ years",
    salary: "Competitive",
    description:
      "We are seeking an experienced Senior Project Manager to oversee our real estate development projects from inception to completion. The ideal candidate will have a proven track record in managing large-scale construction projects in Nigeria.",
    responsibilities: [
      "Develop and implement project plans, schedules, and budgets for real estate development projects",
      "Coordinate and manage project teams, contractors, and consultants",
      "Monitor project progress and ensure adherence to quality standards, timelines, and budgets",
      "Identify and mitigate project risks and resolve issues that arise during project execution",
      "Maintain regular communication with stakeholders, including clients, team members, and senior management",
      "Prepare and present regular project status reports",
      "Ensure compliance with relevant building codes, regulations, and safety standards",
    ],
    requirements: [
      "Bachelor's degree in Civil Engineering, Architecture, Construction Management, or related field",
      "Professional certification (PMP, PRINCE2, or equivalent) is preferred",
      "5+ years of experience in project management within the real estate or construction industry",
      "Strong knowledge of construction methodologies, building codes, and industry standards",
      "Excellent leadership, communication, and problem-solving skills",
      "Proficiency in project management software and MS Office Suite",
      "Experience working in the Nigerian construction industry is highly desirable",
    ],
    benefits: [
      "Competitive salary package with performance-based bonuses",
      "Health insurance coverage for employee and dependents",
      "Professional development opportunities and training programs",
      "Opportunity to work on high-profile real estate projects",
      "Collaborative and dynamic work environment",
    ],
    deadline: "June 30, 2024",
    postedDate: "May 15, 2024",
  },
  {
    id: 2,
    title: "Real Estate Marketing Specialist",
    department: "Sales & Marketing",
    location: "Lagos, Nigeria",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our dynamic marketing team to develop and implement innovative strategies for promoting our real estate properties and services. This role requires a creative individual with experience in real estate marketing.",
    responsibilities: [
      "Develop and execute marketing campaigns for property listings and development projects",
      "Create compelling content for various marketing channels including social media, website, and print materials",
      "Organize and coordinate property showcases, open houses, and other promotional events",
      "Analyze market trends and competitor activities to inform marketing strategies",
      "Manage relationships with marketing vendors and service providers",
      "Track and report on marketing performance metrics",
    ],
    requirements: [
      "Bachelor's degree in Marketing, Communications, Business, or related field",
      "3+ years of experience in marketing, preferably in real estate or related industries",
      "Strong understanding of digital marketing channels, SEO, and social media platforms",
      "Excellent content creation and copywriting skills",
      "Experience with CRM systems and marketing analytics tools",
      "Creative thinking and problem-solving abilities",
      "Knowledge of the Nigerian real estate market is a plus",
    ],
    benefits: [
      "Competitive salary with commission structure",
      "Health insurance coverage",
      "Professional development opportunities",
      "Flexible work arrangements",
      "Collaborative and innovative work environment",
    ],
    deadline: "June 15, 2024",
    postedDate: "May 10, 2024",
  },
  {
    id: 3,
    title: "Architectural Designer",
    department: "Design & Planning",
    location: "Lagos, Nigeria",
    type: "Full-time",
    experience: "2+ years",
    description:
      "We are looking for a talented Architectural Designer to join our design team. The ideal candidate will collaborate with our architects and engineers to create innovative and sustainable designs for our real estate projects.",
    responsibilities: [
      "Create architectural designs and drawings for residential and commercial projects",
      "Develop conceptual designs and present to clients and project teams",
      "Prepare detailed construction documents and specifications",
      "Collaborate with engineers, contractors, and other design professionals",
      "Ensure designs comply with building codes, regulations, and client requirements",
      "Conduct site visits to monitor construction progress and address design issues",
    ],
    requirements: [
      "Bachelor's or Master's degree in Architecture",
      "2+ years of experience in architectural design",
      "Proficiency in AutoCAD, Revit, SketchUp, and other design software",
      "Strong portfolio demonstrating design capabilities",
      "Knowledge of building codes and construction methodologies",
      "Excellent visualization and presentation skills",
      "Creative problem-solving abilities",
    ],
    benefits: [
      "Competitive salary package",
      "Health insurance coverage",
      "Opportunities for professional growth and development",
      "Creative and collaborative work environment",
      "Exposure to diverse and challenging projects",
    ],
    postedDate: "May 5, 2024",
  },
  {
    id: 4,
    title: "Property Manager",
    department: "Real Estate",
    location: "Abuja, Nigeria",
    type: "Full-time",
    experience: "3+ years",
    description:
      "We are seeking an experienced Property Manager to oversee our portfolio of residential and commercial properties in Abuja. The successful candidate will be responsible for maintaining property value and ensuring tenant satisfaction.",
    responsibilities: [
      "Manage day-to-day operations of assigned properties",
      "Handle tenant relations, including lease negotiations, renewals, and dispute resolution",
      "Coordinate property maintenance and repair activities",
      "Conduct regular property inspections and prepare condition reports",
      "Develop and manage property budgets",
      "Ensure compliance with relevant property laws and regulations",
      "Prepare regular financial and performance reports for property owners",
    ],
    requirements: [
      "Bachelor's degree in Real Estate, Business Administration, or related field",
      "3+ years of experience in property management",
      "Knowledge of Nigerian property laws and regulations",
      "Strong financial management and budgeting skills",
      "Excellent communication and negotiation abilities",
      "Problem-solving and conflict resolution skills",
      "Proficiency in property management software",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Health insurance coverage",
      "Career advancement opportunities",
      "Professional development support",
      "Work-life balance initiatives",
    ],
    deadline: "July 15, 2024",
    postedDate: "May 20, 2024",
  },
  {
    id: 5,
    title: "Interior Design Intern",
    department: "Design & Planning",
    location: "Lagos, Nigeria",
    type: "Internship",
    experience: "Entry Level",
    description:
      "We're offering an exciting internship opportunity for creative and motivated interior design students or recent graduates. This position provides hands-on experience working with our interior design team on residential and commercial projects.",
    responsibilities: [
      "Assist senior designers with design concepts and presentations",
      "Help create mood boards, material selections, and color schemes",
      "Participate in client meetings and site visits",
      "Support the preparation of design drawings and documentation",
      "Research design trends, materials, and furnishings",
      "Assist with administrative tasks related to design projects",
    ],
    requirements: [
      "Currently pursuing or recently completed a degree in Interior Design or related field",
      "Basic knowledge of design principles and practices",
      "Familiarity with design software such as AutoCAD, SketchUp, or Adobe Creative Suite",
      "Strong creative abilities and attention to detail",
      "Good communication and teamwork skills",
      "Enthusiasm for learning and professional growth",
    ],
    benefits: [
      "Stipend to cover transportation and meals",
      "Hands-on experience with real projects",
      "Mentorship from experienced designers",
      "Opportunity for full-time employment based on performance",
      "Certificate of completion and recommendation letter",
    ],
    deadline: "June 10, 2024",
    postedDate: "May 12, 2024",
  },
  {
    id: 6,
    title: "Civil Engineer",
    department: "Project & Construction",
    location: "Port Harcourt, Nigeria",
    type: "Full-time",
    experience: "4+ years",
    description:
      "We are looking for a qualified Civil Engineer to join our construction team in Port Harcourt. The successful candidate will be responsible for designing, planning, and overseeing construction projects to ensure they are completed safely, on time, and within budget.",
    responsibilities: [
      "Prepare and review engineering designs, calculations, and drawings",
      "Conduct site investigations and feasibility studies",
      "Develop project specifications and technical reports",
      "Monitor construction activities to ensure compliance with plans and specifications",
      "Coordinate with contractors, consultants, and regulatory authorities",
      "Identify and resolve engineering issues that arise during construction",
      "Ensure projects adhere to safety standards and building codes",
    ],
    requirements: [
      "Bachelor's degree in Civil Engineering",
      "Professional registration with COREN (Council for the Regulation of Engineering in Nigeria)",
      "4+ years of experience in civil engineering, preferably in building construction",
      "Proficiency in engineering software (AutoCAD, STAAD Pro, etc.)",
      "Strong analytical and problem-solving skills",
      "Excellent project management abilities",
      "Good understanding of Nigerian building codes and standards",
    ],
    benefits: [
      "Competitive salary package",
      "Health insurance and pension benefits",
      "Professional development opportunities",
      "Career advancement path",
      "Collaborative work environment",
    ],
    deadline: "July 5, 2024",
    postedDate: "May 18, 2024",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Key Factors That Influence Property Value in Lagos",
    slug: "factors-influence-property-value-lagos",
    excerpt:
      "Understanding the key factors that affect property values in Lagos can help investors make informed decisions. Learn about location, infrastructure, security, and more.",
    content: `<p>The real estate market in Lagos, Nigeria's commercial hub, is dynamic and competitive. Property values can fluctuate based on various factors, and understanding these factors is crucial for both buyers and sellers.</p>

    <h2>1. Location</h2>
    <p>Location remains the most significant factor affecting property values in Lagos. Properties in prime areas like Ikoyi, Victoria Island, and Lekki Phase 1 command premium prices due to their proximity to business districts, social amenities, and the coastline. The adage "location, location, location" holds particularly true in Lagos real estate.</p>

    <h2>2. Infrastructure Development</h2>
    <p>Areas with good road networks, drainage systems, and reliable utilities tend to have higher property values. Recent infrastructure projects like the Lekki-Epe Expressway expansion and the ongoing Light Rail project have significantly boosted property values in surrounding neighborhoods.</p>

    <h2>3. Security</h2>
    <p>Security is a major concern for property buyers in Lagos. Gated communities and estates with robust security measures often command higher prices. Areas with lower crime rates and dedicated security personnel are particularly attractive to high-end buyers and expatriates.</p>

    <h2>4. Proximity to Amenities</h2>
    <p>Properties close to schools, hospitals, shopping malls, and recreational facilities generally have higher values. The convenience of having essential services within reach is a key consideration for many buyers, especially families.</p>

    <h2>5. Economic Factors</h2>
    <p>Economic conditions, including inflation rates, foreign exchange fluctuations, and government policies, significantly impact property values. The recent economic reforms have had varying effects on different segments of the Lagos real estate market.</p>

    <p>At Da'sayonce Real Estate and Properties, we help our clients navigate these factors to make informed investment decisions. Whether you're buying, selling, or developing property in Lagos, understanding these key influences can help maximize your return on investment.</p>`,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F5b476d39e79c489b893fbce223f62517",
    category: "Investment",
    date: "2023-12-15",
    author: "Engr. Olusayo Taiwo Okusanya",
    authorRole: "MD/CEO",
    authorImageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Ff6febcd9b03646c7a31da804bffa9d57",
    readTime: 6,
    tags: [
      "Property Value",
      "Lagos Real Estate",
      "Investment",
      "Property Market",
    ],
  },
  {
    id: 2,
    title: "The Rise of Smart Homes in Nigeria's Luxury Real Estate Market",
    slug: "smart-homes-nigeria-luxury-real-estate",
    excerpt:
      "Smart home technology is transforming Nigeria's luxury real estate market. Discover how automated systems, enhanced security, and energy efficiency are becoming standard features in high-end properties.",
    content: `<p>The concept of smart homes is gaining significant traction in Nigeria's luxury real estate market. Modern homebuyers are increasingly seeking properties equipped with intelligent systems that offer convenience, security, and energy efficiency.</p>

    <h2>Smart Home Features in Demand</h2>
    <p>The most sought-after smart home features in Nigeria include automated lighting systems, advanced security cameras with mobile monitoring capabilities, smart locks, and climate control systems. These technologies not only enhance the living experience but also add substantial value to properties.</p>

    <h2>Energy Efficiency Solutions</h2>
    <p>With Nigeria's ongoing power challenges, smart energy solutions have become particularly attractive. Solar power integration, energy-efficient appliances, and automated power management systems are becoming standard in luxury homes, offering significant long-term cost savings.</p>

    <h2>Da'sayonce's Smart Home Initiatives</h2>
    <p>At Da'sayonce Real Estate and Properties, we've embraced this trend by incorporating smart home technology in our luxury developments. Our properties feature integrated systems that allow homeowners to control various aspects of their homes remotely, from security to entertainment.</p>

    <h2>The Future of Smart Homes in Nigeria</h2>
    <p>As technology continues to evolve and become more accessible, we anticipate that smart home features will eventually become standard in mid-range properties as well. The growing awareness of the benefits of these technologies is driving increased demand across different market segments.</p>

    <p>For investors and homebuyers looking to stay ahead of the curve, considering properties with smart home features represents not just a lifestyle choice but a sound investment in future property value.</p>`,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F05b931d2989c419796354d089120dfba",
    category: "Technology",
    date: "2023-11-28",
    author: "Mr. Christian Olumide Daniels",
    authorRole: "ICT Manager",
    authorImageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Ffc85d92a82ca434e941f5758aa556acf",
    readTime: 5,
    tags: [
      "Smart Homes",
      "Luxury Real Estate",
      "Technology",
      "Energy Efficiency",
    ],
  },
  {
    id: 3,
    title:
      "Sustainable Building Practices: The Future of Construction in Nigeria",
    slug: "sustainable-building-practices-nigeria",
    excerpt:
      "Sustainable construction practices are becoming increasingly important in Nigeria's building industry. Learn how eco-friendly materials, energy efficiency, and water conservation are shaping the future of construction.",
    content: `<p>Sustainability in construction is no longer just a global trend but a necessity that Nigeria's building industry is gradually embracing. As environmental awareness grows and resources become more constrained, sustainable building practices are gaining prominence.</p>

    <h2>Eco-Friendly Building Materials</h2>
    <p>The use of locally-sourced, sustainable materials is gaining traction in Nigeria's construction industry. Materials like compressed earth blocks, bamboo, and recycled materials not only reduce environmental impact but often provide better thermal regulation in Nigeria's climate.</p>

    <h2>Energy Efficiency Considerations</h2>
    <p>Building designs that maximize natural lighting and ventilation, reducing the need for artificial cooling and lighting, are becoming more popular. Additionally, the integration of renewable energy sources, particularly solar power, is increasingly common in new developments.</p>

    <h2>Water Conservation Techniques</h2>
    <p>With water scarcity being a concern in many parts of Nigeria, efficient water management systems are becoming essential features in modern construction. Rainwater harvesting systems, greywater recycling, and water-efficient fixtures are being incorporated into building designs.</p>

    <h2>Da'sayonce's Commitment to Sustainability</h2>
    <p>At Da'sayonce Real Estate and Properties, sustainability is central to our development philosophy. Our projects incorporate various eco-friendly features, from energy-efficient designs to sustainable materials, ensuring that our buildings are not only aesthetically pleasing and functional but also environmentally responsible.</p>

    <p>The shift towards sustainable construction in Nigeria is not just environmentally beneficial but also economically advantageous in the long run. Buildings constructed with sustainability in mind typically have lower operational costs, higher property values, and improved occupant comfort and health.</p>`,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F2882003515394644b8f752a7f67c54b3",
    category: "Sustainability",
    date: "2023-10-20",
    author: "Engr. Bernard Olatunji",
    authorRole: "Project Manager",
    authorImageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fd6e272c1d175432ca0f36cc4f3886d5b",
    readTime: 7,
    tags: [
      "Sustainable Building",
      "Green Construction",
      "Eco-Friendly",
      "Energy Efficiency",
    ],
  },
  {
    id: 4,
    title:
      "Navigating Lagos' Real Estate Market: A Guide for First-Time Buyers",
    slug: "guide-first-time-buyers-lagos-real-estate",
    excerpt:
      "Purchasing property in Lagos can be challenging for first-time buyers. This guide provides essential tips on budgeting, location selection, legal considerations, and working with reputable developers.",
    content: `<p>Entering the Lagos real estate market as a first-time buyer can be both exciting and daunting. The city's vibrant property market offers numerous opportunities, but navigating it requires careful planning and knowledge.</p>

    <h2>Understanding Your Budget</h2>
    <p>Before beginning your property search, it's crucial to establish a realistic budget. Consider not just the purchase price but also additional costs like legal fees, agency fees, and potential renovation expenses. In Lagos, property prices can vary dramatically depending on location, so having a clear budget helps narrow down your options.</p>

    <h2>Choosing the Right Location</h2>
    <p>Lagos is a vast city with diverse neighborhoods, each offering different advantages. Consider factors like proximity to your workplace, schools (if relevant), security, and infrastructure. Emerging areas on the mainland and Lekki peninsula often offer better value for money compared to established prime locations.</p>

    <h2>Legal Due Diligence</h2>
    <p>The importance of thorough legal checks cannot be overstated when buying property in Lagos. Ensure all documents, including the Certificate of Occupancy (C of O), building approval, and survey plans, are verified. Working with a reputable lawyer experienced in real estate transactions is highly recommended.</p>

    <h2>Working with Reputable Developers</h2>
    <p>For those considering new developments, choosing a reputable developer like Da'sayonce Real Estate and Properties can save you from potential pitfalls. Research the developer's track record, visit their completed projects, and speak with previous clients if possible.</p>

    <h2>Financing Options</h2>
    <p>Explore various financing options available to you. While mortgage facilities are growing in Nigeria, they may have high interest rates. Some developers offer payment plans that can be more accessible than traditional bank financing.</p>

    <p>At Da'sayonce Real Estate and Properties, we guide first-time buyers through every step of the purchase process, ensuring a smooth and transparent experience. Our team of professionals provides personalized advice tailored to your specific needs and circumstances.</p>`,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Ffda83bddc58a41748f24a9d9dac8b329",
    category: "Buyer's Guide",
    date: "2023-09-10",
    author: "Mrs. Folusho Mogaji",
    authorRole: "Sales & Leasing Officer",
    authorImageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F9be48e173fe9424cb7c14ec0d06eb014",
    readTime: 8,
    tags: [
      "First-Time Buyers",
      "Property Purchase",
      "Lagos Real Estate",
      "Legal Guide",
    ],
  },
  {
    id: 5,
    title: "Interior Design Trends Shaping Nigerian Homes in 2023",
    slug: "interior-design-trends-nigerian-homes-2023",
    excerpt:
      "Discover the latest interior design trends making waves in Nigerian homes this year. From Afrocentric motifs to minimalist designs and multifunctional spaces, learn how to enhance your property's appeal.",
    content: `<p>Nigerian interior design is evolving rapidly, blending global trends with local cultural elements to create unique and appealing living spaces. As we progress through 2023, several distinct trends are shaping how Nigerians design and decorate their homes.</p>

    <h2>Afrocentric Design Elements</h2>
    <p>There's a growing appreciation for incorporating African cultural elements into modern interiors. Traditional patterns, artwork, and artifacts are being seamlessly integrated into contemporary spaces, creating a rich cultural narrative while maintaining a sophisticated aesthetic.</p>

    <h2>Minimalism with a Nigerian Twist</h2>
    <p>The global minimalist trend has found its way into Nigerian homes, but with a local interpretation. Clean lines and uncluttered spaces are complemented by strategic use of bold colors and textured fabrics that reflect Nigeria's vibrant culture.</p>

    <h2>Multifunctional Spaces</h2>
    <p>With urban living spaces becoming more compact, especially in cities like Lagos, multifunctional design has become essential. Convertible furniture, clever storage solutions, and flexible room layouts that can adapt to different activities are increasingly popular.</p>

    <h2>Natural Materials and Biophilic Design</h2>
    <p>Incorporating natural elements and materials like wood, rattan, and indoor plants is a growing trend. This biophilic approach not only enhances aesthetic appeal but also creates healthier living environments by improving air quality and connecting occupants with nature.</p>

    <h2>Smart Home Integration</h2>
    <p>As technology becomes more accessible, smart home features are being integrated into interior design. From automated lighting and climate control to voice-activated systems, technology is enhancing both the functionality and comfort of Nigerian homes.</p>

    <p>At Da'sayonce Real Estate and Properties, our interior design team stays at the forefront of these trends, creating spaces that are not only beautiful and functional but also reflective of our clients' unique personalities and lifestyles. Whether you're building a new home or renovating an existing space, incorporating these trends can significantly enhance your property's appeal and value.</p>`,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F05b931d2989c419796354d089120dfba",
    category: "Interior Design",
    date: "2023-08-05",
    author: "Mr. Kehinde Agbejule",
    authorRole: "Interior & Exterior Designer",
    authorImageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fa71552972d3d4eccb6c467a45b33bc01",
    readTime: 6,
    tags: [
      "Interior Design",
      "Nigerian Homes",
      "Design Trends",
      "Afrocentric Design",
    ],
  },
  {
    id: 6,
    title:
      "Investment Opportunities in Nigeria's Real Estate Market Post-COVID",
    slug: "investment-opportunities-nigeria-real-estate-post-covid",
    excerpt:
      "The COVID-19 pandemic has reshaped Nigeria's real estate landscape, creating new investment opportunities. Explore emerging trends, growth areas, and strategic approaches for investors in the post-pandemic market.",
    content: `<p>The COVID-19 pandemic significantly impacted Nigeria's real estate sector, accelerating some pre-existing trends while creating new patterns of demand. As the market adjusts to post-pandemic realities, several promising investment opportunities have emerged.</p>

    <h2>Residential Real Estate Evolution</h2>
    <p>The pandemic-induced shift to remote work has changed housing preferences. Properties with dedicated home office spaces, reliable internet infrastructure, and in less congested areas have seen increased demand. Residential developments that cater to these evolving needs present attractive investment opportunities.</p>

    <h2>Industrial and Logistics Properties</h2>
    <p>The growth of e-commerce and the need for efficient supply chains have boosted demand for warehousing and logistics facilities. Strategic investments in industrial properties, particularly in areas with good transportation networks, offer potential for strong returns.</p>

    <h2>Mixed-Use Developments</h2>
    <p>Projects that combine residential, commercial, and recreational spaces within the same development are gaining popularity. These integrated communities reduce commuting needs and provide convenience—factors that have become more valued in the post-COVID era.</p>

    <h2>Affordable Housing Segment</h2>
    <p>The affordable housing segment continues to experience significant demand due to Nigeria's growing urban population and housing deficit. Government initiatives supporting affordable housing further enhance the attractiveness of this segment for investors.</p>

    <h2>Healthcare-Related Real Estate</h2>
    <p>The pandemic highlighted the importance of healthcare infrastructure. Properties designed for healthcare services or senior living facilities represent an emerging niche with growth potential as Nigeria's healthcare sector develops.</p>

    <p>At Da'sayonce Real Estate and Properties, we help investors identify and capitalize on these opportunities through our market expertise and comprehensive project management services. The post-COVID Nigerian real estate market, while presenting some challenges, offers substantial prospects for strategic investors who can align their portfolios with these emerging trends.</p>`,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F7e88bf5fc8f84a54a67ec3a29cd85a97",
    category: "Investment",
    date: "2023-07-22",
    author: "Mr. Oguneye A. Olutope",
    authorRole: "Chief Financial Officer",
    authorImageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F28c3e45bc5fe4a6f9fac15cabb371334",
    readTime: 7,
    tags: ["Investment", "Post-COVID", "Real Estate Market", "Market Trends"],
  },
];
