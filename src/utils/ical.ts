import ical, { CalendarComponent, VEvent } from 'node-ical'

const filteredEventTypes = ['kahvitus', 'kokous']

export const parseIcal = async (url: string) => {
  try {
    const events = await ical.async.fromURL(url)

    return Object.values(events)
      .filter((event: CalendarComponent): event is VEvent => {
        if ('type' in event && event.type === 'VEVENT') {
          return !filteredEventTypes.some((type) => event.summary.includes(type))
        }
        return false
      })
      .map((event: VEvent) => ({
        name: event.summary,
        date: { startDate: event.start.toISOString(), endDate: event.end.toISOString() },
        description: event.description,
        url: event.url,
      }))
  } catch (error: any) {
    console.error('An error occurred while parsing the iCal file:', error);
    throw error
  }
}
