import { describe, beforeEach, it, expect } from 'vitest'
import { RegisterLessonUseCase } from '../../src/domain/calendar/application/use-cases/register-lesson';
import { LessonsRepository } from '../../src/domain/calendar/application/repositories/LessonsRepository'
import { LessonsRepositoryInMemory } from '../repositories/LessonsRepositoryInMemory';
import { faker } from '@faker-js/faker';
import { Lesson } from '../../src/domain/calendar/enterprise/entities/lesson';
import { RevisionsRepositoryInMemory } from '../repositories/RevisionsRepositoryInMemory';

describe('RegisterLessonUseCase Unit Tests', async () => {
  let sut: RegisterLessonUseCase
  let lessonsRepository: LessonsRepositoryInMemory
  let revisionsRepository: RevisionsRepositoryInMemory

  beforeEach(() => {
    lessonsRepository = new LessonsRepositoryInMemory()
    revisionsRepository = new RevisionsRepositoryInMemory()
    sut = new RegisterLessonUseCase(
      lessonsRepository, 
      revisionsRepository
    )
  })

  it('must be possible to register a study', async () => {
    const result = await sut.execute({
      subject: faker.word.words(2),
      theme: faker.word.words(3),
    })
    expect(result).toBeInstanceOf(Lesson)
    expect(lessonsRepository.items).toHaveLength(1)
    expect(revisionsRepository.items).toHaveLength(3)
  })
})
