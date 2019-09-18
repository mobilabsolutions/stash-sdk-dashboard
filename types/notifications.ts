export default interface Notifications {
  notification: Notification
  nrOfTransactions: number
}

export interface Notification {
  paymentMethod: string
  date: string
  content: string
}

export interface Transaction {
  day: string
  nrOfTransactions: number
}

export interface Root {
  notifications: Notification[]
  transactions: Transaction[]
}
