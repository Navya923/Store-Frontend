// import React from 'react';
// import './table.css';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import CancelIcon from '@mui/icons-material/Cancel';
// export default class Finance extends React.Component {
//     state = {
//         products: [],
//         loggedIn:false,
//         isAdmin:false
//     }
//     componentDidMount() {
//         let loggedIn = localStorage.getItem('LoggedIn');
//         let isAdmin = localStorage.getItem('isAdmin')
//         console.log('loggedIn',loggedIn,'isAdmin',isAdmin);
//         if(loggedIn=='true'){
//             this.setState({
//                 loggedIn:true
//             })
//         }
//         if(isAdmin=='true'){
//             this.setState({
//                 isAdmin:true
//             })
//         }
//         axios.get('http://localhost:3001/getFinance')
//             .then((res) => {
//                 console.log(res);
//                 let products = res.data.data.map((element) => {
//                     let obj = {
//                         projectID: element.projectID,
//                         quantity: element.quantity,
//                         requiredDate: element.requiredDate,
//                         approvedByProcurement: element.approvedByProcurement,
//                         approvedByFinance:element.approvedByFinance,
//                         name:element.name,
//                         price:element.price
//                     }
//                     return obj;
//                 })
//                 console.log(products)
//                 this.setState({
//                     products
//                 });
//             })
//             .catch((Err) => {
//                 console.log(Err);
//             })
//     }

//     handleApprove = (element) => {
//         console.log(element);
//         let data = {
//             projectID: element.projectID,
//             approvedByFinance: 'Approved'
//         };
//         let updatedProducts = this.state.products.map((product) => {
//             if (product.projectID == element.projectID) {
//                 let obj = {
//                     projectID: product.projectID,
//                     quantity: product.quantity,
//                     requiredDate: product.requiredDate,
//                     approvedByFinance:  'Approved',
//                     name:product.name,
//                     price:product.price
//                 }
//                 return obj;
//             } else {
//                 return product;
//             }
//         })
//         console.log('updatedProducts',updatedProducts)
//         this.setState({
//             products:updatedProducts
//         });
//         axios.put('http://localhost:3001/updateFinance', data)
//             .then((response) => {
//                 console.log(response);
//                 let financeData = {
//                     projectID: element.projectID,
//                     approvedByFinance: 'Approved',
//                     approvedByProcurement:'Approved',
//                     requiredDate: element.requiredDate,
//                     quantity: element.quantity,
//                     name:element.name,
//                     price:element.price
//                 }
//                 axios.post('http://localhost:3001/Logistics', financeData)
//                     .then((updatedRes) => {
//                         console.log(updatedRes);
//                     }).catch((Err) => {
//                         console.log(Err);
//                     })
//             }).catch((Err) => {
//                 console.log(Err);
//             })

//     }


//     handleReject = (element) => {
//         console.log(element);
//         let data = {
//             projectID: element.projectID,
//             approvedByFinance: 'Rejected'
//         };
//         axios.put('http://localhost:3001/updateFinance', data)
//             .then((response) => {
//                 console.log(response);
//                 let updatedProducts = this.state.products.map((product) => {
//                     if (product.projectID == element.projectID) {
//                         let obj = {
//                             projectID: product.projectID,
//                             quantity: product.quantity,
//                             requiredDate: product.requiredDate,
//                             approvedByFinance:  'Rejected',
//                             price:product.price,
//                             name:product.price
//                         }
//                         return obj;
//                     } else {
//                         return product;
//                     }
//                 })
//                 console.log('updatedProducts',updatedProducts)
//                 this.setState({
//                     products:updatedProducts
//                 });
//             }).catch((Err) => {
//                 console.log(Err);
//             })
//     }
//     render() {
//         return (
//             <div hidden={!(this.state.isAdmin&&this.state.loggedIn)}>
//                   <div style={{color:'black'}}>
//                 <h3>  Finance</h3>
//                 </div>
//                 <table>
//                     <thead>
//                         <th>Project ID</th>
//                         <th>Quantity</th>
//                         <th>Required Date</th>
//                         <th>Price</th>
//                         <th>Name</th>
//                         <th>Action</th>
//                     </thead>
//                     <tbody>
//                         {this.state.products.length > 0 ? this.state.products.map((element) => {
//                             return (
//                                 <tr key={element.projectID}>
//                                     <td>{element.projectID}</td>
//                                     <td>{element.quantity}</td>
//                                     <td>{element.requiredDate}</td>
//                                     <td>{element.price}</td>
//                                     <td>{element.name}</td>
//                                     <td>{element.approvedByFinance == 'Approved' ? <b>Approved<CheckBoxIcon></CheckBoxIcon></b> : element.approvedByFinance == 'Rejected' ? <b>Rejected<CancelIcon></CancelIcon></b> : null}<span hidden={element.approvedByFinance !== 'Pending'}> <Button onClick={()=>this.handleApprove(element)}>Approve<CheckBoxIcon></CheckBoxIcon></Button><Button onClick={()=>this.handleReject(element)}>Reject<CancelIcon></CancelIcon></Button></span></td>
//                                 </tr>
//                             )
//                         }) : null}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }


