import { randomUUID, UUID } from 'node:crypto'
import { Lesson } from './lesson'

export interface RevisionProps {
  date: Date
  lessonId: UUID
}

export class Revision {
  private _id: UUID
  private _date: Date
  private _completed: boolean
  private _lessonId: UUID

  constructor({ date, lessonId }: RevisionProps) {
    this._id = randomUUID()
    this._date = date
    this._completed = false
    this._lessonId = lessonId
  }

  static createRevisionsFromLesson(lesson: Lesson): Revision[] {
    const spacedPeriodsInDays = [1, 7, 30]
    const revisions = spacedPeriodsInDays.map(period => {
      const targetDate = new Date()
      targetDate.setDate(lesson.dateDayOfMonth + period)
      return new Revision({
        date: targetDate,
        lessonId: lesson.id
      })
    })

    return revisions
  }

  get date() {
    return this._date
  }

  get lessonId() {
    return this._lessonId
  }

  get id() {
    return this._id
  }

  get isCompleted() {
    return this._completed
  }

  toggleCompletion() {
    this._completed = !this._completed
  }
}
