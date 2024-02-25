import { endOfWeek, startOfWeek } from 'date-fns'
import prisma from '../../prisma/prisma-client'
import { ResponseStatus, ServiceResponse } from '../../src/models/serviceResponse'
import { StatusCodes } from 'http-status-codes'
import { Event } from '@prisma/client'

export const getEvents = async () => {
  try {
    const events = await prisma.event.findMany()

    if (!events) {
      return new ServiceResponse(ResponseStatus.Failed, 'No events found', null, StatusCodes.NOT_FOUND)
    }

    return new ServiceResponse<Event[]>(ResponseStatus.Success, 'Events found', events, StatusCodes.OK)
  } catch (error) {
    const errorMessage = 'Error getting events: ' + error
    return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

export const getEventsByNation = async (nationId: number) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        nationId,
      },
    })

    if (!events) {
      return new ServiceResponse(ResponseStatus.Failed, 'No events found', null, StatusCodes.NOT_FOUND)
    }

    return new ServiceResponse<Event[]>(ResponseStatus.Success, 'Events found', events, StatusCodes.OK)
  } catch (error) {
    const errorMessage = `Error getting events by ${nationId}: ${(error as Error).message}`
    return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

export const getEventById = async (eventId: number) => {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    })

    if (!event) {
      return new ServiceResponse(ResponseStatus.Failed, 'Event not found', null, StatusCodes.NOT_FOUND)
    }

    return new ServiceResponse<Event>(ResponseStatus.Success, 'Event found', event, StatusCodes.OK)
  } catch (error) {
    const errorMessage = `Error getting event with id ${eventId}: ${(error as Error).message}`
    return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

export const getEventsThisWeek = async () => {
  try {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 })
    const end = endOfWeek(new Date(), { weekStartsOn: 1 })

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

    if (!events) {
      return new ServiceResponse(ResponseStatus.Failed, 'No events found', null, StatusCodes.NOT_FOUND)
    }

    return new ServiceResponse<Event[]>(ResponseStatus.Success, 'Events found', events, StatusCodes.OK)
  } catch (error) {
    const errorMessage = 'Error getting events this week: ' + error
    return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR)
  }
}
