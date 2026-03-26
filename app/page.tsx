"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

type Lang = "tr" | "en";
type Theme = "dark" | "light";

const getInitialLang = (): Lang => {
  if (typeof window === "undefined") {
    return "tr";
  }

  const savedLang = window.localStorage.getItem("lang");
  return savedLang === "tr" || savedLang === "en" ? savedLang : "tr";
};

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem("theme");
  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
};

const content = {
  tr: {
    nav: {
      home: "Ana Sayfa",
      about: "Hakkımızda",
      services: "Hizmetler",
      solutions: "Çözümler",
      blog: "Blog",
      contact: "İletişim",
    },
    hero: {
      pill: "Danışmanlık + Sistem + Kreatif",
      title: "Karmaşayı sisteme dönüştüren stratejik teknoloji grubu.",
      subtitle:
        "Corviap Group, kurumların büyürken kontrolü kaybetmediği ve markaların pazaryerlerine bağımlı kalmadığı yapılar kurar.",
      ctaPrimary: "Keşif Görüşmesi",
      ctaSecondary: "Manifestoyu Oku",
      focusTitle: "Odak Noktamız",
      focusItems: [
        "Strateji, yazılım, marka ve kreatif icrayı tek merkezde birleştiririz.",
        "Dışa bağımlılığı azaltan sürdürülebilir sistemler kurarız.",
        "Referans odaklı büyüme ve doğru müşteri seçimiyle ilerleriz.",
      ],
      stats: [
        { value: "4", label: "Çekirdek Disiplin" },
        { value: "1", label: "Lokomotif Ürün" },
        { value: "Tek", label: "Merkezden Yönetim" },
      ],
    },
    about: {
      title: "Hakkımızda",
      subtitle:
        "Corviap Group, her işi yapan bir ajans değil; problem çözme ve sistem kurma odaklı bir danışmanlık grubudur.",
      body:
        "Kurumların karmaşık yapılarını sade, sürdürülebilir ve yönetilebilir sistemlere dönüştürürüz. Strateji, yazılım, marka ve görsel anlatımı tek aklın kontrolünde birleştirir, dışa bağımlı kalmadan ilerleriz.",
      cards: [
        {
          title: "Biz Kimiz",
          items: [
            "Danışmanlık merkezliyiz.",
            "Problem çözme odaklıyız.",
            "Strateji + sistem + kreatif icrayı tek akılda toplarız.",
          ],
        },
        {
          title: "Biz Ne Değiliz",
          items: [
            "Sadece ajans değiliz.",
            "Sadece yazılım evi değiliz.",
            "Teknik servis ya da tescil ofisi değiliz.",
          ],
        },
      ],
    },
    services: {
      title: "Çekirdek Yetkinlikler",
      subtitle:
        "Ortak marka DNA’sı ile çalışan bir yapı: strateji, yazılım, marka ve görsel anlatım tek merkezden yönetilir.",
      items: [
        {
          title: "Strateji ve Sistem Mimarisi",
          text: "Kurumsal problemleri netleştirir, sürdürülebilir iş akışları kurarız.",
        },
        {
          title: "Yazılım Geliştirme",
          text: "İş hedefleriyle uyumlu, ölçeklenebilir ürünler geliştiririz.",
        },
        {
          title: "Marka Konumlandırma",
          text: "Değer önerisini sadeleştirir, markayı pazarda netleştiririz.",
        },
        {
          title: "Görsel Anlatım ve İçerik",
          text: "Video ve görsel dil ile markanın hikayesini görünür kılarız.",
        },
      ],
    },
    solutions: {
      title: "Lokomotif Çözüm",
      subtitle:
        "Android ve iOS tabanlı e-ticaret uygulamamız, pazaryeri komisyonlarını azaltır ve doğrudan markalaşmayı destekler.",
      items: [
        {
          title: "E-Ticaret Uygulaması",
          text: "Eksiksiz çalışan, hızlı ve güvenli satış altyapısı.",
        },
        {
          title: "Komisyon Maliyetini Düşürür",
          text: "Pazaryeri bağımlılığını azaltan doğrudan kanal.",
        },
        {
          title: "Kiralama / Satış Modeli",
          text: "İhtiyaca göre esnek lisanslama seçenekleri.",
        },
        {
          title: "Marka Kontrolü",
          text: "Müşteri verisi ve deneyimi markanın elinde kalır.",
        },
      ],
    },
    manifesto: {
      title: "Çalışma Felsefemiz",
      subtitle:
        "Hızdan önce doğruluk, fiyattan önce değer, hizmetten önce deneyim.",
      items: [
        "Kısa vadeli kazanç yerine uzun vadeli yapı inşa ederiz.",
        "Kontrolsüz büyüme, dağınık dijital yapı ve markalaşamama problemlerini çözeriz.",
        "Lokomotif ürün → sürdürülebilir nakit akışı → referans projeler → danışmanlık gücü → marka otoritesi.",
      ],
    },
    blog: {
      title: "Blog",
      subtitle:
        "Sistem kurmak, büyümeyi kontrol etmek ve markalaşma üzerine güncel notlar.",
      posts: [
        {
          tag: "Manifesto",
          title: "Kimliğimiz: Danışmanlık Merkezli Sistem Kurucusu",
          excerpt:
            "Corviap Group, kurumların karmaşasını sadeleştirir; strateji ve uygulamayı tek merkezde buluşturur.",
          date: "Şubat 2026",
        },
        {
          tag: "Büyüme",
          title: "Lokomotif Ürün ile Sürdürülebilir Büyüme",
          excerpt:
            "Doğru ürün, doğru referans ve doğru müşteri üçlüsüyle otorite inşa edilir.",
          date: "Şubat 2026",
        },
        {
          tag: "E-Ticaret",
          title: "Pazaryerinden Markaya Geçiş Stratejisi",
          excerpt:
            "Komisyon yükünü azaltan doğrudan kanal, markanın kontrolünü güçlendirir.",
          date: "Şubat 2026",
        },
      ],
    },
    contact: {
      title: "İletişim",
      subtitle:
        "Corviap Group ile tanışın. Kısa bir keşif görüşmesiyle başlayalım.",
      phoneLabel: "Telefon",
      emailLabel: "E-posta",
      addressLabel: "Adres",
      phone: "+90 (544) 606 20 34",
      email: "info@corviap.com",
      address: "İstanbul, Türkiye",
      cta: "Randevu Al",
      formSending: "Gçnderiliyor...",
      formSuccess: "Mesajınız gönderildi. Teşekkürler.",
      formError: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
    },
    footer: "Corviap Group. Tüm hakları saklıdır.",
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      solutions: "Solutions",
      blog: "Blog",
      contact: "Contact",
    },
    hero: {
      pill: "Consulting + Systems + Creative",
      title: "A strategic technology group that turns complexity into systems.",
      subtitle:
        "Corviap Group builds structures where organizations grow without losing control and brands stop depending on marketplaces.",
      ctaPrimary: "Discovery Call",
      ctaSecondary: "Read the Manifesto",
      focusTitle: "Our Focus",
      focusItems: [
        "We unite strategy, software, brand, and creative execution under one mind.",
        "We design sustainable systems that reduce external dependency.",
        "We grow through the right references and the right clients.",
      ],
      stats: [
        { value: "4", label: "Core Disciplines" },
        { value: "1", label: "Flagship Product" },
        { value: "Single", label: "Command Center" },
      ],
    },
    about: {
      title: "About Us",
      subtitle:
        "Corviap Group is not an agency for everything; we are a consulting group focused on solving problems and building systems.",
      body:
        "We transform complex organizational structures into simple, sustainable, and manageable systems. Strategy, software, branding, and visual storytelling move under one direction, without external dependency.",
      cards: [
        {
          title: "Who We Are",
          items: [
            "Consulting-centered.",
            "Problem-solving oriented.",
            "Strategy + systems + creative delivery under one leadership.",
          ],
        },
        {
          title: "Who We Are Not",
          items: [
            "Not just an agency.",
            "Not only a software house.",
            "Not a technical service or registration office.",
          ],
        },
      ],
    },
    services: {
      title: "Core Capabilities",
      subtitle:
        "A unified brand DNA: strategy, software, branding, and visual storytelling managed from a single center.",
      items: [
        {
          title: "Strategy & System Architecture",
          text: "Clarify real problems and build sustainable workflows.",
        },
        {
          title: "Software Development",
          text: "Build scalable products aligned with business goals.",
        },
        {
          title: "Brand Positioning",
          text: "Simplify the value proposition and sharpen market focus.",
        },
        {
          title: "Visual Storytelling",
          text: "Make the brand visible with strong visuals and video.",
        },
      ],
    },
    solutions: {
      title: "Flagship Solution",
      subtitle:
        "Our Android and iOS commerce app reduces marketplace commissions and enables direct brand growth.",
      items: [
        {
          title: "E-commerce Application",
          text: "Full-stack sales experience that is fast and secure.",
        },
        {
          title: "Lower Commission Costs",
          text: "A direct channel that reduces marketplace dependency.",
        },
        {
          title: "Rental / Sales Model",
          text: "Flexible licensing options based on your needs.",
        },
        {
          title: "Brand Control",
          text: "Customer data and experience stay with the brand.",
        },
      ],
    },
    manifesto: {
      title: "How We Work",
      subtitle: "Accuracy before speed, value before price, experience before service.",
      items: [
        "We build long-term structures instead of short-term wins.",
        "We solve uncontrolled growth, fragmented digital structures, and weak branding.",
        "Flagship product → sustainable cash flow → reference projects → consulting power → brand authority.",
      ],
    },
    blog: {
      title: "Blog",
      subtitle:
        "Notes on building systems, controlling growth, and owning the brand.",
      posts: [
        {
          tag: "Manifesto",
          title: "Our Identity: A Consulting-Led System Builder",
          excerpt:
            "Corviap Group simplifies complexity by aligning strategy and execution.",
          date: "February 2026",
        },
        {
          tag: "Growth",
          title: "Sustainable Growth with a Flagship Product",
          excerpt:
            "Authority is built through the right product, references, and clients.",
          date: "February 2026",
        },
        {
          tag: "Commerce",
          title: "From Marketplace to Brand Ownership",
          excerpt:
            "Direct channels reduce commission pressure and strengthen brand control.",
          date: "February 2026",
        },
      ],
    },
    contact: {
      title: "Contact",
      subtitle:
        "Meet Corviap Group. Start with a short discovery session.",
      phoneLabel: "Phone",
      emailLabel: "Email",
      addressLabel: "Address",
      phone: "+90 (544) 606 20 34",
      email: "info@corviap.com",
      address: "Istanbul, Turkey",
      cta: "Book a Call",
      formSending: "Sending...",
      formSuccess: "Your message has been sent. Thank you.",
      formError: "Message could not be sent. Please try again.",
    },
    footer: "Corviap Group. All rights reserved.",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formErrorMessage, setFormErrorMessage] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  const t = useMemo(() => content[lang], [lang]);

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "solutions", label: t.nav.solutions },
    { id: "blog", label: t.nav.blog },
    { id: "contact", label: t.nav.contact },
  ];

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formStatus !== "idle") {
      setFormStatus("idle");
    }
    if (formErrorMessage) {
      setFormErrorMessage("");
    }
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formStatus === "sending") {
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "Contact request failed");
      }

      setFormData({ name: "", email: "", message: "" });
      setFormErrorMessage("");
      setFormStatus("success");
    } catch (error) {
      setFormErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : t.contact.formError
      );
      setFormStatus("error");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg nav-glass fixed-top">
        <div className="container">
          <a className="navbar-brand nav-brand text-uppercase" href="#home">
            CORVIAP
          </a>
          <button
            className="btn btn-outline-accent d-lg-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            type="button"
          >
            {lang === "tr" ? "Menü" : "Menu"}
          </button>
          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav ms-auto mb-3 mb-lg-0 gap-lg-3">
              {navItems.map((item) => (
                <li className="nav-item" key={item.id}>
                  <a
                    className="nav-link"
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="d-flex flex-column flex-lg-row gap-2 align-items-lg-center ms-lg-3">
              <div className="toggle-group">
                <button
                  className={`toggle-btn ${lang === "tr" ? "active" : ""}`}
                  onClick={() => setLang("tr")}
                  aria-label="Türkçe"
                  aria-pressed={lang === "tr"}
                  title="Türkçe"
                  type="button"
                >
                  <Image
                    src="/tr.png"
                    alt=""
                    width={22}
                    height={22}
                    className="toggle-icon"
                    aria-hidden="true"
                  />
                </button>
                <button
                  className={`toggle-btn ${lang === "en" ? "active" : ""}`}
                  onClick={() => setLang("en")}
                  aria-label="English"
                  aria-pressed={lang === "en"}
                  title="English"
                  type="button"
                >
                  <Image
                    src="/en.png"
                    alt=""
                    width={22}
                    height={22}
                    className="toggle-icon"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="toggle-group">
                <button
                  className={`toggle-btn ${theme === "light" ? "active" : ""}`}
                  onClick={() => setTheme("light")}
                  aria-label="Light theme"
                  aria-pressed={theme === "light"}
                  title="Light theme"
                  type="button"
                >
                  <Image
                    src="/sun.png"
                    alt=""
                    width={20}
                    height={20}
                    className="toggle-icon"
                    aria-hidden="true"
                  />
                </button>
                <button
                  className={`toggle-btn ${theme === "dark" ? "active" : ""}`}
                  onClick={() => setTheme("dark")}
                  aria-label="Dark theme"
                  aria-pressed={theme === "dark"}
                  title="Dark theme"
                  type="button"
                >
                  <Image
                    src="/moon.png"
                    alt=""
                    width={20}
                    height={20}
                    className="toggle-icon"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <section id="home" className="section section-hero">
          <div className="container-fluid p-0">
            <div className="hero hero-full d-flex align-items-center justify-content-center text-center p-4 p-lg-5">
              <div className="hero-content hero-center">
                <span className="hero-pill">{t.hero.pill}</span>
                <h1 className="display-5 fw-bold font-display mt-4">
                  {t.hero.title}
                </h1>
                <p className="fs-5 text-muted-soft mt-3">
                  {t.hero.subtitle}
                </p>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
                  <a className="btn btn-accent" href="#contact">
                    {t.hero.ctaPrimary}
                  </a>
                  <a className="btn btn-outline-accent" href="#blog">
                    {t.hero.ctaSecondary}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-muted">
          <div className="container">
            <div className="row g-4 align-items-start">
              <div className="col-lg-6">
                <h3 className="section-title font-display">
                  {t.hero.focusTitle}
                </h3>
                <div className="highlight-list mt-3">
                  {t.hero.focusItems.map((item) => (
                    <div className="highlight-item" key={item}>
                      <span className="highlight-dot" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row g-3">
                  {t.hero.stats.map((stat) => (
                    <div className="col-md-4" key={stat.label}>
                      <div className="stat-tile text-center h-100">
                        <div className="fw-bold fs-3 accent-text">
                          {stat.value}
                        </div>
                        <div className="text-muted-soft">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section section-muted">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <Image
                  src="/sirket.jpeg"
                  alt="Corviap team"
                  width={640}
                  height={480}
                  className="rounded-4 shadow-lg"
                />
              </div>
              <div className="col-lg-6">
                <h2 className="section-title font-display">{t.about.title}</h2>
                <p className="section-subtitle">{t.about.subtitle}</p>
                <p className="mt-3">{t.about.body}</p>
                <div className="row g-3 mt-4">
                  {t.about.cards.map((card) => (
                    <div className="col-md-6" key={card.title}>
                      <div className="hero-card h-100">
                        <h6 className="fw-semibold mb-3">{card.title}</h6>
                        <div className="highlight-list">
                          {card.items.map((item) => (
                            <div className="highlight-item" key={item}>
                              <span className="highlight-dot" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="row align-items-end g-4 mb-4">
              <div className="col-lg-6">
                <h2 className="section-title font-display">
                  {t.services.title}
                </h2>
                <p className="section-subtitle">{t.services.subtitle}</p>
              </div>
              <div className="col-lg-6 text-lg-end">
                <span className="hero-pill">{t.hero.pill}</span>
              </div>
            </div>
            <div className="row g-4">
              {t.services.items.map((item, index) => (
                <div className="col-md-6 col-lg-3" key={item.title}>
                  <div className="service-card">
                    <div className="service-icon mb-3">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h6 className="fw-semibold">{item.title}</h6>
                    <p className="text-muted-soft mb-0">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="solutions" className="section section-muted">
          <div className="container">
            <div className="row align-items-end g-4 mb-4">
              <div className="col-lg-6">
                <h2 className="section-title font-display">
                  {t.solutions.title}
                </h2>
                <p className="section-subtitle">{t.solutions.subtitle}</p>
              </div>
              <div className="col-lg-6 text-lg-end">
                <span className="hero-pill">
                  {lang === "tr" ? "Müşteri Çözümleri" : "Client Solutions"}
                </span>
              </div>
            </div>
            <div className="row g-4">
              {t.solutions.items.map((item) => (
                <div className="col-md-6 col-lg-3" key={item.title}>
                  <div className="solution-card">
                    <h6 className="fw-semibold">{item.title}</h6>
                    <p className="text-muted-soft mb-0">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-5">
                <h2 className="section-title font-display">
                  {t.manifesto.title}
                </h2>
                <p className="section-subtitle">{t.manifesto.subtitle}</p>
              </div>
              <div className="col-lg-7">
                <div className="highlight-list">
                  {t.manifesto.items.map((item) => (
                    <div className="highlight-item" key={item}>
                      <span className="highlight-dot" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="blog" className="section section-muted">
          <div className="container">
            <div className="row align-items-end g-4 mb-4">
              <div className="col-lg-6">
                <h2 className="section-title font-display">{t.blog.title}</h2>
                <p className="section-subtitle">{t.blog.subtitle}</p>
              </div>
              <div className="col-lg-6 text-lg-end">
                <a className="btn btn-outline-accent" href="#contact">
                  {t.contact.cta}
                </a>
              </div>
            </div>
            <div className="row g-4">
              {t.blog.posts.map((post) => (
                <div className="col-md-6 col-lg-4" key={post.title}>
                  <div className="blog-card">
                    <div className="blog-meta">{post.tag}</div>
                    <h6 className="fw-semibold mt-2">{post.title}</h6>
                    <p className="text-muted-soft">{post.excerpt}</p>
                    <div className="blog-meta">{post.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6">
                <h2 className="section-title font-display">
                  {t.contact.title}
                </h2>
                <p className="section-subtitle">{t.contact.subtitle}</p>
                <div className="divider" />
                <div className="contact-card">
                  <div className="mb-3">
                    <div className="text-muted-soft">{t.contact.phoneLabel}</div>
                    <div className="contact-link">{t.contact.phone}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-muted-soft">{t.contact.emailLabel}</div>
                    <div className="contact-link">{t.contact.email}</div>
                  </div>
                  <div>
                    <div className="text-muted-soft">
                      {t.contact.addressLabel}
                    </div>
                    <div>{t.contact.address}</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact-card">
                  <h5 className="fw-semibold mb-3">{t.contact.cta}</h5>
                  <form className="d-grid gap-3" onSubmit={handleContactSubmit}>
                    <input
                      className="form-control"
                      name="name"
                      placeholder={lang === "tr" ? "Ad Soyad" : "Full Name"}
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      disabled={formStatus === "sending"}
                    />
                    <input
                      className="form-control"
                      name="email"
                      placeholder={lang === "tr" ? "E-posta" : "Email"}
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      disabled={formStatus === "sending"}
                    />
                    <textarea
                      className="form-control"
                      name="message"
                      placeholder={lang === "tr" ? "Mesajınız" : "Your Message"}
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      disabled={formStatus === "sending"}
                    />
                    <button
                      className="btn btn-accent"
                      type="submit"
                      disabled={formStatus === "sending"}
                    >
                      {formStatus === "sending" ? t.contact.formSending : t.contact.cta}
                    </button>
                    {formStatus === "success" ? (
                      <p className="mb-0 text-success" aria-live="polite">
                        {t.contact.formSuccess}
                      </p>
                    ) : null}
                    {formStatus === "error" ? (
                      <p className="mb-0 text-danger" aria-live="polite">
                        {formErrorMessage || t.contact.formError}
                      </p>
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
          <div className="nav-brand text-uppercase">CORVIAP</div>
          <div>{t.footer}</div>
        </div>
      </footer>
    </div>
  );
}
