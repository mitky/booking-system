import React, {useState} from "react";
import '../App.css';
import client from './Client';
import { usernameinfo} from '../App';
import {  gql, useMutation } from '@apollo/client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { TextField } from "@mui/material";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'




//import  Appointment  from './Appointment';


    



export default function Clanedar(){

    

    const GET_User_Info = gql`
    query GetPassword($username: String!) {
        appointment_project(where: {username: {_eq: $username}}) {
        password
      }
    }
  `;

  


  const ADD_Appointment = gql`
  mutation InsertAppointments($username: String, $description: String, $date: String, $time: String) {
    insert_appointments(objects: {username: $username, description: $description,  date: $date, time: $time}) {
      affected_rows
      returning {
        username
        description
        id
        date
        time
      }
    }
  }
  `;    

  const [addAppointmentMutation, { loading, error }] = useMutation(ADD_Appointment, { client });

  const addAppointmentToDatabase =  (id, username, description, date, time) => {
    try {
      const result =  addAppointmentMutation({
        variables: {
          id: id,
          username: username,
          description: description,
          date: date,
          time: time,
        },
      });
      console.log('Appointment added');
      alert("Appointment added!");
      return result;
    } catch (error) {
      console.error('Error adding appointment:', error);
      alert("Error adding appointment");
      
    }
  };


    
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
        const [allAppointments, setAllAppointments] = useState(appointments);
        const [showAddNew, setShowAddNew] = useState(null);
        const [selectedTime, setSelectedTime] = useState(null);

        const handleDeleteAppointment = () => {
          if (!selectedAppointment) {
            return;
          }
          
          const isConfirmed = window.confirm('Are you sure you want to delete this appointment?');

          if (isConfirmed) {
            // Filter out the selected appointment from the appointments array
            const updatedAppointments = allAppointments.filter((appointment) => appointment !== selectedAppointment);
      
          // Update the state with the new appointments array
          setSelectedAppointment(null);
          setAllAppointments(updatedAppointments);
          }
        };

        const addNewAppointment = () => {

          if(selectedDate === null){
            alert("Please select a date")
          }
          else{
            setSelectedTime(null); //reset the timer when open new panel
            setShowAddNew(true); // Show the "Add New Appointment" panel      
          }
        };

        
       

        const addAppointment =  () => {

         

          const username = usernameinfo;
          const description = document.getElementById("description").value;
          const date = selectedDate;
          const time = selectedTime;
          const timeObject = new Date(time);
          const isoStringTime = timeObject.toISOString();
          const id=0;
         

          addAppointmentToDatabase(id, username, description, date, isoStringTime);
          alert(`Add Appointment\nUser: ${username}\ndescription: ${description}\nTime: ${isoStringTime}\nDate: ${date}`);
          setShowAddNew(false);
        };

        const cancelAddAppointment = () => {
          setShowAddNew(false); // Show the "Add New Appointment" panel
        };

        

        const handleAppointmentClick = (appointment) => {
          setSelectedAppointment(appointment);
          const { time, location } = appointment;
          //alert(`Selected Appointment\nTime: ${time}\nLocation: ${location}\nDate: ${selectedDate}`);
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
                {allAppointments.map((appointment, index) => (
                <ListItem key={index}
                button
                selected={selectedAppointment === appointment}
                onClick={() => handleAppointmentClick(appointment)}
                className={selectedAppointment === appointment ? 'selected' : ''}
                >
                    <ListItemText  secondary={`Time: ${appointment.time}, Location: ${appointment.location}`} />
                 </ListItem>
                ))}
                <Button variant="contained" color="primary" onClick={addNewAppointment}>Add Appointment</Button>
                <Button variant="contained" color="secondary" onClick={handleDeleteAppointment}>Delete Appointment</Button>
                
                
            </List>
                   {showAddNew && (
                    <div className="new-appointment-panel">
                      
                      {
                        <div>
                        <Typography className="new appointment-header">New Appointment</Typography>
                        <TextField className="calendar-description" label="description" id="description" placeholder="description"  description/>
                        
                        <div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Select Time"
                          value={selectedTime}
                          onChange={(newValue) => setSelectedTime(newValue)}
                          />
                       </LocalizationProvider>
                        </div>

                        <div>
                        <Button variant="contained" color="primary" onClick={addAppointment}>Add </Button>
                        <Button variant="contained" color="secondary" onClick={cancelAddAppointment}>Cancel </Button>
                        </div>
                        </div>
                        
                      }
                    </div>
                  )}
        </div>
            
        </div>
    )
}