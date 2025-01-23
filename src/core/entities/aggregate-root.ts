import { UUID } from 'crypto'
import { DomainEvent } from '../events/domain-event'
import { DomainEvents } from '../events/domain-events'

export abstract class AggregateRoot {
  private _domainEvents: DomainEvent[] = []
  private _id: UUID

  constructor(id: UUID) {
    this._id = id
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  get id(): UUID {
    return this._id
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents() {
    this._domainEvents = []
  }
}
