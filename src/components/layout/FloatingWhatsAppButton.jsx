import { MessageCircleMore } from "lucide-react"
import { toWhatsAppLink } from "../../utils/forms"

export function FloatingWhatsAppButton({ whatsapp }) {
  const href = toWhatsAppLink(
    whatsapp,
    "Hi Sri D.K.K Hospital, I need details about treatment and appointment.",
  )

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[5.5rem] right-4 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_16px_30px_-10px_rgba(16,185,129,0.7)] transition hover:scale-105 hover:bg-emerald-600 md:bottom-7 md:right-7"
    >
      <MessageCircleMore className="h-7 w-7" />
    </a>
  )
}
