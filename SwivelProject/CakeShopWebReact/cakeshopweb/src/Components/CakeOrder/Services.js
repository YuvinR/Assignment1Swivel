import { json } from 'react-router-dom';
import { CommonGet, CommonPost,CommonGetAxios, CommonPostAxios } from '../../helpers/HttpClient';

export default {
    login,
    getAllShapes,
    getAllToppings,
    CreateOrder
};

async function login(data) {
    let body = {
        username: data.username,
        password: data.password
    }
    const response = await CommonPost('api/Auth/Authorize', body);
    console.log("response",response.data);
    return response;
}


async function getAllShapes() {
    const response = await CommonGetAxios('api/CakeData/GetCakeShapes', null);
    return response;
}

async function getAllToppings() {
    const response = await CommonGetAxios('api/CakeData/GetToppings',null);
    return response;
}

async function CreateOrder(data) {
  
    const response = await CommonPostAxios('api/Order/CreateOrder', data);
    console.log("response",response.data);
    return response;
}

