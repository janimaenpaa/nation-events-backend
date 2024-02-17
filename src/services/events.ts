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