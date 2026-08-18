import { motion } from "framer-motion";
import { CheckCircle2, Target, Award, Users, BookOpen, Trophy } from "lucide-react";
import aboutImg from "@assets/generated_images/about-classroom.jpg";

export default function About() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-primary/5 py-16 md:py-24 border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-primary mb-6"
          >
            About Gyanix Academy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Shaping minds, building careers, and fostering excellence in Kaithal since 2025.
          </motion.p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                Founded in 2025, Gyanix Academy is a complete <strong>School · Coaching · Hostel</strong> institute in Kaithal, Haryana — built with a singular vision: to provide premium, result-oriented education and residential facilities to students from Class 5th to 12th.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                We recognised the gap between ambition and the right guidance, and stepped in to bridge it. Today, with a 5.0-star rating on both Google (59 reviews) and Justdial (84 reviews), we stand as a beacon of hope for aspirants of IIT-JEE, NEET, NDA, CUET, and other prestigious competitive exams.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-blue-200 p-6 rounded-xl border border-blue-300 shadow-sm">
                  <Target className="w-8 h-8 text-blue-700 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-sm text-gray-700">To empower students with the knowledge, skills, and confidence to crack top competitive exams.</p>
                </div>
                <div className="bg-orange-200 p-6 rounded-xl border border-orange-300 shadow-sm">
                  <Award className="w-8 h-8 text-orange-700 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Our Vision</h3>
                  <p className="text-sm text-gray-700">To be the most trusted educational institution in Haryana, synonymous with academic excellence.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src={aboutImg} alt="Modern Classroom at Gyanix Academy" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-medium text-lg">State-of-the-art classrooms designed for focused learning.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Gyanix?</h2>
            <p className="text-gray-600 text-lg">We don't just teach; we mentor. Here is what makes our academy the premier choice for serious aspirants.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Experienced Faculty", desc: "Learn from top educators who have produced national toppers.", bg: "bg-purple-200", border: "border-purple-300 hover:border-purple-500", iconBg: "bg-purple-300 text-purple-800" },
              { icon: Target, title: "Small Batches", desc: "Personalized attention with limited students per batch.", bg: "bg-blue-200", border: "border-blue-300 hover:border-blue-500", iconBg: "bg-blue-300 text-blue-800" },
              { icon: BookOpen, title: "Comprehensive Material", desc: "Updated study modules aligned with latest exam patterns.", bg: "bg-green-200", border: "border-green-300 hover:border-green-500", iconBg: "bg-green-300 text-green-800" },
              { icon: CheckCircle2, title: "Doubt Sessions", desc: "Regular 1-on-1 doubt clearing to ensure conceptual clarity.", bg: "bg-yellow-200", border: "border-yellow-300 hover:border-yellow-500", iconBg: "bg-yellow-300 text-yellow-800" },
              { icon: Award, title: "Test Series", desc: "Rigorous mock tests and detailed performance analytics.", bg: "bg-pink-200", border: "border-pink-300 hover:border-pink-500", iconBg: "bg-pink-300 text-pink-800" },
              { icon: Trophy, title: "Result Oriented", desc: "A proven track record of selections in elite institutions.", bg: "bg-orange-200", border: "border-orange-300 hover:border-orange-500", iconBg: "bg-orange-300 text-orange-800" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${feature.bg} p-8 rounded-2xl shadow-sm border ${feature.border} hover:shadow-md transition-all`}
              >
                <div className={`w-14 h-14 ${feature.iconBg} rounded-full flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
