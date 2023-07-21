import React, {useState} from "react";
import '../App.css';
import client from './Client';
import { usernameinfo} from '../App';
import {  gql } from '@apollo/client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from '@mui/material';
//import  Appointment  from './Appointment';


    



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


        function formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          }
       
        //get the selected date and format it to be readable
        const [selectedDate, setSelectedDate] = useState(null);
        const formattedDate = selectedDate ? formatDate(selectedDate) : 'No Date Selected';

        class Appointment {
            constructor(date, time, location) {
              this.date = date;
              this.time = time;
              this.location = location;
            }
          }

       
        const appointment = new Appointment('2023-07-19', '10:00 AM', '123 Main St');
        const appointment1 = new Appointment('2023-10-23', '15:00 AM', '15 Main Rd');
        
        const appointments = [] ;
        appointments.push(appointment1);
        appointments.push(appointment);

        const [selectedAppointment, setSelectedAppointment] = useState(null);

        const handleAppointmentClick = (appointment) => {
          setSelectedAppointment(appointment);
          const { time, location } = appointment;
          alert(`Selected Appointment\nTime: ${time}\nLocation: ${location}\nDate: ${formattedDate}`);
        };

        
        const handleDateChange = (date) => {
            const isoString = date.toISOString();
            setSelectedDate(isoString);
            alert(`Selected date: ${date.toLocaleDateString()} (Local Time)\nISO String: ${isoString}`);
        };

    

    return(
        <div style={{ position: 'relative', left: '80px', top: '50px' }}>
            <h1>Calendar</h1>
            <Calendar className="custom-calendar" onChange={handleDateChange}  />
            <button onClick={getInfo}>Back</button>
            <Button className="logOut-Button" variant="contained" onClick={logOut}>Sign Out</Button>

            <div className="appointments-container">
            <Typography variant="h5">Appointments for {formattedDate}</Typography>
            <List>
                {appointments.map((appointment, index) => (
                <ListItem key={index}
                button
                selected={selectedAppointment === appointment}
                onClick={() => handleAppointmentClick(appointment)}
                >
                    <ListItemText  secondary={`Time: ${appointment.time}, Location: ${appointment.location}`} />
                 </ListItem>
                ))}
            </List>
            </div>
        </div>
    )
}