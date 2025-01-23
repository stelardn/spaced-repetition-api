import { SchedulableEvent } from '../../enterprise/entities/schedulable-event'
import { IScheduleEventUseCase, ScheduleEventUseCaseRequest } from '../interfaces/schedule-event.use-case.interface'
import { CalendarService } from '../services/calendar-service'

export class ScheduleEventUseCase implements IScheduleEventUseCase {
  constructor(
    private calendarService: CalendarService,
  ) {}

  async execute({
    title,
    dueDate,
    description
  }: ScheduleEventUseCaseRequest): Promise<void> {
    const schedulableEvent = new SchedulableEvent({
      title,
      dueDate,
      description
    })

    await this.calendarService.createEvent(schedulableEvent)
  }
}