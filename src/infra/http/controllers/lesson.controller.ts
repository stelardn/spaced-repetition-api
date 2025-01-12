import { Body, Controller, NotFoundException, Param, PipeTransform, Post, Put } from '@nestjs/common'
import Joi from 'joi'
import { JoiValidationPipe } from './pipes/joi-validations-pipe'
import { IRegisterLessonUseCase, RegisterLessonUseCaseRequest } from '@/domain/calendar/application/interfaces/register-lesson.use-case.interface'
import { EditLessonUseCaseRequest, IEditLessonUseCase } from '@/domain/calendar/application/interfaces/edit-lesson.use-case.interface'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

const registerLessonBodySchema = Joi.object({
  subject: Joi.string().required(),
  theme: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(),
  date: Joi.date().optional(),
  course: Joi.string().optional(),
  references: Joi.array().items(Joi.string()).optional(),
})

const editLessonBodySchema = Joi.object({
  subject: Joi.string().optional(),
  theme: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  date: Joi.date().optional(),
  course: Joi.string().optional(),
  references: Joi.array().items(Joi.string()).optional(),
})

const editLessonParamsSchema = Joi.object({
  lessonId: Joi.string().uuid().required()
})

const registerLessonBodyValidationPipe = new JoiValidationPipe(registerLessonBodySchema) as PipeTransform
const editLessonBodyValidationPipe = new JoiValidationPipe(editLessonBodySchema) as PipeTransform
const editLessonParamsValidationPipe = new JoiValidationPipe(editLessonParamsSchema) as PipeTransform

@Controller('/lessons')
export class LessonsController {
  constructor(
    private registerLesson: IRegisterLessonUseCase,
    private editLesson: IEditLessonUseCase,
  ) {}

  @Post()
  async CreateLesson(
    @Body(registerLessonBodyValidationPipe) body: RegisterLessonUseCaseRequest
  ) {
    const {
      subject,
      theme,
      course,
      date,
      references,
      tags
    } = body

    const result = await this.registerLesson.execute({
      subject,
      theme,
      course,
      date,
      references,
      tags
    })

    return result
  }

  @Put('/:lessonId')
  async EditLesson(
    @Param(editLessonParamsValidationPipe) params: EditLessonUseCaseRequest,
    @Body(editLessonBodyValidationPipe) body: EditLessonUseCaseRequest
  ) {
    try {
      const {
        subject,
        theme,
        course,
        date,
        references,
        tags
      } = body
  
      const {
        lessonId
      } = params
  
      const result = await this.editLesson.execute({
        lessonId,
        subject,
        theme,
        course,
        date,
        references,
        tags
      })
  
      return result
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw new NotFoundException(error)
      }

      throw error
    }
  }

}
