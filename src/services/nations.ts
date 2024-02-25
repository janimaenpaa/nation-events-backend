import { Nation } from '@prisma/client'
import prisma from '../../prisma/prisma-client'
import { ResponseStatus, ServiceResponse } from '../../src/models/serviceResponse'

export const getNations = async () => {
  try {
    const nations = await prisma.nation.findMany()

    if (!nations) {
      return new ServiceResponse(ResponseStatus.Failed, 'No nations found', null, 404)
    }

    return new ServiceResponse<Nation[]>(ResponseStatus.Success, 'Nations found', nations, 200)
  } catch (error) {
    const errorMessage = 'Error getting nations: ' + error
    return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, 500)
  }
}
