import { randomUUID, UUID } from 'node:crypto'
import { Lesson } from './lesson'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { RevisionCreatedEvent } from '../events/revision-created'

export interface RevisionProps {
  date: Date
  lessonId: UUID
  completed?: boolean
  id?: UUID
}

export class Revision extends AggregateRoot {
  private _date: Date
  private _completed: boolean
  private _lessonId: UUID

  constructor({ date, lessonId, id, completed }: RevisionProps) {
    super(id  ?? randomUUID())
    this._date = date
    this._completed = completed ?? false
    this._lessonId = lessonId
  }

  static createRevisionsFromLesson(lesson: Lesson): Revision[] {
    const spacedPeriodsInDays = [1, 7, 30]
    const revisions = spacedPeriodsInDays.map(period => {
      const targetDate = new Date()
      targetDate.setDate(lesson.dateDayOfMonth + period)
      const newRevision = new Revision({
        date: targetDate,
        lessonId: lesson.id,
      })

      newRevision.addDomainEvent(new RevisionCreatedEvent(newRevision, lesson))

      return newRevision
    })

    return revisions
  }

  get date() {
    return this._date
  }

  get lessonId() {
    return this._lessonId
  }

  get isCompleted() {
    return this._completed
  }

  toggleCompletion() {
    this._completed = !this._completed
  }
}
