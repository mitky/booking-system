import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Calendar from './components/Calendar';




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    	<BrowserRouter>
			<Routes>
				<Route path='/' element={<App/>}/>
				<Route path='/a' element={<Register/>}/>
				<Route path='/b' element={<Calendar/>}/>
			
			</Routes>
    	</BrowserRouter>
  	</React.StrictMode>
);




