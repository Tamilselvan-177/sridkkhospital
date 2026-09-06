import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { CallbackSchema } from '@/lib/validations'
import { sendCallbackEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CallbackSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { name, phone, email } = parsed.data

    await prisma.formSubmission.create({
      data: {
        type: 'CALLBACK',
        name,
        phone,
        email,
        data: {},
        status: 'NEW',
      },
    })

    try {
      await sendCallbackEmail({ name, phone, email })
    } catch (emailErr) {
      console.error('Email send failed (callback):', emailErr)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Callback form error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
