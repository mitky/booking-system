import React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import client from './Client';
import '../App.css';
import Button from '@mui/material/Button';




const ADD_USER = gql`
mutation InsertAppointmentProject($username: String, $password: String) {
  insert_appointment_project(objects: {username: $username, password: $password}) {
    affected_rows
    returning {
      username
			password
    }
  }
}
`;

export default function Register(){

  const [password, setPassword] = useState("");
  const [visible] = useState(false);

  const [addUserMutation, { loading, error }] = useMutation(ADD_USER, { client });

  const addUserToDatabase = async (username, password) => {
    try {
      const result = await addUserMutation({
        variables: {
          username: username,
          password: password,
        },
      });
      console.log('User added successfully');
      alert("User added successfully!");
      return result;
    } catch (error) {
      console.error('Error adding user:', error);
      alert("Username awready exist");
      
    }
  };

  let navigate = useNavigate();

  function goBack() {
    let path = `/`; 
    navigate(path);
    
  }

  

  function register(){
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    

    if(username === '' && password === ''){
      alert("please enter username and password");
    }
    else if(username ===''){
      alert("please enter username");
    }
    else if(password ===''){
      alert("please enter password");
    }
    else{
      addUserToDatabase(username, password);
      document.getElementById("username").value = "";
      
      setPassword('');
      
    }

  };
    

    return(
      
      
      
      <div >
        <header className="App-header">Register</header>
        <TextField className="App-username" label="username" id="username" placeholder="username"   username/>
        <TextField className="App-password" label="password" id="password" placeholder="password" 
        value={password} onChange={e => setPassword(e.target.value)} type={visible ? "text" : "password"} password/>
      
        <Button className="Register-createAccButton" variant="contained" onClick={register}>Sign up</Button>
        <Button className="Register-backButton" variant="contained" onClick={goBack}>Back</Button>
      </div>
      
    
  
  );

       
    
}