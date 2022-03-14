import React from 'react';
import './Home.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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


export default class Home extends React.Component {
    state = {
        products: [],
        rawProducts: [],
        viewDialog: false,
        formType: '',
        stock: '',
        projectID: '',

        requiredDate: null,
        loggedIn: false,
        isAdmin: false,
        productsPerPage: [],
        currentPage: 1,
        postsperpage: 4,
    }
    componentDidMount() {
        console.log(this.props);
        let loggedIn = localStorage.getItem('LoggedIn');
        let isAdmin = localStorage.getItem('isAdmin')
        console.log('loggedIn', loggedIn,'isAdmin', isAdmin);
        if (loggedIn == 'true') {
            this.setState({
                loggedIn: true
            })
        }
        if (isAdmin == 'true') {
            this.setState({
                isAdmin: true
            })
        }
        if(loggedIn!=="true") {
            window.location.href="http://localhost:3000/login"
        }
        axios.get('http://localhost:8080/products/product')
            .then((response) => {
                console.log(response)
                let filteredProducts = response.data.filter((element, index) => {
                    if (index < 4) {
                        return element;
                    }
                })
                console.log(filteredProducts)
                this.setState({
                    products: filteredProducts, rawProducts: response.data
                })
            }).catch((Err) => {
                console.log(Err)
            })
    }
    handleSearchFilter = (text) => {
        let filteredProducts = this.state.rawProducts.filter((product) => {
            let productTitle = product.title.toLocaleLowerCase();
            if (productTitle.includes(text)) {
                return product;
            }
        });
        let setPage = filteredProducts.filter((element, index) => {
            if (index < 4) {
                return element;
            }
        })
        this.setState({
            products: setPage
        });
    }
    handleClickOpen = () => {
        this.setState({
            viewDialog: true
        })
    };

    handleClose = () => {
        this.setState({
            viewDialog: false
        }, () => {
            console.log(this.state);
        })
    };

    handleDropdown = (event) => {
        this.setState({
            formType: event.target.value
        })
    };
    handlestock = (e) => {
        this.setState({
            stock: e.target.value
        })
    }
    handleProductID = (e) => {
        this.setState({
            productID: e.target.value
        })
    }
    handleDatePicker = (newValue) => {
        this.setState({
            requiredDate: newValue.target.value
        })
    };
    handlePrev = () => {
        if (this.state.currentPage != 1) {

            let indexOfLastPost = this.state.currentPage - 1 * this.state.postsperpage;
            console.log('indexoflastpost', indexOfLastPost)
            let itemsperpage = this.state.rawProducts.filter((element, index) => {
                if (index > indexOfLastPost && index < indexOfLastPost + 5) {
                    return element;
                }
            })
            console.log('itemsperpage', itemsperpage)
            if (this.state.currentPage > 1) {
                this.setState({
                    currentPage: this.state.currentPage - 1,
                    products: itemsperpage
                })
            }
        }
    }
    handleNext = () => {
        let indexOfLastPost = this.state.currentPage * this.state.postsperpage;
        let itemsperpage = this.state.rawProducts.filter((element, index) => {
            if (index > indexOfLastPost - 1 && index < indexOfLastPost + 4) {
                return element;
            }
        })
        if (itemsperpage < 4) {

        } else {
            this.setState({
                currentPage: this.state.currentPage + 1,
                products: itemsperpage
            })
        }
    }
     
    handleHeaderClick = () => {
        this.props.handleClickOpen();
    }
    render() {
        return (
            <div className='home'>
                <Header handleClickOpen={this.props.handleClickOpen} cartItemCount={this.props.cartItemCount} isLoggedIn={this.state.loggedIn} isAdmin={this.state.isAdmin} handleSearchFilter={this.handleSearchFilter} />
                <Dialog open={this.state.viewDialog} onClose={this.handleClose}>
                    <DialogTitle>Request Form</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Select
                                value={this.state.formType}
                                label="type"
                                fullWidth
                                onChange={this.handleDropdown}
                            >
                                <MenuItem value={'New'}>New Item</MenuItem>
                                <MenuItem value={'Current'}>Current Stock</MenuItem>
                            </Select>
                        </DialogContentText>
                        <Stack spacing={3}>

                            <TextField
                                autoFocus
                                id="stock"
                                label="Stock"
                                fullWidth
                                onChange={this.handlestock}
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                id="productID"
                                label="productID"
                                fullWidth
                                onChange={this.handleProductID}
                                variant="standard"
                            />
                            <input type="date" onSelect={this.handleDatePicker} ></input>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleClose}>Submit</Button>
                    </DialogActions>
                </Dialog>
                <div style={{ color: 'black' }}>
                    <h3>*</h3>
                </div>
                <div >
                    {this.state.products.map((element) => {
                        return (
                            <div style={{ display: 'inline-block', maxWidth: '250px', width: '350px', padding: '50px', alignItems:'left' }} >

                            <Card style={{backgroundColor:'#FFF0F5'}} key={element.id} sx={{ maxWidth: 250, maxHeight: 450, height: 450 }} >
                           
                                <img alt="img" height={'200px'} width={'200px'} src={element.img}  />
                                
                                <CardContent>

                             
                                    <h3 style={{height:'60px', color:'black'}}> <i>  {element.title}</i></h3>
                                 
                                        <h3 style={{color:'black'}}>₹{element.price}</h3>
                                        <Button variant="outlined" color="success" size="small" onClick={this.handlestock}>In Stock </Button>
                                   
                                </CardContent>
                               
                                <CardActions>
                                        {/* <Button variant="contained" size="small">Details</Button> */}
                                        <span style={{ position: 'relative', paddingLeft: '55px' }}><Button enabled={localStorage.getItem('LoggedIn') != 'true'} variant="contained" color="error" onClick={() => this.props.handleAddToCart(element)} size="small" >Add to Store</Button>
                                        </span></CardActions>
                                </Card>
                            </div>
                        )
                    })}
                </div><br /><br />
                <div>
                    {this.state.products.length > 0 ?
                         <div style={{
                            float: 'left',
                            position: "fixed",
                            bottom: 0,
                            zIndex: 100,
                            backgroundColor: "peach",
                            padding: "4px 4px",

                            color: "#7D0552",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#7D0552",



                        }}>
                            <div>
                                <ButtonGroup color="inherit" variant="contained" aria-label="outlined primary button group">
                                    <Button color="inherit" variant="contained" onClick={this.handlePrev}>Prev</Button>
                                    <Button>{this.state.currentPage}</Button>
                                    <Button color="inherit" variant="contained" onClick={this.handleNext}>Next</Button>


                                </ButtonGroup><br />

                               
                                {/* <Button variant="contained" color="success" onClick={() => addToStore(element)} size="small" >Add to Store</Button> */}
                                <br /><br /></div> </div>
                        : null}

                </div></div>
        )
    }
}

