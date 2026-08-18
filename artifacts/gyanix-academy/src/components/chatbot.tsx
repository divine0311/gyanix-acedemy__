import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mic, MicOff, Volume2, VolumeX, Bot } from "lucide-react";

const RobotIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* Metallic Body */}
      <linearGradient id="silver" x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="20%" stopColor="#e2e8f0" />
        <stop offset="80%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      {/* Glossy Screen */}
      <linearGradient id="glass" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>
      {/* Neon Light */}
      <linearGradient id="neonLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      {/* 3D Highlights */}
      <radialGradient id="highlight" cx="35%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="screenHighlight" cx="50%" cy="25%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <g>
      {/* Glowing Aura behind Ears */}
      <ellipse cx="15" cy="60" rx="10" ry="20" fill="#06b6d4" filter="url(#strongGlow)" opacity="0.6" />
      <ellipse cx="105" cy="60" rx="10" ry="20" fill="#06b6d4" filter="url(#strongGlow)" opacity="0.6" />

      {/* Left Ear */}
      <path d="M 22 42 C 12 42 10 50 10 60 C 10 70 12 78 22 78 Z" fill="url(#neonLight)" />
      {/* Right Ear */}
      <path d="M 98 42 C 108 42 110 50 110 60 C 110 70 108 78 98 78 Z" fill="url(#neonLight)" />
      
      {/* Main Sphere Body */}
      <circle cx="60" cy="60" r="46" fill="url(#silver)" />
      <circle cx="60" cy="60" r="46" fill="url(#highlight)" />
      
      {/* Glowing rim around face */}
      <circle cx="60" cy="60" r="37" fill="none" stroke="#06b6d4" strokeWidth="2" filter="url(#glow)" opacity="0.9" />

      {/* Black Glass Face */}
      <circle cx="60" cy="60" r="36" fill="url(#glass)" />
      <circle cx="60" cy="60" r="36" fill="url(#screenHighlight)" />
      
      {/* Inner Face Shadow for depth */}
      <circle cx="60" cy="60" r="36" fill="none" stroke="#000000" strokeWidth="3" opacity="0.5" />

      {/* Eyes */}
      <circle cx="44" cy="56" r="8" fill="#a5f3fc" filter="url(#glow)" />
      <circle cx="44" cy="56" r="4" fill="#ffffff" />
      
      <circle cx="76" cy="56" r="8" fill="#a5f3fc" filter="url(#glow)" />
      <circle cx="76" cy="56" r="4" fill="#ffffff" />

      {/* Smile */}
      <path d="M 52 74 Q 60 82 68 74" stroke="#a5f3fc" strokeWidth="4.5" strokeLinecap="round" fill="none" filter="url(#glow)" />
      <path d="M 52 74 Q 60 82 68 74" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content: "Namaste! 🙏 Main Gyanix Academy ka assistant hoon. Courses, admission, scholarship, ya kisi bhi cheez ke baare mein poochhiye — Hindi ya English mein!",
};

// Browser speech recognition types
type SpeechRecognitionType = typeof window extends { SpeechRecognition: infer T } ? T :
  typeof window extends { webkitSpeechRecognition: infer T } ? T : never;

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [unread, setUnread] = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<InstanceType<SpeechRecognitionType> | null>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const speak = useCallback((text: string) => {
    if (!ttsEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    // Prefer Hindi voice if available, fallback to English
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find((v) => v.lang.startsWith("hi"));
    if (hiVoice) utterance.voice = hiVoice;
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }, [ttsEnabled]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.slice(-8);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = await res.json() as { reply?: string; error?: string };
      const reply = data.reply ?? data.error ?? "Kuch error aa gayi. Dobara try karo.";
      const botMsg: Message = { role: "assistant", content: reply };

      setMessages((prev) => [...prev, botMsg]);
      speak(reply);

      if (!open) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please check your connection." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages, open, speak]);

  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert("Aapka browser voice input support nahi karta. Please Chrome use karein.");
      return;
    }

    const recognition = new SR() as any;
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "hi-IN"; // Hindi + English both work

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (e: any) => {
      const transcript: string = e.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognition.start();
  }, [sendMessage]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <div className="fixed bottom-6 left-6 z-50 flex items-end gap-2">
        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative flex items-center justify-center transition-all outline-none group ${
            open
              ? "w-14 h-14 rounded-full bg-white shadow-xl border-2 border-blue-400 z-50"
              : "w-[85px] h-[85px] bg-transparent z-50 hover:-translate-y-2 drop-shadow-[0_15px_25px_rgba(59,130,246,0.35)]"
          }`}
          aria-label="Open chat"
        >
          {open && <span className="absolute -inset-1 rounded-full bg-blue-400/30 animate-ping opacity-75 pointer-events-none" />}
          
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="w-7 h-7 text-blue-600" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative w-full h-full">
                <RobotIcon className="w-full h-full" />
                {unread > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-bounce border-2 border-white">
                    {unread}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        {!open && (
          <motion.div 
            initial={{ opacity: 0, x: -10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-blue-300/40 pointer-events-none mb-3"
          >
            <span>🤖 AI Assistant</span>
          </motion.div>
        )}
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-4 sm:left-6 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-gray-100 bg-white"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="bg-primary px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden border border-white/20">
                <RobotIcon className="w-9 h-9 object-cover rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm">Gyanix Assistant</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                  <span className="text-white/70 text-xs">Online — हिंदी / English</span>
                </div>
              </div>
              <button
                onClick={() => setTtsEnabled((v) => !v)}
                className="text-white/70 hover:text-white transition-colors"
                title={ttsEnabled ? "Mute voice" : "Enable voice"}
              >
                {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 mr-2 mt-0.5 overflow-hidden">
                      <RobotIcon className="w-6 h-6 object-contain" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 mr-2 overflow-hidden">
                    <RobotIcon className="w-6 h-6 object-contain" />
                  </div>
                  <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-2 h-2 bg-primary/40 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-100 px-3 py-2.5 flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Kuch poochhiye… (Type or 🎤)"
                disabled={loading || listening}
                className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 disabled:opacity-50"
              />

              {/* Mic button */}
              <button
                onClick={listening ? stopListening : startListening}
                disabled={loading}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                  listening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary"
                }`}
                title={listening ? "Stop listening" : "Speak your question"}
              >
                {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Send button */}
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
