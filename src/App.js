import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';
import HomeOutScreen from './screens/HomeOutScreen';

import HomeInScreen from './screens/HomeInScreen';
import StoreScreen from './screens/StoreScreen';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<HomeOutScreen />}></Route>
        <Route exact path='/home' element={<HomeInScreen />}></Route>
        <Route exact path='/store' element={<StoreScreen />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
