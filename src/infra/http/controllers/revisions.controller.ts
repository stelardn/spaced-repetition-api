import { Controller, Get, NotFoundException, Param, Patch, PipeTransform } from '@nestjs/common'
import Joi from 'joi'
import { JoiValidationPipe } from './pipes/joi-validations-pipe'
import {
  IGetDateRevisionsUseCase,
  GetDateRevisionsUseCaseRequest,
} from '@/domain/calendar/application/interfaces/get-date-revisions.use-case.interface'
import { IToggleRevisionCompletionUseCase, ToggleRevisionCompletionUseCaseRequest } from '@/domain/calendar/application/interfaces/toggle-revision-completion.use-case.interface'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

const getDateRevisionsParamsSchema = Joi.object({
  date: Joi.string().isoDate().required().strict(),
})

const toggleRevisionCompletionParamsSchema = Joi.object({
  revisionId: Joi.string().uuid().required(),
})

const toggleRevisionCompletionParamsValidationPipe = new JoiValidationPipe(
  toggleRevisionCompletionParamsSchema,
) as PipeTransform

const getDateRevisionsParamsValidationPipe = new JoiValidationPipe(
  getDateRevisionsParamsSchema,
) as PipeTransform

@Controller('/revisions')
export class RevisionsController {
  constructor(
    private getDateRevisions: IGetDateRevisionsUseCase,
    private toggleRevisionCompletion: IToggleRevisionCompletionUseCase,
  ) {}

  @Get('/:date')
  async GetDateRevisions(
    @Param(getDateRevisionsParamsValidationPipe) params: GetDateRevisionsUseCaseRequest,
  ) {
    const { date } = params

    const result = await this.getDateRevisions.execute({
      date,
    })

    return result
  }

  @Patch('/completion/:revisionId')
  async ToggleRevisionCompletion(
    @Param(toggleRevisionCompletionParamsValidationPipe) params: ToggleRevisionCompletionUseCaseRequest,
  ) {
    try {
      const { revisionId } = params
  
      const result = await this.toggleRevisionCompletion.execute({
        revisionId,
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
