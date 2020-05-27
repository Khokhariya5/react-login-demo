const initialState = {
    age:20,
    authData: {
        email: "",
        authToken: ""
    },
    cityList: []
};

const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){

        case 'SET_LOGIN_DATA':
            console.log("actiona"+ JSON.stringify(action))
            localStorage.setItem('state', JSON.stringify({ authData: action.value }) );
            newState.authData = { email: action.value.email, authToken: action.value.authToken };
            break;

        case 'SET_CITY_DATA': 
        localStorage.setItem('cityList', JSON.stringify(action.value.cityList));
            newState.cityList = action.cityList;
            break;
    }
    return newState;
};

export default reducer;