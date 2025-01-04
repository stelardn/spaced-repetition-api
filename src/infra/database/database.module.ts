import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaLessonsRepository } from "./prisma/repositories/PrismaLessonsRepository";
import { LessonsRepository } from "@/domain/calendar/application/repositories/LessonsRepository";
import { RevisionsRepository } from "@/domain/calendar/application/repositories/RevisionsRepository";
import { PrismaRevisionsRepository } from "./prisma/repositories/PrismaRevisionsRepository";

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: LessonsRepository,
      useClass: PrismaLessonsRepository
    },
    {
      provide: RevisionsRepository,
      useClass: PrismaRevisionsRepository
    }
  ],
  exports: [
    LessonsRepository,
    RevisionsRepository 
  ]
})
export class DatabaseModule {}
