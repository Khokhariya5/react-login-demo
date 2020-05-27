const axios = require('axios');

export const API_SERVER = "http://localhost:4000"

export const LOGIN = API_SERVER + '/apis/user/login';

export const REGISTER = API_SERVER + '/apis/user/register';

export const CITIES = API_SERVER + '/apis/city/cities';