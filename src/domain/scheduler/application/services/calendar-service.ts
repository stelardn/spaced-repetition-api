import { SchedulableEvent } from '../../enterprise/entities/schedulable-event'

export abstract class CalendarService {
  abstract authorize(): Promise<void>
  abstract createEvent(event: SchedulableEvent): Promise<void>
  abstract refreshAccessToken(userId: string): Promise<void>
}