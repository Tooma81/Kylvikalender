import React from 'react';
import './App.css';
import ActivityCalendar from './components/ActivityCalendar';

function App() {
  return (
    <div className="app">
      <div className="content-section"></div>
      <div className="content-section"></div>
      <div className="content-section">
        <ActivityCalendar />
      </div>
    </div>
  );
}

export default App;
