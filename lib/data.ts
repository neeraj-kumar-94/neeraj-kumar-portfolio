// ─────────────────────────────────────────────────────────────
// Edit this file to update all portfolio content in one place.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Neeraj Kumar",
  role: "Frontend Developer",
  typedRoles: [
    "Frontend Developer",
    "WordPress Expert",
    "Shopify Specialist",
    "React.js / Next.js Developer",
  ],
  tagline:
    "I design and build responsive, performance-driven websites and eCommerce experiences — from pixel-perfect WordPress and Shopify builds to modern React.js and Next.js interfaces.",
  location: "Shamli, Uttar Pradesh, India",
  email: "neeraj74530@gmail.com",
  phone: "+91 8006902845",
  resumeUrl: "/resume", // in-site resume page; PDF at /Neeraj-Kumar-Resume.pdf
  socials: {
    github: "https://github.com/neeraj-kumar-94",
    linkedin: "https://www.linkedin.com/in/neerajkumar94",
    portfolio: "http://neeraj-kumar-94.github.io/Neeraj-kumar-Portfolio/",
  },
  about: [
    "I'm a Frontend Developer with 4+ years of experience designing and building responsive, performance-driven, and visually engaging websites. I specialize in WordPress and Shopify development, backed by strong proficiency in HTML5, CSS3, JavaScript, PHP, and React.js/Next.js.",
    "I've delivered eCommerce platforms, corporate websites, and CMS-driven solutions for clients across the legal, retail, education, and consultancy sectors — translating design mockups into pixel-perfect, cross-browser interfaces, integrating tools like HubSpot and LeadSquared, and optimizing every site for speed and SEO.",
    "I'm known for writing clean, maintainable code and collaborating closely with designers and stakeholders to deliver on real business goals. Currently open to full-time and remote roles.",
  ],
  stats: [
    { value: "4+", label: "Years Experience" },
    { value: "20+", label: "Projects Delivered" },
    { value: "5+", label: "Industries Served" },
  ],
};

export const skillGroups = [
  {
    title: "Web Development",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "PHP", "Sass"],
  },
  {
    title: "Frameworks & CMS",
    skills: ["React.js", "Next.js", "WordPress (Elementor, Pagelayer Pro)", "Shopify (Liquid, Custom Themes)"],
  },
  {
    title: "Tools & Integrations",
    skills: ["Bootstrap", "Git & GitHub", "HubSpot", "LeadSquared", "Payment Gateways"],
  },
  {
    title: "Design & Optimization",
    skills: ["Figma", "Adobe Photoshop", "SEO Optimization", "Performance Tuning", "Cross-Browser Compatibility"],
  },
];

export const projects = [
  {
    title: "Brunswick Fur Food",
    subtitle: "Premium Pet Food eCommerce",
    description:
      "Custom Shopify storefront for a premium pet food brand with subscription plans and customizable meal options. Built interactive forms and custom product variant selectors, and integrated discount codes, HubSpot, and secure payment gateways.",
    tech: ["Shopify", "Custom Theme", "HubSpot", "Payment Gateway"],
    liveUrl: "https://www.brunswickfurfood.com/",
    image: "/projects/brunswick.jpg",
  },
  {
    title: "Pride and Justice",
    subtitle: "Legal Services Website",
    description:
      "Professional website for a law firm focused on establishing credibility and client trust. Implemented responsive layouts, custom Elementor sections, and a structured blog, with performance optimizations for a smooth experience across devices.",
    tech: ["WordPress", "Elementor", "Custom CSS", "Responsive Design"],
    liveUrl: "https://prideandjustice.in/",
    image: "/projects/pride-justice.jpg",
  },
  {
    title: "BNPS International",
    subtitle: "Education Consultancy Platform",
    description:
      "Responsive website for an education consultancy, built for lead generation. Customized the WordPress theme with custom animations and layouts, integrated LeadSquared CRM with automated email workflows, and optimized for performance and SEO.",
    tech: ["WordPress", "Elementor", "LeadSquared", "Email Automation"],
    liveUrl: "https://bnpsinternational.com/",
    image: "/projects/bnps.jpg",
  },
  {
    title: "Vivekanand Vidya Niketan",
    subtitle: "School Website, Assandh",
    description:
      "Full-featured school website with academics, admissions, and achievements sections. Implemented custom multimedia sections — video banners, achievement galleries, and social media feeds — optimized for a smooth, mobile-friendly experience.",
    tech: ["WordPress", "Elementor", "Custom CSS", "Responsive Design"],
    liveUrl: "https://vvnassandh.com/",
    image: "/projects/vvn.jpg",
  },
  {
    title: "Enviro Guru Consultancy",
    subtitle: "Environmental Consultancy",
    description:
      "WordPress website for an environmental consultancy firm showcasing services and compliance expertise, with a clean, professional layout that highlights client success stories to build credibility and trust.",
    tech: ["WordPress", "Elementor", "Custom CSS"],
    liveUrl: "https://enviroguru.in/",
    image: "/projects/enviro.jpg",
  },
];

