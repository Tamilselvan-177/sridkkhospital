import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL || 'noreply@sridkkhospital.com'
const ADMIN_EMAIL = process.env.HOSPITAL_ADMIN_EMAIL || 'sridkkhospital02@gmail.com'

// ─── Appointment confirmation ─────────────────────────────────────────────────
export async function sendAppointmentEmails({
  name,
  email,
  phone,
  date,
  slot,
}: {
  name: string
  email: string
  phone: string
  date: string
  slot: string
}) {
  // Notify admin
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `📅 New Appointment Request — ${name}`,
    html: `
      <h2>New Appointment Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time Slot:</strong> ${slot}</p>
      <hr />
      <p>Please confirm the appointment via WhatsApp or call.</p>
    `,
  })

  // Confirm to patient
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Your appointment request at SRI DKK Hospital`,
    html: `
      <h2>Hi ${name},</h2>
      <p>We've received your appointment request for <strong>${date}</strong> at <strong>${slot}</strong>.</p>
      <p>Our team will confirm your slot shortly. You can also reach us at:</p>
      <ul>
        <li>📞 +91 9790122269</li>
        <li>💬 <a href="https://wa.me/919790122269">WhatsApp us</a></li>
      </ul>
      <p>SRI D.K.K. Multispeciality Hospital, Kanchipuram</p>
    `,
  })
}

// ─── Callback notification ────────────────────────────────────────────────────
export async function sendCallbackEmail({
  name,
  email,
  phone,
}: {
  name: string
  email: string
  phone: string
}) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `📲 Instant Callback Request — ${name}`,
    html: `
      <h2>Callback Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>Please call back as soon as possible.</p>
    `,
  })
}

// ─── Contact enquiry ──────────────────────────────────────────────────────────
export async function sendContactEmail({
  name,
  email,
  phone,
  message,
}: {
  name: string
  email: string
  phone: string
  message: string
}) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `💬 Contact Enquiry — ${name}`,
    html: `
      <h2>Contact Form Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote>${message}</blockquote>
    `,
  })
}

// ─── Careers application ──────────────────────────────────────────────────────
export async function sendCareersEmail({
  name,
  email,
  phone,
  role,
  resumeUrl,
}: {
  name: string
  email: string
  phone: string
  role: string
  resumeUrl?: string
}) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `👩‍⚕️ Career Application — ${role} — ${name}`,
    html: `
      <h2>Career Application</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Role:</strong> ${role}</p>
      ${resumeUrl ? `<p><strong>Resume:</strong> <a href="${resumeUrl}">Download Resume</a></p>` : '<p><em>No resume uploaded</em></p>'}
    `,
  })
}
