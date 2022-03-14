import React, { useEffect, useState } from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import './Header.css';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';


const Header = (props) => {
    const [isLoggedIn, setLogged] = useState(false)
    useEffect(() => {
        let loggedIn = localStorage.getItem('LoggedIn');
        let isAdmin = localStorage.getItem('isAdmin')
        console.log('loggedIn', loggedIn, 'isAdmin', isAdmin);
        if (loggedIn == 'true') {
            setLogged(true)
        }
        console.log(props)
    })
    const handleClick = () => {
        if (isLoggedIn) {
            localStorage.setItem('LoggedIn', false);
            localStorage.setItem('isAdmin', false);
            console.log(localStorage.getItem('isAdmin', 'LoggedIn'))
            setLogged(false);
            window.location.href = 'http://localhost:3000/';
        } else {
            window.location.href = 'http://localhost:3000/Login';
        }
    }
    return (
        <div className='divs'>

            <ul>
                <span hidden={window.location.href == 'http://localhost:3000/' ? false : true}>
                    <TextField
                        id="search"
                        label="search"
                        onChange={(e) => props.handleSearchFilter(e.target.value)}
                    /></span>
                <Link className='link' to={'/'}>Home</Link>{' '}
                <Link className='link' to={'/Procurement'}>Procurement</Link>{' '}
                <Link className='link' to={'/Finance'}>Finance</Link>{' '}
                <Link className='link' to={'/Logistics'}>Logistics</Link>{' '}
                <span style={{float:'right',}} hidden={props.hideLogin}>
                    <div>
                        <b><Button color="error" variant="outlined" onClick={() => handleClick()}>   {isLoggedIn ? 'Logout' : 'Login'} </Button></b>
                    </div>
                </span>{' '}
                <span style={{float:'right',color:'red',margin:'5px'}}>
                    <ShoppingCartIcon color='error' onClick={props.handleClickOpen} />  {props.cartItemCount ?
                    <sup style={{color:'red',
                    fontSize:'12px',
                    background: 'gold',
                    borderRadius:'50%',
                    padding:'3px',
                    position:'relative',
                    left:'-8px',
                    top:'-10px',
                    opacity:0.9}}> {props.cartItemCount} </sup> : null}
                </span>


            </ul>

        </div>
    )
}
export default Header;