export const experience = [
  {
    role: "Frontend Developer",
    company: "Softles",
    period: "Mar 2023 — Present",
    location: "Gurugram, Haryana · Remote",
    points: [
      "Develop and maintain dynamic, high-performance websites using HTML, CSS, JavaScript, and PHP, ensuring fast load times and smooth user experiences.",
      "Build responsive layouts and reusable UI components, improving development efficiency and code consistency across projects.",
      "Customize WordPress themes and Shopify templates to align with diverse client requirements and brand guidelines.",
      "Integrate third-party plugins and APIs — HubSpot, LeadSquared, and payment gateways — enhancing site functionality and lead capture.",
      "Partner closely with designers and stakeholders to convert UI/UX mockups into pixel-accurate, fully functional web pages.",
    ],
  },
  {
    role: "WordPress & Shopify Developer",
    company: "Chulbul Design",
    period: "Sep 2022 — Feb 2023",
    location: "Gurugram, Haryana · Remote",
    points: [
      "Built eCommerce websites on Shopify and WordPress, delivering tailored solutions to meet client business needs.",
      "Managed end-to-end client requirements and customized themes through custom coding and configuration.",
      "Designed and developed SEO-friendly product and landing pages to improve organic visibility and conversions.",
      "Diagnosed and resolved bugs, and maintained plugins, databases, and site performance for ongoing client sites.",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Arts",
    institution: "Chaudhary Charan Singh University, Meerut",
    period: "Sep 2020 — Jun 2023",
    detail:
      "Completed graduation while building a professional career in web development — balancing academics with real-world client projects.",
  },
  {
    degree: "Intermediate (12th)",
    institution: "V.V. Inter College, Shamli",
    period: "Apr 2018 — Mar 2020",
    detail: "Completed senior secondary education in Shamli, Uttar Pradesh.",
  },
];

export const highlights = [
  "Available for full-time and remote roles",
  "4+ years of hands-on client project delivery",
  "Passionate about UI/UX design and micro-interactions",
  "Continuously exploring modern frontend frameworks",
];

// "What Mentors Say" — shown in the testimonial slider.
export const mentors = [
  {
    name: "Shakti Singh",
    title: "Consulting Specialist – UX/UI",
    linkedin: "https://www.linkedin.com/in/gurjarshakti/",
    image: "/mentors/shakti.jpg",
    quote:
      "Guiding Neeraj through the nuances of frontend development has been a rewarding experience. His ability to quickly grasp new concepts and apply them creatively to projects is truly impressive. Not only does he possess strong technical skills, but his collaborative nature and effective communication make him a valuable asset.",
  },
  {
    name: "Tanmay Sharma",
    title: "SaaS Sales Professional",
    linkedin: "https://www.linkedin.com/in/tanmaybummlers/",
    image: "/mentors/tanmay.jpg",
    quote:
      "Neeraj is not just proficient in coding, he also possesses a strong design sense, which greatly enhances the visual appeal and functionality of his projects. His collaborative approach and strong problem-solving skills make him an excellent addition to any project. His dedication and passion for his craft are admirable.",
  },
  {
    name: "Manish Gurjar",
    title: "Senior UI/UX Designer | Product Design Expert",
    linkedin: "https://www.linkedin.com/in/mymkrana/",
    image: "/mentors/manish.jpg",
    quote:
      "Neeraj has consistently demonstrated a high level of proficiency in frontend development. His code is not just functional but also elegant, reflecting a deep understanding of design principles. He possesses a strong command of WordPress, Shopify, and modern frontend technologies, and his ability to adapt to evolving industry standards is impressive.",
  },
];
