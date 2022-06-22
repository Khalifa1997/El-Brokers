import React from "react";
import { message } from "antd";
import {saveToStorage} from "../../../utilis/localStorage"
import signinRequest from "./api";
import { useHistory } from "react-router-dom";
import userContext from '../../../userStore/context'

const useSigninRequest = () => {
   const { setUserContext} = React.useContext(userContext);

  const { push } = useHistory();

  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleChange = React.useCallback(
    (name: string) => ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => {
      setState((oldState) => ({
        ...oldState,
        [name]: value,
      }));
    },
    [setState]
  );

  const handleSubmit = React.useCallback(async () => {
    setLoading(true);


    const response = await signinRequest(state.email, state.password);
    if (response.token && response.admin && Object.keys(response.admin).length) {
      const { admin, token } = response;
      const User = {
        token: token,
        id: admin._id,
        joinDate: admin.createdAt,
        email: admin.email,
      };
      saveToStorage("@userAdmin", User);
      //@ts-ignore
      setUserContext(User);
      setLoading(false);
      return push("/dashboard");

    } else if (response.error) {
      const { error } = response;
      setLoading(false);
      if (error === "Invalid Email Or Password!") {
        return message.error("Invalid Email Or Password!");
      } else{
        return message.error("Somthing Went Wrong, Please try Again");
      }
    } else {
      setLoading(false);
      return message.error("Somthing Went Wrong, Please try Again");
    }
  }, [setLoading, push, state,setUserContext]);

  return {
    state,
    handleChange,
    handleSubmit,
    loading,
    setLoading,
  };
};

export default useSigninRequest;
