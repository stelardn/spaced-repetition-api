import { Lesson } from "@prisma/client"

/** @description Date in YYYY-MM-DD format. */
type ISODateString = string

export interface GetDateRevisionsUseCaseRequest {
  date: ISODateString
}

export abstract class IGetDateRevisionsUseCase {
  abstract execute({ date }: GetDateRevisionsUseCaseRequest): Promise<Lesson[]>
}
