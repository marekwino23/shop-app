import { useEffect, useMemo, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home'
import ProductAddPage from './pages/product-add-page';
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { CartItem } from './types'
import { CartModal } from './components/cart-modal/cart-modal'
import { createBrowserRouter, Link, Route, RouterProvider, Routes } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/product",
    element: <ProductAddPage />
  },
]);

function App() {
  const items = useSelector<RootState>(state => state.cart.items) as CartItem[];
  const cartClickRef = useRef<HTMLButtonElement>(null);
  const cartModalRef = useRef<HTMLDialogElement>(null);
  
  const showCart = () => {
    cartModalRef.current?.showModal();
  }

  return (
    <div className="App">
       <header className="App-header">
        <a href="/"><img src={logo} className="App-logo" alt="logo" /></a>
        <button ref={cartClickRef} onClick={showCart} disabled={!items.length}><i className={`fa fa-cart-shopping ${!items.length ? "cart-empty": "cart-with-products"} `} ></i></button>
        <CartModal ref={cartModalRef} />
      </header>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
