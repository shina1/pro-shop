import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
// components
import Footer from "./components/Footer";
import Header from "./components/Header";
// screen components
import Homescreen from "./screens/Homescreen";
import Productscreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/placeorder' component={PlaceOrderScreen}/>
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileScreen}/>
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={Productscreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" component={Homescreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
