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
  getByDate(date: Date): Promise<Revision[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: UUID): Promise<Revision | null> {
    throw new Error("Method not implemented.");
  }
  save(revision: Revision): Promise<Revision | null> {
    throw new Error("Method not implemented.");
  }
  bulkDelete(revisions: Revision[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
}