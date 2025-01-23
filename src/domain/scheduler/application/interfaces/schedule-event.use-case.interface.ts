export interface ScheduleEventUseCaseRequest {
  title: string
  dueDate: Date
  description?: string
}

export abstract class IScheduleEventUseCase {
  abstract execute(
    requestProps: ScheduleEventUseCaseRequest
  ): Promise<void>
}