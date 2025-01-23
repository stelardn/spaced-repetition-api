import { randomUUID, UUID } from 'crypto'

export interface SchedulableEventConstrutorParams {
  id?: UUID
  title: string
  dueDate: Date
  description?: string
}

export class SchedulableEvent {
  private _id: UUID
  private _dueDate: Date

  public title: string
  public description?: string

  constructor({
    id,
    title,
    dueDate,
    description,
  }: SchedulableEventConstrutorParams) {
    this._id = id ?? randomUUID()
    this._dueDate = dueDate
    this.title = title
    this.description = description
  }

  get id() {
    return this._id
  }

  get dueDate() {
    return this._dueDate
  }
}