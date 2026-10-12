
import { useEffect, useRef, useState } from "react";
import "./App.css";

const profile = {
  name: "Afifah Putri Islamiyah",
  email: "email-kamu@example.com",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
  summary:
    "Saya tertarik pada teknologi informasi, manajemen proyek, analisis data, dan keamanan informasi. Saya terus mengembangkan kemampuan melalui pembelajaran, kolaborasi, dan pengerjaan proyek.",
};

const navigation = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Certificates", id: "certificates" },
  { label: "Contact", id: "contact" },
];

const projects = [
  {
    number: "01",
    category: "TECHNOLOGY",
    title: "Nama Proyek Pertama",
    description:
      "Jelaskan masalah yang diselesaikan, solusi yang dibuat, dan kontribusi pribadi dalam proyek ini.",
    stack: ["Technology", "Development"],
    year: "20XX",
    url: "",
  },
  {
    number: "02",
    category: "DATA & ANALYSIS",
    title: "Nama Proyek Kedua",
    description:
      "Jelaskan proses analisis, metode yang digunakan, dan hasil yang dapat dibuktikan.",
    stack: ["Data", "Analysis"],
    year: "20XX",
    url: "",
  },
  {
    number: "03",
    category: "INFORMATION SECURITY",
    title: "Nama Proyek Ketiga",
    description:
      "Jelaskan proyek atau pembelajaran teknis terkait keamanan informasi yang benar-benar pernah dilakukan.",
    stack: ["Security", "Research"],
    year: "20XX",
    url: "",
  },
];

const experiences = [
  {
    period: "20XX — SEKARANG",
    role: "Nama Peran",
    organization: "Nama Organisasi atau Institusi",
    description:
      "Isi dengan tanggung jawab, aktivitas, dan kontribusi yang benar-benar dilakukan.",
  },
];

const certificates = [
  {
    name: "Nama Sertifikat Pertama",
    issuer: "Nama Lembaga Penerbit",
    year: "20XX",
    url: "",
  },
  {
    name: "Nama Sertifikat Kedua",
    issuer: "Nama Lembaga Penerbit",
    year: "20XX",
    url: "",
  },
  {
    name: "Nama Sertifikat Ketiga",
    issuer: "Nama Lembaga Penerbit",
    year: "20XX",
    url: "",
  },
  {
    name: "Nama Sertifikat Keempat",
    issuer: "Nama Lembaga Penerbit",
    year: "20XX",
    url: "",
  },
];

