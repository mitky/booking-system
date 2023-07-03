import React from "react";
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import client from './Client';
import '../App.css';




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

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    

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
      document.getElementById("password").value = "";
      
    }

    
  };
    

    return(
      
      
      <form onSubmit={handleSubmit}>
      <div>
        <header className="register-header">Register</header>
        <input className="username-field" placeholder="username" type="text" id="username" name="username" />
      </div>
      <div >
        <input className="password-field" placeholder="password" type="password" id="password" name="password" />
      </div>
      <div>
        <button className="Register-createAccButton" type="submit">Sign up</button>
        <button  className="Register-backButton" onClick={goBack}>Back</button>
      </div>
      
    </form>
  
  );

       
    
}