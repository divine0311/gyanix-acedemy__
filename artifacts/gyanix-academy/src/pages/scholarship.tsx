import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trophy, CheckCircle, Percent, ArrowRight, Star, CheckCircle2, AlertCircle } from "lucide-react";
import scholarshipImg from "@assets/generated_images/scholarship-hero.jpg";

export default function Scholarship() {
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
      currentClass: (form.elements.namedItem("currentClass") as HTMLSelectElement).value,
      targetExam: (form.elements.namedItem("targetExam") as HTMLSelectElement).value,
    };
    try {
      const res = await fetch("/api/gset-register", {
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
    <div className="w-full">
      {/* Hero */}
      <section className="bg-primary text-white py-20 border-b-8 border-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-block bg-secondary text-white font-bold px-4 py-1.5 rounded-full text-sm mb-6 uppercase tracking-wider">
                Gyanix Scholarship Entrance Test
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                G-SET <br/><span className="text-secondary text-3xl md:text-5xl">Unlock up to 100% Scholarship</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                Financial constraints should never stop true talent. Take the G-SET and secure your fully-funded seat for IIT-JEE, NEET, and NDA batches.
              </p>
              <Button size="lg" variant="secondary" className="rounded-full px-8 font-bold text-lg h-14">
                Register Now for Free
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-secondary rounded-[2rem] transform rotate-6 scale-105 opacity-20"></div>
              <img 
                src={scholarshipImg} 
                alt="Scholarship Celebration" 
                className="rounded-[2rem] shadow-2xl relative z-10 w-full object-cover border-4 border-white/10 aspect-square md:aspect-[4/3]"
              />
              
              <div className="absolute -bottom-8 -left-8 bg-white text-gray-900 p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4">
                <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 fill-yellow-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">District Topper</div>
                  <div className="text-xl font-extrabold">Anuj Saharan</div>
                  <div className="text-sm text-secondary font-bold">100% Fee Waived</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How G-SET Works</h2>
            <p className="text-gray-600 text-lg">A simple 3-step process to kickstart your preparation with the best faculty in Kaithal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, title: "1. Register", desc: "Fill the form online or visit our center to register for the upcoming test date.", bg: "bg-green-200", border: "border-green-300", iconBg: "bg-green-300 text-green-800" },
              { icon: Trophy, title: "2. Take the Test", desc: "Attempt an objective-type test assessing your aptitude and foundational knowledge.", bg: "bg-blue-200", border: "border-blue-300", iconBg: "bg-blue-300 text-blue-800" },
              { icon: Percent, title: "3. Get Scholarship", desc: "Earn up to 100% tuition fee waiver based on your performance in the exam.", bg: "bg-orange-200", border: "border-orange-300", iconBg: "bg-orange-300 text-orange-800" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${step.bg} p-8 rounded-2xl text-center shadow-sm border ${step.border}`}
              >
                <div className={`w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-700">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Card className="border-0 shadow-2xl overflow-hidden rounded-[2rem]">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 bg-primary p-10 text-white flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-6">Register for G-SET</h3>
                <p className="text-white/80 mb-8">Secure your slot for the next scholarship test. Seats are limited.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span>Free Registration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span>Instant Results</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span>Career Counseling</span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-3 p-10 bg-white">
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                      <p className="text-gray-600 max-w-xs">
                        We've received your G-SET registration. Our team will contact you shortly with test details.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-900">Student Name <span className="text-red-500">*</span></label>
                          <Input name="name" required placeholder="Enter your name" className="bg-gray-50 h-12" disabled={status === "loading"} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-900">Email Address <span className="text-red-500">*</span></label>
                          <Input name="email" required type="email" placeholder="Enter your email" className="bg-gray-50 h-12" disabled={status === "loading"} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Current Class <span className="text-red-500">*</span></label>
                        <select name="currentClass" required defaultValue="" disabled={status === "loading"} className="flex h-12 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50">
                          <option value="" disabled>Select Class</option>
                          <option value="Class 5">Class 5</option>
                          <option value="Class 6">Class 6</option>
                          <option value="Class 7">Class 7</option>
                          <option value="Class 8">Class 8</option>
                          <option value="Class 9">Class 9</option>
                          <option value="Class 10">Class 10</option>
                          <option value="Class 11">Class 11</option>
                          <option value="Class 12">Class 12</option>
                          <option value="Dropper/Repeater">Dropper/Repeater</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Target Exam <span className="text-red-500">*</span></label>
                        <select name="targetExam" required defaultValue="" disabled={status === "loading"} className="flex h-12 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50">
                          <option value="" disabled>Select Exam</option>
                          <option value="IIT-JEE">IIT-JEE</option>
                          <option value="NEET">NEET</option>
                          <option value="NDA">NDA</option>
                          <option value="CUET">CUET</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {errorMsg || "Failed to submit. Please try again or call us directly."}
                        </motion.div>
                      )}

                      <Button type="submit" size="lg" className="w-full h-14 text-lg mt-4" disabled={status === "loading"}>
                        {status === "loading" ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
                            Submitting…
                          </>
                        ) : (
                          <>Submit Registration <ArrowRight className="ml-2 w-5 h-5" /></>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
