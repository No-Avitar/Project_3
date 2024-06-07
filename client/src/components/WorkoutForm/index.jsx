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

const headerStyle = {
  background: '#333',
  color: '#fff',
  padding: '10px 0',
  textAlign: 'center'
};

const navStyle = {
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'center',
  padding: '0'
};

const footerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px 0',
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%'
};

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

export default WorkoutForm;