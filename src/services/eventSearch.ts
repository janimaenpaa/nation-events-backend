import { parseIcal } from '../utils/ical'
import prisma from '../../prisma/prisma-client'

export const searchEvents = async () => {
  const nations = await prisma.nation.findMany()

  await prisma.event.deleteMany({})

  const icalEvents = await Promise.all(
    nations.map(async (nation) => {
      if (nation.icalUrl) {
        const events = await parseIcal(nation.icalUrl)
        return { ...nation, events }
      }

      return { ...nation, events: [] }
    })
  )

  // TODO: Implement custom calendar scraping
  /* const customCalendarEvents = await Promise.all(
    nations.map(async (nation) => {
      if (nation.customCalendarUrl) {
        const events = await scrapeCustomCalendar(nation.customCalendarUrl)
        return { ...nation, events }
      }

      return { ...nation, events: [] }
    })
  ) */

  const combinedNationEvents = nations.map((nation) => {
    const icalEventsForNation = icalEvents.find((event) => event.abbreviation === nation.abbreviation)
    /* const customCalendarEventsForNation = customCalendarEvents.find(
      (event) => event.abbrevation === nation.abbrevation
    ) */

    const icalEventsForNationEvents = icalEventsForNation?.events ?? []
    //const customCalendarEventsForNationEvents = customCalendarEventsForNation?.events ?? []

    return {
      ...nation,
      events: [...icalEventsForNationEvents /*, ...customCalendarEventsForNationEvents */],
    }
  })

  const createdEvents = []

  for (const nation of combinedNationEvents) {
    for (const event of nation.events) {
      const createdEvent = await prisma.event.create({
        data: {
          name: event.name,
          startTime: event.startTime,
          endTime: event.endTime,
          description: event.description,
          url: event.url,
          nationId: nation.id,
        },
      })
      createdEvents.push(createdEvent)
    }
  }

  return createdEvents
}
