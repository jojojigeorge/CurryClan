import './App.css';
// import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './screen/Home';
import Login from './screen/Login';
import Signup from './screen/Signup';
import { CartProvider } from './components/ContextReducer';
import Cart from './screen/Cart';
import MyOrder from './screen/MyOrder';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/myorder' element={<MyOrder />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
