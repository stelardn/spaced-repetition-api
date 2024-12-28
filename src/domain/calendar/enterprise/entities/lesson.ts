import { Revision } from './revision'
import { randomUUID, UUID } from 'node:crypto'

export interface LessonProps {
  subject: string
  theme?: string
  tags?: string[]
  date?: string
  course?: string
  references?: string[]
}

export class Lesson {
  private lessonId: UUID
  private subject: string
  private theme: string | null
  private tags: string[]
  private date: Date
  private revisions: Revision[]
  private course: string | null
  private references: string[]

  constructor({subject, tags, date, course, references, theme}: LessonProps) {
    this.lessonId = randomUUID()
    this.subject = subject
    this.theme = theme ?? null
    this.tags = tags ?? []
    this.date = date ? new Date(date) : new Date()
    this.revisions = Revision.createRevisionsFromLesson(this)
    this.references = references ?? []
    this.course = course ?? null
  }

  get id() {
    return this.lessonId
  }

  get dateDayOfMonth() {
    return this.date.getDate()
  }

  get lessonRevisions() {
    return this.revisions
  }
}
