// Ported from src/data/siteData.js — static site configuration
// Dynamic content (treatments, doctors, specialties, etc.) is now in MongoDB via Prisma

export const siteData = {
  brand: {
    name: 'Sri D.K.K. Multispeciality Hospital',
    shortName: 'SRI D.K.K. HOSPITAL',
    logo: 'https://sridkkhospital.com/wp-content/uploads/2024/09/logo.jpg',
    tagline: 'Trusted multispeciality care in Kanchipuram',
  },
  contact: {
    phone: '+91 9790122269',
    email: 'sridkkhospital02@gmail.com',
    whatsapp: '919790122269',
    address: 'Sri DKK Multispeciality Hospital, Sheikpet Nadu St, Kanchipuram, Tamil Nadu - 631501',
    hours: 'Monday - Sunday: 10 am to 8 pm',
    mapsEmbed:
      'https://maps.google.com/maps?q=Sri%20Dkk%20Multispeciality%20hospital%2C%20No.%203B%20Nadu%20Street%2C%20Sheikpet%20S%20St%2C%20Kanchipuram%2C%20Tamil%20Nadu%20631501&t=m&z=15&output=embed&iwloc=near',
    mapCoordinates: { lat: 12.8321508, lng: 79.7053891 },
    mapDestination: 'Sri DKK Multispeciality Hospital, Sheikpet South Street, Kanchipuram',
    reviewsUrl:
      'https://www.google.com/search?q=dkk+hospital+kanchipuram',
  },
  social: {
    instagram: 'https://www.instagram.com/sridkkhospital?igsh=ejE5ZTgxOW44N3dz',
    youtube: 'https://youtube.com/@sridkkhospital?si=badPDB9yXsH0txDe',
    facebook: 'https://www.facebook.com/share/17GrRHKvUu/',
    whatsapp: 'https://wa.me/919790122269',
    youtubeChannel: 'https://youtube.com/@sridkkhospital?si=badPDB9yXsH0txDe',
    youtubeFeatured: 'https://www.youtube.com/@sridkkhospital/featured',
  },
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'Treatments', path: '/treatments' },
    { label: 'Specialties', path: '/specialties' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ],
  hero: {
    heading: 'Advanced care, compassionate touch, trusted outcomes.',
    subheading:
      'From dental and aesthetics to gynecology, child care, orthopaedics, and general medicine - receive complete care from an expert team.',
    primaryCta: { label: 'Book Appointment', path: '/contact#appointment' },
    secondaryCta: { label: 'Instant Callback', path: '/contact#callback' },
    image: '/assets/images/hero-hospital.jpg',
  },
  stats: [
    { label: 'Patients Treated', value: '150,000+' },
    { label: 'Successful Surgeries', value: '12,000+' },
    { label: 'Years of Service', value: '12+' },
    { label: 'Doctors & Specialists', value: '30+' },
    { label: 'Emergency Response Time', value: '10m' },
    { label: 'Patient Satisfaction', value: '98%' },
  ],
  patientSafety: [
    'Comprehensive hygiene standards in all treatment zones.',
    'Advanced diagnostics and surgical equipment for safer outcomes.',
    'Patient-centered protocols for every stage of care.',
    'Emergency-prepared rapid response teams.',
  ],
  youtubeVideos: [
    { id: '0xzR9MMN4Jw', title: 'Sri dkk hospital @ kanchipuram', duration: '0:16' },
    { id: 'Kk5J3BgxBNY', title: 'SRI DKK மருத்துவமனை காஞ்சிபுரம்', duration: '0:16' },
    { id: 'tp_nMMRa3lw', title: 'Free dental consultation', duration: '0:16' },
  ],
  careersRoles: [
    'Receptionist',
    'Dentist',
    'Nurses',
    'Dermitologist',
    'General Physician',
    'Dental Lab Workers',
    'Medical Cosmetologist',
  ] as const,
} as const

export type CareersRole = (typeof siteData.careersRoles)[number]
