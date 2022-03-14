import React from 'react';
import './table.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
export default class Logistics extends React.Component {
    state = {
        products: [],
        loggedIn:false,
        isAdmin:false
    }
    componentDidMount() {
        let loggedIn = localStorage.getItem('LoggedIn');
        let isAdmin = localStorage.getItem('isAdmin')
        console.log('loggedIn',loggedIn,'isAdmin',isAdmin);
        if(loggedIn=='true'){
            this.setState({
                loggedIn:true
            })
        }
        if(isAdmin=='true'){
            this.setState({
                isAdmin:true
            })
        }
        axios.get('http://localhost:3001/getLogistics')
            .then((res) => {
                console.log(res);
                let products = res.data.data.map((element) => {
                    let obj = {
                        projectID: element.projectID,
                        quantity: element.quantity,
                        requiredDate: element.requiredDate,
                        approvedByProcurement: element.approvedByProcurement,
                        approvedByLogistics: element.approvedByLogistics,
                        approvedByFinance: element.approvedByFinance,
                        name:element.name,
                        price:element.price
                    }
                    return obj;
                })
                console.log(products)
                this.setState({
                    products
                });
            })
            .catch((Err) => {
                console.log(Err);
            })
    }
    handleApprove = (element) => {
        console.log(element);
        let data = {
            projectID: element.projectID,
            approvedByLogistics: 'Approved',
            approvedByFinance:'Approved',
            approvedByProcurement:'Approved'
        };
        let updatedProducts = this.state.products.map((product) => {
            if (product.projectID == element.projectID) {
                let obj = {
                    projectID: product.projectID,
                    quantity: product.quantity,
                    requiredDate: product.requiredDate,
                    approvedByLogistics: 'Approved'
                }
                return obj;
            } else {
                return product;
            }
        })
        console.log('updatedProducts', updatedProducts)
        this.setState({
            products: updatedProducts
        });
        axios.put('http://localhost:3001/updateLogistics', data)
            .then((response) => {
                console.log(response);
            }).catch((Err) => {
                console.log(Err);
            })

    }


    handleReject = (element) => {
        console.log(element);
        let data = {
            projectID: element.projectID,
            approvedByLogistics: 'Rejected'
        };
        axios.put('http://localhost:3001/updateLogistics', data)
            .then((response) => {
                console.log(response);
                let updatedProducts = this.state.products.map((product) => {
                    if (product.projectID == element.projectID) {
                        let obj = {
                            projectID: product.projectID,
                            quantity: product.quantity,
                            requiredDate: product.requiredDate,
                            approvedByLogistics: 'Rejected',

                        }
                        return obj;
                    } else {
                        return product;
                    }
                })
                console.log('updatedProducts', updatedProducts)
                this.setState({
                    products: updatedProducts
                });
            }).catch((Err) => {
                console.log(Err);
            })
    }
    render() {
        return (
            <div hidden={!(this.state.isAdmin&&this.state.loggedIn)}>
                    <div style={{color:'black'}}>
                <h3> Logistics</h3>
                </div>
                <table>
                    <thead>
                        <th>Project ID</th>
                        <th>Quantity</th>
                        <th>Required Date</th>
                        <th>Price</th>
                        <th>Name</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {this.state.products.length > 0 ? this.state.products.map((element) => {
                            return (
                                <tr key={element.projectID}>
                                    <td>{element.projectID}</td>
                                    <td>{element.quantity}</td>
                                    <td>{element.requiredDate}</td>
                                    <td>{element.price}</td>
                                    <td>{element.name}</td>
                                    <td>{element.approvedByLogistics == 'Approved' ? <b>Approved<CheckBoxIcon></CheckBoxIcon></b> : element.approvedByLogistics == 'Rejected' ? <b>Rejected<CancelIcon></CancelIcon></b> : null}<span hidden={element.approvedByLogistics !== 'Pending'}> <Button onClick={()=>this.handleApprove(element)}>Approve<CheckBoxIcon></CheckBoxIcon></Button><Button onClick={()=>this.handleReject(element)}>Reject<CancelIcon></CancelIcon></Button></span></td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                </table>
            </div>
        )
    }
}