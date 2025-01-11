import { Module } from "@nestjs/common";
import { RegisterLessonController } from "./register-lesson.controller";
import { IRegisterLessonUseCase } from "@/domain/calendar/application/interfaces/register-lesson.use-case.interface";
import { RegisterLessonUseCase } from "@/domain/calendar/application/use-cases/register-lesson";
import { DatabaseModule } from "@/infra/database/database.module";
import { LessonsRepository } from "@/domain/calendar/application/repositories/LessonsRepository";
import { RevisionsRepository } from "@/domain/calendar/application/repositories/RevisionsRepository";
import { GetDateRevisionsController } from "./get-date-revisions.controller";
import { IGetDateRevisionsUseCase } from "@/domain/calendar/application/interfaces/get-date-revisions.use-case.interface";
import { GetDateRevisionsUseCase } from "@/domain/calendar/application/use-cases/get-date-revisions";

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    RegisterLessonController,
    GetDateRevisionsController,
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
    {
      provide: IGetDateRevisionsUseCase,
      useFactory: (
        lessonsRepository: LessonsRepository,
        revisionsRepository: RevisionsRepository
      ) => {
        return new GetDateRevisionsUseCase(lessonsRepository, revisionsRepository)
      },
      inject: [LessonsRepository, RevisionsRepository]
    },
  ]
})
export class HttpModule {}
