import prisma from '../../prisma/prisma-client'
import { Event, Nation } from '@prisma/client'
import { parseIcal } from '../utils/ical'
import { parseKide } from '../utils/kide'

const getIcalEvents = async (nations: Nation[]) => {
  const icalEvents = await Promise.all(
    nations.map(async (nation) => {
      if (nation.icalUrl) {
        const events = await parseIcal(nation.icalUrl)
        return { ...nation, events }
      }

      return { ...nation, events: [] }
    })
  )

  return icalEvents
}

const getKideEvents = async (nations: Nation[]) => {
  const kideEvents = await Promise.all(
    nations.map(async (nation) => {
      if (nation.kideUrl) {
        const events = await parseKide(nation.kideUrl)
        return { ...nation, events }
      }

      return { ...nation, events: [] }
    })
  )

  return kideEvents
}

export const searchEvents = async () => {
  try {
    const nations = await prisma.nation.findMany()

    await prisma.event.deleteMany({})

    const icalEvents = await getIcalEvents(nations)
    const kideEvents = await getKideEvents(nations)

    const combinedNationEvents = nations.map((nation) => {
      const icalEventsForNation = icalEvents.find((event) => event.abbreviation === nation.abbreviation)
      const kideEventsForNation = kideEvents.find((event) => event.abbreviation === nation.abbreviation)

      const icalEventsForNationEvents = icalEventsForNation?.events ?? []
      const kideEventsForNationEvents = kideEventsForNation?.events ?? []

      return {
        ...nation,
        events: [...icalEventsForNationEvents, ...kideEventsForNationEvents],
      }
    })

    const createdEvents: Event[] = []

    for (const nation of combinedNationEvents) {
      for (const event of nation.events) {
        const createdEvent = await prisma.event.create({
          data: {
            name: event.name,
            startTime: new Date(event.startTime),
            endTime: new Date(event.endTime),
            description: event.description,
            url: event.url,
            nationId: nation.id,
          },
        })
        createdEvents.push(createdEvent)
      }
    }

    return createdEvents
  } catch (error: any) {
    console.error('An error occurred while searching for events:', error)
    throw error
  }
}
