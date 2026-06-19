"use client";

import { useEffect, useState } from "react";

const navItems = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const skillGroups = [
  ["Web Development", ["HTML5", "CSS3", "JavaScript", "PHP", "Sass"]],
  ["CMS Platforms", ["WordPress", "Elementor", "Pagelayer Pro", "Shopify"]],
  ["Tools & Libraries", ["Bootstrap", "GitHub"]],
  ["Design Tools", ["Figma", "Photoshop"]],
  ["Frameworks", ["React.js"]],
];

const experiences = [
  {
    period: "Mar 2023 - Present",
    duration: "3+ yrs",
    location: "Gurugram, Haryana, India",
    mode: "Remote",
    role: "Frontend Developer",
    company: "Softles · Full-time",
    bullets: [
      "Developed and maintained dynamic websites using HTML, CSS, JavaScript, and PHP.",
      "Created responsive layouts and reusable components.",
      "Customized WordPress themes and Shopify templates to suit client requirements.",
      "Integrated third-party plugins, improved page load time, and ensured cross-browser compatibility.",
      "Collaborated closely with designers to translate UI/UX mockups into functional code.",
    ],
  },
  {
    period: "Sep 2022 - Feb 2023",
    duration: "6 mos",
    location: "Gurugram, Haryana, India",
    mode: "Remote",
    role: "WordPress & Shopify Developer",
    company: "Chulbul Design · Full-time",
    bullets: [
      "Built eCommerce websites using Shopify and WordPress.",
      "Managed client requirements and updated themes using custom coding.",
      "Created product landing pages and improved SEO-friendly structures.",
      "Troubleshot bugs and maintained plugins and databases.",
    ],
  },
];

const projects = [
  {
    title: "Pride and Justice",
    description:
      "Professional legal services website for a law firm with responsive layouts, custom sections, blog structure, and performance optimizations.",
    tech: ["WordPress", "Elementor", "Custom CSS", "Plugins"],
    href: "https://prideandjustice.in/",
  },
  {
    title: "Brunswick Fur Food",
    description:
      "Shopify site for a premium pet food brand featuring subscription plans, customizable meals, discount codes, and a user-friendly shopping experience.",
    tech: ["Shopify", "Custom Theme", "HubSpot", "Payment Gateways"],
    href: "https://www.brunswickfurfood.com/",
  },
  {
    title: "BNPS International",
    description:
      "Responsive education consultancy website with a customized WordPress theme, optimized for performance and SEO.",
    tech: ["WordPress", "Elementor", "Leadsquared", "Custom Animation"],
    href: "https://bnpsinternational.com/",
  },
  {
    title: "Enviro Guru Consultancy",
    description:
      "WordPress website for an environmental consultancy firm, highlighting services, compliance expertise, and client success stories.",
    tech: ["WordPress", "Custom Layout"],
    href: "https://enviroguru.in/",
  },
  {
    title: "Personal Portfolio (v1)",
    description:
      "Earlier personal portfolio built with HTML, CSS, and JavaScript to showcase skills and projects.",
    tech: ["HTML", "CSS", "JS"],
    href: "https://neeraj-kumar-94.github.io/Neeraj-kumar-Portfolio/",
  },
  {
    title: "RecoBee - Movie Recommendation",
    description:
      "Responsive landing page concept for a movie recommendation product.",
    tech: ["HTML", "CSS", "JS"],
    href: "https://neeraj-kumar-94.github.io/Recobee-landing-page/",
  },
  {
    title: "Airbnb-Like Property Rental Website",
    description:
      "An Airbnb clone with dynamic search, an interactive map, and a responsive UI, built with HTML, CSS, and JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
    href: "https://neeraj-kumar-94.github.io/airbnb.github.io/",
  },
];

