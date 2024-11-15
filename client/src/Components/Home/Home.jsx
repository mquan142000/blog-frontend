import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideBar from "../SideBar/SideBar";
import Category from "../Category/Category";
import TopSect from "../TopSect/TopSect";
import Product from "../Product/Product";

const Home = () => {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);

  const handleClick = (item) => {
    if (cart.some((cartItem) => cartItem.id === item.id)) return;
    setCart([...cart, item]);
    toast.success('Item has been added to cart', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleChange = (item, d) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) => {
        if (cartItem.id === item.id) {
          const updatedAmount = cartItem.amount + d;
          return { ...cartItem, amount: updatedAmount > 0 ? updatedAmount : 1 };
        }
        return cartItem;
      })
    );
  };

  return (
    <>
      <SideBar />
      <section className="flex flex-col ml-20 px-10 pt-4 w-85 overflow-hidden bg-bgColor">
        <TopSect setShow={setShow} size={cart.length} />
        {show ? (
          <Category handleClick={handleClick} />
        ) : (
          <Product cart={cart} setCart={setCart} handleChange={handleChange} />
        )}
      </section>
      <ToastContainer />
    </>
  );
};

export default Home;
