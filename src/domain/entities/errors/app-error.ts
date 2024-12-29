export class AppError extends Error {
  readonly status: string
  readonly HTTPStatusCode: number
  readonly details?: object

  constructor(
    message: string,
    status: string,
    HTTPStatusCode: number,
    details?: object,
  ) {
    super(message)
    this.status = status
    this.HTTPStatusCode = HTTPStatusCode
    this.details = details
  }
}