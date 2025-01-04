import { Body, Controller, PipeTransform, Post } from '@nestjs/common'
import Joi from 'joi'
import { JoiValidationPipe } from './pipes/joi-validations-pipe'
import { IRegisterLessonUseCase, RegisterLessonUseCaseRequest } from '@/domain/calendar/application/interfaces/register-lesson.use-case.interface'

const registerLessonBodySchema = Joi.object({
  subject: Joi.string().required(),
  theme: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(),
  date: Joi.date().optional(),
  course: Joi.string().optional(),
  references: Joi.array().items(Joi.string()).optional(),
})

const bodyValidationPipe = new JoiValidationPipe(registerLessonBodySchema) as PipeTransform

@Controller('/lessons')
export class RegisterLessonController {
  constructor(private registerLesson: IRegisterLessonUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: RegisterLessonUseCaseRequest
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
}
