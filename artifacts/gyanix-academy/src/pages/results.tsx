import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Trophy, Star, TrendingUp, Medal } from "lucide-react";
import resultsImg from "@assets/generated_images/results-hero.jpg";

function Counter({ end, suffix = "" }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span className="font-extrabold">{count}{suffix}</span>;
}

export default function Results() {
  const toppers = [
    { name: "Anuj Saharan", score: "322/360", exam: "JEE Mains", rank: "District Topper", tag: "100%ile in Math" },
    { name: "Priya Malik", score: "685/720", exam: "NEET", rank: "State Rank 42", tag: "Selection in AIIMS" },
    { name: "Rahul Verma", score: "Cleared", exam: "NDA", rank: "SSB Recommended", tag: "First Attempt" },
    { name: "Sneha Gupta", score: "99.8%", exam: "CBSE 12th", rank: "School Topper", tag: "PCM" },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-primary/5 py-16 md:py-24 border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Trophy className="w-10 h-10" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-primary mb-6"
          >
            Results & Achievements
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Success isn't just claimed; it is proven. Meet the shining stars of Gyanix Academy who transformed their hard work into historic results.
          </motion.p>
        </div>
      </section>

      {/* Featured Topper */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[2rem] shadow-2xl border-4 border-yellow-400 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 flex flex-col justify-center items-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-bold text-sm mb-6 uppercase tracking-wider">
                  <Star className="w-4 h-4 fill-yellow-700" /> District Topper 2025
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Anuj Saharan</h2>
                <div className="text-3xl font-black text-primary mb-6">322<span className="text-xl text-gray-500">/360</span></div>
                <p className="text-gray-600 text-lg mb-8">
                  "Gyanix Academy's test series and personalized doubt sessions were the game changer for my JEE preparation."
                </p>
                <div className="flex gap-4">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold text-gray-700">JEE Mains</div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold text-gray-700">100%ile in Math</div>
                </div>
              </div>
              <div className="relative min-h-[300px]">
                <img src={resultsImg} alt="Topper Celebration" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent md:block hidden"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Counters */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div className="flex flex-col items-center">
              <TrendingUp className="w-10 h-10 text-secondary mb-4" />
              <div className="text-5xl font-black mb-2"><Counter end={95} suffix="%" /></div>
              <div className="text-white/80 font-medium">Success Rate</div>
            </div>
            <div className="flex flex-col items-center">
              <Medal className="w-10 h-10 text-secondary mb-4" />
              <div className="text-5xl font-black mb-2"><Counter end={50} suffix="+" /></div>
              <div className="text-white/80 font-medium">Top 1000 Ranks</div>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-10 h-10 text-secondary mb-4" />
              <div className="text-5xl font-black mb-2"><Counter end={100} suffix="%" /></div>
              <div className="text-white/80 font-medium">Board Pass Rate</div>
            </div>
            <div className="flex flex-col items-center">
              <Trophy className="w-10 h-10 text-secondary mb-4" />
              <div className="text-5xl font-black mb-2"><Counter end={84} suffix="+" /></div>
              <div className="text-white/80 font-medium">Happy Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Toppers */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Hall of Fame</h2>
            <p className="text-gray-600">Celebrating the hard work and dedication of our top performers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {toppers.map((topper, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:shadow-xl transition-all"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/10 rounded-bl-[100px] -z-10 group-hover:scale-150 transition-transform"></div>
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                   {/* Fallback avatar if no image */}
                   <span className="text-3xl font-black text-gray-300">{topper.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{topper.name}</h3>
                <div className="text-secondary font-black text-2xl mb-4">{topper.score}</div>
                <div className="space-y-2">
                  <div className="bg-primary/5 text-primary text-sm font-bold py-1 px-3 rounded-full inline-block">{topper.exam}</div>
                  <div className="text-sm font-medium text-gray-600 block">{topper.rank}</div>
                  <div className="text-xs text-gray-400 block">{topper.tag}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
