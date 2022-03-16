
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {TableRow, TableHead,TableContainer,AppBar, TableCell, TableBody, Table, Paper, TextField} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './table.css';

 
export default function CenteredTabs() {
 const [value, setValue] = React.useState(0);
 const [data, setData] = useState([]);
 const [ashow, setAShow] = useState(false);
 const [rshow, setRShow] = useState(false);
 const [pshow, setPShow] = useState(true);
 
 const handleChange = (element, newValue) => {
   if(newValue == 0){
     setPShow(true);
     setAShow(false);
     setRShow(false);
   }else if(newValue == 1){
    setPShow(false);
    setAShow(true);
    setRShow(false);
  }
  else if(newValue == 2){
    setPShow(false);
    setAShow(false);
    setRShow(true);
  }
   setValue(newValue);
 };
   
  useEffect(()=> {
   console.log("trying to load order on page load")
     handleRefresh();
} ,[])
 
const handleRefresh = () => {
    axios.get('http://localhost:8080/logistics/approved_carts')
   .then((response) => {
     console.log(response)
     setData(response.data);
   }).catch((err) => {
     console.log(err);
   })
}

 
const handleApprove = (row, id) => {
 console.log(id)
  
   axios.post('http://localhost:8080/order/approve/' +row.id)
     .then((response) => {
       console.log('new item added',response);
       handleRefresh();
     }).catch((err) => {
       console.log(err)
     })
 }
 const handleReject = (row, id) => {
   console.log(id);
  
   axios.post('http://localhost:8080/order/reject/' +row.id)
     .then((response) => {
       console.log(response);
       handleRefresh();
      
     }).catch((err) => {
       console.log(err);
     })
 }
  return (
   
   <TableContainer component={Paper}>
   { pshow?
  
  <Table sx={{ minWidth: 450 }} aria-label="simple table" key='opending'> 

        <TableHead>
          <TableRow>
           <TableCell align="center">Title</TableCell>
           <TableCell align="center">Price</TableCell>
          <TableCell align="center">Quantity</TableCell>
          <TableCell align="center">Status</TableCell>
   
       </TableRow>
      </TableHead>
      
        <TableBody>
         {data.map((row, id) => (
           <TableRow
             key={row.name}
             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >
            <TableCell align="center">{row.title}</TableCell>
             <TableCell align="center">{row.price}</TableCell>
             <TableCell align="center">{row.quantity}</TableCell>
             <TableCell align="center">{row.status}</TableCell>
             <TableCell align="center">
            
             </TableCell>
           </TableRow>
         ))}
 
      </TableBody> 
     </Table> : ashow? <Orderapproval key='oappr'></Orderapproval>:<Orderreject key='orej'></Orderreject>
     }
   </TableContainer>
   
 
  );
}
 