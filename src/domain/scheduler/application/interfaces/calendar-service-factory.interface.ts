import { CalendarService } from "../services/calendar-service"

export type MakeCalendarService = (serviceType: string) => CalendarService