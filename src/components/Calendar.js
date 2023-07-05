import React from "react";
import '../App.css';
import client from './Client';
import { usernameinfo} from '../App';


export default function Clanedar(){
    
    function getInfo() {
        alert(usernameinfo);
       
      }

    return(
        <div>
            <h1>Calendar</h1>
            <button onClick={getInfo}>Back</button>
        </div>
    )
}