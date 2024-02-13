import { parseIcal } from '../utils/ical'
import { nations } from '../nationsData'

export const searchEvents = async () => {
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

  return combinedNationEvents
}
