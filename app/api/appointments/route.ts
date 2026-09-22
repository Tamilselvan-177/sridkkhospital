import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'

// Helper to generate APT-XXXX id
async function generateAptId(): Promise<string> {
  const count = await prisma.appointment.count()
  return `APT-${String(count + 1).padStart(4, '0')}`
}

// GET /api/appointments — list with filters
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') // PENDING | CONFIRMED | etc | ALL
  const dateFilter = searchParams.get('date') // today | tomorrow | upcoming | all | YYYY-MM-DD
  const search = searchParams.get('search') // name or phone
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '20')

  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  // Build where clause
  const where: any = {}

  if (status && status !== 'ALL') {
    where.status = status
  }

  if (dateFilter === 'today') {
    where.date = today
  } else if (dateFilter === 'tomorrow') {
    where.date = tomorrow
  } else if (dateFilter === 'upcoming') {
    where.date = { gte: today }
  } else if (dateFilter && dateFilter !== 'all') {
    where.date = dateFilter // specific date
  }

  if (search) {
    where.OR = [
      { patientName: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search } },
      { aptId: { contains: search, mode: 'insensitive' } },
      { doctor: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        aptId: true,
        patientName: true,
        phone: true,
        email: true,
        doctor: true,
        department: true,
        date: true,
        time: true,
        type: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.appointment.count({ where }),
  ])

  return NextResponse.json({ appointments, total, page, limit })
}

// POST /api/appointments — create from admin
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { patientName, phone, email, doctor, department, date, time, type, reason } = body

  if (!patientName || !phone || !date || !time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const aptId = await generateAptId()
  const adminName = session.user?.name ?? 'Admin'

  const appointment = await prisma.appointment.create({
    data: {
      aptId,
      patientName,
      phone,
      email,
      doctor,
      department,
      date,
      time,
      type: type ?? 'In-Person',
      reason,
      status: 'PENDING',
      history: {
        create: {
          action: 'Appointment created',
          toStatus: 'PENDING',
          changedBy: adminName,
        },
      },
    },
  })

  return NextResponse.json({ appointment }, { status: 201 })
}
