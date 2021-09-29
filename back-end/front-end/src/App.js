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

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
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