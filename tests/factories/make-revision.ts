import { randomUUID } from "node:crypto";
import { Revision, RevisionProps } from "../../src/domain/calendar/enterprise/entities/revision";

export function makeRevision(
  override: Partial<RevisionProps> = {},
  isCompleted = false
) {
  const revision = new Revision({
    date: new Date(),
    lessonId: randomUUID(),
    ...override,
  })

  if (isCompleted) {
    revision.toggleCompletion()
  }

  return revision
}