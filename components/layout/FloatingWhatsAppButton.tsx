import { toWhatsAppLink } from '@/lib/utils'

// Official WhatsApp logo SVG
const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M16 1C7.716 1 1 7.716 1 16c0 2.628.68 5.1 1.872 7.248L1 31l7.98-1.848A14.944 14.944 0 0 0 16 31c8.284 0 15-6.716 15-15S24.284 1 16 1Z"
      fill="#25D366"
    />
    <path
      d="M16 3.5C9.096 3.5 3.5 9.096 3.5 16c0 2.368.637 4.588 1.75 6.5L3.5 28.5l6.25-1.75A12.46 12.46 0 0 0 16 28.5c6.904 0 12.5-5.596 12.5-12.5S22.904 3.5 16 3.5Z"
      fill="#25D366"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.003 18.93c-.308-.154-1.822-.899-2.104-.999-.282-.1-.487-.154-.692.154-.205.308-.795.999-.973 1.204-.18.205-.359.23-.667.077-.308-.154-1.3-.479-2.476-1.528-.916-.817-1.534-1.825-1.714-2.132-.18-.308-.02-.474.135-.627.14-.138.308-.359.462-.539.154-.18.205-.308.308-.513.103-.205.051-.385-.026-.539-.077-.154-.692-1.668-.948-2.285-.25-.6-.504-.518-.692-.528-.18-.009-.385-.01-.59-.01-.205 0-.539.077-.82.385-.282.308-1.077 1.052-1.077 2.567 0 1.514 1.103 2.977 1.257 3.182.154.205 2.17 3.312 5.258 4.642.734.317 1.308.506 1.754.648.737.235 1.409.202 1.939.122.591-.089 1.822-.745 2.078-1.464.257-.719.257-1.335.18-1.464-.077-.128-.282-.205-.59-.359Z"
      fill="white"
    />
  </svg>
)

export function FloatingWhatsAppButton({ whatsapp }: { whatsapp: string }) {
  const href = toWhatsAppLink(
    whatsapp,
    'Hi Sri D.K.K Hospital, I need details about treatment and appointment.',
  )

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[5.5rem] right-4 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl shadow-slate-200/50 border border-slate-100 transition hover:scale-105 hover:bg-slate-50 md:bottom-7 md:right-7"
    >
      <WhatsAppIcon />
    </a>
  )
}
