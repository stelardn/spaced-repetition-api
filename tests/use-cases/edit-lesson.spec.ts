import { describe, beforeEach, it, expect, afterEach, vi } from 'vitest'
import { EditLessonUseCase } from '../../src/domain/calendar/application/use-cases/edit-lesson';
import { LessonsRepositoryInMemory } from '../repositories/LessonsRepositoryInMemory';
import { faker } from '@faker-js/faker';
import { Lesson } from '../../src/domain/calendar/enterprise/entities/lesson';
import { RevisionsRepositoryInMemory } from '../repositories/RevisionsRepositoryInMemory';
import { makeLesson } from '../factories/make-lesson';
import { randomUUID } from 'node:crypto';
import { ResourceNotFoundError } from '../../src/core/errors/resource-not-found'

describe('RegisterLessonUseCase Unit Tests', async () => {
  let sut: EditLessonUseCase
  let lessonsRepository: LessonsRepositoryInMemory
  let revisionsRepository: RevisionsRepositoryInMemory

  beforeEach(() => {
    lessonsRepository = new LessonsRepositoryInMemory()
    revisionsRepository = new RevisionsRepositoryInMemory()

    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 11, 30));

    sut = new EditLessonUseCase(
      lessonsRepository, 
      revisionsRepository
    )
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('must throw an error if the lesson does not exist', async () => {
    const newSubject = faker.word.words(2)
    const newTheme = faker.word.words(3)

    await expect(
      sut.execute({
        lessonId: randomUUID(),
        subject: newSubject,
        theme: newTheme
      })
    ).rejects.toThrow(ResourceNotFoundError)
  })

  it('must be possible to edit a lesson subject and theme', async () => {
    const lesson = makeLesson()
    lessonsRepository.items.push(lesson)

    const newSubject = faker.word.words(2)
    const newTheme = faker.word.words(3)

    const result = await sut.execute({
      lessonId: lesson.id,
      subject: newSubject,
      theme: newTheme
    })

    expect(result).toBeInstanceOf(Lesson)
    expect(result?.subject).toEqual(newSubject)
    expect(result?.theme).toEqual(newTheme)
  })

  it('must remove old date revisions and create new ones when editing a lesson date', async () => {
    const lesson = makeLesson()
    lessonsRepository.items.push(lesson)
    revisionsRepository.items.push(...lesson.revisions)

    vi.setSystemTime(new Date(2024, 11, 31));

    const newDate = new Date()

    const result = await sut.execute({
      lessonId: lesson.id,
      date: newDate
    })

    expect(revisionsRepository.items).toHaveLength(3)
    expect(revisionsRepository.items[0].date).toEqual(new Date(2025, 0, 1))
    expect(result?.revisions[0].date).toEqual(new Date(2025, 0, 1))
    expect(revisionsRepository.items[1].date).toEqual(new Date(2025, 0, 7))
    expect(result?.revisions[1].date).toEqual(new Date(2025, 0, 7))
    expect(revisionsRepository.items[2].date).toEqual(new Date(2025, 0, 30))
    expect(result?.revisions[2].date).toEqual(new Date(2025, 0, 30))
  })

  it('must be possible to add new tags and references', async () => {
    const lesson = makeLesson()
    lessonsRepository.items.push(lesson)

    const newTags = [
      faker.word.sample(1),
      faker.word.sample(1),
      faker.word.sample(1),
    ]

    const newReferences = [
      faker.internet.url(),
      faker.internet.url(),
    ]

    const result = await sut.execute({
      lessonId: lesson.id,
      tags: newTags,
      references: newReferences
    })

    expect(result?.tags).toEqual(newTags)
    expect(result?.references).toEqual(newReferences)
  })

  it('must not remove tags and references if not intended to', async () => {
    const tags = [
      faker.word.sample(1),
      faker.word.sample(1),
      faker.word.sample(1),
    ]

    const references = [
      faker.internet.url(),
      faker.internet.url(),
    ]

    const lesson = makeLesson({
      tags,
      references
    })

    lessonsRepository.items.push(lesson)

    const result = await sut.execute({
      lessonId: lesson.id,
      subject: 'new subject'
    })

    expect(result?.tags).toEqual(tags)
    expect(result?.references).toEqual(references)
  })

  it('must remove tags and references if intended to', async () => {
    const tags = [
      faker.word.sample(1),
      faker.word.sample(1),
      faker.word.sample(1),
    ]

    const references = [
      faker.internet.url(),
      faker.internet.url(),
    ]

    const lesson = makeLesson({
      tags,
      references
    })

    lessonsRepository.items.push(lesson)

    const result = await sut.execute({
      lessonId: lesson.id,
      subject: 'new subject',
      tags: [],
      references: []
    })

    expect(result?.tags).toHaveLength(0)
    expect(result?.references).toHaveLength(0)
  })
})
