import { AppError } from './app-error'

export class ResourceNotFoundError extends AppError {
  constructor(resourceName?: string, resourceValue?: unknown) {
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