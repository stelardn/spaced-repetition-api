import { CalendarService } from "@/domain/scheduler/application/services/calendar-service";
import { SchedulableEvent } from "@/domain/scheduler/enterprise/entities/schedulable-event";

export class GoogleCalendarService implements CalendarService {
  async authorize(): Promise<void> {
    throw new Error("Method not implemented yet")
  }
  async createEvent(event: SchedulableEvent): Promise<void> {
    throw new Error("Method not implemented yet")
  }
  async refreshAccessToken(userId: string): Promise<void> {
    throw new Error("Method not implemented yet")
  }
}