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

  type Props {
    vaccines: [Vaccine]
		medicaments: [Medicament]
		diseases: [Disease]
  }

  type Query {
    dog(id: ID!): Details
    dogs: [Dog]
    myDog: Details
    props: Props
  }

  input InputDisease {
    id: Int!
  }

  input InputVaccine {
    id: Int!
  }

  input InputMedicament {
    id: Int!
  }

	input DogInput {
		name: String!
		age: Int!
    diseases: [InputDisease]
    medicaments: [InputMedicament]
		vaccines: [InputVaccine]

  }
  
  type CreateResponse {
    message: String!
  }
  
  type Mutation {
		create(input: DogInput): CreateResponse!
	}
`