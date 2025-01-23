import { DomainEvent } from '@/core/events/domain-event';
import { UUID } from 'crypto';
import { Revision } from '../entities/revision';
import { Lesson } from '../entities/lesson';

export class RevisionCreatedEvent implements DomainEvent {
  public revision: Revision
  public lesson: Lesson
  public ocurredAt: Date
  
  constructor(
    revision: Revision,
    lesson: Lesson
  ) {
    this.revision = revision
    this.lesson = lesson
    this.ocurredAt = new Date()
  }

  getAggregateId(): UUID {
    return this.revision.id
  }
}