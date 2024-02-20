const API_BASE_URL = 'https://api.kide.app/api'

interface KideEvent {
  id: string
  name: string
  dateActualFrom: string
  dateActualUntil: string
  description: string
}

export const parseKide = async (url: string) => {
  try {
    const response = await fetch(url)
    const data = await response.json()

    const eventIds = data.model.events.map((event: any) => event.id)

    const events = await Promise.all(
      eventIds.map(async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`)
        const data = await response.json()
        return data?.model?.product
      })
    )

    const formattedEvents = events.map((event: KideEvent) => ({
      name: event.name,
      startTime: event.dateActualFrom,
      endTime: event.dateActualUntil,
      description: event.description,
      url: `https://kide.app/events/${event.id}`,
    }))

    return formattedEvents
  } catch (error) {
    console.error('Error parsing Kide:', error)
    throw error
  }
}
