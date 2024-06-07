import { gql } from '@apollo/client';

export const GET_ALL_WORKOUTS = gql`
  query getAllWorkouts {
    allWorkouts {
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
`;

export const GET_WORKOUT = gql`
  query getWorkout($id: ID!) {
    workout(id: $id) {
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
`;

export const GET_EXERCISE = gql`
  query getExercise($id: ID!) {
    exercise(id: $id) {
      _id
      name
      sets
      reps
      weight
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
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