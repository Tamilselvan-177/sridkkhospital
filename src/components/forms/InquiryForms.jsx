import { useState } from "react"
import { CheckCircle2, Mail, MessageSquareText, PhoneCall, Send, UserRound } from "lucide-react"
import { siteData } from "../../data/siteData"
import { toMailtoLink, toWhatsAppLink } from "../../utils/forms"

function FormShell({ title, subtitle, icon: Icon, children }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 shadow-[0_14px_40px_-20px_rgba(2,132,199,0.35)] sm:p-7">
      <div className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-indigo-100/70 blur-2xl" />
      <div className="relative">
        <div className="mb-5 flex items-start gap-3">
          <span className="inline-flex rounded-xl bg-sky-100 p-2 text-sky-700">
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, hint, icon: Icon, children }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-800">
      <span className="flex items-center gap-2">
        <span className="inline-flex rounded-md bg-slate-100 p-1 text-slate-600">
          <Icon className="h-3.5 w-3.5" />
        </span>
        {label}
      </span>
      {children}
      {hint ? <span className="text-xs font-normal text-slate-500">{hint}</span> : null}
    </label>
  )
}

function textInputClass() {
  return "w-full rounded-xl border border-slate-300/90 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
}

function ActionButton({ children }) {
  return (
    <button className="inline-flex items-center justify-center rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-800 hover:shadow-md">
      <Send className="mr-2 h-4 w-4" />
      {children}
    </button>
  )
}

function StatusText({ status }) {
  if (!status) return null
  return (
    <p className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
      <CheckCircle2 className="h-4 w-4" />
      {status}
    </p>
  )
}

export function CallbackForm() {
  const [status, setStatus] = useState("")
  const [form, setForm] = useState({ name: "", phone: "", email: "" })

  function onSubmit(event) {
    event.preventDefault()
    const link = toWhatsAppLink(
      siteData.contact.whatsapp,
      `Instant Callback Request%nName: ${form.name}%nPhone: ${form.phone}%nEmail: ${form.email}`,
    ).replace(/%n/g, "\n")
    window.open(link, "_blank", "noopener,noreferrer")
    setStatus("Callback request opened in WhatsApp.")
  }

  return (
    <FormShell
      title="Instant Callback"
      subtitle="Share your contact details and we will connect shortly."
      icon={PhoneCall}
    >
      <form onSubmit={onSubmit} className="grid gap-4">
        <Field label="Name" icon={UserRound}>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={textInputClass()}
            placeholder="Enter your name"
          />
        </Field>
        <Field label="Phone" icon={PhoneCall}>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={textInputClass()}
            placeholder="Enter your mobile number"
          />
        </Field>
        <Field label="Email" icon={Mail}>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={textInputClass()}
            placeholder="Enter your email"
          />
        </Field>
        <ActionButton>Submit</ActionButton>
        <StatusText status={status} />
      </form>
    </FormShell>
  )
}

export function AppointmentForm() {
  const [status, setStatus] = useState("")
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", slot: "10:00 AM" })

  function onSubmit(event) {
    event.preventDefault()
    const link = toWhatsAppLink(
      siteData.contact.whatsapp,
      `Appointment Request%nName: ${form.name}%nPhone: ${form.phone}%nEmail: ${form.email}%nDate: ${form.date}%nTime: ${form.slot}`,
    ).replace(/%n/g, "\n")
    window.open(link, "_blank", "noopener,noreferrer")
    setStatus("Appointment details sent to WhatsApp.")
  }

  return (
    <FormShell
      title="Book an Appointment"
      subtitle="Choose your preferred date and timeslot for consultation."
      icon={MessageSquareText}
    >
      <form id="appointment" onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" icon={UserRound}>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={textInputClass()}
              placeholder="Enter your name"
            />
          </Field>
          <Field label="Mobile Number" icon={PhoneCall}>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={textInputClass()}
              placeholder="Enter your number"
            />
          </Field>
        </div>
        <Field label="Email" icon={Mail}>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={textInputClass()}
            placeholder="Enter your email"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Select Date" icon={MessageSquareText}>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={textInputClass()}
            />
          </Field>
          <Field label="Select Time" icon={MessageSquareText}>
            <select
              value={form.slot}
              onChange={(e) => setForm({ ...form, slot: e.target.value })}
              className={textInputClass()}
            >
              <option>10:00 AM</option>
              <option>12:00 PM</option>
              <option>2:00 PM</option>
              <option>4:00 PM</option>
              <option>6:00 PM</option>
            </select>
          </Field>
        </div>
        <ActionButton>Book Appointment</ActionButton>
        <StatusText status={status} />
      </form>
    </FormShell>
  )
}

export function ContactForm() {
  const [status, setStatus] = useState("")
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" })

  function onSubmit(event) {
    event.preventDefault()
    const mailto = toMailtoLink(siteData.contact.email, "Contact Form Enquiry", [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Message: ${form.message}`,
    ])
    window.location.href = mailto
    setStatus("Your mail app opened with the contact details.")
  }

  return (
    <FormShell
      title="Contact Form"
      subtitle="For general enquiries, feedback, or treatment guidance."
      icon={Mail}
    >
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" icon={UserRound}>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={textInputClass()}
              placeholder="Enter your name"
            />
          </Field>
          <Field label="Mobile Number" icon={PhoneCall}>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={textInputClass()}
              placeholder="Enter your number"
            />
          </Field>
        </div>
        <Field label="Email" icon={Mail}>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={textInputClass()}
            placeholder="Enter your email"
          />
        </Field>
        <Field label="Message" icon={MessageSquareText} hint="Please include treatment or department if known.">
          <textarea
            rows="4"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={textInputClass()}
            placeholder="Type your message"
          />
        </Field>
        <ActionButton>Send</ActionButton>
        <StatusText status={status} />
      </form>
    </FormShell>
  )
}

export function CareersForm() {
  const [status, setStatus] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: siteData.careersRoles[0],
    resumeName: "",
  })

  function onSubmit(event) {
    event.preventDefault()
    const mailto = toMailtoLink(siteData.contact.email, `Careers Application - ${form.role}`, [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Role: ${form.role}`,
      `Resume file selected locally: ${form.resumeName || "Not provided"}`,
      "Note: Please attach resume manually in your email app before sending.",
    ])
    window.location.href = mailto
    setStatus("Mail app opened. Attach resume and send.")
  }

  return (
    <FormShell
      title="Careers Form"
      subtitle="Apply for available roles. We review each application carefully."
      icon={UserRound}
    >
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" icon={UserRound}>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={textInputClass()}
              placeholder="Enter your name"
            />
          </Field>
          <Field label="Email" icon={Mail}>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={textInputClass()}
              placeholder="Enter your email"
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone Number" icon={PhoneCall}>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={textInputClass()}
              placeholder="Enter your phone number"
            />
          </Field>
          <Field label="Role" icon={MessageSquareText}>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className={textInputClass()}
            >
              {siteData.careersRoles.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field
          label="Resume"
          icon={Mail}
          hint="File will be selected locally. Attach it manually in your email client."
        >
          <input
            type="file"
            className={textInputClass()}
            onChange={(e) =>
              setForm({
                ...form,
                resumeName: e.target.files?.[0]?.name ?? "",
              })
            }
          />
        </Field>
        <ActionButton>Send</ActionButton>
        <StatusText status={status} />
      </form>
    </FormShell>
  )
}
