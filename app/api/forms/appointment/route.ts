import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { AppointmentSchema } from '@/lib/validations'
import { sendAppointmentEmails } from '@/lib/email'

async function generateAptId(): Promise<string> {
  const count = await prisma.appointment.count()
  return `APT-${String(count + 1).padStart(4, '0')}`
}

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

    const { name, phone, email, date, slot, doctor, department, reason } = parsed.data

    // 1. Save to legacy FormSubmission (for backwards compatibility)
    await prisma.formSubmission.create({
      data: {
        type: 'APPOINTMENT',
        name,
        phone,
        email: email || '',
        data: { date, slot, doctor, department, reason },
        status: 'NEW',
      },
    })

    // 2. Also create a proper Appointment record for the management system
    const aptId = await generateAptId()
    await prisma.appointment.create({
      data: {
        aptId,
        patientName: name,
        phone,
        email: email || '',
        doctor: doctor ?? null,
        department: department ?? null,
        date,
        time: slot,
        type: 'In-Person',
        reason: reason ?? null,
        status: 'PENDING',
        history: {
          create: {
            action: 'Appointment received from website',
            toStatus: 'PENDING',
            changedBy: 'System',
          },
        },
      },
    })

    // 3. Send emails (non-blocking)
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
