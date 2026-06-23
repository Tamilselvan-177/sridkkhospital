import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, RefreshCw, Send, Phone, MapPin, ChevronRight } from "lucide-react"
import { siteData } from "../../data/siteData"
import { toWhatsAppLink } from "../../utils/forms"

// ─── Decision tree ─────────────────────────────────────────────────────────────
// Each node: { message, options: [{ label, next }], whatsapp?, callNow?, externalLink? }
const TREE = {
  start: {
    message: "Hi there! 👋 I'm DKK Bot from SRI DKK Hospital. How can I help you today?",
    options: [
      { label: "📅 Book an Appointment", next: "book" },
      { label: "🦷 Ask about Treatments", next: "treatments" },
      { label: "💰 Pricing & Offers", next: "pricing" },
      { label: "📍 Timings & Location", next: "location" },
      { label: "🚨 Emergency / Urgent Care", next: "emergency" },
    ],
  },
  book: {
    message: "Sure! When are you looking to visit us?",
    options: [
      { label: "🗓 Today", next: "book_today" },
      { label: "📆 This Week", next: "book_week" },
      { label: "👨‍⚕️ Help me pick a specialist", next: "book_doctor" },
    ],
  },
  book_today: {
    message:
      "Great choice! We have slots available today from 10 AM – 8 PM. Tap below and I'll connect you with our team on WhatsApp to confirm your slot right away. 🙌",
    whatsapp: "Hi! I'd like to book an appointment today at SRI DKK Hospital. Please confirm a slot for me.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  book_week: {
    message:
      "No problem! We're open every day, Monday–Sunday, 10 AM to 8 PM. Share your preferred date on WhatsApp and we'll lock in a convenient slot for you. 😊",
    whatsapp:
      "Hi! I'd like to book an appointment this week at SRI DKK Hospital. Please share available slots.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  book_doctor: {
    message: "Which department are you looking for? I'll point you to the right specialist.",
    options: [
      { label: "🦷 Dental / Smile", next: "book_dental" },
      { label: "✨ Aesthetics / Skin / Hair", next: "book_aesthetic" },
      { label: "👶 Child Care", next: "book_child" },
      { label: "🩺 Gynaecology", next: "book_gynae" },
      { label: "🦴 Orthopaedic", next: "book_ortho" },
      { label: "💊 General Medicine", next: "book_general" },
    ],
  },
  book_dental: {
    message:
      "Our senior dental specialists Dr. D.K. Nagu Sah and Dr. D.K.N. Sriprakash are available daily. Best part — your **first dental consultation is FREE**! 🎉",
    whatsapp: "Hi! I'd like to book a dental consultation at SRI DKK Hospital. Is there a free slot available?",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  book_aesthetic: {
    message:
      "Our certified dermatologists handle Botox, Fillers, Laser Hair Removal, Hair PRP, and Skin Lightening. We also have special combo packages this month! ✨",
    whatsapp:
      "Hi! I'm interested in medical aesthetics at SRI DKK Hospital. Please share package details and available slots.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  book_child: {
    message:
      "Our child care team is wonderful with kids — calm, friendly, and thorough. Walk-in is welcome or you can book in advance for a shorter wait. 👶",
    whatsapp: "Hi! I'd like to book a child care / paediatric consultation at SRI DKK Hospital.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  book_gynae: {
    message:
      "Our gynaecology team provides compassionate and confidential care. Every consultation is handled with full privacy and professionalism. 💙",
    whatsapp: "Hi! I'd like to book a gynaecology consultation at SRI DKK Hospital.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  book_ortho: {
    message:
      "Our orthopaedic specialists handle bone, joint, and spine conditions with advanced diagnostics. Let's get you in for a consultation! 🦴",
    whatsapp: "Hi! I'd like to book an orthopaedic consultation at SRI DKK Hospital.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  book_general: {
    message:
      "Our general physicians are available daily for check-ups, diagnoses, prescriptions and follow-ups. No long waits! 💊",
    whatsapp: "Hi! I'd like to book a general medicine appointment at SRI DKK Hospital.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  treatments: {
    message: "We cover a wide range of treatments. Which one would you like to know about?",
    options: [
      { label: "🦷 Root Canal / Dental Implants", next: "t_dental" },
      { label: "💉 Botox / Fillers", next: "t_botox" },
      { label: "💆 Hair PRP / Hair GFC", next: "t_hair" },
      { label: "🔆 Laser / Skin Lightening", next: "t_laser" },
      { label: "😁 Smile Designing", next: "t_smile" },
      { label: "↩ Back", next: "start" },
    ],
  },
  t_dental: {
    message:
      "Root Canal Treatment saves your natural tooth without pain — our specialists are extremely experienced. Dental Implants offer a permanent, natural-looking replacement. 12+ years of expertise! 💪",
    whatsapp: "Hi! I'd like to know more about dental treatment options at SRI DKK Hospital.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  t_botox: {
    message:
      "We use FDA-approved Botox and Fillers for anti-aging, contouring and skin rejuvenation. Quick procedure, no surgery, natural results. Effects last 6–12 months. ✨",
    whatsapp: "Hi! I'd like to know more about Botox and Fillers at SRI DKK Hospital.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  t_hair: {
    message:
      "Hair PRP and Hair GFC are both non-surgical treatments using your own blood's growth factors to fight hair fall and stimulate regrowth. Minimal downtime, visible results! 💆",
    whatsapp: "Hi! I'm interested in Hair PRP or Hair GFC at SRI DKK Hospital. Please share details.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  t_laser: {
    message:
      "Our Laser Hair Removal and Skin Lightening treatments are done by certified dermatologists and are safe for all skin types. You'll see results from the very first session! 🔆",
    whatsapp:
      "Hi! I'd like to know more about Laser Hair Removal or Skin Lightening at SRI DKK Hospital.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  t_smile: {
    message:
      "Smile Designing is a complete aesthetic makeover for your smile — veneers, whitening, reshaping — personalised for your face shape. Consult with our smile experts today! 😁",
    whatsapp: "Hi! I'm interested in Smile Designing at SRI DKK Hospital. Please share details.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  pricing: {
    message:
      "We believe in fair, transparent pricing — no hidden charges. We also have a FREE first dental consultation and special aesthetic combo packages this month! 🎁",
    options: [
      { label: "💬 Get a Quote on WhatsApp", next: "pricing_wa" },
      { label: "🎁 Claim Free Dental Consult", next: "book_dental" },
      { label: "↩ Back", next: "start" },
    ],
  },
  pricing_wa: {
    message:
      "I'll connect you with our team who can give you an exact estimate based on your needs. They usually respond within minutes! ⚡",
    whatsapp:
      "Hi! I'd like a price estimate for treatment at SRI DKK Hospital. Please share details.",
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  location: {
    message:
      "We're located right in the heart of Kanchipuram! 📍\n\n🏥 Sheikpet Nadu St, Kanchipuram, Tamil Nadu – 631501\n\n⏰ Mon–Sun: 10 AM to 8 PM\n📞 +91 9790122269",
    options: [
      { label: "🗺 Open in Google Maps", next: "location_maps" },
      { label: "📅 Book an Appointment", next: "book" },
      { label: "↩ Back", next: "start" },
    ],
  },
  location_maps: {
    message: "Tap below to open Google Maps — it'll take you straight to our hospital. See you soon! 🙏",
    externalLink: {
      label: "📍 Open Google Maps",
      url: "https://maps.google.com/?q=Sri+DKK+Multispeciality+Hospital+Kanchipuram",
    },
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
  emergency: {
    message:
      "🚨 Please don't wait — call us directly right now. Our emergency team responds within 10 minutes.\n\n📞 +91 9790122269\n\nFor emergencies, always call — don't wait for a chat reply.",
    callNow: true,
    options: [{ label: "↩ Back to Main Menu", next: "start" }],
  },
}

// ─── Types of messages in the chat history ──────────────────────────────────
// { id, type: "bot" | "user" | "action", text, action? }

let msgId = 0
const newMsg = (type, text, meta = {}) => ({ id: ++msgId, type, text, ...meta })

const TYPING_DELAY = 900 // ms before bot "sends" reply

// ─── Avatar ──────────────────────────────────────────────────────────────────
function BotAvatar() {
  return (
    <div className="relative flex-shrink-0">
      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-[13px] font-bold text-white shadow-md">
        P
      </div>
      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
    </div>
  )
}

// ─── Typing indicator ────────────────────────────────────────────────────────
function TypingBubble() {
  return (
    <div className="flex items-end gap-2">
      <BotAvatar />
      <div className="rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-slate-400"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Message bubble ──────────────────────────────────────────────────────────
function MessageBubble({ msg }) {
  if (msg.type === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex justify-end"
      >
        <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-sky-600 px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm">
          {msg.text}
        </div>
      </motion.div>
    )
  }

  if (msg.type === "bot") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-end gap-2"
      >
        <BotAvatar />
        <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-sm leading-relaxed text-slate-800 shadow-sm ring-1 ring-slate-100">
          <p className="whitespace-pre-line">{msg.text}</p>
        </div>
      </motion.div>
    )
  }

  // action — WhatsApp / call / maps CTA card
  if (msg.type === "action") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end gap-2"
      >
        <div className="h-8 w-8 flex-shrink-0" /> {/* spacer for avatar column */}
        <div className="w-full max-w-[84%]">
          {msg.callNow && (
            <a
              href={`tel:${siteData.contact.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow transition hover:bg-red-700"
            >
              <Phone className="h-4 w-4" />
              Call Emergency Line Now
            </a>
          )}
          {msg.externalLink && (
            <a
              href={msg.externalLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-700 shadow-sm transition hover:bg-sky-100"
            >
              <MapPin className="h-4 w-4" />
              {msg.externalLink.label}
              <ChevronRight className="ml-auto h-4 w-4" />
            </a>
          )}
          {msg.whatsapp && (
            <button
              onClick={msg.onWhatsApp}
              className="flex w-full items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700"
            >
              {/* WhatsApp SVG icon */}
              <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Continue on WhatsApp
            </button>
          )}
        </div>
      </motion.div>
    )
  }

  return null
}

// ─── Quick reply chip ─────────────────────────────────────────────────────────
function QuickReply({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-sky-200 bg-white px-3.5 py-1.5 text-xs font-medium text-sky-700 shadow-sm transition hover:border-sky-400 hover:bg-sky-50 active:scale-95"
    >
      {label}
    </button>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────
export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [options, setOptions] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [nodeKey, setNodeKey] = useState("start")
  const [showPulse, setShowPulse] = useState(true)
  const [unread, setUnread] = useState(1)
  const bottomRef = useRef(null)

  // Push a node's bot message + action cards into history after a typing delay
  const pushNode = useCallback((key, userText) => {
    const node = TREE[key]
    if (!node) return

    setNodeKey(key)
    setOptions([]) // clear options while typing

    // Show user's choice as a bubble first
    if (userText) {
      setMessages((prev) => [...prev, newMsg("user", userText)])
    }

    // Show typing indicator
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)

      // Add bot reply
      setMessages((prev) => [...prev, newMsg("bot", node.message)])

      // Add action card(s) if any
      if (node.callNow || node.externalLink || node.whatsapp) {
        const onWhatsApp = node.whatsapp
          ? () => {
              const link = toWhatsAppLink(siteData.contact.whatsapp, node.whatsapp)
              window.open(link, "_blank", "noopener,noreferrer")
            }
          : undefined

        setMessages((prev) => [
          ...prev,
          newMsg("action", "", {
            callNow: node.callNow,
            externalLink: node.externalLink,
            whatsapp: node.whatsapp,
            onWhatsApp,
          }),
        ])
      }

      // Show options
      setOptions(node.options || [])
    }, TYPING_DELAY)
  }, [])

  // Open: show initial greeting
  useEffect(() => {
    if (open && messages.length === 0) {
      pushNode("start")
    }
    if (open) setUnread(0)
  }, [open, messages.length, pushNode])

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping, options])

  // Stop attention pulse after 8s
  useEffect(() => {
    const t = setTimeout(() => setShowPulse(false), 8000)
    return () => clearTimeout(t)
  }, [])

  function handleOption(option) {
    pushNode(option.next, option.label)
  }

  function handleReset() {
    setMessages([])
    setOptions([])
    setIsTyping(false)
    setNodeKey("start")
    // re-trigger greeting
    setTimeout(() => pushNode("start"), 50)
  }

  return (
    <>
      {/* ── Floating trigger button ─────────────────────────────────────── */}
      {/* Mobile:   sits above StickyMobileCTA (≈60px), to the LEFT of WhatsApp (right-4+3.5rem) */}
      {/* Desktop:  sits bottom-7, right offset so it's beside the WhatsApp button             */}
      <div className="fixed bottom-[5.5rem] right-[4.5rem] z-[60] md:bottom-7 md:right-24">
        {/* Pulse ring */}
        {showPulse && !open && (
          <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-sky-400/50" />
        )}

        <motion.button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close chat" : "Chat with us"}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-[0_8px_24px_-4px_rgba(14,165,233,0.65)] transition-shadow hover:shadow-[0_12px_30px_-4px_rgba(14,165,233,0.75)]"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -80, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 80, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 80, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -80, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {/* Realistic chat bubble SVG */}
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 28 28"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4h20a2 2 0 012 2v12a2 2 0 01-2 2H9l-5 4V6a2 2 0 012-2z"
                    fill="rgba(255,255,255,0.18)"
                  />
                  <circle cx="10" cy="11" r="1.2" fill="currentColor" stroke="none" />
                  <circle cx="14" cy="11" r="1.2" fill="currentColor" stroke="none" />
                  <circle cx="18" cy="11" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>

          {/* Unread badge */}
          {!open && unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow"
            >
              {unread}
            </motion.span>
          )}
        </motion.button>

        {/* Label tooltip — shown when closed */}
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-xl bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg md:block"
          >
            Chat with us
            <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900/90" />
          </motion.div>
        )}
      </div>

      {/* ── Chat window ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed z-[60] flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-[0_24px_60px_-12px_rgba(15,23,42,0.28)]"
            style={{
              // Chat window sits above the trigger button
              // trigger is at bottom-[5.5rem] on mobile, bottom-7 on desktop
              bottom: "calc(5.5rem + 3.75rem + 0.75rem)",
              right: "1rem",
              width: "min(22rem, calc(100vw - 2rem))",
              maxHeight: "min(560px, calc(100vh - 14rem))",
            }}
            // Desktop override via inline style would require JS; we use a clsx trick:
          >
            {/* Header */}
            <div className="flex flex-shrink-0 items-center gap-3 bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-3.5">
              {/* Avatar */}
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/20 text-base font-bold text-white shadow-inner">
                  P
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-sky-600 bg-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-bold text-white">DKK Bot · SRI DKK Hospital</p>
                <p className="flex items-center gap-1.5 text-xs text-sky-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online · Typically replies in minutes
                </p>
              </div>
              <button
                onClick={handleReset}
                title="Start over"
                aria-label="Reset conversation"
                className="rounded-lg p-1.5 text-sky-200 transition hover:bg-white/15 hover:text-white"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-lg p-1.5 text-sky-200 transition hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Date divider */}
            <div className="flex-shrink-0 py-2 text-center">
              <span className="rounded-full bg-slate-200/80 px-3 py-1 text-[11px] font-medium text-slate-500">
                Today
              </span>
            </div>

            {/* Messages area */}
            <div className="flex-1 space-y-3.5 overflow-y-auto px-4 pb-3">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              {isTyping && <TypingBubble />}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <AnimatePresence>
              {options.length > 0 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex-shrink-0 border-t border-slate-200 bg-white px-4 pb-4 pt-3"
                >
                  <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Choose a reply
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {options.map((opt) => (
                      <QuickReply
                        key={opt.next}
                        label={opt.label}
                        onClick={() => handleOption(opt)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Powered-by strip */}
            <div className="flex-shrink-0 border-t border-slate-100 bg-white py-2 text-center">
              <p className="text-[10px] text-slate-400">
                🏥 Sri D.K.K. Multispeciality Hospital · Kanchipuram
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
