import { createContext } from "react";

import { State, StoreApi } from "./index.interface";

export const initialState: State = {
  name: "",
  email: "",
  joinDate: "",
  token: "",
  role: "",
  id: "",
  confirmed: false,
  image: "",
  countryId: '',
  country: ''
};

export default createContext<StoreApi>({
  userState: initialState,
  //@ts-ignore
  setUserContext: (state: State) => state,
});
