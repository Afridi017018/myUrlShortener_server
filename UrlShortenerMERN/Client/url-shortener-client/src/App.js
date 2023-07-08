
import { useEffect, useState } from 'react';
import './App.css';
import Appbar from './components/Appbar/Appbar';

import MainRoutes from './Routes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("")

useEffect(() => {
 fetch('http://localhost:4000/user/check-login', {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json'
   },
   credentials: 'include' 
 })
   .then(response => response.json())
   .then(data => {
      setUserId(data.id)
     setIsLoggedIn(data.isLoggedIn);
     setIsLoading(false);
     
   });
}, [isLoggedIn]); 
  return (
    <div className='app'>
      <Appbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

      <MainRoutes isLoggedIn={isLoggedIn} isLoading={isLoading} setIsLoggedIn={setIsLoggedIn} userId = {userId} />
      
    </div>
  );
}

export default App;
