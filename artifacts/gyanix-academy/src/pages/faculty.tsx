import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";

import fac1 from "@assets/generated_images/faculty-1.jpg";
import fac2 from "@assets/generated_images/faculty-2.jpg";
import fac3 from "@assets/generated_images/faculty-3.jpg";
import fac4 from "@assets/generated_images/faculty-4.jpg";

export default function Faculty() {
  const faculty = [
    {
      name: "Dr. Rajesh Kumar",
      subject: "Physics & Mathematics",
      exp: "10+ Years Exp.",
      bio: "Ex-HOD at premier institutes. Known for simplifying complex mechanics and calculus problems.",
      img: fac1
    },
    {
      name: "Ms. Priya Sharma",
      subject: "Biology & Chemistry",
      exp: "8+ Years Exp.",
      bio: "NEET expert with a track record of producing top 100 rankers. Master of organic chemistry.",
      img: fac2
    },
    {
      name: "Mr. Amit Singh",
      subject: "Mathematics (NDA/JEE)",
      exp: "12+ Years Exp.",
      bio: "Specializes in shortcut techniques and time management strategies for competitive exams.",
      img: fac3
    },
    {
      name: "Ms. Sunita Verma",
      subject: "English & General Studies",
      exp: "7+ Years Exp.",
      bio: "Expert in GAT for NDA and CUET verbal sections. Focuses on comprehensive understanding.",
      img: fac4
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <section className="bg-primary py-20 text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Meet Our Experts
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            A great teacher can change a student's life. Our faculty comprises passionate educators dedicated to your success.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {faculty.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[4/5] shadow-lg">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <div className="flex gap-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-center px-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-secondary font-bold text-sm mb-3 uppercase tracking-wider">{member.subject}</p>
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {member.exp}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
