import { ResourceNotFoundError } from '../../src/core/errors/resource-not-found'
import { describe, beforeEach, it, expect, vitest, vi } from 'vitest'
import { ToggleRevisionCompletionUseCase } from '../../src/domain/calendar/application/use-cases/toggle-revision-completion';
import { RevisionsRepositoryInMemory } from '../repositories/RevisionsRepositoryInMemory';
import { makeRevision } from '../factories/make-revision';
import { randomUUID } from 'crypto';

describe('ToggleRevisionCompletion - Unit Tests', async () => {
  let sut: ToggleRevisionCompletionUseCase
  let revisionsRepository: RevisionsRepositoryInMemory

  beforeEach(() => {
    revisionsRepository = new RevisionsRepositoryInMemory()
    sut = new ToggleRevisionCompletionUseCase(
      revisionsRepository
    )
  })

  it('must be possible to set a revision as completed', async () => {
    const revision = makeRevision()
    revisionsRepository.items.push(revision)

    const result = await sut.execute({ revisionId: revision.id })
    expect(result?.isCompleted).toBe(true)
  })

  it('must be possible to reset a revision as not completed', async () => {
    const revision = makeRevision({}, true)
    revisionsRepository.items.push(revision)

    const result = await sut.execute({ revisionId: revision.id })
    expect(result?.isCompleted).toBe(false)
  })

  it('must throw a Resource Not Found Error if the revision does not exist', async () => {
    await expect(
      sut.execute({ revisionId: randomUUID() })
    ).rejects.toThrow(ResourceNotFoundError)
  })
})
