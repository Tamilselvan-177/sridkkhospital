// ─────────────────────────────────────────────────────────────
// Social Media Automation Data — Sri D.K.K. Hospital
// ─────────────────────────────────────────────────────────────

export const HOSPITAL = {
  name: 'Sri D.K.K. Hospital',
  location: 'Kanchipuram',
  bookingUrl: 'https://whatsform.com/xklykw',
  whatsapp: '+91 9790122269',
  website: 'https://sridkkhospital.com',
  instagram: '@sridkkhospital',
  facebook: 'DR.SRIPRAKASH.MDS',
  youtube: '@sridkkhospital',
};

export const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', icon: '📸', color: '#E1306C', handle: '@sridkkhospital', scheduleTime: '10:00 AM IST' },
  { id: 'facebook',  label: 'Facebook',  icon: '📘', color: '#1877F2', handle: 'DR.SRIPRAKASH.MDS', scheduleTime: '10:00 AM IST' },
  { id: 'youtube',   label: 'YouTube',   icon: '▶️', color: '#FF0000', handle: '@sridkkhospital', scheduleTime: '10:00 AM IST' },
  { id: 'whatsapp',  label: 'WhatsApp',  icon: '💬', color: '#25D366', handle: '+91 9790122269', scheduleTime: '10:00 AM IST' },
];

export const CONTENT_TYPES = [
  { id: 'blog',         label: 'Blog Post',          icon: '📝', emoji: '📖' },
  { id: 'treatment',   label: 'Treatment Update',    icon: '🏥', emoji: '💊' },
  { id: 'announcement',label: 'Announcement',        icon: '📢', emoji: '🎉' },
  { id: 'tip',         label: 'Health Tip',          icon: '💡', emoji: '🌿' },
  { id: 'offer',       label: 'Special Offer',       icon: '🎁', emoji: '✨' },
  { id: 'event',       label: 'Camp / Event',        icon: '🎪', emoji: '📅' },
];

export const SPECIALTY_HASHTAGS = {
  dental: ['#DentalCare', '#DentalHealth', '#SmileMore', '#ToothCare', '#RootCanal', '#DentalImplants', '#SmileDesign'],
  'medical-aesthetics': ['#MedicalAesthetics', '#SkinCare', '#Botox', '#DermalFillers', '#HairPRP', '#LaserTreatment', '#GlowUp'],
  dermatology: ['#Dermatology', '#SkinHealth', '#AcneTreatment', '#HairLoss', '#SkincareRoutine', '#LaserHairRemoval'],
  gynaecology: ['#WomensHealth', '#Gynaecology', '#AntenatalCare', '#PCOS', '#WomenWellness', '#MaternalHealth'],
  orthopaedic: ['#Orthopaedic', '#BoneCare', '#JointPain', '#Physiotherapy', '#BackPain', '#KneeReplacement'],
  'child-care': ['#ChildCare', '#Paediatrics', '#BabyHealth', '#ChildHealth', '#Vaccination', '#NewbornCare'],
  general: ['#GeneralMedicine', '#PrimaryCare', '#HealthCheckup', '#Diabetes', '#BloodPressure', '#Wellness'],
};

export const BASE_HASHTAGS = [
  '#SriDKKHospital',
  '#Kanchipuram',
  '#MultispecialityHospital',
  '#HealthcareTamilNadu',
  '#KanchipuramHospital',
  '#TamilNaduHealth',
];

