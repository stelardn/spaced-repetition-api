import { LessonsRepository } from "@/domain/calendar/application/repositories/LessonsRepository";
import { Lesson } from "@/domain/calendar/enterprise/entities/lesson";
import { UUID } from "crypto";
import { PrismaService } from "../prisma.service";
import { PrismaLessonsMapper } from "../mappers/PrismaLessonMapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaLessonsRepository implements LessonsRepository {
  constructor(
    private prismaService: PrismaService
  ) {}

  async create(lesson: Lesson): Promise<void> {
    const data = PrismaLessonsMapper.toPrisma(lesson)
    
    await this.prismaService.lesson.create({
      data
    })
  }
  
  async getManyByIds(ids: UUID[]): Promise<Lesson[]> {
    const items = await this.prismaService.lesson.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    const lessons = items.map(PrismaLessonsMapper.toDomain)
    return lessons
  }
  getById(id: UUID): Promise<Lesson | null> {
    throw new Error("Method not implemented.");
  }
  save(lesson: Lesson): Promise<Lesson | null> {
    throw new Error("Method not implemented.");
  }

}