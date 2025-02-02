import { CalendarService } from "../../../domain/scheduler/application/services/calendar-service";
import { GoogleCalendarService } from "../google-calendar";
import { AppError } from "@/core/errors/app-error";

export function makeCalendarService(serviceType: string): CalendarService {
  switch (serviceType) {
    case 'google':
      return new GoogleCalendarService();
    default:
      throw new AppError("Unsupported calendar service", "UNSUPPORTED_SERVICE", 400)
  }
}