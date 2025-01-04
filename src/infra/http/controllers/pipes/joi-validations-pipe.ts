import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  transform(value: any) {
    const { error, value: validatedValue } = this.schema.validate(value)

    if (error) {
      throw new BadRequestException({
        message: 'Validation failed.',
        statusCode: 400,
        errors: error.details
      })
    }

    return validatedValue
  }
}