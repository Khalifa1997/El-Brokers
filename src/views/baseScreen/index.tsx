import "./style.css";

import Flex from "../../components/flex";
import React from "react";
import { getFromStorage } from "../../utilis/localStorage";
import { useHistory } from "react-router-dom";
import userContext from "../../userStore/context";

const BaseScreen: React.FC = (): JSX.Element => {
  const { push } = useHistory();
  const { setUserContext } = React.useContext(userContext);

  const User = getFromStorage("@userAdmin");

  const handleUserAuth = React.useCallback(() => {
    if (User && Object.keys(User).length) {
      const UserData = User;
      
      //@ts-ignore;
      setUserContext(UserData);

      return push("/signin");
    }
    return push("/signin");
  }, [User, setUserContext, push]);

  
  React.useEffect(() => {
    handleUserAuth();
  },[handleUserAuth, push]);

  return (
    <Flex
      column
      width="100%"
      height="100vh"
      justify="center"
      alignItmes="center"
      background="#fff"
    >
    </Flex>
  );
};

export default BaseScreen;
