import React from 'react';

const ExerciseList = ({ exercises = [] }) => {
  if (!exercises.length) {
    return <h3>No Exercises Yet</h3>;
  }

  return (
    <>
      <h3 className="p-5 display-inline-block" style={{ borderBottom: '1px dotted #1a1a1a' }}>
        Exercises
      </h3>
      <div className="flex-row my-4">
        {exercises &&
          exercises.map((exercise) => (
            <div key={exercise._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">{exercise.name}</h5>
                <p className="card-body">
                  Sets: {exercise.sets} <br />
                  Reps: {exercise.reps} <br />
                  {exercise.weight && `Weight: ${exercise.weight} lbs`}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ExerciseList;