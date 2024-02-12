export type Nation = {
  abbreviation: string
  customCalendarUrl: string | null
  events: Event[]
  googleCalendarId: string | null
  icalUrl: string | null
  id: number
  kideUrl: string | null
  name: string
  url: String
}

export type Event = {
  description: string | null
  end: string
  name: string
  start: string
}
