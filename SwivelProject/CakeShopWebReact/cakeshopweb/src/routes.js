import LoginView from './Components/auth/LoginView';
import MainLand from './Components/Cake/MainLand';
import { Navigate } from 'react-router-dom';
import CakeOrder from './Components/CakeOrder/CakeOrder';

const routes = (isLoggedIn) => [
    // {
    //     path: 'app',
    //     element: isLoggedIn ? <MainLand /> : <Navigate to="/login" />,
        
    //      children: [
    //         {
    //             path: 'mainLand',
    //             children: [
    //                 { path: 'listing', element: <CakeOrder /> }
    //             ]
    //         },
    //         { path: '/CakeOrder', element: <CakeOrder /> },
    //     ]
    // },
    {
        path: '/',
        //element: !isLoggedIn ? <MainLayout /> : <Navigate to='/app/dashboard' />,
        children: [
            { path: '/', element: <MainLand /> },
            { path: 'login', element: <LoginView /> },
            { path: 'cakeOrder', element: <CakeOrder /> }
            
        ]
    }
]   


export default routes;