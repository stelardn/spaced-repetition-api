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

  async getById(id: UUID): Promise<Lesson | null> {
    const dbItem = await this.prismaService.lesson.findUnique({
      where: {
        id
      }
    })

    if (!dbItem) return null

    const lesson = PrismaLessonsMapper.toDomain(dbItem)
    return lesson
  }

  async save(lesson: Lesson): Promise<Lesson | null> {
    const data = PrismaLessonsMapper.toPrisma(lesson)

    const updatedDbItem = await this.prismaService.lesson.update({
      data,
      where: {
        id: lesson.id
      }
    })

    const updatedLesson = PrismaLessonsMapper.toDomain(updatedDbItem)

    return updatedLesson
  }

}