import React from 'react';
import './table.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
export default class Finance extends React.Component {
    state = {
        products: [],
        loggedIn:true,
        isAdmin:true
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
        axios.get('http://localhost:3001/getFinance')
            .then((res) => {
                console.log(res);
                let products = res.data.data.map((element) => {
                    let obj = {
                        productID: element.productID,
                        procurementID: element.procurementID,
                        quantity: element.quantity,
                        // requiredDate: element.requiredDate,
                        approvedByProcurement: element.approvedByProcurement,
                        price:element.price,
                        title:element.title
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
            approvedByFinance: 'Approved'
        };
        let updatedProducts = this.state.products.map((product) => {
            if (product.projectID == element.projectID) {
                let obj = {
                    projectID: product.projectID,
                    quantity: product.quantity,
                    requiredDate: product.requiredDate,
                    approvedByFinance:  'Approved',
                    name:product.name,
                    price:product.price
                }
                return obj;
            } else {
                return product;
            }
        })
        console.log('updatedProducts',updatedProducts)
        this.setState({
            products:updatedProducts
        });
        axios.put('http://localhost:3001/updateFinance', data)
            .then((response) => {
                console.log(response);
                let financeData = {
                    projectID: element.projectID,
                    approvedByFinance: 'Approved',
                    approvedByProcurement:'Approved',
                    requiredDate: element.requiredDate,
                    quantity: element.quantity,
                    name:element.name,
                    price:element.price
                }
                axios.post('http://localhost:3001/Logistics', financeData)
                    .then((updatedRes) => {
                        console.log(updatedRes);
                    }).catch((Err) => {
                        console.log(Err);
                    })
            }).catch((Err) => {
                console.log(Err);
            })

    }


    handleReject = (element) => {
        console.log(element);
        let data = {
            projectID: element.projectID,
            approvedByFinance: 'Rejected'
        };
        axios.put('http://localhost:3001/updateFinance', data)
            .then((response) => {
                console.log(response);
                let updatedProducts = this.state.products.map((product) => {
                    if (product.projectID == element.projectID) {
                        let obj = {
                            projectID: product.projectID,
                            quantity: product.quantity,
                            requiredDate: product.requiredDate,
                            approvedByFinance:  'Rejected',
                            price:product.price,
                            name:product.price
                        }
                        return obj;
                    } else {
                        return product;
                    }
                })
                console.log('updatedProducts',updatedProducts)
                this.setState({
                    products:updatedProducts
                });
            }).catch((Err) => {
                console.log(Err);
            })
    }
    render() {
        return (
            <div hidden={!(this.state.isAdmin&&this.state.loggedIn)}>
                  <div style={{color:'black'}}>
                <h3>  Finance</h3>
                </div>
                <table>
                    <thead>
                    <th>Product ID</th>
                        <th>Quantity</th>
                        {/* <th>Required Date</th> */}
                        <th>Price</th>
                        <th>Title</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {this.state.products.length > 0 ? this.state.products.map((element) => {
                            return (
                                <tr key={element.productID}>
                                    <td>{element.productID}</td>
                                    <td>{element.quantity}</td>
                                    {/* <td>{element.requiredDate}</td> */}
                                    <td>{element.price}</td>
                                    <td>{element.title}</td>
                                    <td>{element.approvedByFinance == 'Approved' ? <b>Approved<CheckBoxIcon></CheckBoxIcon></b> : element.approvedByFinance == 'Rejected' ? <b>Rejected<CancelIcon></CancelIcon></b> : null}<span hidden={element.approvedByFinance !== 'Pending'}> <Button onClick={()=>this.handleApprove(element)}>Approve<CheckBoxIcon></CheckBoxIcon></Button><Button onClick={()=>this.handleReject(element)}>Reject<CancelIcon></CancelIcon></Button></span></td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                </table>
            </div>
           
        )
    }
}