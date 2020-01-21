import React from 'react';
import './App.css';
import ResourceCard from '../ResourceCard';

/* These below are for showing purposes */

const title = "Nodes";
const resourceNumber = 7;
function App() {
  return <div>
    <ResourceCard title={title} resourceNumber={resourceNumber}/>
  </div>;
}

export default App;
