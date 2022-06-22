import React from "react";
import Store, { initialState } from "./context";
import Props, { State } from "./index.interface";

const StoreProvider: React.FC<Props> = ({ children }): JSX.Element => {
  const [userState, setUserContext] = React.useState<State>(initialState);

  return (
    <Store.Provider
      value={{
        userState,
        // @ts-ignore
        setUserContext
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default StoreProvider;
