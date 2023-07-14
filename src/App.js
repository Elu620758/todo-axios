import React from 'react';
import './App.css';
import Todo from './todo-axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Todo/>
      </header>
    </div>
  );
}

export default App;
