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

  type User {
    id: Int!
  }

  type Details {
    name: String!
    id: Int!
    age: Int!
    vaccines: [Vaccine]
		medicaments: [Medicament]
    diseases: [Disease]
    owner: User
  }

  type Props {
    vaccines: [Vaccine]
		medicaments: [Medicament]
		diseases: [Disease]
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
  
  input UpdateDogInput {
    id: Int!
    owner: Int!
    diseases: [InputDisease]
    medicaments: [InputMedicament]
		vaccines: [InputVaccine]
  }

  type GenericResponse {
    message: String!
  }
  
  type Mutation {
    create(input: DogInput): GenericResponse!
    update(input: UpdateDogInput): GenericResponse!
  }
  
  type Query {
    dog(id: Int!): Details
    dogs: [Dog]
    myDog: Details
    props: Props
  }

`