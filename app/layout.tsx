import type { Metadata } from 'next'
import './globals.css'
import { siteData } from '@/data/siteData'
import { Providers } from './providers'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sridkkhospital.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SRI D.K.K. Hospital — Trusted Multispeciality Care in Kanchipuram',
    template: '%s | SRI DKK Hospital Kanchipuram',
  },
  description:
    'Sri D.K.K. Multispeciality Hospital in Kanchipuram — expert dental, aesthetics, gynaecology, child care, orthopaedics, and general medicine. 150,000+ patients treated. Open Mon–Sun 10am–8pm.',
  keywords: [
    'hospital kanchipuram',
    'dental clinic kanchipuram',
    'multispeciality hospital',
    'SRI DKK hospital',
    'skin care kanchipuram',
    'hair PRP kanchipuram',
    'gynecology kanchipuram',
    'child care kanchipuram',
    'orthopaedic kanchipuram',
    'root canal kanchipuram',
    'dental implants kanchipuram',
    'botox kanchipuram',
    'laser hair removal kanchipuram',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: siteData.brand.name,
    title: 'SRI D.K.K. Hospital — Trusted Multispeciality Care in Kanchipuram',
    description:
      'Expert dental, aesthetics, gynaecology, child care, orthopaedics & general medicine. 150,000+ patients. Open 7 days a week.',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'SRI D.K.K. Multispeciality Hospital Kanchipuram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SRI D.K.K. Hospital — Trusted Multispeciality Care in Kanchipuram',
    description:
      'Expert dental, aesthetics, gynaecology, child care, orthopaedics & general medicine in Kanchipuram.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '', // Add your Google Search Console verification token
  },
}

// JSON-LD Structured Data — LocalBusiness + MedicalOrganization
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['MedicalOrganization', 'LocalBusiness'],
      '@id': SITE_URL,
      name: siteData.brand.name,
      alternateName: 'SRI DKK Hospital',
      description: siteData.brand.tagline,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: siteData.brand.logo,
      },
      image: `${SITE_URL}/og-image.jpg`,
      telephone: siteData.contact.phone,
      email: siteData.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sheikpet Nadu Street',
        addressLocality: 'Kanchipuram',
        addressRegion: 'Tamil Nadu',
        postalCode: '631501',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteData.contact.mapCoordinates.lat,
        longitude: siteData.contact.mapCoordinates.lng,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00',
          closes: '20:00',
        },
      ],
      sameAs: [
        siteData.social.instagram,
        siteData.social.facebook,
        siteData.social.youtube,
      ],
      medicalSpecialty: [
        'Dentistry',
        'Dermatology',
        'Gynaecology',
        'Pediatrics',
        'Orthopedics',
        'General Practice',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '500',
        bestRating: '5',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
