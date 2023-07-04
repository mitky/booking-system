
//import { Button } from 'grommet';
import { TextField } from "@mui/material";
import './App.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  gql } from '@apollo/client';
import client from './components/Client';






function App() {

 

 
  const [password, setPassword] = useState("");
  const [visible] = useState(false);

  


  let navigate = useNavigate();
  function logIn() {
    const login_username = document.getElementById("username").value;
    const login_password = document.getElementById("password").value;



    if(login_username === '' && login_password === ''){
      alert("please enter username and password");
    }
    else if(login_username === ''){
      alert("please enter username");
    }
    else if(login_password === ''){
      alert("please enter password");
    }
    else{
      checkUser(login_username, login_password)
      .then((userExists) => {
        if (userExists) {
          //console.log('User exists!');
          let path = `/b`; 
          navigate(path);
          alert("You logged in!");
        } else {
          alert("User do not exist!");
          console.log('User does not exist!');
        }
      })
      .catch((error) => {
       console.error('Error:', error);
      });
    }
    
    


    
  }


  const CHECK_USER_QUERY = gql`
  query CheckUser($username: String!, $password: String!) {
    appointment_project(where: { username: { _eq: $username }, password: { _eq: $password } }) {
      username
      password
    }
  }
`;

const checkUser = async (username, password) => {
  try {
    const { data } = await client.query({
      query: CHECK_USER_QUERY,
      variables: { username, password },
    });

    const userExists = data.appointment_project.length > 0;
    return userExists;
  } catch (error) {
    alert("User do not exist!");
    console.error('Error checking user:', error);
    return false;
  }
};

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