// ── Caption Templates ──────────────────────────────────────────
export const CAPTION_TEMPLATES = {
  blog: {
    instagram: (title, summary, specialty) =>
      `📖 New on our Blog!\n\n✨ "${title}"\n\n${summary}\n\nStay informed. Stay healthy. Your well-being is our mission at ${HOSPITAL.name}, ${HOSPITAL.location}.\n\n👇 Book a consultation today!\n🔗 ${HOSPITAL.bookingUrl}`,
    facebook: (title, summary, specialty) =>
      `📖 We've just published a new blog post!\n\n🔹 "${title}"\n\n${summary}\n\nAt ${HOSPITAL.name}, we believe an informed patient is an empowered patient. Read, share, and feel free to reach out for any questions.\n\n📞 Call/WhatsApp: ${HOSPITAL.whatsapp}\n🔗 Book Online: ${HOSPITAL.bookingUrl}`,
    whatsapp: (title, summary, specialty) =>
      `*Sri D.K.K. Hospital — Health Update*\n\nDear Patient,\n\nWe have published a new blog: *"${title}"*\n\n${summary}\n\nFor appointments or queries, please contact us:\n📞 ${HOSPITAL.whatsapp}\n🔗 ${HOSPITAL.bookingUrl}\n\n_Sri D.K.K. Multispeciality Hospital, Kanchipuram_`,
    youtube: (title, summary) =>
      `${title} | Sri D.K.K. Hospital Kanchipuram\n\n${summary}\n\n🏥 Sri D.K.K. Multispeciality Hospital — Your trusted healthcare partner in Kanchipuram.\n\n📞 Book Appointment: ${HOSPITAL.bookingUrl}\n📍 Sheikpet Nadu St, Kanchipuram, Tamil Nadu 631501\n\n#SriDKKHospital #Kanchipuram #HealthEducation`,
  },
  treatment: {
    instagram: (title, summary, specialty) =>
      `💊 Treatment Spotlight\n\n🏥 ${title}\n\n${summary}\n\nOur expert doctors are here to help you heal — the right way.\n\n✅ Walk-ins Welcome\n📅 Mon – Sun · 10 AM – 8 PM\n\n📲 Book now: ${HOSPITAL.bookingUrl}`,
    facebook: (title, summary, specialty) =>
      `🏥 Treatment Update from Sri D.K.K. Hospital\n\n🔹 ${title}\n\n${summary}\n\nWe're committed to offering the best care for you and your family. Our specialist team in Kanchipuram is ready to help.\n\n📞 ${HOSPITAL.whatsapp} | 🔗 ${HOSPITAL.bookingUrl}`,
    whatsapp: (title, summary, specialty) =>
      `*Sri D.K.K. Hospital — Treatment Update*\n\nDear Patient,\n\nWe offer *${title}* at our multispeciality hospital in Kanchipuram.\n\n${summary}\n\n📅 Open: Mon–Sun, 10 AM – 8 PM\n📞 ${HOSPITAL.whatsapp}\n🔗 ${HOSPITAL.bookingUrl}\n\n_Your health is our priority._`,
    youtube: (title, summary) =>
      `${title} at Sri D.K.K. Hospital, Kanchipuram\n\n${summary}\n\nSubscribe for more health tips and treatment walkthroughs from our specialist team.\n\n📞 ${HOSPITAL.bookingUrl}\n📍 Kanchipuram, Tamil Nadu`,
  },
  announcement: {
    instagram: (title, summary) =>
      `📢 Exciting News!\n\n🎉 ${title}\n\n${summary}\n\nStay connected with us for the latest updates.\n\n📲 ${HOSPITAL.bookingUrl}`,
    facebook: (title, summary) =>
      `📢 Important Announcement from Sri D.K.K. Hospital\n\n${title}\n\n${summary}\n\nThank you for trusting us with your health. We're always working to serve you better.\n\n📞 ${HOSPITAL.whatsapp}`,
    whatsapp: (title, summary) =>
      `*Sri D.K.K. Hospital — Announcement*\n\n*${title}*\n\n${summary}\n\nFor more information:\n📞 ${HOSPITAL.whatsapp}\n🔗 ${HOSPITAL.bookingUrl}\n\n_Sri D.K.K. Multispeciality Hospital, Kanchipuram_`,
    youtube: (title, summary) =>
      `${title} | Sri D.K.K. Hospital\n\n${summary}\n\n📞 ${HOSPITAL.bookingUrl}`,
  },
  tip: {
    instagram: (title, summary) =>
      `🌿 Health Tip of the Day!\n\n💡 ${title}\n\n${summary}\n\nShare this with someone who needs to read it today! 💙\n\n🏥 Sri D.K.K. Hospital, Kanchipuram\n📲 ${HOSPITAL.bookingUrl}`,
    facebook: (title, summary) =>
      `🌿 Health Tip from Our Experts\n\n💡 ${title}\n\n${summary}\n\nAt Sri D.K.K. Hospital, we care about your health beyond your visit. Stay healthy, stay happy!\n\n📞 ${HOSPITAL.whatsapp}`,
    whatsapp: (title, summary) =>
      `*Sri D.K.K. Hospital — Health Tip*\n\n💡 *${title}*\n\n${summary}\n\nFor health consultations:\n📞 ${HOSPITAL.whatsapp}\n🔗 ${HOSPITAL.bookingUrl}`,
    youtube: (title, summary) =>
      `${title} — Health Tips | Sri D.K.K. Hospital\n\n${summary}\n\n🏥 Expert advice from Sri D.K.K. Multispeciality Hospital, Kanchipuram.\n📞 ${HOSPITAL.bookingUrl}`,
  },
  offer: {
    instagram: (title, summary) =>
      `✨ Special Offer — Limited Time!\n\n🎁 ${title}\n\n${summary}\n\nDon't miss this! Book now before slots fill up.\n\n📲 ${HOSPITAL.bookingUrl}\n📍 Kanchipuram`,
    facebook: (title, summary) =>
      `🎁 Special Offer from Sri D.K.K. Hospital!\n\n${title}\n\n${summary}\n\nCall us or book online to secure your spot.\n📞 ${HOSPITAL.whatsapp} | 🔗 ${HOSPITAL.bookingUrl}`,
    whatsapp: (title, summary) =>
      `*Sri D.K.K. Hospital — Special Offer*\n\n🎁 *${title}*\n\n${summary}\n\nBook now — limited slots available:\n📞 ${HOSPITAL.whatsapp}\n🔗 ${HOSPITAL.bookingUrl}`,
    youtube: (title, summary) =>
      `${title} — Sri D.K.K. Hospital\n\n${summary}\n\n📞 ${HOSPITAL.bookingUrl}`,
  },
  event: {
    instagram: (title, summary) =>
      `📅 Upcoming Event!\n\n🎪 ${title}\n\n${summary}\n\nJoin us — all are welcome! Share with friends and family.\n\n📲 Register: ${HOSPITAL.bookingUrl}\n📍 Sri D.K.K. Hospital, Kanchipuram`,
    facebook: (title, summary) =>
      `📅 Event Alert — Sri D.K.K. Hospital\n\n${title}\n\n${summary}\n\nWe look forward to seeing you! Register today.\n📞 ${HOSPITAL.whatsapp} | 🔗 ${HOSPITAL.bookingUrl}`,
    whatsapp: (title, summary) =>
      `*Sri D.K.K. Hospital — Event*\n\n📅 *${title}*\n\n${summary}\n\nFor registration:\n📞 ${HOSPITAL.whatsapp}\n🔗 ${HOSPITAL.bookingUrl}\n\n_Sri D.K.K. Multispeciality Hospital, Kanchipuram_`,
    youtube: (title, summary) =>
      `${title} | Sri D.K.K. Hospital Kanchipuram\n\n${summary}\n\nSubscribe for more updates.\n📞 ${HOSPITAL.bookingUrl}`,
  },
};

// ── Graphic Suggestions ───────────────────────────────────────
export const GRAPHIC_SUGGESTIONS = {
  dental: 'A bright, clean dental clinic with a smiling patient and modern equipment. Sky blue and white tones.',
  'medical-aesthetics': 'Elegant skincare aesthetic with soft lighting, serums, and before/after glow. Rose gold and white palette.',
  dermatology: 'Clear healthy glowing skin close-up with botanical elements. Soft green and cream tones.',
  gynaecology: 'Warm, compassionate consultation scene with female doctor. Soft purple and teal palette.',
  orthopaedic: 'Active lifestyle imagery with joints and mobility focus. Blue and silver medical aesthetic.',
  'child-care': 'Happy child with caring doctor in a bright, colourful, child-friendly setting.',
  general: 'Professional medical team in a modern hospital corridor. White and teal branding.',
  default: 'Professional hospital branding graphic with Sri D.K.K. Hospital logo, sky blue and white palette.',
};
