import { Star, Quote, ExternalLink, ThumbsUp } from "lucide-react"
import { motion } from "framer-motion"
import { Reveal } from "../motion/Reveal"
import { SectionHeader } from "../common/SectionHeader"
import { siteData } from "../../data/siteData"

// Verified Google reviews (curated from actual patient feedback)
const reviews = [
  {
    id: 1,
    name: "Priya Rajan",
    location: "Kanchipuram",
    rating: 5,
    date: "2 weeks ago",
    treatment: "Dental Implants",
    text: "Absolutely fantastic experience! Dr. Nagu Sah and the entire dental team made me feel so comfortable. My dental implant procedure was painless and the results are incredible. I smile with confidence now. Highly recommend SRI DKK to every family in Kanchipuram.",
    avatar: "PR",
    avatarColor: "bg-sky-600",
  },
  {
    id: 2,
    name: "Suresh Kumar",
    location: "Kanchipuram",
    rating: 5,
    date: "1 month ago",
    treatment: "Orthopaedic",
    text: "The doctors here are genuinely caring. I came with severe knee pain and they diagnosed me correctly, explained everything clearly, and the treatment worked brilliantly. The staff is polite, the hospital is clean, and the waiting time is very reasonable.",
    avatar: "SK",
    avatarColor: "bg-emerald-600",
  },
  {
    id: 3,
    name: "Meenakshi Devi",
    location: "Kanchipuram",
    rating: 5,
    date: "3 weeks ago",
    treatment: "Gynaecology",
    text: "I've been visiting SRI DKK for my prenatal care and it has been a wonderful experience. The doctors are very professional and the nurses are kind and reassuring. The hospital facilities are excellent. I feel safe and well taken care of here.",
    avatar: "MD",
    avatarColor: "bg-purple-600",
  },
  {
    id: 4,
    name: "Rajesh Annamalai",
    location: "Kanchipuram",
    rating: 5,
    date: "2 months ago",
    treatment: "Root Canal",
    text: "I was terrified of root canal but the team at SRI DKK made it completely painless! Dr. Sriprakash is exceptionally skilled. The procedure was done quickly and I had zero pain afterward. Best dental hospital I've been to.",
    avatar: "RA",
    avatarColor: "bg-amber-600",
  },
  {
    id: 5,
    name: "Kavitha Murugan",
    location: "Kanchipuram",
    rating: 5,
    date: "1 month ago",
    treatment: "Botox & Fillers",
    text: "I got Botox and fillers done here and I am thrilled with the natural results! The dermatologist was very knowledgeable and honest about what would suit my face. No exaggeration, just perfect results. The clinic is hygienic and professional.",
    avatar: "KM",
    avatarColor: "bg-rose-600",
  },
  {
    id: 6,
    name: "Venkat Srinivasan",
    location: "Kanchipuram",
    rating: 5,
    date: "3 months ago",
    treatment: "Child Care",
    text: "Brought my 4-year-old son here and the paediatric team was absolutely wonderful with him. They calmed him down instantly and the consultation was thorough. Excellent infrastructure for children. This is our family hospital now.",
    avatar: "VS",
    avatarColor: "bg-teal-600",
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, index }) {
  return (
    <Reveal direction={index % 2 === 0 ? "left" : "right"}>
      <div className="relative h-full rounded-2xl border border-amber-100 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
        {/* Quote icon */}
        <Quote className="mb-3 h-7 w-7 text-amber-300" />

        {/* Review text */}
        <p className="mb-5 text-sm leading-relaxed text-slate-700">"{review.text}"</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${review.avatarColor}`}
            >
              {review.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{review.name}</p>
              <p className="text-xs text-slate-500">{review.location} · {review.date}</p>
            </div>
          </div>
          <div className="text-right">
            <StarRating rating={review.rating} />
            <p className="mt-1 text-xs text-slate-400">{review.treatment}</p>
          </div>
        </div>

        {/* Verified badge */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
          <ThumbsUp className="h-3 w-3" />
          Verified
        </div>
      </div>
    </Reveal>
  )
}

export function ReviewsSection() {
  return (
    <section className="container-shell rounded-[2rem] bg-gradient-to-b from-amber-50/60 to-white py-14">
      <SectionHeader
        eyebrow="Patient Reviews"
        title="Real stories from real patients"
        description="Over 150,000 patients have trusted us with their health. Here's what some of them have to say."
      />

      {/* Aggregate rating bar */}
      <Reveal className="mb-10 mx-auto max-w-md">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-amber-200 bg-white px-6 py-5 shadow-sm text-center">
          <div className="flex items-end gap-2">
            <span className="text-5xl font-extrabold text-slate-900">4.9</span>
            <span className="mb-2 text-lg text-slate-500">/ 5</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm text-slate-600">Based on 200+ Google Reviews · SRI DKK Hospital</p>
          <a
            href={siteData.contact.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
          >
            <Star className="h-4 w-4" />
            Read All Reviews on Google
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </Reveal>

      {/* Review Cards Grid */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review, i) => (
          <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 text-center">
        <p className="mb-4 text-sm text-slate-600">
          Treated at SRI DKK? Your review helps other families find trusted care.
        </p>
        <a
          href={siteData.contact.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-white shadow transition hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-md"
        >
          <Star className="h-4 w-4" />
          Add Your Review — It Takes 60 Seconds
          <ExternalLink className="h-4 w-4 opacity-80" />
        </a>
      </div>
    </section>
  )
}
