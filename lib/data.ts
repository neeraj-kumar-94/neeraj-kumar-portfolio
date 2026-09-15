// ─────────────────────────────────────────────────────────────
// Edit this file to update all portfolio content in one place.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Neeraj Kumar",
  role: "Frontend Developer",
  tagline:
    "I design and build responsive, performance-driven websites and eCommerce experiences — from pixel-perfect WordPress and Shopify builds to modern React.js and Next.js interfaces.",
  location: "Shamli, Uttar Pradesh, India",
  email: "neeraj74530@gmail.com",
  phone: "+91 8006902845",
  socials: {
    github: "https://github.com/neeraj-kumar-94",
    linkedin: "https://www.linkedin.com/in/neerajkumar94",
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
    result: "Subscription checkout that turns one-time buyers into repeat customers.",
  },
  {
    title: "Pride and Justice",
    subtitle: "Legal Services Website",
    description:
      "Professional website for a law firm focused on establishing credibility and client trust. Implemented responsive layouts, custom Elementor sections, and a structured blog, with performance optimizations for a smooth experience across devices.",
    tech: ["WordPress", "Elementor", "Custom CSS", "Responsive Design"],
    liveUrl: "https://prideandjustice.in/",
    image: "/projects/pride-justice.jpg",
    result: "A credibility-first design that wins client trust before the first call.",
  },
  {
    title: "BNPS International",
    subtitle: "Education Consultancy Platform",
    description:
      "Responsive website for an education consultancy, built for lead generation. Customized the WordPress theme with custom animations and layouts, integrated LeadSquared CRM with automated email workflows, and optimized for performance and SEO.",
    tech: ["WordPress", "Elementor", "LeadSquared", "Email Automation"],
    liveUrl: "https://bnpsinternational.com/",
    image: "/projects/bnps.jpg",
    result: "CRM-connected forms that turn visitors into a steady stream of qualified leads.",
  },
  {
    title: "Vivekanand Vidya Niketan",
    subtitle: "School Website, Assandh",
    description:
      "Full-featured school website with academics, admissions, and achievements sections. Implemented custom multimedia sections — video banners, achievement galleries, and social media feeds — optimized for a smooth, mobile-friendly experience.",
    tech: ["WordPress", "Elementor", "Custom CSS", "Responsive Design"],
    liveUrl: "https://vvnassandh.com/",
    image: "/projects/vvn.jpg",
    result: "Gave a small-town school a digital presence parents actually use for admissions.",
  },
  {
    title: "Enviro Guru Consultancy",
    subtitle: "Environmental Consultancy",
    description:
      "WordPress website for an environmental consultancy firm showcasing services and compliance expertise, with a clean, professional layout that highlights client success stories to build credibility and trust.",
    tech: ["WordPress", "Elementor", "Custom CSS"],
    liveUrl: "https://enviroguru.in/",
    image: "/projects/enviro.jpg",
    result: "A clean B2B presence that backs up the firm's compliance expertise.",
  },
  {
    title: "Art Tech Institute",
    subtitle: "Job-Ready Computer Training Platform",
    description:
      "Modern education platform for a Bilaspur-based computer institute offering practical courses in Advanced Excel, Power BI, Data Analytics, Tally Prime, and AI tools. Built course discovery, student outcomes, testimonials, and enquiry journeys into a clear, conversion-focused experience.",
    tech: ["Next.js", "Responsive UI", "Course Platform", "SEO"],
    liveUrl: "https://www.arttechbsp.com/",
    image: "/projects/arttech.jpg",
    result: "Turned a broad training catalogue into a focused path from learning to career readiness.",
  },
];

export const experience = [
  {
    role: "Frontend Developer",
    company: "Softles",
    period: "Mar 2023 — Present",
    location: "Gurugram, Haryana · Remote",
    points: [
      "Build and maintain fast, high-performance websites with HTML, CSS, JavaScript, and PHP for clients across multiple industries.",
      "Customize WordPress themes and Shopify storefronts to match each client's brand and business requirements.",
      "Integrate HubSpot, LeadSquared, and payment gateways to power lead capture and online sales.",
      "Create responsive layouts and reusable UI components that keep projects consistent and quick to ship.",
      "Work closely with designers and stakeholders to turn UI/UX mockups into pixel-accurate, fully functional pages.",
    ],
  },
  {
    role: "WordPress & Shopify Developer",
    company: "Chulbul Design",
    period: "Sep 2022 — Feb 2023",
    location: "Gurugram, Haryana · Remote",
    points: [
      "Built eCommerce websites on Shopify and WordPress, tailored to each client's business goals.",
      "Handled client requirements end to end — from theme customization and custom code to final configuration.",
      "Designed SEO-friendly product and landing pages that improved organic visibility and conversions.",
      "Fixed bugs and maintained plugins, databases, and performance for live client sites.",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Arts",
    institution: "Chaudhary Charan Singh University, Meerut",
    period: "Sep 2020 — Jun 2023",
    detail:
      "Completed my degree while already working as a web developer — balancing academics with real client projects.",
  },
  {
    degree: "Intermediate (12th)",
    institution: "V.V. Inter College, Shamli",
    period: "Apr 2018 — Mar 2020",
    detail: "Senior secondary education from V.V. Inter College, Shamli.",
  },
];

export const highlights = [
  "4+ years of frontend experience, delivering 20+ production websites for clients across legal, retail, education, and consultancy sectors",
  "Specialized in WordPress & Shopify — custom themes, complete eCommerce storefronts, subscriptions, and secure payment integration",
  "Integrated CRM & marketing platforms (HubSpot, LeadSquared) and automated workflows that power lead generation and online sales",
  "Proven record of performance and SEO optimization — faster load times, stronger search visibility, and pixel-perfect responsive UI",
];

// "What Mentors Say" — shown in the testimonial slider.
export const mentors = [
  {
    name: "Shakti Singh",
    title: "Consulting Specialist – UX/UI",
    linkedin: "https://www.linkedin.com/in/gurjarshakti/",
    image: "/mentors/shakti_singh.jpg",
    quote:
      "Guiding Neeraj through the nuances of frontend development has been a rewarding experience. His ability to quickly grasp new concepts and apply them creatively to projects is truly impressive. Not only does he possess strong technical skills, but his collaborative nature and effective communication make him a valuable asset.",
  },
  {
    name: "Tanmay Sharma",
    title: "SaaS Sales Professional",
    linkedin: "https://www.linkedin.com/in/tanmaybummlers/",
    image: "/mentors/tanmay_sharma.jpg",
    quote:
      "Neeraj is not just proficient in coding, he also possesses a strong design sense, which greatly enhances the visual appeal and functionality of his projects. His collaborative approach and strong problem-solving skills make him an excellent addition to any project. His dedication and passion for his craft are admirable.",
  },
  {
    name: "Manish Gurjar",
    title: "Senior UI/UX Designer | Product Design Expert",
    linkedin: "https://www.linkedin.com/in/mymkrana/",
    image: "/mentors/manish_rana.jpg",
    quote:
      "Neeraj has consistently demonstrated a high level of proficiency in frontend development. His code is not just functional but also elegant, reflecting a deep understanding of design principles. He possesses a strong command of WordPress, Shopify, and modern frontend technologies, and his ability to adapt to evolving industry standards is impressive.",
  },
];
