export default `
  type Notification {
		id: Int
    title: String!
		description: String
  }

  type Query {
    notifications: [Notification]
  }
`