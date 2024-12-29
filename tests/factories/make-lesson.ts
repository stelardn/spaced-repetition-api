import { Lesson, LessonProps } from "../../src/domain/calendar/enterprise/entities/lesson";
import { faker } from "@faker-js/faker";

export function makeLesson(
  override: Partial<LessonProps> = {}
) {
  const lesson = new Lesson({
    subject: faker.word.words(2),
    ...override,
  })

  return lesson
}
