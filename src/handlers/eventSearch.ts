import { Nation } from 'types'
import { parseIcal } from '../utils/ical'
import { Request, Response } from 'express'

const ESO_ICAL_URL = 'https://etelasuomalainenosakunta.fi/tapahtumakalenteri/lista/?ical=1'
const WIO_ICAL_URL = 'https://wiipurilainenosakunta.fi/tapahtumat/?ical=1'
const KO_ICAL_URL =
  'http://karjalainenosakunta.fi/?plugin=all-in-one-event-calendar&controller=ai1ec_exporter_controller&action=export_events&no_html=true'

const nations: Nation[] = [
  {
    abbreviation: 'ESO',
    customCalendarUrl: null,
    events: [],
    icalUrl: ESO_ICAL_URL,
    googleCalendarId: null,
    id: 1,
    kideUrl: null,
    name: 'Eteläsuomalainen osakunta',
    url: 'https://etelasuomalainenosakunta.fi',
  },
  {
    abbreviation: 'SavO',
    customCalendarUrl: null,
    events: [],
    icalUrl: null,
    googleCalendarId:
      'n4bs25q90p8a36le086vv7dgbk%40group.calendar.google.com&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs',
    id: 2,
    kideUrl: null,
    name: 'Savolainen osakunta',
    url: 'https://savolainenosakunta.fi',
  },
  {
    abbreviation: 'KO',
    customCalendarUrl: null,
    events: [],
    icalUrl: KO_ICAL_URL,
    googleCalendarId: null,
    id: 3,
    kideUrl: null,
    name: 'Karjalainen osakunta',
    url: 'https://karjalainenosakunta.fi',
  },
  {
    abbreviation: 'HO',
    customCalendarUrl: 'https://hamalais-osakunta.fi/kalenteri',
    events: [],
    icalUrl: null,
    googleCalendarId: null,
    id: 4,
    kideUrl: 'https://api.kide.app/api/companies/8fc7781c-1c53-49de-8db1-f2b88d518ad7',
    name: 'Hämäläis-Osakunta',
    url: 'https://hamalais-osakunta.fi',
  },
  {
    abbreviation: 'KSO',
    customCalendarUrl: null,
    events: [],
    icalUrl: null,
    googleCalendarId: null,
    id: 5,
    kideUrl: 'https://api.kide.app/api/companies/c9be711e-f579-4920-a054-7afbf8efc05a',
    name: 'Keskisuomalainen osakunta',
    url: 'https://kso.fi',
  },
  {
    abbreviation: 'KyO',
    customCalendarUrl: null,
    events: [],
    icalUrl: null,
    googleCalendarId: null,
    id: 6,
    kideUrl: null,
    name: 'Kymenlaakson Osakunta',
    url: 'https://kymenlaaksonosakunta.fi',
  },
  {
    abbreviation: 'VSO',
    customCalendarUrl: null,
    events: [],
    icalUrl: null,
    googleCalendarId: null,
    id: 7,
    kideUrl: null,
    name: 'Varsinaissuomalainen osakunta',
    url: 'https://varsinaissuomalainen.fi',
  },
  {
    abbreviation: 'SatO',
    customCalendarUrl: null,
    events: [],
    icalUrl: null,
    googleCalendarId:
      'c_9d338487979b15952164e8f65f4904a79bfdc91ee3d99b8bd0ffd7f72fe0098f%40group.calendar.google.com/events?key=AIzaSyDrE8zbaHSOjVVcoOPe00n7pSEYLv_ZKQM',
    id: 8,
    kideUrl: null,
    name: 'Satakuntalainen osakunta',
    url: 'https://satakuntalainenosakunta.fi',
  },
  {
    abbreviation: 'WiO',
    customCalendarUrl: null,
    events: [],
    icalUrl: WIO_ICAL_URL,
    googleCalendarId: null,
    id: 9,
    kideUrl: null,
    name: 'Wiipurilainen osakunta',
    url: 'https://wiipurilainenosakunta.fi',
  },
  {
    abbreviation: 'EPO',
    customCalendarUrl: null,
    events: [],
    icalUrl: null,
    googleCalendarId: null,
    id: 10,
    kideUrl: null,
    name: 'Etelä-Pohjalainen Osakunta',
    url: 'https://epo.osakunta.fi',
  },
  {
    abbreviation: 'PPO',
    customCalendarUrl: null,
    events: [],
    icalUrl: null,
    googleCalendarId: null,
    id: 11,
    kideUrl: null,
    name: 'Pohjois-Pohjalainen Osakunta',
    url: 'https://www.pohjoispohjalaiset.fi',
  },
]

export const searchEvents = async (req: Request, res: Response) => {
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
      (event) => event.abbreviation === nation.abbreviation
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
