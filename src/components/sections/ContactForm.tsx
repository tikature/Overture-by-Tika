"use client";

import React from "react";
import { motion } from "motion/react";
import { contactSchema, type ContactFormData } from "@/lib/validation";
import { LucideSend, LucideCheckCircle, LucideAlertCircle, LucideLoader } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = React.useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = React.useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const validateField = (name: keyof ContactFormData, value: string) => {
    const fieldSchema = contactSchema.shape[name];
    if (fieldSchema) {
      const result = fieldSchema.safeParse(value);
      if (!result.success) {
        setErrors((prev) => ({ ...prev, [name]: result.error.errors[0].message }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof ContactFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Client-side validation
    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
      (Object.keys(fieldErrors) as Array<keyof ContactFormData>).forEach((key) => {
        newErrors[key] = fieldErrors[key]?.[0] || "";
      });
      setErrors(newErrors);
      setStatus("error");
      return;
    }

    // Honeypot check
    if (formData.website) {
      setStatus("error");
      setErrorMessage("Spam detected");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 503) {
        // Fallback to mailto
        const mailtoLink = `mailto:detikaa10@gmail.com?subject=${encodeURIComponent(`[Portfolio Contact] ${formData.subject}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        setStatus("success");
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "The dispatch could not be delivered. Please email me directly.");
    }
  };

  const inputClass = "w-full bg-void text-ivoryCream border border-darkCream/25 placeholder-darkCream/45 focus:border-ivoryCream focus:outline-none focus:ring-1 focus:ring-ivoryCream/30 rounded-md px-4 py-3 text-sm font-body transition-colors";
  const labelClass = "block text-xs font-opera uppercase tracking-wider text-ivoryCream mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />

      <div>
        <label htmlFor="name" className={labelClass}>
          Your Name / Title
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`${inputClass} ${errors.name ? "border-wineRed" : ""}`}
          placeholder="Dewi Atika Muthi"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          disabled={status === "submitting"}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-wineRed" role="alert">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Your Correspondence Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`${inputClass} ${errors.email ? "border-wineRed" : ""}`}
          placeholder="detikaa10@gmail.com"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={status === "submitting"}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-wineRed" role="alert">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Production Scope / Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`${inputClass} ${errors.subject ? "border-wineRed" : ""}`}
          placeholder="Frontend Collaboration Inquiry"
          aria-invalid={errors.subject ? "true" : "false"}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          disabled={status === "submitting"}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-xs text-wineRed" role="alert">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          The Overture / Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`${inputClass} ${errors.message ? "border-wineRed" : ""} resize-none`}
          placeholder="Describe your project, timeline, and how I can help bring your vision to the stage..."
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          disabled={status === "submitting"}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-wineRed" role="alert">{errors.message}</p>
        )}
      </div>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-darkBurgundy/60 border border-cream/30 rounded-lg"
          role="status"
        >
          <LucideCheckCircle className="w-5 h-5 text-cream" />
          <p className="text-cream font-body text-sm">Your dispatch has reached the stage. I will reply soon.</p>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-darkBurgundy/60 border border-wineRed/30 rounded-lg"
          role="alert"
        >
          <LucideAlertCircle className="w-5 h-5 text-wineRed" />
          <p className="text-cream font-body text-sm">{errorMessage || "The dispatch could not be delivered. Please email me directly."}</p>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto px-8 py-3 rounded-full font-opera font-bold text-xs tracking-widest uppercase text-cream bg-gradient-to-r from-burgundy via-vintageBurgundy to-wineRed border border-darkCream/40 shadow-[0_0_20px_rgba(128,0,32,0.7)] hover:shadow-[0_0_30px_rgba(220,200,163,0.45)] hover:border-cream hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <LucideLoader className="w-4 h-4 animate-spin" />
            <span>Sending Dispatch...</span>
          </>
        ) : (
          <>
            <LucideSend className="w-4 h-4" />
            <span>Send Dispatch ✉</span>
          </>
        )}
      </button>
    </form>
  );
}