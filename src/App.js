import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { useEffect, useState, createContext, useContext } from 'react';
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from "./firebase"
import Payment from './Payment'
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"


function App() {

  const promise = loadStripe('pk_test_51KhAuBAmCPtFRSSV4y6PoroNijPiwRzdPLFVePzg1ZpWp2k3cp7GUEhmX5bXL8WWyN7yCfHhZMCRqKN4l6N20Q2400ER3VG7uz');

  const [user, setUser] = useState({});


  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) =>{
      setUser(currentUser);
    })
  })

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                 <Home />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header /> 
                <Checkout />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
