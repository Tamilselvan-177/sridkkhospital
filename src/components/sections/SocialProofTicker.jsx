import { useEffect, useRef } from "react"
import { Star, Users, ShieldCheck, Award } from "lucide-react"

const ITEMS = [
  { icon: Users, text: "150,000+ patients treated successfully" },
  { icon: Star, text: "4.9 ⭐ Google Rating — 200+ reviews" },
  { icon: ShieldCheck, text: "98% patient satisfaction rate" },
  { icon: Award, text: "12+ years of trusted multispeciality care" },
  { icon: Users, text: "30+ doctors & specialists on-site" },
  { icon: ShieldCheck, text: "Emergency response in under 10 minutes" },
  { icon: Star, text: "FREE dental consultation — book today" },
  { icon: Award, text: "Advanced diagnostics & surgical equipment" },
]

// Duplicated for seamless loop
const TICKER_ITEMS = [...ITEMS, ...ITEMS]

export function SocialProofTicker() {
  return (
    <div className="overflow-hidden border-y border-sky-100 bg-sky-50/80 py-2.5">
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{
          animation: "ticker 35s linear infinite",
        }}
      >
        {TICKER_ITEMS.map((item, i) => (
          <span
            key={i}
            className="inline-flex flex-shrink-0 items-center gap-2 text-sm font-medium text-sky-800"
          >
            <item.icon className="h-4 w-4 flex-shrink-0 text-sky-600" />
            {item.text}
            <span className="text-sky-300 mx-2">•</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
