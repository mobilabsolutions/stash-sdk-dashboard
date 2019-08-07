export default interface Notifications {
  notification: Notification
  nrOfTransactions: number
}

export interface Notification {
  paymentMethod: string
  content: string
}
