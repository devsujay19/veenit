"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// ─── Reusable section reveal wrapper ─────────────────────────────────
function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="section-label" style={{ marginBottom: "24px" }}>
      <span className="gold-line" />
      {text}
    </div>
  );
}

function GoldDivider() {
  return (
    <div
      style={{
        width: "40px",
        height: "1px",
        background: "linear-gradient(90deg, #C5A46D, transparent)",
        margin: "28px 0",
      }}
    />
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ApproachSection />
      <ClosingCTA />
    </main>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#0B0B0D",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(197,164,109,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "120px 32px 80px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left — text */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-label"
            style={{ marginBottom: "36px" }}
          >
            <span className="gold-line" />
            Forex &amp; Stock Market Trader
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.8rem, 5.5vw, 4.75rem)",
              fontWeight: 400,
              lineHeight: 1.08,
              color: "#F5F2EC",
              letterSpacing: "-0.01em",
              marginBottom: "28px",
            }}
          >
            Understanding
            <br />
            <em style={{ fontStyle: "italic", color: "#C5A46D" }}>Markets.</em>
            <br />
            Building Better
            <br />
            Decisions.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.35 }}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "1rem",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#A5A19A",
              maxWidth: "440px",
              marginBottom: "44px",
            }}
          >
            Helping individuals understand financial markets, develop trading
            knowledge, and navigate stock and forex opportunities with greater
            confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.5 }}
            style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
          >
            <a
              href="#expertise"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: "#C5A46D",
                color: "#0B0B0D",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "1px",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#D4B882";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#C5A46D";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Explore My Expertise
            </a>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: "transparent",
                color: "#F5F2EC",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "1px",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#C5A46D";
                (e.currentTarget as HTMLElement).style.color = "#C5A46D";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                (e.currentTarget as HTMLElement).style.color = "#F5F2EC";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>

        {/* Right — portrait */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          style={{ position: "relative", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              position: "absolute",
              top: "-16px",
              left: "0",
              zIndex: 2,
              backgroundColor: "#0B0B0D",
              padding: "6px 14px",
              border: "1px solid rgba(197, 164, 109, 0.2)",
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "0.55rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                color: "#C5A46D",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Market Knowledge&nbsp;&bull;&nbsp;Trading&nbsp;&bull;&nbsp;Guidance
            </p>
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "460px",
              aspectRatio: "3/4",
              border: "1px solid rgba(197, 164, 109, 0.22)",
              padding: "6px",
              borderRadius: "2px",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-1px",
                right: "-1px",
                width: "30px",
                height: "30px",
                borderTop: "1.5px solid #C5A46D",
                borderRight: "1.5px solid #C5A46D",
                zIndex: 2,
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "-1px",
                left: "-1px",
                width: "30px",
                height: "30px",
                borderBottom: "1.5px solid #C5A46D",
                borderLeft: "1.5px solid #C5A46D",
                zIndex: 2,
              }}
            />

            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "1px",
                backgroundColor: "#121214",
              }}
            >
              <Image
                src="/veenit-deshmukh.jpg"
                alt="Veenit Deshmukh — Forex and Stock Market Trader"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 460px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding: 100px 20px 60px !important;
          }
          .hero-grid > div:first-child { order: 2; }
          .hero-grid > div:last-child { order: 1; }
        }
      `}</style>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      id="about"
      style={{ backgroundColor: "#121214", padding: "120px 32px" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
          className="about-grid"
        >
          <div>
            <Reveal>
              <SectionLabel text="About Veenit" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2.4rem, 4vw, 3.75rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: "#F5F2EC",
                  letterSpacing: "-0.01em",
                }}
              >
                Beyond
                <br />
                <em style={{ fontStyle: "italic", color: "#C5A46D" }}>the Charts.</em>
              </h2>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.15}>
              <GoldDivider />
            </Reveal>
            <Reveal delay={0.2}>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "1.0625rem",
                  fontWeight: 400,
                  lineHeight: 1.85,
                  color: "#A5A19A",
                  marginBottom: "24px",
                }}
              >
                Financial markets can feel overwhelming, especially when
                you&apos;re just getting started. My focus is on helping
                individuals understand how markets work, learn the fundamentals
                of trading, and explore opportunities across forex and equities.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "1.0625rem",
                  fontWeight: 400,
                  lineHeight: 1.85,
                  color: "#A5A19A",
                }}
              >
                Whether you&apos;re beginning your journey or looking to develop
                a deeper understanding of the markets, I aim to make financial
                concepts easier to grasp through practical insights and
                thoughtful guidance.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── EXPERTISE ────────────────────────────────────────────────────────
const expertise = [
  {
    num: "01",
    title: "Forex Markets",
    description:
      "Understanding currency markets, forex fundamentals, market movements, and trading concepts for those looking to navigate the world of foreign exchange.",
  },
  {
    num: "02",
    title: "Stock Market",
    description:
      "Exploring equities, understanding market behaviour, analysing stocks, and learning investment fundamentals across domestic and global markets.",
  },
  {
    num: "03",
    title: "Trading Education & Guidance",
    description:
      "Helping individuals learn trading concepts, understand market opportunities, and develop a more informed approach to financial decisions.",
  },
];

function ExpertiseSection() {
  return (
    <section id="expertise" style={{ backgroundColor: "#0B0B0D", padding: "120px 32px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "80px",
            gap: "24px",
          }}
        >
          <div>
            <Reveal>
              <SectionLabel text="What I Do" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2.4rem, 4vw, 3.75rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: "#F5F2EC",
                  letterSpacing: "-0.01em",
                }}
              >
                Areas of{" "}
                <em style={{ fontStyle: "italic", color: "#C5A46D" }}>Expertise.</em>
              </h2>
            </Reveal>
          </div>
        </div>

        <div>
          {expertise.map((item, i) => (
            <ExpertiseItem key={item.num} item={item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseItem({ item, delay }: { item: (typeof expertise)[0]; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay }}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr auto",
        gap: "0 32px",
        alignItems: "start",
        padding: "40px 0",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.3s ease",
      }}
      className="expertise-row"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderTopColor = "rgba(197,164,109,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderTopColor = "rgba(255,255,255,0.07)";
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "1rem",
          fontWeight: 400,
          color: "#C5A46D",
          letterSpacing: "0.1em",
          paddingTop: "6px",
        }}
      >
        {item.num}
      </span>

      <div>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            fontWeight: 400,
            color: "#F5F2EC",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
            marginBottom: "14px",
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "0.9375rem",
            fontWeight: 400,
            lineHeight: 1.75,
            color: "#A5A19A",
            maxWidth: "580px",
          }}
        >
          {item.description}
        </p>
      </div>

      <div
        style={{
          alignSelf: "center",
          width: "24px",
          height: "1px",
          backgroundColor: "#C5A46D",
          opacity: 0.3,
          transition: "opacity 0.3s ease",
        }}
        className="expertise-accent"
      />

      <style>{`
        .expertise-row:hover .expertise-accent { opacity: 1; }
        @media (max-width: 600px) {
          .expertise-row { grid-template-columns: 48px 1fr !important; }
          .expertise-accent { display: none; }
        }
      `}</style>
    </motion.div>
  );
}

// ─── APPROACH ─────────────────────────────────────────────────────────
const principles = [
  {
    num: "01",
    title: "Understand the Market",
    body: "Learn the fundamentals before making financial decisions. A clear understanding of how markets behave is the foundation of everything.",
  },
  {
    num: "02",
    title: "Research & Analysis",
    body: "Develop an understanding of market movements and available opportunities through consistent study and informed observation.",
  },
  {
    num: "03",
    title: "Informed Decisions",
    body: "Approach trading and investing with an awareness of uncertainty and risk, making decisions grounded in knowledge rather than impulse.",
  },
];

function ApproachSection() {
  return (
    <section id="approach" style={{ backgroundColor: "#121214", padding: "120px 32px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <SectionLabel text="My Approach" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.4rem, 4vw, 3.75rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#F5F2EC",
              letterSpacing: "-0.01em",
              marginBottom: "72px",
            }}
          >
            Knowledge Before{" "}
            <em style={{ fontStyle: "italic", color: "#C5A46D" }}>Decisions.</em>
          </h2>
        </Reveal>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }}
          className="principles-grid"
        >
          {principles.map((p, i) => (
            <Reveal key={p.num} delay={0.1 * i}>
              <div
                style={{
                  padding: "0 40px 0 0",
                  borderRight: i < principles.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  marginRight: i < principles.length - 1 ? "40px" : "0",
                }}
                className="principle-item"
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "0.875rem",
                    color: "#C5A46D",
                    letterSpacing: "0.1em",
                    marginBottom: "20px",
                  }}
                >
                  {p.num}
                </p>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "#F5F2EC",
                    lineHeight: 1.25,
                    marginBottom: "16px",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    lineHeight: 1.75,
                    color: "#A5A19A",
                  }}
                >
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .principles-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .principle-item {
            padding: 0 0 40px 0 !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            margin-right: 0 !important;
          }
          .principle-item:last-child { border-bottom: none; padding-bottom: 0 !important; }
        }
      `}</style>
    </section>
  );
}

// ─── CLOSING CTA ──────────────────────────────────────────────────────
function ClosingCTA() {
  return (
    <section
      style={{
        backgroundColor: "#0B0B0D",
        padding: "120px 32px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(197,164,109,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div
            style={{
              width: "1px",
              height: "60px",
              backgroundColor: "rgba(197,164,109,0.3)",
              margin: "0 auto 40px",
            }}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#F5F2EC",
              letterSpacing: "-0.01em",
              marginBottom: "24px",
            }}
          >
            Let&apos;s Talk{" "}
            <em style={{ fontStyle: "italic", color: "#C5A46D" }}>Markets.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "1rem",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#A5A19A",
              marginBottom: "44px",
            }}
          >
            Have questions about trading, forex, or the stock market? I&apos;d
            be happy to hear from you.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "16px 44px",
              backgroundColor: "#C5A46D",
              color: "#0B0B0D",
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "1px",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#D4B882";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#C5A46D";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Get In Touch
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