const testimonials = [
  {
    initials: "SS",
    name: "Shakti Singh",
    role: "Consulting Specialist - UX/UI",
    text: "I have worked with Neeraj on multiple projects, and his ability to turn design concepts into responsive and user-friendly interfaces is impressive. He pays attention to small details, understands requirements quickly, and always focuses on delivering clean and quality work.",
  },
  {
    initials: "MG",
    name: "Manish Gurjar",
    role: "Senior UI/UX Designer",
    text: "Neeraj is a dependable frontend developer who understands both design and development requirements. He has a good approach toward converting UI designs into responsive websites and works efficiently with technologies like Shopify and WordPress.",
  },
  {
    initials: "TS",
    name: "Tanmay Sharma",
    role: "SaaS Sales Professional",
    text: "Neeraj has a strong ability to create professional websites that are easy to use and visually appealing. His understanding of frontend development and user experience helps in building solutions that meet both client and business requirements.",
  },
];

const education = [
  {
    period: "Sep 2020 - Jun 2023",
    degree: "Bachelor of Arts",
    school: "Chaudhary Charan Singh University, Meerut",
  },
  {
    period: "Apr 2018 - Mar 2020",
    degree: "Intermediate (12th)",
    school: "V.V. Inter College, Shamli",
  },
];

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const moveLight = (event) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", moveLight);
    return () => window.removeEventListener("pointermove", moveLight);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll(
      ".content-section .section-title, .glass-card, .hero-stats a"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const showTestimonial = (direction) => {
    setActiveTestimonial((current) => {
      const next = current + direction;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  return (
    <>
      <div className="fixed-light" aria-hidden="true" />
      <div className="cursor-light" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Neeraj Kumar home">
          <span className="brand-icon">N</span>
          <span>Neeraj</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              className={activeSection === item.id ? "active" : ""}
              key={item.id}
              onClick={() => goTo(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
      </header>

      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <button key={item.id} onClick={() => goTo(item.id)} type="button">
            {item.label}
          </button>
        ))}
      </nav>

      <main>
        <section className="hero" id="top">
          <div className="hero-glow" />
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-inner">
            <p className="hero-kicker">Frontend · WordPress · Shopify</p>
            <h1>Neeraj Kumar</h1>
            <h2>I design & code for web</h2>
            <p className="hero-copy">
              Frontend Developer turning design mockups into responsive,
              fast-loading WordPress and Shopify websites with clean HTML, CSS,
              JavaScript, and PHP underneath.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#projects">
                View Projects
              </a>
              <a className="btn secondary" href="#about">
                About Me
              </a>
            </div>
            <a className="email-chip" href="mailto:neeraj74530@gmail.com">
              <span>~</span>
              neeraj74530@gmail.com
            </a>
            <div className="hero-stats">
              <a href="#projects">
                <span className="stat-icon">GH</span>
                <strong>7+</strong>
                <small>Project Builds</small>
              </a>
              <a href="https://www.linkedin.com/in/neerajkumar94/" rel="noreferrer" target="_blank">
                <span className="stat-icon">in</span>
                <strong>3+</strong>
                <small>Years Experience</small>
              </a>
              <a href="tel:+918006902845">
                <span className="stat-icon">WA</span>
                <strong>24x7</strong>
                <small>Available to Talk</small>
              </a>
            </div>
          </div>
        </section>

        <section className="content-section" id="about">
          <div className="container">
            <SectionTitle
              eyebrow="About"
              title="Clean websites for real business goals."
              text="I care about clean code, cross-browser compatibility, and user-centered design while collaborating closely with designers and clients."
            />
            <div className="about-grid">
              <article className="glass-card featured-card">
                <span className="card-label">Profile</span>
                <h3>3+ years of building interfaces that feel considered.</h3>
                <p>
                  I turn design mockups into fully working pages, with a strong
                  focus on responsive layouts, client requirements, and reliable
                  delivery. Currently exploring React.js and modern frontend
                  frameworks.
                </p>
              </article>
              <article className="glass-card contact-mini">
                <span className="card-label">Based in</span>
                <h3>Shamli, Uttar Pradesh, India</h3>
                <p>Open to full-time and remote frontend roles.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="content-section" id="education">
          <div className="container">
            <SectionTitle eyebrow="Education" title="Academic background" />
            <div className="two-column">
              {education.map((item) => (
                <article className="glass-card" key={item.degree}>
                  <span className="card-label">{item.period}</span>
                  <h3>{item.degree}</h3>
                  <p>{item.school}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" id="experience">
          <div className="container">
            <SectionTitle
              eyebrow="Experience"
              title="Frontend delivery across CMS and ecommerce."
            />
            <div className="timeline">
              {experiences.map((experience) => (
                <article className="glass-card timeline-card" key={experience.role}>
                  <div>
                    <span className="card-label">{experience.period}</span>
                    <p className="muted">
                      {experience.duration} · {experience.location} ·{" "}
                      {experience.mode}
                    </p>
                  </div>
                  <div>
                    <h3>{experience.role}</h3>
                    <p className="company">{experience.company}</p>
                    <ul>
                      {experience.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" id="skills">
          <div className="container">
            <SectionTitle eyebrow="Skills" title="Tools I use to build." />
            <div className="skills-grid">
              {skillGroups.map(([label, skills]) => (
                <article className="glass-card skill-card" key={label}>
                  <span className="card-label">{label}</span>
                  <div>
                    {skills.map((skill) => (
                      <span className="pill" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" id="projects">
          <div className="container">
            <SectionTitle
              eyebrow="Projects"
              title="Selected work and client builds."
              text="A mix of WordPress, Shopify, and custom HTML/CSS/JavaScript projects."
            />
            <div className="projects-grid">
              {projects.map((project, index) => (
                <a
                  className="glass-card project-card"
                  href={project.href}
                  key={project.title}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="project-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div>
                    {project.tech.map((tech) => (
                      <span className="pill" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="visit-link">Visit project</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" id="testimonials">
          <div className="container">
            <SectionTitle
              eyebrow="Testimonials"
              title="What collaborators say."
            />
            <div className="testimonial-slider" aria-roledescription="carousel">
              <div
                className="testimonial-track"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <article
                    aria-hidden={testimonials[activeTestimonial].name !== testimonial.name}
                    className="glass-card testimonial-card"
                    key={testimonial.name}
                  >
                    <p>{testimonial.text}</p>
                    <div className="person">
                      <span>{testimonial.initials}</span>
                      <div>
                        <h3>{testimonial.name}</h3>
                        <small>{testimonial.role}</small>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="slider-controls">
                <button
                  aria-label="Previous testimonial"
                  onClick={() => showTestimonial(-1)}
                  type="button"
                >
                  Prev
                </button>
                <div className="slider-dots" aria-label="Choose testimonial">
                  {testimonials.map((testimonial, index) => (
                    <button
                      aria-label={`Show testimonial from ${testimonial.name}`}
                      className={activeTestimonial === index ? "active" : ""}
                      key={testimonial.name}
                      onClick={() => setActiveTestimonial(index)}
                      type="button"
                    />
                  ))}
                </div>
                <button
                  aria-label="Next testimonial"
                  onClick={() => showTestimonial(1)}
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section contact-section" id="contact">
          <div className="container">
            <SectionTitle
              eyebrow="Contact"
              title="Available for full-time and remote roles."
              text="Let's build something useful, clean, and fast."
            />
            <div className="contact-grid">
              <a className="glass-card contact-card" href="mailto:neeraj74530@gmail.com">
                <span className="card-label">Email</span>
                <strong>neeraj74530@gmail.com</strong>
              </a>
              <a className="glass-card contact-card" href="tel:+918006902845">
                <span className="card-label">Phone</span>
                <strong>+91 8006902845</strong>
              </a>
              <a
                className="glass-card contact-card"
                href="https://www.linkedin.com/in/neerajkumar94/"
                rel="noreferrer"
                target="_blank"
              >
                <span className="card-label">LinkedIn</span>
                <strong>linkedin.com/in/neerajkumar94</strong>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <a className="footer-brand" href="#top">
              Neeraj Kumar
            </a>
            <p>Frontend, WordPress and Shopify Developer based in India.</p>
          </div>
          <div className="footer-links">
            {navItems.slice(0, 6).map((item) => (
              <button key={item.id} onClick={() => goTo(item.id)} type="button">
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <p className="copyright">© 2026 Neeraj Kumar. All rights reserved.</p>
      </footer>
    </>
  );
}
