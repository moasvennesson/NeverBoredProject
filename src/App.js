import React from 'react';
import ActivityHandler from './ActivityHandler'

function App() {
  

  return (
    <>
      <h1 style={{textAlign: "center"}}>Never bored</h1>
      <a class="btn btn-outline-success" href="http://www.boredapi.com/contributing" target="_blank" style={{float: "right"}}>Contribute</a>
      <ActivityHandler />
    </>
  );
}

export default App;