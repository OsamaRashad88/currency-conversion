import { createContext, useState } from "react";
export const amountContext = createContext();

export function AmountContextProvider(props) {
  const [amount, setAmount] = useState(1);

  return (
    <amountContext.Provider value={{ amount, setAmount }}>
      {props.children}
    </amountContext.Provider>
  );
}
