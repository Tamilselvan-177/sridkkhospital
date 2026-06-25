import { SectionHeader } from '../common/SectionHeader'

// ── Review data (duplicated in JSX for seamless loop) ─────────
const REVIEWS = [
  {
    id: 1,
    name: 'Kavitha R.',
    initial: 'K',
    color: '#0ea5e9',
    text: 'The doctors at DKK Hospital are extremely caring and skilled. I recovered faster than I expected. Truly the best hospital in Kanchipuram.',
  },
  {
    id: 2,
    name: 'Suresh M.',
    initial: 'S',
    color: '#8b5cf6',
    text: 'Very professional staff and excellent treatment. The hospital is clean, well-equipped, and the doctors explain everything patiently.',
  },
  {
    id: 3,
    name: 'Anitha B.',
    initial: 'A',
    color: '#10b981',
    text: 'I had my surgery at DKK Hospital and the entire team was so supportive. I felt completely safe and well cared for throughout.',
  },
  {
    id: 4,
    name: 'Muthu K.',
    initial: 'M',
    color: '#f59e0b',
    text: 'Best hospital experience I have had. Experienced doctors, kind nurses, and smooth treatment process from start to finish.',
  },
  {
    id: 5,
    name: 'Deepa S.',
    initial: 'D',
    color: '#ef4444',
    text: 'Came here for a second opinion and received the most honest and helpful advice. DKK Hospital genuinely cares about patients.',
  },
]

// ── Single review card ────────────────────────────────────────
function ReviewCard({ review }) {
  return (
    <div className="mrq-card">
      {/* Header: avatar + name + Google badge */}
      <div className="mrq-card__header">
        <div
          className="mrq-card__avatar"
          style={{ background: review.color }}
          aria-hidden="true"
        >
          {review.initial}
        </div>
        <div className="mrq-card__meta">
          <div className="mrq-card__name-row">
            <span className="mrq-card__name">{review.name}</span>
            {/* Google "G" badge */}
            <span className="mrq-card__gbadge" aria-label="Google review">
              <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
            </span>
          </div>
          {/* Stars */}
          <div className="mrq-card__stars" aria-label="5 stars">
            {'★★★★★'.split('').map((s, i) => (
              <span key={i} className="mrq-card__star">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Review text */}
      <p className="mrq-card__text">"{review.text}"</p>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────
export function TestimonialsCarousel() {
  return (
    <>
      <style>{`
        /* ── Section ─────────────────────────────────────────── */
        .mrq-section {
          padding: 4.5rem 0;
          background: linear-gradient(180deg, #f8fdff 0%, #f0f9ff 100%);
          overflow: hidden;
        }

        /* ── Scrolling strip wrapper ─────────────────────────── */
        .mrq-strip-outer {
          position: relative;
          width: 100%;
          overflow: hidden;
          /* Fade-out masks on left and right edges */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        /* ── The scrolling track (flex, double-wide) ─────────── */
        .mrq-track {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: mrq-scroll 30s linear infinite;
          will-change: transform;
        }

        /* Pause on hover */
        .mrq-strip-outer:hover .mrq-track {
          animation-play-state: paused;
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .mrq-track {
            animation: none;
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
          }
        }

        @keyframes mrq-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Card ─────────────────────────────────────────────── */
        .mrq-card {
          width: 280px;
          flex-shrink: 0;
          background: #ffffff;
          border: 1px solid #e0f0fe;
          border-radius: 14px;
          padding: 1.25rem 1.25rem 1.4rem;
          box-shadow: 0 2px 14px rgba(14, 116, 172, 0.07);
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          cursor: default;
          user-select: none;
          transition: box-shadow 200ms ease, transform 200ms ease;
        }
        .mrq-card:hover {
          box-shadow: 0 6px 24px rgba(14, 116, 172, 0.14);
          transform: translateY(-2px);
        }

        /* ── Card header ──────────────────────────────────────── */
        .mrq-card__header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .mrq-card__avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .mrq-card__meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .mrq-card__name-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .mrq-card__name {
          font-size: 0.875rem;
          font-weight: 700;
          color: #0f172a;
          white-space: nowrap;
        }

        /* Google G badge */
        .mrq-card__gbadge {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .mrq-card__gbadge svg {
          width: 14px;
          height: 14px;
          display: block;
        }

        /* Stars */
        .mrq-card__stars {
          display: flex;
          gap: 1px;
        }
        .mrq-card__star {
          font-size: 0.85rem;
          color: #f59e0b;
          line-height: 1;
        }

        /* ── Review text ──────────────────────────────────────── */
        .mrq-card__text {
          font-size: 0.82rem;
          line-height: 1.6;
          color: #475569;
          margin: 0;
        }
      `}</style>

      <section className="mrq-section">
        <div className="container-shell" style={{ marginBottom: '2rem' }}>
          <SectionHeader
            eyebrow="Patient Testimonials"
            title="What Our Patients Say"
            description="Trusted by families across Kanchipuram. Real words from real patients."
          />
        </div>

        {/* Infinite scrolling strip — full viewport width */}
        <div className="mrq-strip-outer">
          <div className="mrq-track" aria-label="Scrolling patient reviews">
            {/* Render twice for seamless infinite loop */}
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <ReviewCard key={`${review.id}-${i}`} review={review} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
