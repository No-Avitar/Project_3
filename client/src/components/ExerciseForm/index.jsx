import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_EXERCISE } from '../../utils/mutations';
import { QUERY_EXERCISE, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ExerciseForm = () => {
    const [exerciseText, setExerciseText] = useState('');
  
    const [characterCount, setCharacterCount] = useState(0);
  
    const [addExercise, { error }] = useMutation
    (ADD_EXERCISE, {
      refetchQueries: [
        QUERY_EXERCISE,
        'getExercise',
        QUERY_ME,
        'me'
      ]
    });
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await addExercise({
          variables: {
            exerciseText,
            exerciseAuthor: Auth.getProfile().data.username,
          },
        });
  
        setExerciseText('');
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      if (name === 'exerciseText' && value.length <= 280) {
        setExerciseText(value);
        setCharacterCount(value.length);
      }
    };
  
    return (
      <div>
        <h3>Create new workout plan</h3>
  
        {Auth.loggedIn() ? (
          <>
            <p
              className={`m-0 ${
                characterCount === 280 || error ? 'text-danger' : ''
              }`}
            >
              Character Count: {characterCount}/280
            </p>
            <form
              className="flex-row justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
              <div className="col-12 col-lg-9">
                <textarea
                  name="exerciseText"
                  placeholder="Create a new exercise"
                  value={exerciseText}
                  className="form-input w-100"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></textarea>
              </div>
  
              <div className="col-12 col-lg-3">
                <button className="btn btn-primary btn-block py-3" type="submit">
                  Create Exercise
                </button>
              </div>
              {error && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {error.message}
                </div>
              )}
            </form>
          </>
        ) : (
          <p>
            You need to be logged in to create a workout plan.{' '}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>
    );
  };
  
  export default ExerciseForm;

  import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '60px' }}>
        {/* Other components or content can be placed here */}
      </div>
      <Footer />
    </div>
  );
};