import { gql } from '@apollo/client';

export const QUERY_EXERCISE = gql`
  query getExercise {
    exercises {
      _id
      name
      sets
      reps
      weight
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      workoutPlans {
        _id
        name
        exercises {
          _id
          name
          sets
          reps
          weight
        }
        duration
        date
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation addExercise($name: String!, $sets: Int!, $reps: Int!, $weight: Float) {
    addExercise(name: $name, sets: $sets, reps: $reps, weight: $weight) {
      _id
      name
      sets
      reps
      weight
    }
  }
`;