import { createContext, useState } from "react";

export const CardContext = createContext();

export const CardProvider = ({ children }) => { 
  const [cart, setCart] = useState([]);

  return (
    <CardContext.Provider value={{ cart, setCart }}>
      {children}
    </CardContext.Provider>
  );
}