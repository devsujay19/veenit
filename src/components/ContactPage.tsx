"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ─── Validation Schema ────────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  subject: z.string().min(3, "Please enter a subject."),
  message: z.string().min(10, "Please enter a message (at least 10 characters)."),
  honeypot: z.string().max(0, "Bot detected."),
});

type FormData = z.infer<typeof schema>;

// ─── Helpers ──────────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="section-label" style={{ marginBottom: "24px" }}>
      <span className="gold-line" />
      {text}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────
export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      reset();
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#171719",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "2px",
    padding: "14px 18px",
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: "0.9375rem",
    fontWeight: 400,
    color: "#F5F2EC",
    outline: "none",
    transition: "border-color 0.2s ease",
    display: "block",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: "0.6875rem",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#A5A19A",
    display: "block",
    marginBottom: "8px",
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: "0.75rem",
    color: "#E07070",
    marginTop: "6px",
  };

  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "#0B0B0D",
        paddingTop: "120px",
        paddingBottom: "80px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
        {/* Page header */}
        <div style={{ marginBottom: "72px" }}>
          <Reveal>
            <SectionLabel text="Contact" />
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.8rem, 5vw, 4.75rem)",
                fontWeight: 400,
                lineHeight: 1.08,
                color: "#F5F2EC",
                letterSpacing: "-0.01em",
                marginBottom: "20px",
              }}
            >
              Let&apos;s Start a{" "}
              <em style={{ fontStyle: "italic", color: "#C5A46D" }}>
                Conversation.
              </em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "#A5A19A",
                maxWidth: "520px",
              }}
            >
              Whether you have questions about forex, stock markets, trading
              education, or collaboration, feel free to reach out.
            </p>
          </Reveal>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: "80px",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Form column */}
          <div>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: "48px",
                  border: "1px solid rgba(197,164,109,0.25)",
                  borderRadius: "2px",
                  backgroundColor: "#121214",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1px solid #C5A46D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#C5A46D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 400,
                    color: "#F5F2EC",
                    marginBottom: "12px",
                  }}
                >
                  Message Received
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "0.9375rem",
                    color: "#A5A19A",
                    lineHeight: 1.7,
                    marginBottom: "32px",
                  }}
                >
                  Thank you for reaching out. I&apos;ll get back to you as soon
                  as possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    padding: "12px 28px",
                    border: "1px solid rgba(197,164,109,0.3)",
                    borderRadius: "1px",
                    background: "transparent",
                    color: "#C5A46D",
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                style={{ display: "flex", flexDirection: "column", gap: "24px" }}
              >
                {/* Honeypot — hidden from humans */}
                <input
                  {...register("honeypot")}
                  type="text"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Row: Name + Email */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                  className="form-row"
                >
                  <div>
                    <label htmlFor="name" style={labelStyle}>
                      Full Name <span style={{ color: "#C5A46D" }}>*</span>
                    </label>
                    <input
                      {...register("name")}
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Rahul Sharma"
                      style={inputStyle}
                      onFocus={(e) =>
                        ((e.currentTarget as HTMLElement).style.borderColor =
                          "#C5A46D")
                      }
                      onBlur={(e) =>
                        ((e.currentTarget as HTMLElement).style.borderColor =
                          errors.name
                            ? "#E07070"
                            : "rgba(255,255,255,0.09)")
                      }
                    />
                    {errors.name && (
                      <p style={errorStyle}>{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>
                      Email Address <span style={{ color: "#C5A46D" }}>*</span>
                    </label>
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      style={inputStyle}
                      onFocus={(e) =>
                        ((e.currentTarget as HTMLElement).style.borderColor =
                          "#C5A46D")
                      }
                      onBlur={(e) =>
                        ((e.currentTarget as HTMLElement).style.borderColor =
                          errors.email
                            ? "#E07070"
                            : "rgba(255,255,255,0.09)")
                      }
                    />
                    {errors.email && (
                      <p style={errorStyle}>{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Row: Phone + Subject */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                  className="form-row"
                >
                  <div>
                    <label htmlFor="phone" style={labelStyle}>
                      Phone Number{" "}
                      <span style={{ color: "#A5A19A", fontSize: "0.6rem" }}>
                        (Optional)
                      </span>
                    </label>
                    <input
                      {...register("phone")}
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      style={inputStyle}
                      onFocus={(e) =>
                        ((e.currentTarget as HTMLElement).style.borderColor =
                          "#C5A46D")
                      }
                      onBlur={(e) =>
                        ((e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.09)")
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" style={labelStyle}>
                      Subject <span style={{ color: "#C5A46D" }}>*</span>
                    </label>
                    <input
                      {...register("subject")}
                      id="subject"
                      type="text"
                      placeholder="e.g. Forex Trading Question"
                      style={inputStyle}
                      onFocus={(e) =>
                        ((e.currentTarget as HTMLElement).style.borderColor =
                          "#C5A46D")
                      }
                      onBlur={(e) =>
                        ((e.currentTarget as HTMLElement).style.borderColor =
                          errors.subject
                            ? "#E07070"
                            : "rgba(255,255,255,0.09)")
                      }
                    />
                    {errors.subject && (
                      <p style={errorStyle}>{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" style={labelStyle}>
                    Message <span style={{ color: "#C5A46D" }}>*</span>
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={6}
                    placeholder="Tell me what you'd like to know..."
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "160px",
                    }}
                    onFocus={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderColor =
                        "#C5A46D")
                    }
                    onBlur={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderColor =
                        errors.message
                          ? "#E07070"
                          : "rgba(255,255,255,0.09)")
                    }
                  />
                  {errors.message && (
                    <p style={errorStyle}>{errors.message.message}</p>
                  )}
                </div>

                {/* Error */}
                {status === "error" && (
                  <div
                    style={{
                      padding: "14px 18px",
                      backgroundColor: "rgba(224,112,112,0.08)",
                      border: "1px solid rgba(224,112,112,0.25)",
                      borderRadius: "2px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: "0.875rem",
                        color: "#E07070",
                        lineHeight: 1.6,
                      }}
                    >
                      {errorMsg}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      padding: "16px 44px",
                      backgroundColor:
                        status === "loading" ? "#A5894A" : "#C5A46D",
                      color: "#0B0B0D",
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      border: "none",
                      borderRadius: "1px",
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      transition: "all 0.25s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    onMouseEnter={(e) => {
                      if (status !== "loading")
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "#D4B882";
                    }}
                    onMouseLeave={(e) => {
                      if (status !== "loading")
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "#C5A46D";
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <LoadingSpinner />
                        Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* WhatsApp section */}
            <div
              style={{
                marginTop: "48px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "0.9375rem",
                  fontWeight: 400,
                  color: "#A5A19A",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <WhatsAppIcon />
                Want to contact me directly on WhatsApp?{" "}
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#C5A46D",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#D4B882")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#C5A46D")
                  }
                >
                  Here.
                </a>
              </p>
            </div>
          </div>

          {/* Right sidebar — decorative info */}
          <div>
            <div
              style={{
                position: "sticky",
                top: "100px",
                display: "flex",
                flexDirection: "column",
                gap: "32px",
              }}
            >
              {/* Info card */}
              <div
                style={{
                  padding: "36px",
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "2px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    color: "#C5A46D",
                    textTransform: "uppercase",
                    marginBottom: "20px",
                  }}
                >
                  Response Time
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    color: "#F5F2EC",
                    lineHeight: 1.3,
                    marginBottom: "12px",
                  }}
                >
                  Happy to hear from you.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "0.875rem",
                    color: "#A5A19A",
                    lineHeight: 1.7,
                  }}
                >
                  Fill in the form and I&apos;ll respond as soon as I&apos;m
                  available.
                </p>
              </div>

              {/* Topics */}
              <div
                style={{
                  padding: "36px",
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "2px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    color: "#C5A46D",
                    textTransform: "uppercase",
                    marginBottom: "20px",
                  }}
                >
                  Topics I Can Help With
                </p>
                {[
                  "Forex Market Basics",
                  "Stock Market Understanding",
                  "Trading Concepts",
                  "Investment Guidance",
                  "Market Analysis",
                ].map((topic) => (
                  <div
                    key={topic}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        backgroundColor: "#C5A46D",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: "0.875rem",
                        color: "#A5A19A",
                      }}
                    >
                      {topic}
                    </span>
                  </div>
                ))}
              </div>

              {/* Back link */}
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#A5A19A",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#F5F2EC")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#A5A19A")
                }
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M19 12H5M5 12l7 7M5 12l7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function LoadingSpinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#C5A46D"
      style={{ flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
