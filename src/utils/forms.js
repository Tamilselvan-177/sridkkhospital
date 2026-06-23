export function toWhatsAppLink(number, message) {
  const phone = number.replace(/[^\d]/g, "")
  const text = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${text}`
}

export function toMailtoLink(email, subject, lines) {
  const body = encodeURIComponent(lines.join("\n"))
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`
}
