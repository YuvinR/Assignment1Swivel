import logo from './logo.svg';
import './App.css';
import { useRoutes } from 'react-router-dom';
import authService from './helpers/AuthService';
import routes from './routes';

const App = () => {

    
  let isLoggedIn = authService.IsUserLogged();

  const routing = useRoutes(routes(isLoggedIn));

  return (
    <div className="App">
      {routing}
    </div>
  );
}

export default App;
