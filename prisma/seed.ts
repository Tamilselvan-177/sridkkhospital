import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding MongoDB Atlas database...')

  // ── Admin user ────────────────────────────────────────────────────────────
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@sridkkhospital.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@DKK2024'
  const hashed = await bcrypt.hash(adminPassword, 12)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashed,
      name: process.env.SEED_ADMIN_NAME || 'DKK Admin',
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user seeded:', adminEmail)

  // ── Doctors ───────────────────────────────────────────────────────────────
  const doctors = [
    {
      slug: 'dr-d-k-nagu-sah',
      name: 'Dr. D.K. Nagu Sah',
      role: 'Senior Dental Specialist',
      image: '/images/dr-nagu-sah.jpg',
      imagePosition: 'object-top',
      qualification: 'BDS, MDS',
      experience: '15+ years',
      languages: 'Tamil, English',
      availability: 'Mon–Sun, 10am–8pm',
      highlight: '15+ years experience · 5,000+ procedures',
      specialties: ['Root Canal', 'Dental Implants', 'Cosmetic Dentistry'],
    },
    {
      slug: 'dr-d-k-n-sriprakash',
      name: 'Dr. D.K.N. Sriprakash',
      role: 'Dental and Maxillofacial Specialist',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/10/sri-scaled.jpg',
      imagePosition: 'object-top',
      qualification: 'BDS, MDS (Oral & Maxillofacial Surgery)',
      experience: '12+ years',
      languages: 'Tamil, English',
      availability: 'Mon–Sat, 10am–6pm',
      highlight: 'Maxillofacial specialist · Advanced surgical expertise',
      specialties: ['Jaw Surgery', 'Oral Cancer', 'Facial Trauma'],
    },
    {
      slug: 'dr-jeevitha',
      name: 'Dr. Jeevitha',
      role: 'Consultant Doctor',
      image: '/images/dr-jeevitha.png',
      qualification: 'MBBS',
      experience: '8+ years',
      languages: 'Tamil, English',
      availability: 'Mon–Sun, 10am–8pm',
      highlight: 'Compassionate primary care for all ages',
      specialties: ['General Medicine', 'Preventive Care', 'Diagnostics'],
    },
    {
      slug: 'dr-sandhya',
      name: 'Dr. Sandhya',
      role: 'Consultant Doctor',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/10/DR.SANDHYA-PIC-scaled.jpg',
      imagePosition: 'object-[center_20%]',
      qualification: 'MBBS, DGO',
      experience: '10+ years',
      languages: 'Tamil, English',
      availability: 'Mon–Sat, 10am–7pm',
      highlight: 'Trusted gynaecologist · 1,000+ deliveries',
      specialties: ['Gynaecology', "Women's Health", 'Antenatal Care'],
    },
    {
      slug: 'dr-dhivya-bharathi',
      name: 'Dr. Dhivya Bharathi',
      role: 'Consultant Doctor',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/10/DR.PPP_-scaled.jpg',
      qualification: 'MBBS, DDVL',
      experience: '7+ years',
      languages: 'Tamil, English',
      availability: 'Mon–Sat, 11am–7pm',
      highlight: 'Certified aesthetic & dermatology specialist',
      specialties: ['Medical Aesthetics', 'Dermatology', 'Skin Care'],
    },
    {
      slug: 'dr-parkavi',
      name: 'Dr. Parkavi',
      role: 'Consultant Doctor',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/10/DR.PIC_-scaled.jpg',
      imagePosition: 'object-center',
      qualification: 'MBBS, DCH',
      experience: '9+ years',
      languages: 'Tamil, English',
      availability: 'Mon–Sun, 10am–8pm',
      highlight: 'Child-friendly approach · Paediatric specialist',
      specialties: ['Child Care', 'Paediatrics', 'Growth & Development'],
    },
    {
      slug: 'dr-jayashree',
      name: 'Dr. Jayashree',
      role: 'Consultant Doctor',
      image: '/images/dr-jayashree.png',
      qualification: 'MBBS, MS (Ortho)',
      experience: '11+ years',
      languages: 'Tamil, English',
      availability: 'Mon–Fri, 10am–6pm',
      highlight: 'Orthopaedic specialist · Non-surgical first approach',
      specialties: ['Orthopaedics', 'Joint Care', 'Physiotherapy'],
    },
  ]

  for (const doc of doctors) {
    await prisma.doctor.upsert({
      where: { slug: doc.slug },
      update: doc,
      create: doc,
    })
  }
  console.log('✅ Doctors seeded:', doctors.length)

  // ── Treatments ────────────────────────────────────────────────────────────
  const treatments = [
    {
      slug: 'root-canal-treatment',
      name: 'Root Canal Treatment',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/10/DENTAL-PIC-scaled.jpg',
      badge: 'FREE Consult',
      highlight: 'Save your natural tooth · Pain-free',
      description: 'Root canal therapy removes infected pulp tissue from inside your tooth, clears the infection, and seals the tooth to prevent recurrence — all while preserving your natural tooth for decades.',
      benefits: ['Completely pain-managed using modern anaesthesia techniques', 'Typically completed in 1–2 visits', 'Saves your natural tooth — avoids extraction', 'Relieves severe toothache and infection permanently', 'Crown placed after to restore full function and appearance', '12+ years of root canal expertise at our dental team'],
      duration: '1–2 sessions',
      category: 'dental',
      sortOrder: 1,
    },
    {
      slug: 'dental-implants',
      name: 'Dental Implants',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/dentalimplant-01.jpg',
      badge: 'FREE Consult',
      highlight: 'Permanent · Natural look · Lifetime solution',
      description: 'Dental implants are titanium posts surgically placed into the jawbone to act as artificial tooth roots. They support crowns, bridges, or dentures — giving you a permanent, natural-looking replacement that feels and functions exactly like a real tooth.',
      benefits: ['Permanent solution — lasts decades with proper care', 'Looks, feels, and functions exactly like a natural tooth', 'Prevents jawbone loss that occurs after tooth removal', 'No impact on adjacent healthy teeth', 'Improves chewing strength, bite, and smile confidence', 'Performed by senior implant specialists with 15+ years experience'],
      duration: '2–3 months (including healing)',
      category: 'dental',
      sortOrder: 2,
    },
    {
      slug: 'dentures',
      name: 'Dentures',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/dentures-01.jpg',
      highlight: 'Custom-fit · Comfortable · Affordable',
      description: 'Custom-made removable dentures — full or partial — designed to closely match your natural teeth in shape, size, and colour.',
      benefits: ['Custom-fitted to your jaw for maximum comfort', 'Full and partial denture options available', 'Natural-looking tooth shade and shape matching', 'Restores ability to eat, speak, and smile confidently', 'Adjustments and relines available as needed', 'Affordable compared to implant-based solutions'],
      duration: '2–4 appointments over 3–4 weeks',
      category: 'dental',
      sortOrder: 3,
    },
    {
      slug: 'orthodontic-treatments',
      name: 'Orthodontic Treatments',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/orthodontic-01.jpg',
      highlight: 'For all ages · Braces & aligners',
      description: 'Orthodontic treatment corrects misaligned teeth and jaw relationships using braces or clear aligners.',
      benefits: ['Metal braces, ceramic braces, and clear aligners available', 'Corrects crowding, spacing, overbite, and underbite', 'Suitable for all ages — children to adults', 'Improves oral hygiene by aligning teeth for easier cleaning', 'Regular monitoring and adjustments throughout treatment', 'Retainers provided to maintain results long-term'],
      duration: '12–24 months depending on complexity',
      category: 'dental',
      sortOrder: 4,
    },
    {
      slug: 'tooth-extraction',
      name: 'Tooth Extraction',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/toothextraction-01-1.jpg',
      highlight: 'Safe · Minimally traumatic · Quick recovery',
      description: 'When a tooth cannot be saved through other treatments, our specialists perform safe and minimally traumatic extractions.',
      benefits: ['Local anaesthesia ensures a completely pain-free procedure', 'Atraumatic extraction techniques minimise tissue damage', 'Wisdom tooth and surgical extractions also performed', 'Detailed post-care instructions for fast recovery', 'Replacement options discussed — implant, bridge, denture', 'Typically complete in a single appointment'],
      duration: 'Single appointment (30–60 min)',
      category: 'dental',
      sortOrder: 5,
    },
    {
      slug: 'smile-designing',
      name: 'Smile Designing',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/smiledesigning-01.jpg',
      highlight: 'Personalised · Natural results',
      description: 'Smile designing is a comprehensive aesthetic plan combining multiple dental procedures — veneers, whitening, contouring, and alignment — to create a balanced, naturally beautiful smile.',
      benefits: ['Digital smile preview before starting treatment', 'Combination of whitening, veneers, and contouring', 'Designed to complement your facial features naturally', 'Minimally invasive options available where possible', 'Addresses gaps, discolouration, chips, and asymmetry', 'Experienced cosmetic dental team with aesthetic eye'],
      duration: '2–6 weeks depending on procedures',
      category: 'dental',
      sortOrder: 6,
    },
    {
      slug: 'botox',
      name: 'Botox',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/BOTOX1-01.jpg',
      highlight: 'FDA-approved · No surgery · Natural look',
      description: 'Botox (botulinum toxin) is a quick, non-surgical treatment that relaxes targeted facial muscles to soften dynamic lines while preserving natural facial movement.',
      benefits: ['FDA-approved, clinically proven treatment', 'Results visible within 3–7 days', 'Effects last 4–6 months with regular maintenance', 'Preserves natural facial expressions — not a frozen look', 'Zero downtime — return to daily activities immediately', 'Administered by certified aesthetic specialist'],
      duration: '20–30 minute procedure',
      category: 'aesthetics',
      sortOrder: 7,
    },
    {
      slug: 'fillers',
      name: 'Fillers',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/10/ft-01-scaled.jpg',
      highlight: 'Volume restoration · Natural contours',
      description: 'Dermal fillers are hyaluronic acid-based injectables that restore lost volume, smooth deep lines, and enhance facial contours.',
      benefits: ['Hyaluronic acid fillers — safe and fully reversible', 'Corrects nasolabial folds, marionette lines, and volume loss', 'Lip augmentation and cheek contouring available', 'Immediate visible results with minimal swelling', 'Results last 9–18 months depending on area treated', 'Personalised to your anatomy — subtle, balanced results'],
      duration: '30–45 minute procedure',
      category: 'aesthetics',
      sortOrder: 8,
    },
    {
      slug: 'hair-prp',
      name: 'Hair PRP',
      image: '/images/hair-prp.png',
      highlight: 'Non-surgical · Uses your own blood',
      description: 'Platelet-Rich Plasma (PRP) therapy uses growth factors from your own blood to stimulate dormant hair follicles, reduce hair fall, and promote new hair growth.',
      benefits: ['Uses your own blood — zero risk of allergic reaction', 'Reduces hair fall significantly within 1–2 months', 'Stimulates dormant hair follicles for regrowth', 'Strengthens existing hair strands and scalp health', 'Minimal discomfort — topical numbing applied beforehand', 'Combines well with Hair GFC for enhanced results'],
      duration: '4–6 sessions over 3–4 months',
      category: 'hair',
      sortOrder: 9,
    },
    {
      slug: 'hair-gfc',
      name: 'Hair GFC',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/HAIRGFCC2-01.jpg',
      highlight: 'Advanced growth factor therapy',
      description: 'Growth Factor Concentrate (GFC) is an advanced evolution of PRP with a higher concentration of targeted growth factors.',
      benefits: ['Higher growth factor concentration than standard PRP', 'Faster and more visible results in hair density', 'Targets androgenetic alopecia and diffuse thinning', 'Minimal downtime — mild redness resolves in hours', 'Safe for both men and women experiencing hair loss', 'Best results when combined with a scalp care routine'],
      duration: '3–5 sessions over 2–3 months',
      category: 'hair',
      sortOrder: 10,
    },
    {
      slug: 'laser-hair-removal',
      name: 'Laser Hair Removal',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/LASER2-01.jpg',
      highlight: 'Safe for all skin tones · Long-lasting',
      description: 'Evidence-based laser hair removal uses targeted light energy to permanently reduce unwanted hair.',
      benefits: ['Clinically proven significant hair reduction per session', 'Safe for Indian skin tones — customised laser settings', 'Treats face, underarms, legs, bikini line, and back', 'No razor bumps, ingrown hair, or irritation post-treatment', 'Sessions spaced 4–6 weeks apart for best results', 'Smooth skin results from the very first session'],
      duration: '6–8 sessions over 6–9 months',
      category: 'aesthetics',
      sortOrder: 11,
    },
    {
      slug: 'skin-lightening-treatments',
      name: 'Skin Lightening Treatments',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/skinlightening-01.jpg',
      highlight: 'Dermatologist-guided · Even skin tone',
      description: 'Our dermatologist-guided skin lightening programmes address hyperpigmentation, sun damage, melasma, and uneven skin tone.',
      benefits: ['Targets dark spots, melasma, and sun damage effectively', 'Personalised treatment plan per skin type and concern', 'Combination of topical treatments, peels, and lasers', 'Visible improvement in skin radiance and evenness', 'No harsh bleaching agents — safe, dermatologist-approved', 'Includes sunscreen and skincare guidance for lasting results'],
      duration: '4–8 weeks for visible improvement',
      category: 'aesthetics',
      sortOrder: 12,
    },
  ]

  for (const t of treatments) {
    await prisma.treatment.upsert({
      where: { slug: t.slug },
      update: t,
      create: t,
    })
  }
  console.log('✅ Treatments seeded:', treatments.length)

  // ── Specialties ───────────────────────────────────────────────────────────
  const specialties = [
    {
      slug: 'dental',
      name: 'Dental',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/10/DENTAL-TREATMENT-1024x683.jpg',
      highlight: 'Senior specialists · Free first consultation',
      description: 'Our dental department covers everything from routine check-ups and fillings to advanced procedures like root canals, implants, braces, and full smile redesigns.',
      benefits: ['Free first dental consultation — no obligation', 'Painless root canal treatment using modern anaesthesia', 'Permanent dental implants that look and feel natural', 'Custom braces and aligner options for all ages', 'Complete smile designing and cosmetic dental procedures', 'Child-friendly dental care in a calm environment'],
      duration: 'Single visit to multi-session plans',
      badge: 'FREE Consult',
      sortOrder: 1,
    },
    {
      slug: 'medical-aesthetics',
      name: 'Medical Aesthetics',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/10/FACE-1024x683.jpg',
      highlight: 'FDA-approved · Certified dermatologists',
      description: 'Our medical aesthetics department offers science-backed, non-surgical cosmetic treatments performed by certified specialists.',
      benefits: ['Botox and dermal fillers with natural, subtle results', 'Laser hair removal safe for all Indian skin tones', 'Skin lightening and pigmentation treatment plans', 'Hair PRP and GFC for non-surgical hair restoration', 'Zero downtime on most procedures', 'Personalised treatment plan — no cookie-cutter approach'],
      duration: '30 min – 1 hour per session',
      sortOrder: 2,
    },
    {
      slug: 'child-care',
      name: 'Child Care',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/Child-care-01-1024x683.jpg',
      highlight: 'Child-friendly environment · Paediatric specialists',
      description: 'Our paediatric care team provides comprehensive health services for newborns through teenagers.',
      benefits: ['Routine check-ups, vaccinations, and growth monitoring', 'Fever, respiratory infections, and illness management', 'Nutritional guidance and developmental assessments', 'Child-friendly consultation rooms that reduce anxiety', 'Same-day appointments for urgent paediatric concerns', 'Experienced paediatricians with a gentle approach'],
      duration: 'Walk-in & scheduled visits',
      sortOrder: 3,
    },
    {
      slug: 'gynaecology',
      name: 'Gynaecology',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/Gynaecology-01-1024x683.jpg',
      highlight: 'Compassionate · Private · Comprehensive',
      description: 'Our gynaecology department provides complete women\'s health care in a confidential, compassionate setting.',
      benefits: ['Antenatal and post-natal care with experienced doctors', 'Routine gynaecological check-ups and health screenings', 'PCOS, hormonal imbalance, and menstrual disorder care', 'Confidential consultations in private examination rooms', 'Ultrasound and diagnostic services on-site', "Women's health education and preventive care guidance"],
      duration: 'Ongoing care programmes available',
      sortOrder: 4,
    },
    {
      slug: 'orthopaedic',
      name: 'Orthopaedic',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/Orthopaedic-01-1024x683.jpg',
      highlight: 'Non-surgical first · Advanced diagnostics',
      description: 'Our orthopaedic specialists diagnose and treat conditions affecting bones, joints, muscles, and spine.',
      benefits: ['Knee, hip, shoulder, and spine pain treatment', 'Physiotherapy and rehabilitation programmes', 'Sports injuries and fracture management', 'Non-surgical approaches explored before recommending surgery', 'Digital X-ray and imaging available on-site', 'Structured home exercise plans for ongoing recovery'],
      duration: 'Assessment + multi-week rehab plans',
      sortOrder: 5,
    },
    {
      slug: 'dermatology',
      name: 'Dermatology',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/Dermatology-01-1024x683.jpg',
      highlight: 'Clinical & cosmetic dermatology',
      description: 'Our dermatology team handles both clinical skin conditions and cosmetic treatments.',
      benefits: ['Acne, eczema, psoriasis, and skin infection treatment', 'Pigmentation correction and skin brightening', 'Laser hair removal with skin-type customisation', 'Anti-aging treatments using clinically proven methods', 'Mole and skin tag evaluation and treatment', 'Personalised skincare routine guidance from dermatologists'],
      duration: 'Single to multi-session treatment plans',
      sortOrder: 6,
    },
    {
      slug: 'general',
      name: 'General Medicine',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/GENERAL-01-1024x1024.jpg',
      highlight: 'Primary care · All ages · Fast appointments',
      description: 'Our general medicine physicians provide comprehensive primary healthcare for patients of all ages.',
      benefits: ['Routine health check-ups and preventive screenings', 'Fever, cold, cough, and infection management', 'Chronic disease management — diabetes, BP, thyroid', 'Prescription, lab tests, and referrals in one visit', 'Same-day urgent appointments available', 'Multilingual doctors — Tamil and English'],
      duration: 'Walk-in anytime · Mon–Sun 10am–8pm',
      sortOrder: 7,
    },
  ]

  for (const s of specialties) {
    await prisma.specialty.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    })
  }
  console.log('✅ Specialties seeded:', specialties.length)

  // ── Blogs ─────────────────────────────────────────────────────────────────
  const blogs = [
    {
      slug: 'advanced-skin-analysis-what-to-expect',
      title: 'Advanced Skin Analysis — What to Expect at Your First Visit',
      image: '/assets/blogs/blog_skin_analysis.jpg',
    },
    {
      slug: 'the-perfect-smile',
      title: 'The Perfect Smile — Your Guide to Smile Designing',
      image: '/assets/blogs/blog_dental_smile.jpg',
    },
    {
      slug: 'botox-and-fillers-the-truth',
      title: 'Botox & Fillers — The Truth About Non-Surgical Facial Rejuvenation',
      image: '/assets/blogs/blog_botox_fillers.jpg',
    },
    {
      slug: 'the-science-behind-anti-aging',
      title: 'The Science Behind Anti-Aging Treatments',
      image: 'https://sridkkhospital.com/wp-content/uploads/2024/09/Med-aesthetics-01-1024x683.jpg',
    },
  ]

  for (const b of blogs) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    })
  }
  console.log('✅ Blogs seeded:', blogs.length)

  console.log('\n🎉 Database seeding complete!')
  console.log(`\n📧 Admin login: ${adminEmail} / ${adminPassword}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
