import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HotelList from './components/HotelList';

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Hotel Decameron</h1>
      <HotelList />
    </div>
  );
}

export default App;