// TotalQuantity.jsx
import React, { createContext, useState } from 'react';

export const TotalQuantityContext = createContext();

export const TotalQuantityProvider = ({ children }) => {
  const [totalQuantity, setTotalQuantity] = useState(0);

  // This can be updated based on your app's logic, e.g., by updating the count when an item is added to the cart
  return (
    <TotalQuantityContext.Provider value={{ totalQuantity, setTotalQuantity }}>
      {children}
    </TotalQuantityContext.Provider>
  );
};
