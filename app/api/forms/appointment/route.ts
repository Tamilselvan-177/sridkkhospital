import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { AppointmentSchema } from '@/lib/validations'
import { sendAppointmentEmails } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = AppointmentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { name, phone, email, date, slot } = parsed.data

    // Save to MongoDB
    await prisma.formSubmission.create({
      data: {
        type: 'APPOINTMENT',
        name,
        phone,
        email,
        data: { date, slot },
        status: 'NEW',
      },
    })

    // Send emails (non-blocking — don't fail submission on email error)
    try {
      await sendAppointmentEmails({ name, phone, email, date, slot })
    } catch (emailErr) {
      console.error('Email send failed (appointment):', emailErr)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Appointment form error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
