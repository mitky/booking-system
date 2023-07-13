import React from "react";
import '../App.css';
import client from './Client';
import { usernameinfo} from '../App';
import {  gql } from '@apollo/client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


    



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

        let navigate = useNavigate();

        function logOut() {
        let path = `/`; 
        navigate(path);
      
        }

   
        const handleDateChange = (date) => {
          console.log(date);
          alert(`Selected date: ${date}`);
        };

        function onDayEvent(){
            //panel when day is clicked
        }

    return(
        <div style={{ position: 'relative', left: '80px', top: '50px' }}>
            <h1>Calendar</h1>
            <Calendar className="custom-calendar" onChange={handleDateChange} onClickDay={onDayEvent} />
            <button onClick={getInfo}>Back</button>
            <Button className="logOut-Button" variant="contained" onClick={logOut}>Sign Out</Button>
        </div>
    )
}