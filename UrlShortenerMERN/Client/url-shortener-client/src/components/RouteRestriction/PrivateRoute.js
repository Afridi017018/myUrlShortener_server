import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({isLoggedIn, isLoading}) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:4000/user/check-login', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       credentials: 'include' 
//     })
//       .then(response => response.json())
//       .then(data => {
//         setIsLoggedIn(data.isLoggedIn);
//         setIsLoading(false);
//         // console.log(data.isLoggedIn)
//       });
//   }, [isLoggedIn]); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return  isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
