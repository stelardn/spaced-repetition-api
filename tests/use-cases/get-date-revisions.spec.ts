import { describe, beforeEach, it, expect, vitest, vi } from 'vitest'
import { GetDateRevisionsUseCase } from '../../src/domain/calendar/application/use-cases/get-date-revisions';
import { RegisterLessonUseCase } from '../../src/domain/calendar/application/use-cases/register-lesson';
import { LessonsRepositoryInMemory } from '../repositories/LessonsRepositoryInMemory';
import { faker } from '@faker-js/faker';
import { Lesson } from '../../src/domain/calendar/enterprise/entities/lesson';
import { RevisionsRepositoryInMemory } from '../repositories/RevisionsRepositoryInMemory';
import { afterEach } from 'node:test';

describe('RegisterLessonUseCase Unit Tests', async () => {
  let sut: GetDateRevisionsUseCase
  let lessonsRepository: LessonsRepositoryInMemory
  let revisionsRepository: RevisionsRepositoryInMemory

  beforeEach(() => {
    lessonsRepository = new LessonsRepositoryInMemory()
    revisionsRepository = new RevisionsRepositoryInMemory()
    sut = new GetDateRevisionsUseCase(
      lessonsRepository, 
      revisionsRepository
    )

    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 11, 31));
  
    const createLessonUseCase = new RegisterLessonUseCase(
      lessonsRepository,
      revisionsRepository,
    )
    createLessonUseCase.execute({
      subject: faker.word.words(2),
      theme: faker.word.words(3),
    })

    vi.setSystemTime(new Date(2024, 11, 8));
    createLessonUseCase.execute({
      subject: faker.word.words(2),
      theme: faker.word.words(3),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('must be possible to get lessons to revision for the date', async () => {
    const today = '2025-01-07'
    const lessons = await sut.execute({date: today})
    expect(lessons).toHaveLength(2)
    expect(lessonsRepository.items).toHaveLength(2)
    expect(revisionsRepository.items).toHaveLength(6)
  })
})
