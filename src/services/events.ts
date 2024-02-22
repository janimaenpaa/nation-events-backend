import { endOfWeek, startOfWeek } from 'date-fns'
import prisma from '../../prisma/prisma-client'

export const getEvents = async () => {
  const events = await prisma.event.findMany()
  return events
}

export const getEventsByNation = async (nationId: number) => {
  const events = await prisma.event.findMany({
    where: {
      nationId,
    },
  })
  return events
}

export const getEventById = async (eventId: number) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  })
  return event
}

export const getEventsThisWeek = async () => {
  const now = new Date()
  const start = startOfWeek(now, { weekStartsOn: 1 })
  const end = endOfWeek(now, { weekStartsOn: 1 })

  const events = await prisma.event.findMany({
    where: {
      startTime: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      startTime: 'asc',
    },
  })

  return events
}
