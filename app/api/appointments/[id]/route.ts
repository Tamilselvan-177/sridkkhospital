import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { AptStatus } from '@prisma/client'

// Valid status transitions
const TRANSITIONS: Record<AptStatus, AptStatus[]> = {
  PENDING:     ['CONFIRMED', 'CANCELLED', 'NO_SHOW'],
  CONFIRMED:   ['CHECKED_IN', 'RESCHEDULED', 'CANCELLED'],
  RESCHEDULED: ['CONFIRMED', 'CANCELLED'],
  CHECKED_IN:  ['COMPLETED', 'NO_SHOW'],
  COMPLETED:   [],
  CANCELLED:   [],
  NO_SHOW:     [],
}

// GET /api/appointments/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const apt = await prisma.appointment.findUnique({
    where: { id },
    include: {
      history: {
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!apt) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(apt)
}

// PATCH /api/appointments/[id]
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { action, note, adminNotes, doctor, department, date, time, type, reason } = body
  const adminName = session.user?.name ?? 'Admin'

  const existing = await prisma.appointment.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Handle status transition
  if (action === 'status') {
    const newStatus = body.status as AptStatus
    const allowed = TRANSITIONS[existing.status]

    if (!allowed.includes(newStatus)) {
      return NextResponse.json(
        { error: `Cannot transition from ${existing.status} to ${newStatus}` },
        { status: 400 }
      )
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        status: newStatus,
        history: {
          create: {
            action: `Status changed to ${newStatus}`,
            fromStatus: existing.status,
            toStatus: newStatus,
            note: note ?? null,
            changedBy: adminName,
          },
        },
      },
      include: { history: { orderBy: { createdAt: 'asc' } } },
    })

    return NextResponse.json(updated)
  }

  // Handle reschedule
  if (action === 'reschedule') {
    if (!date || !time) return NextResponse.json({ error: 'Date and time required' }, { status: 400 })

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        date,
        time,
        status: 'RESCHEDULED',
        history: {
          create: {
            action: `Rescheduled to ${date} at ${time}`,
            fromStatus: existing.status,
            toStatus: 'RESCHEDULED',
            note: note ?? null,
            changedBy: adminName,
          },
        },
      },
      include: { history: { orderBy: { createdAt: 'asc' } } },
    })

    return NextResponse.json(updated)
  }

  // Handle general update (doctor, notes, etc.)
  if (action === 'update') {
    const updateData: any = {}
    if (doctor !== undefined) updateData.doctor = doctor
    if (department !== undefined) updateData.department = department
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes
    if (reason !== undefined) updateData.reason = reason
    if (type !== undefined) updateData.type = type

    const historyEntries = []
    if (doctor !== undefined && doctor !== existing.doctor) {
      historyEntries.push({
        action: `Doctor assigned: ${doctor}`,
        changedBy: adminName,
      })
    }
    if (adminNotes !== undefined && adminNotes !== existing.adminNotes) {
      historyEntries.push({
        action: 'Admin note updated',
        note: adminNotes,
        changedBy: adminName,
      })
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        ...updateData,
        ...(historyEntries.length > 0
          ? { history: { create: historyEntries } }
          : {}),
      },
      include: { history: { orderBy: { createdAt: 'asc' } } },
    })

    return NextResponse.json(updated)
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
