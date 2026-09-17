// ─────────────────────────────────────────────────────────────
// Edit this file to update all portfolio content in one place.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Neeraj Kumar",
  role: "Frontend Developer",
  // The positioning line: who it's for and what they get. Keep it short.
  tagline: "I build WordPress and Shopify sites that load fast and turn visitors into customers.",
  taglineSupport:
    "Four years shipping storefronts, CMS builds and React interfaces for clients across retail, legal, education and consultancy.",
  availability: {
    status: "Open to work",
    detail: "Full-time or remote · Replies within 24 hours",
  },
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

// The three stacks worked in every day, each with the proof behind it.
// Depth reads senior; a wall of logos reads generalist.
export const coreSkills = [
  {
    name: "Shopify",
    summary: "Custom Liquid themes, subscriptions and checkout",
    proof:
      "Built a premium pet-food storefront end to end — custom theme, subscription plans, meal customizers, discount codes and payment gateways.",
    tools: ["Liquid", "Custom themes", "Subscriptions", "Payment gateways"],
  },
  {
    name: "WordPress",
    summary: "Theme customization, Elementor and CMS builds",
    proof:
      "Shipped law, education, school and consultancy sites — custom sections, structured blogs, CRM-connected forms and SEO-focused page builds.",
    tools: ["Elementor", "Custom CSS/PHP", "Pagelayer Pro", "Plugin maintenance"],
  },
  {
    name: "React & Next.js",
    summary: "Component UI, routing and modern frontend",
    proof:
      "Built a course discovery and enquiry platform, plus this portfolio — App Router, reusable components, image optimization and scroll-driven motion.",
    tools: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
];

// Everything else, kept as one quiet line instead of a logo wall
export const alsoWorkWith = [
  "HTML5",
  "CSS3 & Sass",
  "JavaScript (ES6+)",
  "PHP",
  "Bootstrap",
  "Git & GitHub",
  "HubSpot",
  "LeadSquared",
  "Figma",
  "Photoshop",
  "SEO & performance tuning",
];

// Proof band under the hero — numbers only mean something with context
export const proofPoints = [
  { value: "4+", label: "Years shipping client work" },
  { value: "20+", label: "Websites delivered" },
  { value: "6", label: "Live projects you can open below" },
  { value: "5", label: "Sectors: retail, legal, education, consultancy, environment" },
];

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

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Long-form case studies for the three projects with the most to say.
 *  Each one answers the questions a hiring manager actually has: what was the
 *  problem, what did you decide, and what did it change.
 *
 *  Keep these honest. If you have real numbers (conversion lift, load time,
 *  enquiry volume), replace the qualitative outcome lines with them. */
export const caseStudies = [
  {
    slug: slugify("Brunswick Fur Food"),
    role: "Frontend Developer · Softles",
    sector: "Direct-to-consumer retail",
    duration: "Shopify build",
    context:
      "Brunswick Fur Food sells premium pet food built around recurring orders rather than one-off purchases. The brand needed a storefront where a customer could choose a meal plan, customize it for their pet, and subscribe without dropping out halfway.",
    challenge:
      "A standard Shopify theme handles simple products well, but it falls apart once meal options, plan frequencies and discounts have to work together. The buying flow had to stay short enough that a first-time visitor could finish it on a phone.",
    decisions: [
      {
        title: "Built the theme custom instead of stretching a stock one",
        detail:
          "A purchased theme would have needed heavy overrides for variant logic and subscriptions. Writing the Liquid templates directly kept the markup small and the product logic readable for whoever maintains it next.",
      },
      {
        title: "Made plan selection part of the product page, not a separate step",
        detail:
          "Meal options and subscription frequency are chosen inline with custom variant selectors, so the customer sees price and plan update together instead of discovering them at checkout.",
      },
      {
        title: "Wired marketing and payments into the same flow",
        detail:
          "HubSpot captures enquiries and discount codes apply cleanly against subscription pricing, so campaigns and secure payment gateways work without manual reconciliation.",
      },
    ],
    build: [
      "Custom Shopify theme in Liquid, built from the ground up",
      "Subscription plans with configurable delivery frequency",
      "Custom product variant selectors for meal customization",
      "Interactive enquiry forms wired to HubSpot",
      "Discount code handling and secure payment gateway integration",
    ],
    outcome:
      "The store now sells a subscription rather than a single bag of food: plan, customization and payment all happen in one uninterrupted flow, which is what turns a one-time buyer into a repeat customer.",
  },
  {
    slug: slugify("BNPS International"),
    role: "Frontend Developer · Softles",
    sector: "Education consultancy",
    duration: "WordPress build",
    context:
      "BNPS International advises students on studying abroad. Almost all of their business starts with an enquiry form, so the website is a lead engine before it is a brochure.",
    challenge:
      "Enquiries were only useful if they landed in the consultancy's CRM with the right context and triggered a fast follow-up. The site also had to rank, because most prospective students arrive through search rather than a referral.",
    decisions: [
      {
        title: "Treated the form as the product",
        detail:
          "Forms were placed at each decision point on the page rather than parked on a contact page, so a visitor can enquire the moment they are convinced.",
      },
      {
        title: "Connected LeadSquared with automated email workflows",
        detail:
          "Every submission creates a CRM record and triggers an automated acknowledgement, so no lead sits unanswered while the counselling team is busy.",
      },
      {
        title: "Customized the theme rather than adding more plugins",
        detail:
          "Custom layouts and animations were written directly into the theme. Fewer plugins meant fewer conflicts, better load times and a site the client could keep running.",
      },
    ],
    build: [
      "Customized WordPress theme with bespoke layouts and animations",
      "LeadSquared CRM integration across every enquiry form",
      "Automated email workflows for instant follow-up",
      "On-page SEO structure and performance tuning",
      "Fully responsive build across phone, tablet and desktop",
    ],
    outcome:
      "The site turns search traffic into qualified CRM-tracked leads with an automatic first response, instead of collecting form submissions in an inbox.",
  },
  {
    slug: slugify("Art Tech Institute"),
    role: "Frontend Developer",
    sector: "Education and training",
    duration: "Next.js build",
    context:
      "Art Tech Institute teaches practical, job-oriented courses in Advanced Excel, Power BI, data analytics, Tally Prime and AI tools from Bilaspur. Their catalogue was broad, which made it hard for a visitor to work out which course was right for them.",
    challenge:
      "A long course list answers nothing on its own. The site had to guide someone from 'I want a better job' to a specific course and an enquiry, and it had to stay fast on the modest phones most of their students use.",
    decisions: [
      {
        title: "Organized the site around outcomes, not the catalogue",
        detail:
          "Courses are framed by where they lead, so a visitor picks a career direction first and the matching course second.",
      },
      {
        title: "Put student proof next to the decision",
        detail:
          "Outcomes and testimonials sit beside the course details rather than in a separate section, because social proof works where the doubt is.",
      },
      {
        title: "Built on Next.js for speed and search",
        detail:
          "Server-rendered pages and optimized images keep the site quick on slow connections, and give each course a real URL that search can index.",
      },
    ],
    build: [
      "Next.js course platform with a clear discovery path",
      "Course detail pages built for scanning and comparison",
      "Student outcome and testimonial sections",
      "Enquiry journeys placed at each decision point",
      "Responsive, SEO-focused, performance-optimized build",
    ],
    outcome:
      "A broad training catalogue now reads as a focused path from learning to career readiness, with an enquiry route at every step of it.",
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
