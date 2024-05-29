const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Workout {
    id: ID
    name: String
    exercises: [Exercise]
    duration: Int
    date: String
  }

  type Exercise {
    id: ID
    name: String
    sets: Int
    reps: Int
    weight: Float
  }

  type User {
    id: ID
    username: String
    email: String
    workoutplans: [Workout]
  }

  type Query {
    currentusers: User
    allworkouts: [Workout]
    workout(id: ID!): Workout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addworkout(name: String!, exercises: [ExerciseInput]!, duration: Int!, date: String!): Workout
    updateworkout(id: ID!, name: String, exercises: [ExerciseInput], duration: Int, date: String): Workout
    deleteworkout(id: ID!): Workout
  }

  input ExerciseInput {
    name: String
    sets: Int
    reps: Int
    weight: Float
  }

  type AuthPayload {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;