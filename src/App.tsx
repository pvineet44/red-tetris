import './App.css';
import { Counter } from './components/Counter';
import axios from 'axios';
import React, { useEffect } from 'react'


function App() {

  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    axios.get('http://localhost:4000/api/test').then((res) => console.log(res))
  });


  return (
    <div className="App">
      <h1>abcee shshshs!!</h1>
      <Counter />
    </div>
  );
}

export default App;
