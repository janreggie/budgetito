export interface State {
  entries: Entry[]
}

export interface Entry {
  type: EntryType
  name: string
  value: number
}

export type EntryType = 'Income' | 'Expense'

export type Action =
  | { type: 'clear' }
  | { type: 'add', entry: Entry }
