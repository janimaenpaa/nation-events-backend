import { z } from "zod"

export enum ResponseStatus {
  Failed,
  Success,
}

export class ServiceResponse<T = null> {
  message: string
  responseObject: T
  statusCode: number
  success: boolean

  constructor(status: ResponseStatus, message: string, responseObject: T, statusCode: number) {
    this.message = message
    this.responseObject = responseObject
    this.statusCode = statusCode
    this.success = status === ResponseStatus.Success
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    message: z.string(),
    responseObject: dataSchema.optional(),
    statusCode: z.number(),
    success: z.boolean(),
  })