function Arrow({ diagonal = false, left = false }) {
  return (
    <span className="arrow" aria-hidden="true">
      {diagonal ? "↗" : left ? "←" : "→"}
    </span>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <Reveal className="section-title">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let ticking = false;

    function updateActiveSection() {
      const header = document.querySelector(".header");
      const headerHeight = header?.offsetHeight ?? 78;
      const marker = window.scrollY + headerHeight + 100;

      let current = "home";

      for (const item of navigation) {
        const section = document.getElementById(item.id);

        if (section && section.offsetTop <= marker) {
          current = item.id;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

      if (atBottom) {
        current = "contact";
      }

      setActive(current);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    }

    updateActiveSection();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function navigateTo(id) {
    const target = document.getElementById(id);
    if (!target) return;

    setMenuOpen(false);
    setActive(id);

    const header = document.querySelector(".header");
    const headerHeight = header?.offsetHeight ?? 78;

    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.history.replaceState(null, "", `#${id}`);

    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <a
          href="#home"
          className="brand"
          onClick={(event) => {
            event.preventDefault();
            navigateTo("home");
          }}
        >

          <span className="brand-name">
            <strong>Afifah Putri Islamiyah</strong>
          </span>
        </a>

        <button
          className={`menu-toggle ${menuOpen ? "menu-toggle-open" : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"}
          aria-expanded={menuOpen}
          type="button"
        >
          <span />
          <span />
        </button>

        <nav
          className={`nav ${menuOpen ? "nav-open" : ""}`}
          aria-label="Navigasi utama"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={
                active === item.id ? "nav-link active" : "nav-link"
              }
              aria-current={active === item.id ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                navigateTo(item.id);
              }}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            className="nav-contact"
            onClick={(event) => {
              event.preventDefault();
              navigateTo("contact");
            }}
          >
            Get in touch <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <section id="home" className="hero section-anchor">
      <div className="container">
        <div className="hero-layout">
          <div className="hero-content">
            <Reveal>
              <div className="availability">
                <span className="availability-dot" />
                INFORMATION TECHNOLOGY · INDONESIA
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1>
                Turning ideas
                <br />
                into <span>meaningful</span>
                <br />
                solutions.
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="hero-description">
                Halo, saya <strong>{profile.name}</strong>. Saya memiliki
                ketertarikan pada teknologi informasi, manajemen proyek,
                analisis data, dan keamanan informasi.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="hero-actions">
                <a href="#projects" className="button button-primary">
                  Explore my work <Arrow diagonal />
                </a>
                <a href="#about" className="button button-text">
                  About me <Arrow />
                </a>
              </div>
            </Reveal>

            <Reveal delay={290}>
              <div className="hero-meta">
                <span>01 / TECHNOLOGY</span>
                <span>02 / PROJECT MANAGEMENT</span>
                <span>03 / DATA & SECURITY</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="hero-visual" delay={180}>
            <div className="visual-top">
              <span>PERSONAL PROFILE</span>
              <span>AP — 001</span>
            </div>

            <div className="visual-grid" />
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="visual-monogram">A<span>.</span></div>

            <div className="visual-caption">
              <span>CURIOUS BY NATURE</span>
              <strong>Driven by purpose.</strong>
            </div>
          </Reveal>
        </div>

        <div className="hero-bottom">
          <span>INDEPENDENT THINKING. THOUGHTFUL EXECUTION.</span>
          <a href="#about">SCROLL TO EXPLORE <span>↓</span></a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const principles = [
    {
      number: "01",
      title: "Structured thinking",
      text: "Memahami masalah, menyusun prioritas, dan merencanakan pekerjaan secara sistematis.",
    },
    {
      number: "02",
      title: "Continuous learning",
      text: "Mengembangkan pemahaman melalui eksplorasi, praktik, dan evaluasi.",
    },
    {
      number: "03",
      title: "Meaningful collaboration",
      text: "Menghargai komunikasi, dokumentasi, dan kontribusi setiap anggota tim.",
    },
  ];

  return (
    <section id="about" className="section section-anchor">
      <div className="container">
        <div className="about-layout">
          <Reveal className="about-aside">
            <Eyebrow>ABOUT ME</Eyebrow>
            <div className="about-index">01<span>/</span>05</div>
            <div className="about-note">
              <span>MY APPROACH</span>
              <p>Understand first. Build thoughtfully.</p>
            </div>
          </Reveal>

          <div className="about-main">
            <Reveal>
              <h2 className="display-heading">
                A curious mind,
                <br />
                <span>a thoughtful approach.</span>
              </h2>
              <p className="about-lead">{profile.summary}</p>
              <p className="body-copy">
                Saya percaya pengembangan diri bukan hanya tentang
                mempelajari teknologi baru, tetapi juga tentang memahami
                konteks masalah, menyusun proses yang baik, dan bekerja
                secara bertanggung jawab. Saya terbuka untuk terus belajar
                melalui proyek dan kolaborasi yang relevan.
              </p>
            </Reveal>

            <div className="principles">
              {principles.map((item, index) => (
                <Reveal className="principle" key={item.number} delay={index * 80}>
                  <span className="principle-number">{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <Arrow diagonal />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ item, index }) {
  return (
    <Reveal className="project-card" delay={index * 90}>
      <div className="project-card-top">
        <span>PROJECT / {item.number}</span>
        <span>{item.year}</span>
      </div>

      <div className="project-illustration" aria-hidden="true">
        <span className={`project-shape shape-${index + 1}`} />
        <span className="project-shape-label">{item.category}</span>
      </div>

      <div className="project-card-content">
        <span className="project-category">{item.category}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>

        <div className="tag-list">
          {item.stack.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>

      <div className="project-card-bottom">
        <span>SELECTED WORK</span>
        {item.url.trim() ? (
          <a href={item.url} target="_blank" rel="noreferrer" aria-label={`Lihat ${item.title}`}>
            <Arrow diagonal />
          </a>
        ) : (
          <span className="project-link-empty" title="Tautan belum ditambahkan">
            <Arrow diagonal />
          </span>
        )}
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="section section-muted section-anchor">
      <div className="container">
        <div className="section-header-row">
          <div>
            <SectionTitle
              eyebrow="SELECTED WORK"
              title={<>Work in progress.<br /><span>Ideas in practice.</span></>}
              description="Proyek dan pengalaman yang merepresentasikan proses berpikir, pembelajaran, serta kontribusi."
            />
          </div>
          <span className="section-counter">02 — 05</span>
        </div>

        <div className="projects-grid">
          {projects.map((item, index) => (
            <ProjectCard key={item.number} item={item} index={index} />
          ))}
        </div>

        <div className="experience-block">
          <SectionTitle
            eyebrow="EXPERIENCE & INVOLVEMENT"
            title="Where I've contributed."
            description="Pengalaman profesional, organisasi, atau kegiatan relevan."
          />

          <div className="experience-list">
            {experiences.map((item, index) => (
              <Reveal className="experience-item" key={`${item.role}-${index}`} delay={index * 70}>
                <span className="experience-period">{item.period}</span>
                <div className="experience-details">
                  <span>{item.organization}</span>
                  <h3>{item.role}</h3>
                  <p>{item.description}</p>
                </div>
                <Arrow diagonal />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Certificates() {
  const sliderRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function updateControls() {
    const element = sliderRef.current;
    if (!element) return;

    setCanPrev(element.scrollLeft > 2);
    setCanNext(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 2
    );
  }

  function slide(direction) {
    const element = sliderRef.current;
    if (!element) return;

    const card = element.querySelector(".certificate-card");
    const gap = 22;

    element.scrollBy({
      left: direction * ((card?.getBoundingClientRect().width || 300) + gap),
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const element = sliderRef.current;
    if (!element) return;

    updateControls();
    element.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);

    return () => {
      element.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, []);

  return (
    <section id="certificates" className="section section-anchor">
      <div className="container">
        <div className="section-header-row certificate-header">
          <SectionTitle
            eyebrow="CERTIFICATES & LEARNING"
            title={<>Knowledge, put<br /><span>into practice.</span></>}
            description="Sertifikat dan rekam pembelajaran yang mendukung pengembangan kompetensi."
          />

          <div className="slider-buttons">
            <button type="button" onClick={() => slide(-1)} disabled={!canPrev} aria-label="Sertifikat sebelumnya">
              <Arrow left />
            </button>
            <button type="button" onClick={() => slide(1)} disabled={!canNext} aria-label="Sertifikat berikutnya">
              <Arrow />
            </button>
          </div>
        </div>

        <div className="certificate-slider" ref={sliderRef}>
          {certificates.map((item, index) => (
            <article className="certificate-card" key={`${item.name}-${index}`}>
              <div className="certificate-card-top">
                <span>CREDENTIAL / {String(index + 1).padStart(2, "0")}</span>
                <span className="credential-icon">↗</span>
              </div>

              <div className="certificate-card-main">
                <div className="credential-mark">CERT.</div>
                <h3>{item.name}</h3>
                <p>{item.issuer}</p>
              </div>

              <div className="certificate-card-bottom">
                <span>{item.year}</span>
                {item.url.trim() ? (
                  <a href={item.url} target="_blank" rel="noreferrer">
                    Verify credential <Arrow diagonal />
                  </a>
                ) : (
                  <span className="credential-placeholder">Add verification link</span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="slider-caption">
          <span>SCROLL OR USE THE ARROWS TO EXPLORE</span>
          <span>{String(certificates.length).padStart(2, "0")} ITEMS</span>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const subject = encodeURIComponent("Professional inquiry — Afifah Putri Islamiyah");

  return (
    <section id="contact" className="contact-section section-anchor">
      <div className="container">
        <div className="contact-layout">
          <Reveal className="contact-main">
            <Eyebrow>LET'S CONNECT</Eyebrow>
            <h2>
              Have a good
              <br />
              <span>idea in mind?</span>
            </h2>
            <p>
              Mari memulai percakapan tentang kolaborasi, kesempatan
              profesional, atau pertukaran ide yang relevan.
            </p>
            <a
              className="button button-white"
              href={`mailto:${profile.email}?subject=${subject}`}
            >
              Send me an email <Arrow diagonal />
            </a>
          </Reveal>

          <Reveal className="contact-links" delay={120}>
            <span className="contact-label">FIND ME ONLINE</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link">
              <span>
                <strong>LinkedIn</strong>
                <small>Professional network</small>
              </span>
              <Arrow diagonal />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact-link">
              <span>
                <strong>GitHub</strong>
                <small>Code and projects</small>
              </span>
              <Arrow diagonal />
            </a>
            <a href={`mailto:${profile.email}`} className="contact-link">
              <span>
                <strong>Email</strong>
                <small>{profile.email}</small>
              </span>
              <Arrow diagonal />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#home" className="footer-brand">
          <span className="brand-symbol">A<span>.</span></span>
          <span>{profile.name}</span>
        </a>
        <span>Built with purpose · {new Date().getFullYear()}</span>
        <a href="#home" className="footer-top">Back to top ↑</a>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.title = `${profile.name} — Portfolio`;
  }, []);

  return (
    <div className="portfolio">
      <Header />
      <main>
        <Home />
        <About />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
