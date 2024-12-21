import { describe, beforeEach, it, expect } from 'vitest'
import { RegisterLessonUseCase } from './register-lesson'
import { LessonsRepository } from '../repositories/LessonsRepository'
import { LessonsRepositoryInMemory } from 'test/repositories/LessonsRepositoryInMemory'
import { faker } from '@faker-js/faker'
import { Lesson } from '../../enterprise/entities/lesson'

describe('RegisterLessonUseCase Unit Tests', async () => {
  let sut: RegisterLessonUseCase

  beforeEach(() => {
    const lessonsRepository: LessonsRepository =
      new LessonsRepositoryInMemory()
    sut = new RegisterLessonUseCase(lessonsRepository)
  })

  it('must be possible to register a study', async () => {
    const result = await sut.execute({
      subject: faker.word.words(2),
      theme: faker.word.words(3),
    })
    expect(result).toBeInstanceOf(Lesson)
  })
})
