import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { CareersSchema } from '@/lib/validations'
import { sendCareersEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const raw = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      role: formData.get('role'),
    }
    const parsed = CareersSchema.safeParse(raw)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { name, phone, email, role } = parsed.data
    const resumeFile = formData.get('resume') as File | null

    let resumeUrl: string | undefined

    // Optional: upload resume to Vercel Blob
    if (resumeFile && resumeFile.size > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = await import('@vercel/blob')
        const timestamp = Date.now()
        const filename = `resumes/${timestamp}-${resumeFile.name.replace(/\s+/g, '_')}`
        const blob = await put(filename, resumeFile, { access: 'public' })
        resumeUrl = blob.url
      } catch (blobErr) {
        console.error('Resume upload failed:', blobErr)
        // Continue without resume — don't block form submission
      }
    }

    await prisma.formSubmission.create({
      data: {
        type: 'CAREERS',
        name,
        phone,
        email,
        data: { role, resumeUrl: resumeUrl ?? null },
        status: 'NEW',
      },
    })

    try {
      await sendCareersEmail({ name, phone, email, role, resumeUrl })
    } catch (emailErr) {
      console.error('Email send failed (careers):', emailErr)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Careers form error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
