import { Controller, Get, Param, PipeTransform } from '@nestjs/common'
import Joi from 'joi'
import { JoiValidationPipe } from './pipes/joi-validations-pipe'
import {
  IGetDateRevisionsUseCase,
  GetDateRevisionsUseCaseRequest,
} from '@/domain/calendar/application/interfaces/get-date-revisions.use-case.interface'

const getDateRevisionsParamsSchema = Joi.object({
  date: Joi.string().isoDate().required().strict(),
})

const paramsValidationPipe = new JoiValidationPipe(
  getDateRevisionsParamsSchema,
) as PipeTransform

@Controller('/revisions/:date')
export class GetDateRevisionsController {
  constructor(private getDateRevisions: IGetDateRevisionsUseCase) {}

  @Get()
  async handle(
    @Param(paramsValidationPipe) params: GetDateRevisionsUseCaseRequest,
  ) {
    const { date } = params

    const result = await this.getDateRevisions.execute({
      date,
    })

    return result
  }
}
