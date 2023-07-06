import React from "react";
import '../App.css';
import client from './Client';
import { usernameinfo} from '../App';
import {  gql } from '@apollo/client';


export default function Clanedar(){

    const GET_User_Info = gql`
    query GetPassword($username: String!) {
        appointment_project(where: {username: {_eq: $username}}) {
        password
      }
    }
  `;


    
    function getInfo() {

        const username = usernameinfo;
        client.query({
            query: GET_User_Info,
            variables: { username },
        })
            .then(response => {
             const password = response.data.appointment_project[0].password;
             alert(password);
             console.log('Password:', password);
  })
            .catch(error => {
            alert("Error");
            console.error('Error:', error);
  });

    }

    return(
        <div>
            <h1>Calendar</h1>
            <button onClick={getInfo}>Back</button>
        </div>
    )
}