import React from "react";
import {message} from 'antd'
import {removeFromStorage} from "../utilis/localStorage"
import signOutRequest from "./api";
import { useHistory } from "react-router-dom";
import userContext from '../userStore/context'
import {initialState} from '../userStore/context'
const useSigninRequest = () => {
const { setUserContext,userState } = React.useContext(userContext);
const [success, setSucces] = React.useState(false)
  const { push } = useHistory();


  const handleLogout = React.useCallback(async () => {
    const response = await signOutRequest(userState.token);
   if(response.success)
   {
      setSucces(true)
      removeFromStorage("@userAdmin");
      //@ts-ignore
      setUserContext(initialState);
      return push("/signin");

    } else {
      return message.error("Somthing Went Wrong, Please try Again");
    }
  }, [push,setUserContext,userState,setSucces]);
  return {
    handleLogout,success,
  };
};

export default useSigninRequest;
