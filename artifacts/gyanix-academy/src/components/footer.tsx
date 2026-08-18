import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="text-white pt-16 pb-8 border-t-2 border-[#047857]/30" style={{ background: "linear-gradient(135deg, #022c22 0%, #064e3b 40%, #046c4e 70%, #047857 100%)" }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 28L20 12L28 28" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 20L24 20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="28" cy="12" r="4" fill="#F5821F"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white leading-none tracking-tight">Gyanix</span>
                <span className="text-[9px] font-bold text-secondary tracking-[0.25em] leading-none mt-1">ACADEMY</span>
              </div>
            </div>
            <p className="text-secondary text-xs font-semibold italic mb-3">"Lighting the way to excellence"</p>
            <p className="text-white/75 text-sm mb-6 leading-relaxed">
              School · Coaching · Hostel — A complete residential institute in Kaithal, Haryana, preparing students from Class 5th to 12th for top competitive exams.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/GyanixAcademy"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/gyanix_academy"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918950175314"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors text-white"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-5 text-white">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/courses", label: "Our Courses" },
                { href: "/scholarship", label: "G-SET Scholarship" },
                { href: "/results", label: "Results & Achievements" },
                { href: "/faculty", label: "Our Faculty" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/75 hover:text-secondary transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-base font-bold mb-5 text-white">Our Courses</h4>
            <ul className="flex flex-col gap-3">
              {["IIT-JEE", "NEET", "NDA & Defence", "CUET", "RMS & Sainik School", "School Boards (5–12th)", "Olympiads", "Foundation", "G-SET Scholarship"].map((c) => (
                <li key={c}>
                  <Link href="/courses" className="text-white/75 hover:text-secondary transition-colors text-sm">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-bold mb-5 text-white">Contact Info</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1.5">
                  <span className="text-white/75">Karnal Road, Street No. 4, Near New Bus Stand, Defence Colony, Kaithal, Haryana – 136027</span>
                  <a
                    href="https://maps.app.goo.gl/8phnpfA2nXru4tXS8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-secondary hover:text-white font-semibold transition-colors text-xs"
                  >
                    <MapPin className="w-3 h-3" /> View on Google Maps →
                  </a>
                </div>
              </li>
              <li className="flex flex-col gap-1.5 text-sm">
                <a href="tel:+918950175314" className="flex items-center gap-3 text-white/75 hover:text-secondary transition-colors">
                  <Phone className="w-4 h-4 text-secondary shrink-0" />
                  89501-75314
                </a>
                <a href="tel:+918950275314" className="flex items-center gap-3 text-white/75 hover:text-secondary transition-colors pl-7">
                  89502-75314
                </a>
              </li>
              <li>
                <a href="mailto:gyanixacademy@gmail.com" className="flex items-center gap-3 text-white/75 hover:text-secondary transition-colors text-sm">
                  <Mail className="w-4 h-4 text-secondary shrink-0" />
                  gyanixacademy@gmail.com
                </a>
              </li>
              {/* Ratings */}
              <li className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-white/75">
                  <span className="text-yellow-400 font-bold">★★★★★</span>
                  <span>Google: <strong className="text-white">5.0</strong> (59 reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/75">
                  <span className="text-yellow-400 font-bold">★★★★★</span>
                  <span>Justdial: <strong className="text-white">5.0</strong> (84 reviews)</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Gyanix Academy. All rights reserved. Est. 2025, Kaithal.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-white/50 hover:text-white text-sm">Privacy Policy</Link>
            <Link href="#" className="text-white/50 hover:text-white text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
