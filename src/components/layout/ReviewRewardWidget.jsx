import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, ExternalLink, Smartphone, Gift, Upload, Send, CheckCircle2 } from "lucide-react";

// Google G Icon SVG
const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true" focusable="false">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

const GOOGLE_REVIEW_URL = "https://www.google.com/search?q=dkk+hospital+kanchipuram&oq=dkk+hospital&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg7MgcIAhAAGIAEMggIAxAAGBYYHjIICAQQABgWGB4yCAgFEAAYFhgeMgYIBhBFGDwyBggHEEUYPdIBCDM1NTRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#sv=CAESzAEKuAEStQEKd0FKaVQ0dExRaVZFX3kwSFlMamZRNDBhajF4X3E1UlNxOFh1ZXBSZWpOT2loQ2U1dUpMYUpBY3RuRkhoMnU2aWZkRzRoQi1mUms0M1lHTWhlN3hKVGw0bVhCbF92RHd0TmR4M2FaYTZTS3I4OXFQT3V1WlhOYVF3EhY5TWs4YXRqekVwS01zZU1QbEtMdWVBGiJBRHNyOWZUeUNzUzBGOEJqM184aVNESXZ2YjNhWTlGaHVnEgQ4MDUxGgEzKgAwADgBQAAYACC3uaabC0oCEAI";
const BOOK_URL = "https://whatsform.com/xklykw";
const WA_NUMBER = "919790122269";

