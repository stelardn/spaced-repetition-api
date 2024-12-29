import { Revision } from './revision'
import { randomUUID, UUID } from 'node:crypto'

export interface LessonProps {
  subject: string
  theme?: string
  tags?: string[]
  date?: Date
  course?: string
  references?: string[]
}

export class Lesson {
  private _id: UUID
  private _subject: string
  private _theme: string | null
  private _tags: string[]
  private _date: Date
  private _revisions: Revision[]
  private _course: string | null
  private _references: string[]

  constructor({ subject, tags, date, course, references, theme }: LessonProps) {
    this._id = randomUUID()
    this._subject = subject
    this._theme = theme ?? null
    this._tags = tags ?? []
    this._date = date ?? new Date()
    this._revisions = Revision.createRevisionsFromLesson(this)
    this._references = references ?? []
    this._course = course ?? null
  }

  get id() {
    return this._id
  }

  get dateDayOfMonth() {
    return this._date.getDate()
  }

  get revisions() {
    return this._revisions
  }

  get subject() {
    return this._subject
  }

  get theme() {
    return this._theme
  }

  get date() {
    return this._date
  }

  get course() {
    return this._course
  }

  get tags() {
    return this._tags
  }

  get references() {
    return this._references
  }

  set theme(newTheme: string | null) {
    this._theme = newTheme
  }

  set subject(newSubject: string) {
    this._subject = newSubject
  }

  set tags(newTags: string[]) {
    this._tags = [...newTags]
  }

  set references(newReferences: string[]) {
    this._references = [...newReferences]
  }

  set course(newCourse: string | null) {
    this._course = newCourse
  }

  set date(newDate: Date) {
    this._date = newDate

    this._revisions = Revision.createRevisionsFromLesson(this)
  }
}
