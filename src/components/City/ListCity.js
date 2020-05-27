/* eslint-disable */

import React, { Component } from 'react';
import { List } from 'antd';
import { connect } from "react-redux";
import { withRouter } from "react-router";

const axios = require('axios');

import { CITIES, API_SERVER } from '../../services/URLS'

class ListCity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count : 1,
            cityList:[],
            loadingData: false
        };
    }

    async componentDidMount(){
        console.log("cityList:",this.props)
        

        try{
            this.setState({
                loadingData: true
            })

            const { history, authData, setCityData } = this.props;
            var currentComponent = this;

            var response = await axios.get(CITIES, { headers: { "x-access-token": authData.authToken }})
                .then(function (response) {
                    // handle success
                   return response
                })
                .catch((err)=> {return "error"});

                console.log(response);
                if(response.status == 200){

                    if(response.data.error_code == "AUTH"){
                        alert(response.data.message)
                    }
                    else{
                        console.log(response.data.data)
                        await setCityData(response.data.data )
                        this.setState({ cityList: response.data.data })
                    }

                }
                else{
                    alert(response.message?response.message:response.error?response.error: "Error")
                }

        }catch(err){
            alert(err)
             
        } finally {
            this.setState({
                loadingData: false
            })

        }


    }

    //login of text input
    login = () => {
        var email = this.email.value;
        var password = this.password.value;

        alert(email + "-" + password)
    }

    render() {

        const { cityList,loadingData } = this.state;
       
        return (
            <div>
                
                {
                  (loadingData)? "fetching Cities ....."
                  :
                    
                    <List
                        size="small"
                        bordered
                        dataSource={cityList}
                        renderItem={item => <List.Item>{item.name}</List.Item>}
                    />
                }
            </div>
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
        setCityData: (data) => dispatch({ type: "SET_CITY_DATA", value: { cityList: data } }),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(withRouter(ListCity));
// export default (ListCity);