import { AppError } from "../../../core/errors/app-error";

export class InvalidDateError extends AppError {
  constructor(inputDate: string) {
    super(
      'Date should be in ISO Date format YYYY-MM-DD.',
      'INVALID_DATE_FORMAT',
      400,
      {
        input: inputDate
      }
    )
  }
}