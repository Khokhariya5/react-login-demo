/* eslint-disable */

import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Spin, Alert } from 'antd';

const axios = require('axios');

import { LOGIN, API_SERVER } from '../../services/URLS'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state ={
            loading: false
        }
    }

    componentDidMount(){
        console.log(this.props)
        if(this.props.user && this.props.user.email){
            this.props.history.push("/cities")
        }
    }

     //call Login method
     login = async () => {
        try{

            this.setState({

                loading: true
            }
            )

            var email = this.email.value;
            var password = this.password.value;

            const { history, setLoginData } = this.props;
           
            axios.post(LOGIN, { email: email, password: password })
            .then(async function (response) {
                console.log(response)
                if(response.status == 200){

                    if(response.data.error_code == "AUTH"){
                        alert(response.data.message)
                    }
                    else{
                        console.log(response)
                  
                        await setLoginData({ email: email, authToken: response.data.token})
                        alert("login success")
                        history.push("/cities")
                    }

                }
                else{
                    console.log(response)
                    alert(response.message?response.message:response.error?response.error: "Error")
                }
                
            })
            .catch(function (error) {
                alert(error)
            });

        }catch(err){
            alert(err)
             
        } finally {
            this.setState(
                {
                loading: false}
            )
        }
     }
 

    render() {

        const { loading } = this.state;
       
       
        return (

            loading
            ?
             "Loading......."
            :
            (<div>
             
                <label>Email</label>
                <br/>
                <input 
                    type="text" 
                    ref={(input) => { this.email = input; }}  
                />
                
                <br/>
                <label>Password</label>
                <br/>
                <input  
                    type="password" 
                    ref={(input) => { this.password = input; }}  
                />
               
                <br/>
                <button type="button" onClick={() => this.login()}>Login</button>

                {/* <div className="Age-label">
                your age: <span>{this.props.age}</span>
                </div>
                <button onClick={this.props.onAgeUp}>Age UP</button>
                <button onClick={this.props.onAgeDown}>Age Down</button> */}

            </div>)
        )
    }
    
}


const mapStateToProps = state => {
    return {
        user: state.authData
    };
};

const mapDispachToProps = dispatch => {
    return {
        setLoginData: (data) => dispatch({ type: "SET_LOGIN_DATA", value: data })
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(withRouter(Login));