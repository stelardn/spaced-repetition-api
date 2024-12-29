import { randomUUID, UUID } from 'node:crypto'
import { Lesson } from './lesson'

export interface RevisionProps {
  date: Date
  lessonId: UUID
}

export class Revision {
  private revisionId: UUID
  private date: Date
  private completed: boolean
  private lessonId: UUID

  constructor({ date, lessonId }: RevisionProps) {
    this.revisionId = randomUUID()
    this.date = date
    this.completed = false
    this.lessonId = lessonId
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

  get dueDate() {
    return this.date
  }

  get parentLessonId() {
    return this.lessonId
  }

  get id() {
    return this.revisionId
  }

  get isCompleted() {
    return this.completed
  }

  toggleCompletion() {
    this.completed = !this.completed
  }
}
