import { RevisionsRepository } from "@/domain/calendar/application/repositories/RevisionsRepository";
import { Revision } from "@/domain/calendar/enterprise/entities/revision";
import { UUID } from "crypto";
import { PrismaService } from "../prisma.service";
import { PrismaRevisionsMapper } from "../mappers/PrismaRevisionMapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaRevisionsRepository implements RevisionsRepository {
  constructor(
    private prismaService: PrismaService
  ) {}
  async bulkCreate(revisions: Revision[]): Promise<void> {
    const data = revisions.map(PrismaRevisionsMapper.toPrisma)

    await this.prismaService.revision.createMany({
      data
    })
  }
  async getByDate(date: Date): Promise<Revision[]> {
    const items = await this.prismaService.revision.findMany({
      where: {
        date
      }
    })

    const revisions = items.map(PrismaRevisionsMapper.toDomain) 

    return revisions
  }
  async getById(id: UUID): Promise<Revision | null> {
    const dbItem = await this.prismaService.revision.findUnique({
      where: {
        id
      }
    })

    if (!dbItem) return null

    const revision = PrismaRevisionsMapper.toDomain(dbItem)
    return revision
  }

  async save(revision: Revision): Promise<Revision | null> {
    const data = PrismaRevisionsMapper.toPrisma(revision)

    const updatedDbItem = await this.prismaService.revision.update({
      data,
      where: {
        id: revision.id
      }
    })

    const updatedRevision = PrismaRevisionsMapper.toDomain(updatedDbItem)

    return updatedRevision
  }

  async deleteManyByLessonId(lessonId: UUID): Promise<void> {
    await this.prismaService.revision.deleteMany({
      where: {
        lessonId
      }
    })
  }
}