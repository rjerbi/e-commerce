import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import DashboardHome from './pages/DashboardHome';
import DashboardProducts from './pages/DashboardProducts';
import DashboardOrders from './pages/DashboardOrders';
import DashboardReturns from './pages/DashboardReturns';
import DashboardContacts from './pages/DashboardContacts';
import Returns from "./pages/Returns";

function App() {

  const [cart, setCart] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {

      const updatedCart = cart.map((item) => {

        if (item.id === product.id) {

          return {
            ...item,
            quantity: item.quantity + 1
          };
        }

        return item;
      });

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);
    }
  };

  // REMOVE FROM CART
  const removeFromCart = (id) => {

    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);
  };

  return (

    <BrowserRouter>
      <ConditionalNavbar />
      <Routes>

        <Route
          path="/"
          element={
            <Home addToCart={addToCart} />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout cart={cart} setCart={setCart} />
          }
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/dashboard"
          element={<DashboardHome />}
        />

        <Route
          path="/dashboard/products"
          element={<DashboardProducts />}
        />

        <Route
          path="/dashboard/orders"
          element={<DashboardOrders />}
        />

        <Route
          path="/dashboard/returns"
          element={<DashboardReturns />}
        />

        <Route
          path="/dashboard/contacts"
          element={<DashboardContacts />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/returns"
          element={<Returns />}
        />

      </Routes>

    </BrowserRouter>
  );
}

// Show Navbar only on customer pages, not on admin pages
function ConditionalNavbar() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname === '/admin';
  
  return !isDashboard ? <Navbar /> : null;
}

export default App;