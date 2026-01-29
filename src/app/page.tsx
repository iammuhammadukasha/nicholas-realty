'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [heroHovered, setHeroHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    estateType: 'Probate Sale',
  });

  const testimonials = [
    {
      text: 'What an awesome experience working with Nick. Nick helped us sell our recent home and purchase our future forever home',
      author: 'Randy Madrid',
      date: '2021-09-23',
      rating: 4,
    },
    {
      text: 'Professional, knowledgeable, and incredibly helpful throughout the entire probate process. Highly recommended!',
      author: 'Sarah Johnson',
      date: '2022-03-15',
      rating: 5,
    },
    {
      text: 'Nicholas Realty made a difficult time much easier. Their expertise in probate sales is unmatched.',
      author: 'Michael Chen',
      date: '2022-07-22',
      rating: 5,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Thank you ${formData.name}! We'll contact you at ${formData.email} soon.`,
    );
    setFormData({ name: '', email: '', estateType: 'Probate Sale' });
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setParallaxOffset(window.scrollY);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">
                <img
                  src="/NR_LOGO-e1756206232230.png"
                  alt="Nicholas Realty"
                  className="brand-logo"
                />
              </div>
              <div className="logo-text">
                <span className="logo-text-dark">NICHOLAS</span>
                <span className="logo-text-blue"> REALTY</span>
              </div>
            </div>
            <div className="nav-links">
              <a href="#home">Home</a>
              <a href="#about">About Us</a>
              <a href="#expertise">Expertise</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#cleanout">Clean-Out</a>
              <a href="#advisor">AI Advisor</a>
              <button className="nav-cta" type="button">
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Parallax + Image */}
      <section
        id="home"
        className="hero"
        onMouseEnter={() => setHeroHovered(true)}
        onMouseLeave={() => setHeroHovered(false)}
      >
        <div
          className="hero-image"
          style={{
            transform: `translateY(${parallaxOffset * 0.25}px) scale(${heroHovered ? 1.08 : 1})`,
          }}
          aria-hidden
        >
          <img
            src="/NIcholas-Realty-scaled-1.webp"
            alt=""
            className="hero-image-img"
            fetchPriority="high"
          />
        </div>
        <div
          className="hero-parallax-deep"
          style={{ transform: `translateY(${parallaxOffset * 0.15}px)` }}
          aria-hidden
        />
        <div className="hero-background" aria-hidden />
        <div className="hero-overlay" aria-hidden />
        <div className="container">
          <div
            className="hero-content"
            style={{ transform: `translateY(${parallaxOffset * 0.08}px)` }}
          >
            <div className="hero-badge">
              <span className="badge-dot"></span>
              LEGACY PROTECTION EXPERTS
            </div>
            <h1 className="hero-title">
              <span className="hero-title-black">Nicholas</span>
              <span className="hero-title-blue">Realty.</span>
            </h1>
            <p className="hero-subtitle">
              Providing specialized guidance for <strong>Probate & Trust</strong> real estate
              transactions.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" type="button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Consult an Expert
              </button>
              <button className="btn-secondary" type="button">
                View Case Studies
              </button>
            </div>
            <div className="scroll-indicator">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <div className="image-placeholder">
                <img
                  src="/NickCaudillo-929-Edit-768x960.webp"
                  alt="Nicholas Realty - Professional Real Estate Expert"
                  className="about-person-image"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="image-overlay">
                  <div className="overlay-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                  </div>
                  <div className="overlay-text">
                    <div className="overlay-number">20+</div>
                    <div className="overlay-label">YEARS OF PROBATE</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-text">
              <div className="section-label-blue">• ABOUT US</div>
              <h2 className="about-title">
                <span className="title-black">Nicholas</span> <span className="title-blue">Realty.</span>
              </h2>
              <p className="about-description">
                Nicholas Realty is an independent probate real estate agent/brokerage with more than 20 years of experience specializing in probate real estate sales.
              </p>
              <p className="about-description-light">
                We understand the unique challenges and responsibilities faced by executors and administrators, and are committed to delivering exceptional customer service. Personalized to the specific needs of the family and the estate.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <div className="feature-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Executor & Administrator Focus</span>
                </div>
                <div className="about-feature">
                  <div className="feature-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Personalized Estate Care</span>
                </div>
                <div className="about-feature">
                  <div className="feature-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Licensed CA Brokerage</span>
                </div>
                <div className="about-feature">
                  <div className="feature-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Expert Negotiation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="expertise" className="expertise-section">
        <div className="container">
          <div className="expertise-header">
            <div className="expertise-header-left">
              <div className="section-label">OUR EXPERTISE</div>
              <h2 className="section-title">
                <span className="title-black">What</span> <span className="title-blue">We Do.</span>
              </h2>
              <p className="section-description">
                We provide a comprehensive suite of real estate solutions designed to navigate the
                complexities of estate liquidation with dignity and precision.
              </p>
            </div>
            <div className="expertise-tag">Probate & Trust Specialists</div>
          </div>
          <div className="expertise-cards">
            <div className="expertise-card">
              <div className="expertise-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3>Probate Sales</h3>
              <p>
                Specialized representation for executors. We handle the unique legal requirements
                and court-mandated disclosures of probate real estate.
              </p>
              <div className="card-accent"></div>
            </div>
            <div className="expertise-card">
              <div className="expertise-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3>Trust Administration</h3>
              <p>
                Expert guidance for trustees in liquidating real estate assets while maintaining
                fiduciary responsibilities and maximizing value for beneficiaries.
              </p>
              <div className="card-accent"></div>
            </div>
            <div className="expertise-card">
              <div className="expertise-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>Estate Valuation</h3>
              <p>
                Professional market analysis and appraisals specifically tailored for date-of-death
                tax basis and equitable distribution among heirs.
              </p>
              <div className="card-accent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </div>
              <h3>Asset Locating</h3>
              <p>
                Assisting administrators in identifying and assessing all real property assets
                within an estate, including those in remote locations.
              </p>
              <div className="feature-accent"></div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Family Mediation</h3>
              <p>
                Serving as a neutral third party to help multiple heirs reach a consensus on the
                sale terms, price, and timing of estate properties.
              </p>
              <div className="feature-accent"></div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3>Market Preparation</h3>
              <p>
                Strategic advice on which repairs or improvements will yield the highest return for
                the estate before hitting the open market.
              </p>
              <div className="feature-accent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="testimonials-header">
            <div className="testimonials-label">OUR CUSTOMERS</div>
            <h2 className="testimonials-title">
              <span className="title-black">Testimonials</span>{' '}
              <span className="title-blue">From Our Clients.</span>
            </h2>
            <div className="testimonials-underline"></div>
          </div>
          <div className="testimonials-carousel">
            <button className="carousel-arrow carousel-arrow-left" onClick={prevTestimonial} type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <div className="testimonial-stars">
                {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => (
                  <span key={i} className="star-filled">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - testimonials[testimonialIndex].rating }).map((_, i) => (
                  <span key={i} className="star-outline">
                    ☆
                  </span>
                ))}
              </div>
              <p className="testimonial-text">{testimonials[testimonialIndex].text}</p>
              <div className="testimonial-divider"></div>
              <div className="testimonial-author">
                <div className="author-name">{testimonials[testimonialIndex].author}</div>
                <div className="author-date">{testimonials[testimonialIndex].date}</div>
              </div>
            </div>
            <button className="carousel-arrow carousel-arrow-right" onClick={nextTestimonial} type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          <div className="testimonials-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === testimonialIndex ? 'active' : ''}`}
                onClick={() => setTestimonialIndex(index)}
                type="button"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Use Section */}
      <section className="why-use-section">
        <div className="container">
          <div className="why-use-card">
            <div className="why-use-content">
              <div className="why-use-header">
                <div className="why-use-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h2 className="why-use-title">Why Use Nicholas Realty?</h2>
              </div>
              <p className="why-use-text">
                Probate, trust sales, and conservatorship transactions are <strong>complex</strong>{' '}
                and require special expertise to manage successfully.
              </p>
              <p className="why-use-text-light">
                It&apos;s not a job for your average realtor, who focuses on traditional sales and
                may not grasp the intricacies of these processes. At Nicholas Realty, we are your
                go-to probate real estate agent.
              </p>
              <div className="why-use-quote">
                Our team can explain the process clearly and completely, designing a customized
                sales strategy to meet your goals and{' '}
                <strong className="quote-highlight">expedite your sale.</strong>
              </div>
              <button className="btn-explore" type="button">
                Explore Our Strategy
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            <div className="why-use-callout">
              <div className="callout-header">SPECIALIZED KNOWLEDGE</div>
              <p className="callout-text">
                We understand the special requirements related to court proceedings, disclosures,
                and listing agreements for probate, trust, and conservatorship real properties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean-Out Services Section */}
      <section id="cleanout" className="cleanout-section">
        <div className="container">
          <div className="cleanout-content">
            <div className="cleanout-badge">
              <span className="badge-icon">✨</span>
              STRESS-FREE ESTATES
            </div>
            <h2 className="cleanout-title">
              Property <span className="title-blue">Clean-Out</span> Services
              <span className="title-sparkle">✨</span>
            </h2>
            <p className="cleanout-description">
              Handling a probate property can be overwhelming — especially if you&apos;re not nearby. That&apos;s why we offer professional clean-out services, making the process stress-free for you. From furniture removal to deep cleaning, we handle it all so you don&apos;t have to.
            </p>
            <div className="cleanout-cards">
              <div className="cleanout-card">
                <div className="cleanout-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"></path>
                  </svg>
                </div>
                <h3>Full Removal</h3>
                <p>Furniture, appliances, and clutter handled with care.</p>
              </div>
              <div className="cleanout-card">
                <div className="cleanout-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h3>Deep Cleaning</h3>
                <p>Market-ready standards for every room in the house.</p>
              </div>
              <div className="cleanout-card">
                <div className="cleanout-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3>Fast Turnaround</h3>
                <p>Reliable scheduling to meet critical legal deadlines.</p>
              </div>
            </div>
            <button className="btn-cleanout" type="button">
              Book a Professional Clean-Out
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-left">
              <h2 className="contact-title">
                Ready to Secure Your <span className="title-blue">Family Legacy?</span>
              </h2>
              <p className="contact-subtitle">
                Professional guidance for complex estate matters. Let us handle the details while you focus on what matters most.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-label">CALL US</div>
                    <div className="contact-value">866 917 4001</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-label">EMAIL US</div>
                    <div className="contact-value">nick@nrprobate.com</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="10" r="3"></circle>
                      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-label">OFFICE LOCATION</div>
                    <div className="contact-value">440 E. Huntington Dr. #300, Arcadia, CA 91006</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>FULL NAME</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ESTATE TYPE</label>
                  <select
                    value={formData.estateType}
                    onChange={(e) => setFormData({ ...formData, estateType: e.target.value })}
                  >
                    <option>Probate Sale</option>
                    <option>Trust Administration</option>
                    <option>Conservatorship</option>
                    <option>General Listing</option>
                  </select>
                </div>
                <button type="submit" className="btn-consultation">
                  Book My Consultation
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <img
                    src="/NR_LOGO-e1756206232230.png"
                    alt="Nicholas Realty"
                    className="brand-logo"
                  />
                </div>
                <span className="footer-logo-text">NICHOLAS REALTY</span>
              </div>
              <p className="footer-description">
                A Specialized Probate and Trust Brokerage dedicated to providing professional,
                sensitive, and effective real estate solutions for complex estates.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Contact Details</h4>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="10" r="3"></circle>
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
                </svg>
                <span>440 E. Huntington Dr. #300, Arcadia, CA 91006</span>
              </div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>866 917 4001</span>
              </div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>nick@nrprobate.com</span>
              </div>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Expertise</h4>
              <a href="#expertise">Probate Property Sales</a>
              <a href="#expertise">Trust Asset Liquidation</a>
              <a href="#expertise">Conservatorship Sales</a>
              <a href="#cleanout">Estate Clean-Outs</a>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Advisor Access</h4>
              <p className="footer-advisor-text">Talk to our AI specialist about your probate questions.</p>
              <button className="btn-advisor" type="button">
                Consult AI Advisor
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

