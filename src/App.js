
//import { Button } from 'grommet';
import { TextField } from "@mui/material";
import './App.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";






function App() {

 

 
  const [password, setPassword] = useState("");
  const [visible] = useState(false);


  let navigate = useNavigate();
  function logIn() {
    let path = `/b`; 
    navigate(path);
    alert("You logged in!");
  }

  function createAcc() {
    let path = `/a`; 
    navigate(path);
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Booking System 
        </p>
      </header>

      <TextField className="App-username" label="username" id="username" placeholder="username"   username/>
      <TextField className="App-password" label="password" id="password" placeholder="password" 
      value={password} onChange={e => setPassword(e.target.value)} type={visible ? "text" : "password"} password/>
      
      <button className="App-logginButton" onClick={logIn}>Log In</button>
      <button className="App-createAccButton" onClick={createAcc}>Register</button>
      
      
    

    </div>

    

  );
}

export default App;
