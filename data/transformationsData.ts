// ─────────────────────────────────────────────────────────────────────────────
// Patient Transformations Data — Sri D.K.K. Hospital, Kanchipuram
// Each entry uses the UPLOADED split images (user's originals).
// "combined" = single side-by-side image where left=before, right=after.
// The CompareSlider component handles the split purely via CSS clip-path.
// ─────────────────────────────────────────────────────────────────────────────

export const transformations = [
  {
    id: 1,
    treatment: "Skin Brightening & Medi Facial",
    tag: "Skin Brightening",
    specialty: "skin",
    caption: "Visible glow and even skin tone after our Medi Facial & Skin Brightening treatment ✨",
    combined: "/assets/transformations/upload_skin.jpg",
    // Fallback: generated clean version (no watermark)
    combinedClean: "/assets/transformations/transform_skin.png",
    beforeDesc: "Dull, uneven complexion with minor blemishes",
    afterDesc: "Radiant, even-toned glowing skin",
    duration: "4–6 sessions",
    bookingUrl: "https://whatsform.com/xklykw",
    categoryColor: "bg-rose-100 text-rose-700",
    accentColor: "#f43f5e",
  },
  {
    id: 2,
    treatment: "Hair PRP & Hair GFC Therapy",
    tag: "Hair PRP / GFC",
    specialty: "hair",
    caption: "Remarkable hair density restored with our non-surgical Hair PRP & GFC therapy 💆",
    combined: "/assets/transformations/upload_hair.jpg",
    combinedClean: "/assets/transformations/transform_hair.png",
    beforeDesc: "Significant hair thinning, visible scalp",
    afterDesc: "Full thick hair, restored density",
    duration: "4–6 sessions over 3–4 months",
    bookingUrl: "https://whatsform.com/xklykw",
    categoryColor: "bg-amber-100 text-amber-700",
    accentColor: "#f59e0b",
  },
  {
    id: 3,
    treatment: "Smile Designing & Dental Implants",
    tag: "Smile Designing",
    specialty: "dental",
    caption: "A life-changing smile transformation with Dental Implants & Smile Designing 🦷",
    combined: "/assets/transformations/upload_dental_man.jpg",
    combinedClean: "/assets/transformations/transform_dental_man.png",
    beforeDesc: "Missing & chipped teeth, low confidence",
    afterDesc: "Perfect bright smile with natural implants",
    duration: "3–6 sessions",
    bookingUrl: "https://whatsform.com/xklykw",
    categoryColor: "bg-sky-100 text-sky-700",
    accentColor: "#0ea5e9",
  },
  {
    id: 4,
    treatment: "Complete Smile Makeover",
    tag: "Smile Designing",
    specialty: "dental",
    caption: "From gaps to a confident, bright smile — complete cosmetic dental transformation ✨",
    combined: "/assets/transformations/upload_dental_w1.jpg",
    combinedClean: "/assets/transformations/transform_dental_w1.png",
    beforeDesc: "Dental gaps and uneven alignment",
    afterDesc: "Perfectly aligned, radiant white smile",
    duration: "4–8 sessions",
    bookingUrl: "https://whatsform.com/xklykw",
    categoryColor: "bg-sky-100 text-sky-700",
    accentColor: "#6366f1",
  },
  {
    id: 5,
    treatment: "Full Smile Restoration",
    tag: "Smile Designing",
    specialty: "dental",
    caption: "Complete smile restoration — missing teeth replaced with natural bright results 😊",
    combined: "/assets/transformations/upload_dental_w2.jpg",
    combinedClean: "/assets/transformations/transform_dental_w2.png",
    beforeDesc: "Missing teeth, limited smile confidence",
    afterDesc: "Complete, natural-looking bright smile",
    duration: "3–5 sessions",
    bookingUrl: "https://whatsform.com/xklykw",
    categoryColor: "bg-sky-100 text-sky-700",
    accentColor: "#0ea5e9",
  },
];

export const TRANSFORMATION_FILTERS = [
  { id: "all",    label: "All Treatments", emoji: "⭐" },
  { id: "dental", label: "Dental & Smile", emoji: "🦷" },
  { id: "skin",   label: "Skin & Glow",    emoji: "✨" },
  { id: "hair",   label: "Hair Restoration",emoji: "💆" },
];

// JSON output (for API/automation tool integration)
export const transformationsJSON = transformations.map((t) => ({
  treatment: t.treatment,
  tag: t.tag,
  before_image: `/assets/transformations/before_${String(t.id).padStart(2, "0")}.jpg`,
  after_image:  `/assets/transformations/after_${String(t.id).padStart(2, "0")}.jpg`,
  combined_image: t.combined,
  caption: t.caption,
  duration: t.duration,
  booking_url: t.bookingUrl,
}));
