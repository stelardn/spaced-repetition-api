import { UUID } from 'crypto'
import { AggregateRoot } from '../entities/aggregate-root'
import { DomainEvent } from './domain-event'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DomainEventCallback = (event: any) => void

export class DomainEvents {
  private static handlersMap: Record<string, DomainEventCallback[]> = {}
  private static markedAggregates: AggregateRoot[] = []

  public static shouldRun = true

  public static markAggregateForDispatch(aggregate: AggregateRoot) {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot) {
    aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event))
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot,
  ) {
    const index = this.markedAggregates.findIndex((a) => a.id === aggregate.id)

    this.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID(
    id: UUID,
  ): AggregateRoot | undefined {
    return this.markedAggregates.find((aggregate) => aggregate.id === id)
  }

  public static dispatchEventsForAggregate(id: UUID) {
    const aggregate = this.findMarkedAggregateByID(id)

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register(
    callback: DomainEventCallback,
    eventClassName: string,
  ) {
    const wasEventRegisteredBefore = eventClassName in this.handlersMap

    if (!wasEventRegisteredBefore) {
      this.handlersMap[eventClassName] = []
    }

    this.handlersMap[eventClassName].push(callback)
  }

  public static clearHandlers() {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates() {
    this.markedAggregates = []
  }

  private static dispatch(event: DomainEvent) {
    const eventClassName: string = event.constructor.name

    const isEventRegistered = eventClassName in this.handlersMap

    if (!this.shouldRun) {
      return
    }

    if (isEventRegistered) {
      const handlers = this.handlersMap[eventClassName]

      for (const handler of handlers) {
        handler(event)
      }
    }
  }
}
