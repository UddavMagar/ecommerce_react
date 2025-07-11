import { createContext, useState } from "react";

export const CardContext = createContext();

export const CardProvider = ({ children }) => { 
  const [cart, setCart] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalItems, setTotalItems] = useState(0);

  return (
    <CardContext.Provider value={{ cart, setCart }}>
      {children}
    </CardContext.Provider>
  );
}