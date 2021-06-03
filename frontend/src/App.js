import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom"
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";


function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/" className="brand">
              FlexCart
          </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to="/signin">Signin</Link>
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signin" component={SigninScreen} />
        </main>
        <footer className="row center">Designed by Arun</footer>
      </div>

    </BrowserRouter>
  );
}

export default App;
