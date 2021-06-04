import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom"
import { signout } from "./actions/userActions";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";


function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state => state.userSignin));
  const { userInfo } = userSignin;

  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout());
  }
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
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name}
                    <i className="fa fa-caret-down" ></i>
                    {' '}
                  </Link>
                  <ul className="dropdown-content" >
                    <Link to="#signout" onClick={signoutHandler} >Signout</Link>
                  </ul>

                </div>
              ) : (
                <>
                  <Link to="/signin">Signin</Link>
                  <Link to="/register">Register</Link>
                </>
              )
            }
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
        </main>
        <footer className="row center">Designed by Arun</footer>
      </div>

    </BrowserRouter>
  );
}

export default App;
