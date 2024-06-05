const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Workout {
    _id: ID
    name: String
    exercises: [Exercise]
    duration: Int
    date: String
  }

  type Exercise {
    _id: ID
    name: String
    sets: Int
    reps: Int
    weight: Float
  }

  type User {
    _id: ID
    username: String
    email: String
    workoutPlans: [Workout]
  }

  type Query {
    currentUser: User
    allWorkouts: [Workout]
    workout(id: ID!): Workout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addWorkout(name: String!, exercises: [ExerciseInput]!, duration: Int!, date: String!): Workout
    updateWorkout(id: ID!, name: String, exercises: [ExerciseInput], duration: Int, date: String): Workout
    deleteWorkout(id: ID!): Workout
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