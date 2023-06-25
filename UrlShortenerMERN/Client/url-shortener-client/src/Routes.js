import { Routes,Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/RouteRestriction/PrivateRoute';
import PublicRoute from './components/RouteRestriction/PublicRoute';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';

const MainRoutes = ({isLoggedIn , isLoading, setIsLoggedIn}) => {
   

    return (
        <Routes>
            <Route path = '/' element = {<PrivateRoute isLoggedIn={isLoggedIn} isLoading={isLoading} />}> 
            <Route path='/' element={<Navigate replace to = "dashboard" /> }/>
            <Route path='dashboard' element = {<Dashboard/>} />
            </Route>

            <Route path ='/' element = {<PublicRoute isLoggedIn={isLoggedIn} isLoading={isLoading}/> }> 
            <Route path='signup' element={<Signup/>} />
            <Route path='login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            </Route>
            
            
        </Routes>
    );
};

export default MainRoutes;