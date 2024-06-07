import { useQuery } from '@apollo/client';

import WORKOUTLIST from '../components/WORKOUTLIST';
import WORKOUTFORM from '../components/WORKOUTFORM';
import EXERCISELIST from '../components/EXERCISELIST';
import EXERCISEFORM from '../components/EXERCISEFORM';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <WORKOUTFORM />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <WORKOUTLIST
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
      {/* <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <EXERCISEFORM />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <EXERCISELIST
              thoughts={thoughts}
              title="Exercise List"
            />
          )} */}
       {/*  </div>
      </div> */}
    </main>
  );
};

export default Home;
