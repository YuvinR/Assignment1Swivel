import { CommonGetAxios,CommonPostAxios,CommonPost } from '../../helpers/HttpClient';

export default {
    login
};

async function login(data) {
    let body = {
        username: data.username,
        password: data.password
    }
    const response = await CommonPostAxios('api/Auth/Authorize', null,body);
    
    return response;
}