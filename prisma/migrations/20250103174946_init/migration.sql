-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "theme" TEXT,
    "tags" TEXT[],
    "date" TIMESTAMP(3) NOT NULL,
    "course" TEXT,
    "references" TEXT[],

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revision" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "lessonId" TEXT NOT NULL,

    CONSTRAINT "Revision_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
