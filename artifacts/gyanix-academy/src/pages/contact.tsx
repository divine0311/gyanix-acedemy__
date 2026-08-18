import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      course: (form.elements.namedItem("course") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 8000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-primary py-16 text-center text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            Get in Touch
          </motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Have questions? We're here to help you take the right step towards your future.
          </p>
        </div>
      </section>

      <section className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Info Cards */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-secondary flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4 text-sm">We are available Mon–Sat, 9 AM to 7 PM.</p>
                <a href="tel:+918950175314" className="text-lg font-bold text-primary hover:text-secondary transition-colors">
                  89501-75314
                </a>
                <a href="tel:+918950275314" className="text-base font-semibold text-primary hover:text-secondary transition-colors mt-1">
                  89502-75314
                </a>
              </motion.div>

              <motion.a
                href="https://maps.app.goo.gl/8phnpfA2nXru4tXS8"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-primary flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 text-sm">
                  Karnal Road, Street No. 4,<br />
                  Near New Bus Stand, Defence Colony,<br />
                  Kaithal, Haryana – 136027
                </p>
                <span className="mt-3 text-xs font-semibold text-primary group-hover:text-secondary transition-colors duration-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Open in Maps
                </span>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-center gap-3 border border-gray-100"
              >
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                </span>
                <span className="font-bold text-gray-900">Open until 7:00 PM</span>
              </motion.div>
            </div>

            {/* Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white p-8 md:p-12 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send an Enquiry</h2>
              <p className="text-gray-500 text-sm mb-8">Fill in your details and we'll get back to you within 24 hours.</p>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
                    <p className="text-gray-600 max-w-xs">
                      Your enquiry has been submitted. Our team will call you shortly on the number you provided.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Row 1: Name */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-900">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="name"
                        required
                        placeholder="Enter your full name"
                        className="bg-gray-50"
                        disabled={status === "loading"}
                      />
                    </div>

                    {/* Row 2: Email + Course */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-900">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="email"
                          required
                          type="email"
                          placeholder="Enter your email"
                          className="bg-gray-50"
                          disabled={status === "loading"}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-900">
                          Course Interested In <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="course"
                          required
                          defaultValue=""
                          disabled={status === "loading"}
                          className="flex h-10 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                        >
                          <option value="" disabled>Select a course</option>
                          <option value="IIT-JEE">IIT-JEE (Mains & Advanced)</option>
                          <option value="NEET">NEET Preparation</option>
                          <option value="NDA & Defence">NDA & Defence</option>
                          <option value="CUET">CUET</option>
                          <option value="RMS & Sainik School">RMS & Sainik School</option>
                          <option value="School Boards (5th-12th)">School Boards (5th–12th)</option>
                          <option value="Olympiads">Olympiads</option>
                          <option value="Pre-Foundation">Pre-Foundation (Class 6–8)</option>
                          <option value="G-SET Scholarship">G-SET Scholarship</option>
                          <option value="Other">Other / Not Sure</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-900">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        name="message"
                        required
                        placeholder="Tell us about your goals, current class, or any questions you have…"
                        className="min-h-[120px] bg-gray-50 resize-none"
                        disabled={status === "loading"}
                      />
                    </div>

                    {/* Error */}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {errorMsg || "Failed to send. Please try again or call us directly."}
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === "loading"}
                      className="w-full md:w-auto px-10 gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Enquiry
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="w-full h-[180px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.9!2d76.4252486!3d29.797647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3911e12cd020ab75%3A0xfbcec7661ab03a1f!2sGyanix%20Academy!5e0!3m2!1sen!2sin!4v1722700000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Gyanix Academy Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
