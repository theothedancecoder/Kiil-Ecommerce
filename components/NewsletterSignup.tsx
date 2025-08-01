"use client";

import { useState } from "react";

interface NewsletterSignupProps {
  variant?: "default" | "sale";
  className?: string;
}

export default function NewsletterSignup({ variant = "default", className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setError("Vennligst skriv inn en gyldig e-postadresse");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call - replace with actual newsletter signup logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setEmail("");
    } catch (err) {
      setError("Noe gikk galt. Prøv igjen senere.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${variant === "sale" ? "text-white" : "text-stone-800"}`}>
          Takk for at du abonnerer!
        </h3>
        <p className={`${variant === "sale" ? "text-red-100" : "text-stone-600"}`}>
          Du vil motta våre beste tilbud og nyheter på e-post.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Din e-postadresse"
          className={`flex-1 px-4 py-3 focus:outline-none focus:ring-2 rounded ${
            variant === "sale" 
              ? "bg-white text-stone-800 placeholder-stone-500 focus:ring-red-300" 
              : "bg-stone-100 text-stone-800 placeholder-stone-500 focus:ring-stone-300"
          }`}
          disabled={isSubmitting}
        />
        <button 
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 font-medium transition-colors duration-300 rounded disabled:opacity-50 ${
            variant === "sale"
              ? "bg-white text-red-600 hover:bg-red-50"
              : "bg-stone-800 text-white hover:bg-stone-700"
          }`}
        >
          {isSubmitting ? "Abonnerer..." : "Abonner"}
        </button>
      </div>
      
      {error && (
        <p className={`text-sm mt-2 text-center ${variant === "sale" ? "text-red-200" : "text-red-600"}`}>
          {error}
        </p>
      )}
      
      <p className={`text-sm mt-4 text-center ${variant === "sale" ? "text-red-200" : "text-stone-500"}`}>
        Vi sender kun kvalitetsinnhold og respekterer din personvern.
      </p>
    </form>
  );
}
