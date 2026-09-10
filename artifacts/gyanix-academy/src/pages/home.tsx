import { motion, AnimatePresence, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, Star, Users, Trophy, ChevronRight, Award, CheckCircle } from "lucide-react";
import { Seo, organizationJsonLd, websiteJsonLd } from "@/components/seo";
import homeHeroImg from "@assets/generated_images/home-hero.jpg";
import homeHeroImg2 from "@assets/generated_images/home-hero-2.jpg";
import homeHeroImg3 from "@assets/generated_images/home-hero-3.jpg";

const heroSlides = [
  { src: homeHeroImg,  alt: "Students celebrating success at Gyanix Academy" },
  { src: homeHeroImg2, alt: "Students learning in modern classroom at Gyanix Academy" },
  { src: homeHeroImg3, alt: "Students celebrating exam results at Gyanix Academy" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-extrabold text-gray-900">
      {count}{suffix}
    </div>
  );
}

function AnimatedHeading({ 
  text, 
  className = "", 
  words,
  as: Component = "h2",
}: { 
  text?: string;
  className?: string;
  words?: React.ReactNode[];
  as?: any;
}) {
  const items = words || (text ? text.split(" ") : []);
  return (
    <Component className={`overflow-visible py-2 ${className}`}>
      {items.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{
              opacity: 1,
              scale: [0, 1.4, 1],
              y: [0, -14, 0],
            }}
            viewport={{ once: true }}
            transition={{
              opacity: { duration: 0.2, delay: i * 0.4 },
              scale: {
                duration: 0.5,
                delay: i * 0.4,
                times: [0, 0.6, 1],
                ease: "easeOut",
              },
              y: {
                duration: 1.6,
                delay: i * 0.4 + 0.5,
                repeat: Infinity,
                repeatDelay: 0.2,
                ease: "easeInOut",
              },
            }}
          >
            {word}
          </motion.span>
          {i < items.length - 1 && " "}
        </React.Fragment>
      ))}
    </Component>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which competitive exams does Gyanix Academy prepare students for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gyanix Academy offers coaching for IIT-JEE (Mains & Advanced), NEET, NDA & Defence, CUET, RMS & Sainik School, School Boards (5th–12th), Olympiads and Pre-Foundation in Kaithal, Haryana.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Gyanix Academy located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gyanix Academy is located at Karnal Road, Street No. 4, Near New Bus Stand, Defence Colony, Kaithal, Haryana – 136027. It offers a complete School · Coaching · Hostel campus.",
        },
      },
      {
        "@type": "Question",
        name: "Does Gyanix Academy offer scholarships?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Gyanix Academy runs the G-SET (Gyanix Scholarship Entrance Test) which lets students earn up to 100% tuition fee waiver based on their performance.",
        },
      },
      {
        "@type": "Question",
        name: "Does Gyanix Academy provide hostel facilities?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Gyanix Academy provides a safe, comfortable residential hostel on campus with a secure and monitored environment for focused learning.",
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <Seo
        title="Gyanix Academy – Best Coaching Institute in Kaithal for IIT-JEE, NEET, NDA"
        description="Gyanix Academy is Kaithal's top-rated coaching institute for IIT-JEE, NEET, NDA, CUET, RMS & Sainik School. Expert faculty, residential hostel, 5★ rated. Enrol now."
        path="/"
        jsonLd={[organizationJsonLd, websiteJsonLd, faqJsonLd]}
      />
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden py-20 lg:py-32"
        style={{ background: "linear-gradient(135deg, #022c22 0%, #064e3b 40%, #046c4e 70%, #047857 100%)" }}
      >
        {/* Background glows & particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.08)_0%,_transparent_60%)]" />
          <div className="absolute -top-10 right-1/4 w-72 h-72 bg-orange-500/25 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-96 h-60 bg-emerald-300/20 rounded-full blur-3xl" />
          <div className="absolute top-20 left-20 w-3 h-3 bg-orange-400 rounded-full blur-[2px] opacity-70" />
          <div className="absolute bottom-40 right-20 w-5 h-5 bg-white rounded-full blur-[2px] opacity-25" />
          <div className="absolute top-40 right-1/3 w-2 h-2 bg-amber-400 rounded-full blur-[1px] opacity-60" />
          <div className="absolute top-1/2 left-10 w-2 h-2 bg-white rounded-full opacity-20" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Glassmorphism badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-white text-sm font-medium mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>5.0 Rated Institute in Kaithal</span>
              </div>
              <AnimatedHeading
                as="h1"
                className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
                words={[
                  "Your", "Path", "to",
                  <span key="iit" className="text-amber-300">IIT,</span>,
                  <span key="neet" className="text-amber-300">NEET,</span>,
                  <span key="nda" className="text-amber-300">NDA</span>,
                  <span key="and" className="text-amber-300">&</span>,
                  <span key="defence" className="text-amber-300">Defence</span>,
                  "Success"
                ]}
              />
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                Join Gyanix Academy and transform your potential into achievement. Expert faculty, rigorous testing, and unwavering support for ambitious students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="sm:inline-flex">
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: [0, 1.4, 1],
                      y: [0, -14, 0],
                    }}
                    transition={{
                      opacity: { duration: 0.2, delay: 0.4 },
                      scale: { duration: 0.5, delay: 0.4, times: [0, 0.6, 1], ease: "easeOut" },
                      y: { duration: 1.6, delay: 0.9, repeat: Infinity, repeatDelay: 0.2, ease: "easeInOut" },
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 shadow-lg shadow-orange-950/40 hover:shadow-xl hover:shadow-orange-950/60 transition-all duration-300 active:scale-95 text-base w-full sm:w-auto border border-orange-300/30"
                  >
                    Book Free Demo Class
                  </motion.button>
                </Link>
                <Link href="/courses" className="sm:inline-flex">
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: [0, 1.4, 1],
                      y: [0, -14, 0],
                    }}
                    transition={{
                      opacity: { duration: 0.2, delay: 0.8 },
                      scale: { duration: 0.5, delay: 0.8, times: [0, 0.6, 1], ease: "easeOut" },
                      y: { duration: 1.6, delay: 1.3, repeat: Infinity, repeatDelay: 0.2, ease: "easeInOut" },
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-orange-600/90 hover:bg-orange-600 border-2 border-orange-400 hover:border-orange-300 shadow-md shadow-orange-950/30 transition-all duration-300 active:scale-95 text-base w-full sm:w-auto"
                  >
                    Explore Courses
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-secondary/20 rounded-[2rem] blur-xl transform rotate-3"></div>
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl aspect-[4/3]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current}
                    src={heroSlides[current].src}
                    alt={heroSlides[current].alt}
                    className="w-full h-full object-cover absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </div>
              {/* Slide dots */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-secondary w-5" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 sm:left-auto sm:-right-3 bg-indigo-100 border-2 border-indigo-300 p-2 sm:p-4 rounded-xl shadow-xl flex items-center gap-2 sm:gap-4"
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-800 shrink-0">
                  <Trophy className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-2xl font-bold text-indigo-950">100%</div>
                  <div className="text-[10px] sm:text-sm text-indigo-800 font-medium">Results Driven</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — STATS */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedHeading text="Why Choose Gyanix Academy?" className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3" />
            <p className="text-gray-600 text-lg">Our track record speaks for itself.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, target: 500, suffix: "+", label: "Students Trained", desc: "and growing every year", cardBg: "bg-sky-100 border-2 border-sky-300 hover:bg-sky-200/80", iconBg: "bg-sky-500 text-white" },
              { icon: Trophy, target: 95, suffix: "%", label: "Success Rate", desc: "students clear their exams", cardBg: "bg-orange-100 border-2 border-orange-300 hover:bg-orange-200/80", iconBg: "bg-orange-500 text-white" },
              { icon: Star, target: 5, suffix: ".0★", label: "Google Rating", desc: "across 59+ reviews", cardBg: "bg-violet-100 border-2 border-violet-300 hover:bg-violet-200/80", iconBg: "bg-violet-600 text-white" },
              { icon: BookOpen, target: 9, suffix: "+", label: "Exams Covered", desc: "JEE, NEET, NDA & more", cardBg: "bg-emerald-100 border-2 border-emerald-300 hover:bg-emerald-200/80", iconBg: "bg-emerald-500 text-white" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`flex flex-col items-center text-center p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${stat.cardBg}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center mb-4 shadow-md`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                <div className="text-sm font-bold text-gray-800 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-600 mt-0.5">{stat.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Why bullets */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {[
              { icon: CheckCircle, text: "Small batches for personalised attention", bg: "bg-indigo-100 border-2 border-indigo-300 text-indigo-900", iconColor: "text-indigo-600" },
              { icon: Award, text: "IIT/NEET/NDA expert faculty, proven results", bg: "bg-purple-100 border-2 border-purple-300 text-purple-900", iconColor: "text-purple-600" },
              { icon: CheckCircle, text: "On-campus hostel — school + coaching + stay", bg: "bg-teal-100 border-2 border-teal-300 text-teal-900", iconColor: "text-teal-600" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-xl px-5 py-4 shadow-sm ${item.bg}`}>
                <item.icon className={`w-5 h-5 shrink-0 ${item.iconColor}`} />
                <span className="text-sm font-semibold">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OUR ACHIEVERS SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <AnimatedHeading text="Our Achievers" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" />
            <p className="text-gray-600 text-lg">Celebrated in the community and covered by regional media.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "🏆",
                title: "District & State Ranks",
                desc: "Multiple students securing District Rank and State Rank in IIT-JEE, NEET, and NDA competitive exams.",
                tag: "Academic Excellence",
                color: "border-2 border-indigo-300 bg-indigo-100/90",
                tagColor: "bg-indigo-200 text-indigo-900 font-bold",
              },
              {
                emoji: "📰",
                title: "Amar Ujala Coverage",
                desc: "Featured in Amar Ujala newspaper for our prize & cheque distribution award ceremony for top performers.",
                tag: "Media Recognition",
                color: "border-2 border-sky-300 bg-sky-100/90",
                tagColor: "bg-sky-200 text-sky-900 font-bold",
              },
              {
                emoji: "🚦",
                title: "Road Safety Programme",
                desc: "Organised a road safety awareness drive with local RTO officials, covered by Jagmarg News.",
                tag: "Community Initiative",
                color: "border-2 border-emerald-300 bg-emerald-100/90",
                tagColor: "bg-emerald-200 text-emerald-900 font-bold",
              },
              {
                emoji: "🎖️",
                title: "Prize Distribution Events",
                desc: "Regular cheque & trophy distribution ceremonies honouring top performers across all programmes.",
                tag: "Student Recognition",
                color: "border-2 border-orange-300 bg-orange-100/90",
                tagColor: "bg-orange-200 text-orange-900 font-bold",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-7 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all ${item.color}`}
              >
                <div className="text-4xl">{item.emoji}</div>
                <div>
                  <span className={`text-xs px-3 py-1 rounded-full ${item.tagColor}`}>{item.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/results" className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors">
              Explore our full Hall of Fame results <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHTS / COURSES */}
      <section className="py-20 bg-slate-100/70">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <AnimatedHeading text="Our Premier Programs" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" />
            <p className="text-gray-600 text-lg">Comprehensive coaching tailored for ultimate competitive success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "IIT-JEE (Mains & Adv)", desc: "Rigorous preparation for engineering aspirants.", cardBg: "bg-sky-100 border-2 border-sky-300 hover:bg-sky-200/90", iconBg: "bg-sky-200 text-sky-800", linkColor: "text-sky-800 hover:text-sky-950" },
              { title: "NEET Preparation", desc: "Expert guidance for medical entrance exams.", cardBg: "bg-emerald-100 border-2 border-emerald-300 hover:bg-emerald-200/90", iconBg: "bg-emerald-200 text-emerald-800", linkColor: "text-emerald-800 hover:text-emerald-950" },
              { title: "NDA & Defence", desc: "Structured coaching for defence services.", cardBg: "bg-rose-100 border-2 border-rose-300 hover:bg-rose-200/90", iconBg: "bg-rose-200 text-rose-800", linkColor: "text-rose-800 hover:text-rose-950" },
              { title: "CUET", desc: "Top university admission preparation.", cardBg: "bg-purple-100 border-2 border-purple-300 hover:bg-purple-200/90", iconBg: "bg-purple-200 text-purple-800", linkColor: "text-purple-800 hover:text-purple-950" },
              { title: "RMS & Sainik School", desc: "Early preparation for prestigious schools.", cardBg: "bg-orange-100 border-2 border-orange-300 hover:bg-orange-200/90", iconBg: "bg-orange-200 text-orange-800", linkColor: "text-orange-800 hover:text-orange-950" },
              { title: "School Boards (5th-12th)", desc: "Strong foundation for academic excellence.", cardBg: "bg-teal-100 border-2 border-teal-300 hover:bg-teal-200/90", iconBg: "bg-teal-200 text-teal-800", linkColor: "text-teal-800 hover:text-teal-950" },
              { title: "Olympiads", desc: "National & international olympiad training.", cardBg: "bg-indigo-100 border-2 border-indigo-300 hover:bg-indigo-200/90", iconBg: "bg-indigo-200 text-indigo-800", linkColor: "text-indigo-800 hover:text-indigo-950" },
              { title: "Foundation (Pre-Comp)", desc: "Early foundation for classes 6–8 students.", cardBg: "bg-cyan-100 border-2 border-cyan-300 hover:bg-cyan-200/90", iconBg: "bg-cyan-200 text-cyan-800", linkColor: "text-cyan-800 hover:text-cyan-950" },
              { title: "G-SET Scholarship", desc: "Earn up to 100% fee waiver on the entrance test.", cardBg: "bg-pink-100 border-2 border-pink-300 hover:bg-pink-200/90", iconBg: "bg-pink-200 text-pink-800", linkColor: "text-pink-800 hover:text-pink-950" },
            ].map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group cursor-pointer ${course.cardBg}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${course.iconBg}`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                <p className="text-gray-700 font-medium mb-6">{course.desc}</p>
                <Link href="/courses" className={`inline-flex items-center font-bold ${course.linkColor} transition-colors`}>
                  Know More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/courses">
              <Button variant="default" size="lg" className="rounded-full px-8 shadow-md">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FACILITIES SECTION */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <AnimatedHeading text="World-Class Facilities" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" />
            <p className="text-gray-600 text-lg">A complete School · Coaching · Hostel campus designed for serious aspirants.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { emoji: "🏠", title: "Residential Hostel", desc: "Safe, comfortable on-campus hostel for outstation students.", cardBg: "bg-cyan-100 border-2 border-cyan-300 hover:bg-cyan-200/80" },
              { emoji: "👨‍🏫", title: "Experienced Faculty", desc: "IIT/NEET/NDA experts with proven track records.", cardBg: "bg-violet-100 border-2 border-violet-300 hover:bg-violet-200/80" },
              { emoji: "📝", title: "Regular Tests", desc: "Weekly mock tests and detailed performance reports.", cardBg: "bg-lime-100 border-2 border-lime-300 hover:bg-lime-200/80" },
              { emoji: "👥", title: "Small Batches", desc: "Limited seats per batch for personalised attention.", cardBg: "bg-fuchsia-100 border-2 border-fuchsia-300 hover:bg-fuchsia-200/80" },
              { emoji: "🔒", title: "Safe Campus", desc: "Secure and monitored environment for focused learning.", cardBg: "bg-teal-100 border-2 border-teal-300 hover:bg-teal-200/80" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`flex flex-col items-center text-center rounded-2xl p-7 shadow-sm hover:shadow-md transition-all ${f.cardBg}`}
              >
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/faculty" className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors">
              Meet our IIT, NEET & NDA expert faculty <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-secondary/10 skew-x-12 transform origin-top-left"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to secure your future?</h2>
            <p className="text-xl text-white/80 mb-10">
              Join Gyanix Academy today and take the first step towards academic excellence. Enroll in our scholarship test to get up to 100% fee waiver.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/scholarship">
                <Button variant="secondary" size="lg" className="rounded-full px-8 font-bold w-full sm:w-auto shadow-lg">
                  Apply for G-SET Scholarship
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-full px-8 font-bold text-white border-white hover:bg-white hover:text-primary w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS / STATS SECTION (ABOVE FOOTER) */}
      <section className="bg-slate-100/90 py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Users, count: "84+", label: "Justdial Reviews", cardBg: "bg-blue-100 border-2 border-blue-300 hover:bg-blue-200/80", iconBg: "bg-blue-500 text-white" },
              { icon: Star, count: "5.0★", label: "Google & Justdial", cardBg: "bg-violet-100 border-2 border-violet-300 hover:bg-violet-200/80", iconBg: "bg-violet-600 text-white" },
              { icon: BookOpen, count: "9+", label: "Exams Covered", cardBg: "bg-emerald-100 border-2 border-emerald-300 hover:bg-emerald-200/80", iconBg: "bg-emerald-500 text-white" },
              { icon: Trophy, count: "2025", label: "Est. in Kaithal", cardBg: "bg-purple-100 border-2 border-purple-300 hover:bg-purple-200/80", iconBg: "bg-purple-500 text-white" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center text-center p-6 rounded-2xl shadow-sm hover:shadow-md transition-all ${stat.cardBg}`}
              >
                <div className={`w-12 h-12 rounded-full ${stat.iconBg} flex items-center justify-center mb-3 shadow-md`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-gray-900">{stat.count}</div>
                <div className="text-sm md:text-base font-bold text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges / Cards right above footer */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8 border-t border-gray-300">
            <div className="flex items-center gap-2 bg-indigo-100 border-2 border-indigo-300 rounded-full px-5 py-2.5 shadow-sm hover:scale-105 transition-transform">
              <span className="text-indigo-600 text-lg leading-none">★★★★★</span>
              <div className="text-sm font-bold text-gray-800">
                <span className="text-primary font-black">5.0</span> on Google
                <span className="text-gray-600 font-medium ml-1">(59 reviews)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-orange-100 border-2 border-orange-300 rounded-full px-5 py-2.5 shadow-sm hover:scale-105 transition-transform">
              <span className="text-orange-500 text-lg leading-none">★★★★★</span>
              <div className="text-sm font-bold text-gray-800">
                <span className="text-primary font-black">5.0</span> on Justdial
                <span className="text-gray-600 font-medium ml-1">(84 reviews)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-100 border-2 border-emerald-300 rounded-full px-5 py-2.5 shadow-sm hover:scale-105 transition-transform">
              <span className="text-emerald-600 font-black text-base">✓</span>
              <span className="text-sm font-bold text-gray-800">Justdial Claimed Business</span>
            </div>
            <div className="flex items-center gap-2 bg-sky-100 border-2 border-sky-300 rounded-full px-5 py-2.5 shadow-sm hover:scale-105 transition-transform">
              <span className="text-primary font-bold text-base">🏫</span>
              <span className="text-sm font-bold text-gray-800">School · Coaching · Hostel</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
