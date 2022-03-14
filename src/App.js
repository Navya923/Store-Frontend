import logo from './logo.svg';
import './App.css';
import Home from '../src/Home';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Procurement from './components/Procurement';
import Logistics from './components/Logistics';
import Finance from './components/Finance';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from './components/Header';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import ButtonGroup from '@mui/material/ButtonGroup';
import { withRouter } from 'react-router';
import ProtectedRoute from './protectedRoute';
import { HomeMax } from '@mui/icons-material';


 
class App extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isAdmin: false,
      formelement: {},
      cartItems: [],
      viewDialog: false,
      showSuccess:false,
      

    }
  }

  componentDidMount() {
    console.log(this.props)
  }

  getLoggedIn = (login, isAdmin,userName) => {
    console.log(login, isAdmin);
    if (login) {  
      localStorage.setItem('LoggedIn', true)
      localStorage.setItem('userName',userName)
    }
    if (isAdmin) {
      localStorage.setItem('isAdmin', true)
    }
    window.location.replace('/');
    console.log(this.props)
  }

  handleStoreRequest = (data) => {
    console.log(data);
    this.setState({
      formelement: data
    })
  }

  handleAddToCart = (element) => {
    let cartItems = this.state.cartItems;
    let newElement={
      title:element.title,
      quantity:1,
      requiredDate:'',
      price:element.price
    }
    cartItems.push(newElement);
    this.setState({
      cartItems: cartItems
    }, () => {
      console.log(this.state.cartItems)
    })
  }

  handleClose = () => {
    this.setState({
      viewDialog: false
    })
  }

  handleSubmit = () => {
    this.state.cartItems.map((element)=>{
       let data = {
         title: element.title,
         quantity: element.quantity,
        //  requiredDate: element.requiredDate,
        //  name:localStorage.getItem('userName'),
         price:element.price
       }
     axios.post('http://localhost:8080/cart', data)
       .then((response) => {
         console.log(response);
         this.setState({
           showSuccess: true
         })
       }).catch((Err) => {
         console.log(Err);
       })
     })
};
  
  handleClickOpen = () => {
    this.setState({
      viewDialog: true
    })
  };

  handleIncrease = (element,index) => {
    console.log(element,index)
    let cartItems=this.state.cartItems.map((item,ind)=>{
      if(element.title==item.title){
        return {
          title:element.title,
          quantity:Number(element.quantity)+1,
          requiredDate:element.requiredDate,
          price:element.price
        }
      }else{
        return item;
      }
    })
    console.log('cartItems',cartItems);
    this.setState({
      cartItems:cartItems
    });
  }


  handleDecrease = (element,index) => {
    console.log(element,index)
    let cartItems=this.state.cartItems.map((item,ind)=>{
      if(element.title==item.title){
        console.log('item',item)
        if(Number(item.quantity)>1){
          console.log('itemcondi',item)
          return {
            title:element.title,
            quantity:Number(item.quantity)-1,
            requiredDate:element.requiredDate,
            price:element.price
          }
        }
      }else{
        return item;
      }
    })
    console.log('cartItems',cartItems);
    cartItems=cartItems.filter(item=>item);
    this.setState({
      cartItems:cartItems
    });
  }
  handleDatePicker = (element,index,event) => {
    console.log(element,index,event.target.value )
    let cartItems=this.state.cartItems;
    cartItems[index].requiredDate=event.target.value
    console.log(cartItems);
    this.setState({
      cartItems:cartItems
    })
};
  render() {
    // console.log('props', this.props);
    return (
      <div className="App">
        <Dialog style={{ width: '1200px' }} open={this.state.viewDialog} onClose={this.handleClose}>
          <DialogTitle>Cart</DialogTitle>
          <DialogContent>
            
            {this.state.cartItems.map((element,index) => {
              return (
                <div>
                 <b> {element.title} - ${element.price}</b><br/>

                  <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button onClick={()=>this.handleIncrease(element,index)}>+</Button>
                    <Button>{element.quantity}</Button>
                    <Button onClick={()=>this.handleDecrease(element,index)}>-</Button>
                  </ButtonGroup><br/>
                  <input type="date" onSelect={(e)=>this.handleDatePicker(element,index,e)} ></input><br/><br/>
                     
                </div>
              )
            })}
          </DialogContent>
          <DialogActions>
            <div  hidden={this.state.showSuccess||this.state.cartItems.length==0}>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button disabled={this.state.cartItems.length>0?false:true} onClick={this.handleSubmit}>Checkout</Button>
            </div>
          </DialogActions>
          {this.state.showSuccess?<b>Request Raised for Procurement<br/></b> :null}
        </Dialog>
        <Routes>
          <Route exact path="/"
            element={
              <div>
                {/* <Header /> */}
                <Home handleClickOpen={this.handleClickOpen} cartItemCount={this.state.cartItems.length} handleAddToCart={this.handleAddToCart} handleStoreRequest={this.handleStoreRequest} isLoggedIn={this.state.loggedIn} isAdmin={this.state.isAdmin}  /> 
                {/* <Home isLoggedIn={this.state.loggedIn} 
                isAdmin={this.state.isAdmin} /> */}
              </div>
            }
          />
        
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
         
          <Route path='/Procurement'
            element={
              <div>
                <Header handleClickOpen={this.handleClickOpen} cartItemCount={this.state.cartItems.length} isLoggedIn={this.state.loggedIn}  
                isAdmin={this.state.isAdmin}/>
                <Procurement isLoggedIn={this.state.loggedIn} 
                isAdmin={this.state.isAdmin} />
              </div>
            }
          />
          <Route path='/Logistics'
            element={
              <div>
                <Header handleClickOpen={this.handleClickOpen} cartItemCount={this.state.cartItems.length} isLoggedIn={this.state.loggedIn} 
                isAdmin={this.state.isAdmin} />
                <Logistics isLoggedIn={this.state.loggedIn} 
                isAdmin={this.state.isAdmin}/>

              </div>
            }
          />
          <Route path='/Finance'
            element={
              // {isAdmin}
              <div>
                <Header handleClickOpen={this.handleClickOpen} cartItemCount={this.state.cartItems.length} isLoggedIn={this.state.loggedIn}
                isAdmin={this.state.isAdmin}/>
                <Finance isLoggedIn={this.state.loggedIn} 
                isAdmin={this.state.isAdmin}/>

              </div>
            }
          />
        </Routes>
      </div>
    );
  }
}
export default App;
