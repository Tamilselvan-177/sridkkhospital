const REVIEWS_URL =
  "https://www.google.com/search?q=dkk+hospital+kanchipuram&oq=dkk+hospital&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg7MgcIAhAAGIAEMggIAxAAGBYYHjIICAQQABgWGB4yCAgFEAAYFhgeMgYIBhBFGDwyBggHEEUYPdIBCDM1NTRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#sv=CAESzAEKuAEStQEKd0FKaVQ0dExRaVZFX3kwSFlMamZRNDBhajF4X3E1UlNxOFh1ZXBSZWpOT2loQ2U1dUpMYUpBY3RuRkhoMnU2aWZkRzRoQi1mUms0M1lHTWhlN3hKVGw0bVhCbF92RHd0TmR4M2FaYTZTS3I4OXFQT3V1WlhOYVF3EhY5TWs4YXRqekVwS01zZU1QbEtMdWVBGiJBRHNyOWZUeUNzUzBGOEJqM184aVNESXZ2YjNhWTlGaHVnEgQ4MDUxGgEzKgAwADgBQAAYACC3uaabC0oCEAI"

export function FloatingGoogleReviews() {
  return (
    <>
      <style>{`
        .fgr-btn {
          position: fixed;
          /* Mobile: above the WhatsApp/ChatBot row (row sits at ~5.5rem, buttons are 3.5rem tall) */
          bottom: 10rem;
          right: 1rem;
          z-index: 60;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          text-decoration: none;
          transition: transform 150ms ease;
        }
        .fgr-btn:hover { transform: scale(1.08); }

        /* Desktop: above the bottom-7 button row (buttons are 3.75rem tall) */
        @media (min-width: 768px) {
          .fgr-btn {
            bottom: 6.5rem;
            right: 1.75rem;
          }
        }


        .fgr-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
        }
        .fgr-icon svg { width: 20px; height: 20px; display: block; }

        @media (min-width: 768px) {
          .fgr-icon { width: 40px; height: 40px; }
          .fgr-icon svg { width: 26px; height: 26px; }
        }

        .fgr-label {
          font-size: 10px;
          color: #64748b;
          font-weight: 500;
          letter-spacing: 0.01em;
          white-space: nowrap;
          line-height: 1;
          background: rgba(255,255,255,0.92);
          padding: 1px 5px;
          border-radius: 999px;
        }
      `}</style>

      <a
        href={REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View our Google Reviews on Google Maps"
        className="fgr-btn"
      >
        <span className="fgr-icon">
          {/* Official Google "G" 4-colour SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </svg>
        </span>
        <span className="fgr-label">Google Reviews</span>
      </a>
    </>
  )
}
