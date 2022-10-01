import LoginView from './Components/auth/LoginView';
import MainLand from './Components/Cake/MainLand';
import { Navigate } from 'react-router-dom';
import CakeOrder from './Components/CakeOrder/CakeOrder';

const routes = (isLoggedIn) => [
 
    {
        path: '/',
        children: [
            { path: '/', element: <LoginView /> },
            { path: 'cakeOrder', element: <CakeOrder /> },
            { path: 'mainLand', element: <MainLand /> }
            
        ]
    }
]   


export default routes;