
import './App.css';
import Appbar from './components/Appbar/Appbar';

import MainRoutes from './Routes';

function App() {
  return (
    <div className='app'>
      <Appbar/>

      <MainRoutes/>
      
    </div>
  );
}

export default App;
