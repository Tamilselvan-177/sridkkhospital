import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { ContactSchema } from '@/lib/validations'
import { sendContactEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = ContactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { name, phone, email, message } = parsed.data

    await prisma.formSubmission.create({
      data: {
        type: 'CONTACT',
        name,
        phone,
        email,
        data: { message },
        status: 'NEW',
      },
    })

    try {
      await sendContactEmail({ name, phone, email, message })
    } catch (emailErr) {
      console.error('Email send failed (contact):', emailErr)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
