import { Lesson as DomainLesson } from "@/domain/calendar/enterprise/entities/lesson";
import { Lesson as PrismaLesson, Prisma } from "@prisma/client";
import { UUID } from "crypto";

export class PrismaLessonsMapper {
  static toDomain(raw: PrismaLesson): DomainLesson {
    const domainLesson = new DomainLesson({
      subject: raw.subject,
      theme: raw.theme ?? undefined,
      course: raw.course ?? undefined,
      date: raw.date,
      references: raw.references,
      tags: raw.tags,
      id: raw.id as UUID,
    })

    return domainLesson
  }

  static toPrisma(lesson: DomainLesson): Prisma.LessonUncheckedCreateInput {
    const prismaLesson = {
      id: lesson.id,
      subject: lesson.subject,
      theme: lesson.theme ?? null,
      course: lesson.course ?? null,
      date: lesson.date,
      references: lesson.references,
      tags: lesson.tags
    }

    return prismaLesson
  }
}