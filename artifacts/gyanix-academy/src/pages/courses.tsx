import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calculator, Stethoscope, Shield, GraduationCap, School, BookOpen, BrainCircuit, Microscope, ChevronRight } from "lucide-react";
import { Seo, organizationJsonLd } from "@/components/seo";
import coursesImg from "@assets/generated_images/courses-hero.jpg";
import imgIitJee from "@assets/generated_images/course-iit-jee.jpg";
import imgNeet from "@assets/generated_images/course-neet.jpg";
import imgNda from "@assets/generated_images/course-nda.jpg";
import imgCuet from "@assets/generated_images/course-cuet.jpg";
import imgRms from "@assets/generated_images/course-rms.jpg";
import imgBoards from "@assets/generated_images/course-boards.jpg";
import imgOlympiads from "@assets/generated_images/course-olympiads.jpg";
import imgFoundation from "@assets/generated_images/course-foundation.jpg";

export default function Courses() {
  const courses = [
    {
      id: "iit-jee",
      title: "IIT-JEE (Mains & Advanced)",
      desc: "Comprehensive coaching for engineering aspirants with focus on advanced problem-solving.",
      icon: Calculator,
      color: "text-blue-700",
      cardBg: "bg-sky-100/90 border-2 border-sky-300 hover:bg-sky-200/90",
      image: imgIitJee,
      features: ["Daily Practice Papers", "Weekly Mock Tests", "Advanced Study Material"]
    },
    {
      id: "neet",
      title: "NEET Preparation",
      desc: "Expert guidance in PCB to secure top ranks in medical entrance examinations.",
      icon: Stethoscope,
      color: "text-emerald-700",
      cardBg: "bg-emerald-100/90 border-2 border-emerald-300 hover:bg-emerald-200/90",
      image: imgNeet,
      features: ["NCERT Focused", "Diagram-based Learning", "Previous Year Analysis"]
    },
    {
      id: "nda",
      title: "NDA & Defence",
      desc: "Structured preparation for written exams and SSB interviews for defence services.",
      icon: Shield,
      color: "text-rose-700",
      cardBg: "bg-rose-100/90 border-2 border-rose-300 hover:bg-rose-200/90",
      image: imgNda,
      features: ["Maths & GAT Coverage", "Current Affairs", "Physical Fitness Tips"]
    },
    {
      id: "cuet",
      title: "CUET",
      desc: "Target top central universities with our specialized domain and general test prep.",
      icon: GraduationCap,
      color: "text-purple-700",
      cardBg: "bg-purple-100/90 border-2 border-purple-300 hover:bg-purple-200/90",
      image: imgCuet,
      features: ["Domain Specific Classes", "Language Prep", "Computer Based Tests"]
    },
    {
      id: "rms",
      title: "RMS & Sainik School",
      desc: "Early foundation and specific preparation for elite military school admissions.",
      icon: School,
      color: "text-orange-700",
      cardBg: "bg-orange-100/90 border-2 border-orange-300 hover:bg-orange-200/90",
      image: imgRms,
      features: ["Basic Math & Intelligence", "GK Modules", "Interview Prep"]
    },
    {
      id: "boards",
      title: "School Boards (5th–12th)",
      desc: "Strong academic foundation covering CBSE/State board curriculum perfectly.",
      icon: BookOpen,
      color: "text-teal-700",
      cardBg: "bg-teal-100/90 border-2 border-teal-300 hover:bg-teal-200/90",
      image: imgBoards,
      features: ["Concept Clarity", "Board Pattern Tests", "Doubt Classes"]
    },
    {
      id: "olympiads",
      title: "Olympiads",
      desc: "Train for national and international level science and math olympiads.",
      icon: BrainCircuit,
      color: "text-indigo-700",
      cardBg: "bg-indigo-100/90 border-2 border-indigo-300 hover:bg-indigo-200/90",
      image: imgOlympiads,
      features: ["Analytical Thinking", "High-order Problems", "National Level Benchmarking"]
    },
    {
      id: "foundation",
      title: "Pre-Foundation",
      desc: "Start early! Special programs for classes 6 to 8 to build a competitive edge.",
      icon: Microscope,
      color: "text-cyan-700",
      cardBg: "bg-cyan-100/90 border-2 border-cyan-300 hover:bg-cyan-200/90",
      image: imgFoundation,
      features: ["Mental Ability", "Science Fundamentals", "Fun Learning"]
    }
  ];

  return (
    <div className="w-full">
      <Seo
        title="Courses at Gyanix Academy – IIT-JEE, NEET, NDA, CUET Coaching in Kaithal"
        description="Explore Gyanix Academy's coaching programs in Kaithal: IIT-JEE, NEET, NDA & Defence, CUET, RMS & Sainik School, School Boards, Olympiads and Pre-Foundation."
        path="/courses"
        type="website"
        jsonLd={[
          organizationJsonLd,
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Gyanix Academy Courses",
            itemListElement: courses.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.title,
              description: c.desc,
            })),
          },
        ]}
      />
      {/* Hero */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src={coursesImg} alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            >
              Academic Programs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-300 mb-8"
            >
              Discover our range of meticulously designed courses to help you crack the toughest exams with confidence and secure top ranks.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col ${course.cardBg}`}
              >
                {/* Course Image */}
                <div className="relative overflow-hidden h-48 shrink-0">
                  <img
                    src={course.image}
                    alt={`${course.title} coaching at Gyanix Academy Kaithal`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  {/* Icon badge */}
                  <div className="absolute top-3 right-3 p-2 rounded-xl bg-white/95 shadow-md backdrop-blur-sm">
                    <course.icon className={`w-5 h-5 ${course.color}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h2>
                  <p className="text-gray-700 font-medium mb-5 line-clamp-2 flex-1">{course.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm font-semibold text-gray-800">
                        <div className="w-2 h-2 rounded-full bg-secondary mr-2 shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-7 pb-7 mt-auto">
                  <Link href="/contact">
                    <Button className="w-full justify-between font-bold bg-white/80 border-2 border-gray-300 text-gray-900 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm" variant="outline">
                      Enquire Now
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 transform group-hover:translate-x-1 transition-transform">
                        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-14">
            <p className="text-gray-600 mb-4">Taught by our expert IIT, NEET &amp; NDA educators in Kaithal.</p>
            <Link href="/faculty" className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors">
              Browse our faculty profiles <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
