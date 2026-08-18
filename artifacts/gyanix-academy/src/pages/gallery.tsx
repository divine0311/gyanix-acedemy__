import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

import gal1 from "@assets/generated_images/gallery-1.jpg";
import gal2 from "@assets/generated_images/gallery-2.jpg";
import gal3 from "@assets/generated_images/gallery-3.jpg";
import gal4 from "@assets/generated_images/gallery-4.jpg";
import gal5 from "@assets/generated_images/gallery-5.jpg";
import gal6 from "@assets/generated_images/gallery-6.jpg";

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const images = [
    { src: gal1, alt: "Road safety awareness programme" },
    { src: gal2, alt: "Admission open banner ceremony" },
    { src: gal3, alt: "Students in classroom attentively studying" },
    { src: gal4, alt: "Students receiving certificates" },
    { src: gal5, alt: "Students smiling outdoors" },
    { src: gal6, alt: "Teacher explaining concepts" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-primary mb-6"
          >
            Life at Gyanix
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            A glimpse into our vibrant learning environment, celebrations, and achievements.
          </motion.p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid"
              onClick={() => setSelectedImg(img.src)}
            >
              <img src={img.src} alt={img.alt} className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                <ZoomIn className="w-8 h-8 mb-2" />
                <span className="font-medium">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-secondary transition-colors z-50"
              onClick={() => setSelectedImg(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg}
              alt="Enlarged gallery image"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
