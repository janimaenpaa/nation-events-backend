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
