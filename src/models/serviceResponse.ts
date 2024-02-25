import { z } from "zod"

export enum ResponseStatus {
  Failed,
  Success,
}

export class ServiceResponse<T = null> {
  data: T
  message: string
  statusCode: number
  success: boolean

  constructor(status: ResponseStatus, message: string, data: T, statusCode: number) {
    this.data = data
    this.message = message
    this.statusCode = statusCode
    this.success = status === ResponseStatus.Success
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema.optional(),
    message: z.string(),
    statusCode: z.number(),
    success: z.boolean(),
  })
