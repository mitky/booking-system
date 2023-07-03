import React from "react";
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import client from './Client';




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
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
      </div>
      <div>
        <label htmlFor="password" >Password:</label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit">Add User</button>
      <button  onClick={goBack}>Back</button>
    </form>
  
  );

       
    
}