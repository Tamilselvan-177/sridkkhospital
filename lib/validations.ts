import { z } from 'zod'

const phoneRegex = /^[+]?[6-9][0-9\s\-]{8,14}$/

export const CallbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().regex(phoneRegex, 'Enter a valid Indian mobile number'),
  email: z.string().email('Enter a valid email address'),
})

export const AppointmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().regex(phoneRegex, 'Enter a valid Indian mobile number'),
  email: z.string().email('Enter a valid email address'),
  date: z.string().min(1, 'Please select a date'),
  slot: z.enum(['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM']),
})

export const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().regex(phoneRegex, 'Enter a valid Indian mobile number'),
  email: z.string().email('Enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export const CareersSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().regex(phoneRegex, 'Enter a valid Indian mobile number'),
  role: z.enum([
    'Receptionist',
    'Dentist',
    'Nurses',
    'Dermitologist',
    'General Physician',
    'Dental Lab Workers',
    'Medical Cosmetologist',
  ]),
})

export type CallbackInput = z.infer<typeof CallbackSchema>
export type AppointmentInput = z.infer<typeof AppointmentSchema>
export type ContactInput = z.infer<typeof ContactSchema>
export type CareersInput = z.infer<typeof CareersSchema>
