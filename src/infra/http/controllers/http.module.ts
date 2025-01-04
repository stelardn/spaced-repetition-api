import { Module } from "@nestjs/common";
import { RegisterLessonController } from "./register-lesson.controller";
import { IRegisterLessonUseCase } from "@/domain/calendar/application/interfaces/register-lesson.use-case.interface";
import { RegisterLessonUseCase } from "@/domain/calendar/application/use-cases/register-lesson";
import { DatabaseModule } from "@/infra/database/database.module";
import { LessonsRepository } from "@/domain/calendar/application/repositories/LessonsRepository";
import { RevisionsRepository } from "@/domain/calendar/application/repositories/RevisionsRepository";

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    RegisterLessonController,
  ],
  providers: [
    {
      provide: IRegisterLessonUseCase,
      useFactory: (
        lessonsRepository: LessonsRepository,
        revisionsRepository: RevisionsRepository
      ) => {
        return new RegisterLessonUseCase(lessonsRepository, revisionsRepository)
      },
      inject: [LessonsRepository, RevisionsRepository]
    },
  ]
})
export class HttpModule {}
