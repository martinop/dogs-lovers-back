export default `
  type Vaccine {
    id: Int!
    name: String!
	}
	
	type Medicament {
    id: Int!
    name: String!
	}
	
	type Disease {
    id: Int!
    name: String!
	}
	
  type Dog {
    name: String!
    id: Int!
    age: Int!
  }

  type Details {
    name: String!
    id: Int!
    age: Int!
    vaccines: [Vaccine]
		medicaments: [Medicament]
		diseases: [Disease]
  }

  type Query {
    dog(id: ID!): Details
    dogs: [Dog]
  }
`