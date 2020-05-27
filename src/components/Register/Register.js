/* eslint-disable */

import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Spin, Alert } from 'antd';
const axios = require('axios');

import { REGISTER, API_SERVER } from '../../services/URLS'

class Register extends Component {
    constructor(props) {
        super(props);

        this.state ={
            loading: false
        }
    }

    componentDidMount(){
        if(!this.props.authData || !this.props.authData.email || !this.props.authData.email){

        }
    }

     //call Login method
     login = async () => {
        try{

            this.setState(
                {
                    loading: true
                }
            )

            var firstname = this.firstname.value;
            var lastname = this.lastname.value;
            var email = this.email.value;
            var password = this.password.value;

            if(!firstname || !lastname || !email || !password){
                alert("All Fields Required");
                return;
            }

            const { history, setLoginData } = this.props;

            var reqBody = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
            }

            axios.post(REGISTER, reqBody)
            .then(async function (response) {

                if(response.status == 200){
                    console.log(response)
                    alert("Registration Success")
                    await setLoginData(response.data)
                    history.push("/login")
                }
                else{
                    alert(response.message?response.message:response.error?response.error: "Error")
                }
                
            })
            .catch(function (error) {
                alert(error)
                console.log(error)
                return "error"
            });
            
           
           
        }catch(err){
            console.log(err)
             
        } finally {
         
            this.setState(
                {
                    loading: false
                }
            )

        }
     }
 

    render() {

        const { loading } = this.state;
       
        return (

            loading ?
                "Loading............."
            :
                (
                    <div>
                
                                
                        <label>firstname</label>
                        <br/>
                        <input 
                            type="text" 
                            ref={(input) => { this.firstname = input; }}  
                        />
                        <br/>
        
                        <label>lastname</label>
                        <br/>
                        <input 
                            type="text" 
                            ref={(input) => { this.lastname = input; }}  
                        />
                        <br/>
        
        
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
                        {/* <label>Conform Password</label>
                        <br/>
                        <input  
                            type="password" 
                            ref={(input) => { this.conform_password = input; }}  
                        /> */}
                    
                        <br/>
                        <button type="button" onClick={() => this.login()}>Register</button>
        
                        {/* <div className="Age-label">
                        your age: <span>{this.props.age}</span>
                        </div>
                        <button onClick={this.props.onAgeUp}>Age UP</button>
                        <button onClick={this.props.onAgeDown}>Age Down</button> */}
        
                    </div>
                )
        
        )
    }
    
}


const mapStateToProps = state => {
    return {
        authData: state.authData
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
)(withRouter(Register));