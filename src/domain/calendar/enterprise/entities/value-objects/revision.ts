export interface RevisionProps {
  date: Date
  completed: boolean
}

export class Revision {
  protected props: RevisionProps

  constructor(date: Date) {
    this.props = {
      date,
      completed: false,
    }
  }

  static createRevisionsFromInitialDate(initialDate: Date): Revision[] {
    const spacedPeriodsInDays = [1, 7, 30]
    const revisions = spacedPeriodsInDays.map(period => {
      const targetDate = new Date()
      targetDate.setDate(initialDate.getDate() + period)
      return new Revision(targetDate)
    })

    return revisions
  }
}
