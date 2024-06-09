import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EXERCISE } from '../utils/queries';

const SingleExercise = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_EXERCISE, {
    variables: { id: id },
  });
  const exercise = data?.exercise || {};

  if (loading) {
    return <div>Loading...</div>; }

  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {exercise.name}
      </h3>
      <div className="bg-light py-4">
        <div className="p-4" style={{ fontSize: '1.5rem', lineHeight: '1.5' }}>
          <p>Sets: {exercise.sets}</p>
          <p>Reps: {exercise.reps}</p>
          {exercise.weight && <p>Weight: {exercise.weight} lbs</p>}
        </div>
      </div>
      <Link to="/exercises" className="btn btn-secondary mt-3">
        Back to Exercises
      </Link>
    </div>
  );
};

export default SingleExercise;