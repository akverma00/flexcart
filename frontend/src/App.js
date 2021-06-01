import React from "react";
import { BrowserRouter, Route } from "react-router-dom"
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";


function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a href="/" className="brand">
              FlexCart
          </a>
          </div>
          <div>
            <a href="/cart"> Cart </a>
            <a href="/signin"> Signin </a>
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
        </main>
        <footer className="row center">Designed by Arun</footer>
      </div>

    </BrowserRouter>
  );
}

export default App;