export function ReviewRewardWidget() {
  const [mounted, setMounted] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show after 3 seconds, no persistence
    const timer = setTimeout(() => {
      setMounted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col items-center md:bottom-28 md:left-auto md:right-7 md:w-auto md:max-w-none md:-translate-x-0 md:items-end">
      <AnimatePresence mode="wait">
        {!minimized ? (
          <ReviewPopupCard 
            key="maximized" 
            onMinimize={() => setMinimized(true)} 
            showForm={showForm} 
            setShowForm={setShowForm} 
          />
        ) : (
          <ReviewMinimizedIcon 
            key="minimized" 
            onMaximize={() => setMinimized(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ReviewPopupCard({ onMinimize, showForm, setShowForm }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 50, opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="w-full overflow-hidden rounded-2xl border border-sky-100 bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_rgb(0,0,0,0.12)] md:w-80"
    >
      {/* Header Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 to-emerald-400" />
      
      <div className="relative p-5">
        <button
          onClick={onMinimize}
          className="absolute right-3 top-3 rounded-full bg-slate-100 p-1.5 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800"
          aria-label="Minimize widget"
        >
          <X className="h-4 w-4" />
        </button>

        {!showForm ? (
          <>
            {/* Google Rating */}
            <div className="mb-3 flex items-center gap-1.5">
              <GoogleIcon />
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">4.9 Rating</span>
            </div>

            <h3 className="mb-1 text-lg font-extrabold text-sky-950">
              Share Your Experience & Save! ⭐
            </h3>
            <p className="mb-4 text-xs font-medium leading-relaxed text-slate-600">
              Leave us a Google review and get a <span className="font-bold text-emerald-600">Free Skin / Dental Consultation</span> at Sri D.K.K. Multispeciality Hospital, Kanchipuram.
            </p>

            <ReviewSteps />
            <ReviewCTAButtons />

            <div className="mt-4 border-t border-slate-100 pt-3">
              <button
                onClick={() => setShowForm(true)}
                className="w-full text-center text-[11px] font-semibold text-sky-600 transition hover:text-sky-800 hover:underline"
              >
                Already reviewed? Claim your discount →
              </button>
            </div>
          </>
        ) : (
          <ReviewSubmitForm onBack={() => setShowForm(false)} />
        )}
      </div>

      {!showForm && (
        <div className="flex items-center justify-between bg-slate-50/80 px-5 py-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-bold text-slate-700">REVIEW10</span>
          </div>
          <span className="text-[10px] font-medium text-slate-500">
            Valid for 30 Days
          </span>
        </div>
      )}
    </motion.div>
  );
}

function ReviewMinimizedIcon({ onMaximize }) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onMaximize}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl border border-sky-100 relative group overflow-hidden"
      aria-label="Open review widget"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-50 to-emerald-50 opacity-0 transition-opacity group-hover:opacity-100" />
      <GoogleIcon />
      {/* Notification dot */}
      <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
    </motion.button>
  );
}

function ReviewSteps() {
  return (
    <div className="mb-5 space-y-2.5 text-[11px] text-slate-600 font-medium">
      <div className="flex items-start gap-2.5">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-sky-100 text-[10px] font-bold text-sky-700">1</span>
        <p className="leading-snug">Click <span className="font-bold text-slate-800">"Write a Review"</span></p>
      </div>
      <div className="flex items-start gap-2.5">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-sky-100 text-[10px] font-bold text-sky-700">2</span>
        <p className="leading-snug">Post your honest experience on Google</p>
      </div>
      <div className="flex items-start gap-2.5">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-sky-100 text-[10px] font-bold text-sky-700">3</span>
        <p className="leading-snug">Upload screenshot via WhatsApp and receive your discount code 🎁</p>
      </div>
    </div>
  );
}

function ReviewCTAButtons() {
  return (
    <div className="flex flex-col gap-2.5">
      <motion.a
        href={GOOGLE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-sky-700 hover:shadow-sky-500/30"
        animate={{
          scale: [1, 1, 1.03, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          times: [0, 0.9, 0.95, 1],
        }}
      >
        <Star className="h-4 w-4 fill-white" />
        <span className="relative z-10">Write a Review</span>
        <ExternalLink className="h-3.5 w-3.5 relative z-10 opacity-70" />
      </motion.a>

      <a
        href={BOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-emerald-500 bg-white px-4 py-2.5 text-xs font-bold text-emerald-600 transition-colors hover:bg-emerald-50"
      >
        <Smartphone className="h-3.5 w-3.5" />
        Book Your Consultation
      </a>
    </div>
  );
}

function ReviewSubmitForm({ onBack }) {
  const [form, setForm] = useState({ name: "", phone: "", screenshot: null });
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("idle");
  const fileRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({ ...f, screenshot: file }));
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.screenshot) return;
    setStatus("submitting");

    const discount = "REVIEW10";
    const msg = encodeURIComponent(
      `🙏 Thank you, ${form.name}!\n\nWe received your Google review — our team really appreciates it!\n\n✅ Your exclusive discount code: *${discount}*\nUse it to get a *Free Skin / Dental Consultation* at Sri D.K.K. Hospital.\n\n📅 Book now: ${BOOK_URL}\n\nSee you soon! 🏥`
    );
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${msg}`;

    await new Promise((r) => setTimeout(r, 1200));
    setStatus("done");
    setTimeout(() => window.open(waUrl, "_blank", "noopener"), 800);
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        <p className="text-base font-bold text-sky-950">You're all set! 🎉</p>
        <p className="text-xs text-slate-600 mb-2">
          Check WhatsApp — your reward is on its way!
        </p>
        <button
          onClick={onBack}
          className="w-full rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-sky-700"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <button 
          type="button" 
          onClick={onBack} 
          className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="text-xs font-extrabold uppercase tracking-widest text-sky-600">
          Claim Your Reward
        </p>
      </div>
      
      <p className="text-[11px] text-slate-600 mb-1 leading-relaxed">
        Show us your review screenshot and we'll send your <span className="font-bold text-emerald-600">Free Consultation</span> code via WhatsApp.
      </p>

      <input
        type="text"
        placeholder="Your name *"
        required
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="rounded-xl border border-sky-100 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      />
      <input
        type="tel"
        placeholder="WhatsApp number * (+91...)"
        required
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        className="rounded-xl border border-sky-100 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      />

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sky-200 bg-sky-50 px-4 py-3 text-xs font-bold text-sky-700 transition hover:bg-sky-100"
      >
        <Upload className="h-4 w-4" />
        <span className="truncate max-w-[200px]">
          {form.screenshot ? form.screenshot.name : "Upload review screenshot *"}
        </span>
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-20 w-full rounded-xl border border-sky-100 object-cover"
        />
      )}

      <button
        type="submit"
        disabled={!form.name || !form.phone || !form.screenshot || status === "submitting"}
        className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-600 disabled:opacity-50"
      >
        {status === "submitting" ? (
          <span className="animate-pulse">Sending…</span>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Get Discount Code
          </>
        )}
      </button>
    </form>
  );
}
