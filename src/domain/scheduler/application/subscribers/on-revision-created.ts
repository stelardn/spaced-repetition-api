import { EventHandler } from "@/core/events/event-handler";
import { RevisionCreatedEvent } from "@/domain/calendar/enterprise/events/revision-created";
import { IScheduleEventUseCase } from "../interfaces/schedule-event.use-case.interface";
import { DomainEvents } from "@/core/events/domain-events";
import { MakeCalendarService } from "../interfaces/calendar-service-factory.interface";
import { ScheduleEventUseCase } from "../use-cases/schedule-event";

export class OnRevisionCreated implements EventHandler {
  private scheduleEventUseCase: IScheduleEventUseCase
  constructor(
    private serviceFactory: MakeCalendarService
  ) {
    this.setupSubscriptions()
  }
  
  setupSubscriptions(): void {
    DomainEvents.register(
      this.createCalendarEventForRevision.bind(this),
      RevisionCreatedEvent.name
    )
  }

  private async createCalendarEventForRevision({ 
    revision, 
    lesson
  }: RevisionCreatedEvent) {
    const {
      date
    } = revision

    const {
      subject,
      theme,
      course,
      date: lessonDate
    } = lesson

    const description = `
      Lesson took in ${lessonDate.toDateString()}
      ${ course ? `as part of course ${course}` : '' }
      ${ theme ? `with the theme: ${theme}` : ''}
    `

    const service = this.serviceFactory('google')

    this.scheduleEventUseCase = new ScheduleEventUseCase(service)

    await this.scheduleEventUseCase.execute({
      title: subject,
      dueDate: date,
      description
    })
  }

}