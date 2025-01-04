import { Revision as DomainRevision } from "@/domain/calendar/enterprise/entities/revision";
import { Revision as PrismaRevision, Prisma } from "@prisma/client";
import { UUID } from "crypto";

export class PrismaRevisionsMapper {
  static toDomain(raw: PrismaRevision): DomainRevision {
    const domainRevision = new DomainRevision({
      date: raw.date,
      lessonId: raw.lessonId as UUID
    })

    return domainRevision
  }

  static toPrisma(revision: DomainRevision): Prisma.RevisionUncheckedCreateInput {
    const prismaRevision = {
      id: revision.id,
      date: revision.date,
      completed: revision.isCompleted,
      lessonId: revision.lessonId
    }

    return prismaRevision
  }
}