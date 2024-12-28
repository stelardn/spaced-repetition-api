import { randomUUID, UUID } from 'node:crypto'
import { Lesson } from './lesson'

export interface RevisionProps {
  date: Date
  completed: boolean
}

export class Revision {
  private revisionId: UUID
  private date: Date
  private completed: boolean
  private lessonId: UUID

  constructor(date: Date, lessonId: UUID) {
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
      return new Revision(targetDate, lesson.id)
    })

    return revisions
  }

  get dueDate() {
    return this.date
  }

  get parentLessonId() {
    return this.lessonId
  }
}
