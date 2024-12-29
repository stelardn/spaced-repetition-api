import { AppError } from './app-error'

export default class ResourceNotFoundError extends AppError {
  constructor(resourceName?: string, resourceValue?: any) {
    super(
      `The resource ${resourceName || ''} was not found.`,
      'RESOURCE_NOT_FOUND',
      404,
      {
        input: resourceValue || 'unknown' 
      }
    )
  }
}