import React, { useCallback, useEffect, useContext, memo } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../userStore/context";
import { getFromStorage } from "../utilis/localStorage";
import { useTypedSelector } from "../store";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

// eslint-disable-next-line
const TheLayout: React.FC = ({}): JSX.Element => {
  const { setUserContext } = useContext(userContext);
  const { push } = useHistory();
  const handleUserData = useCallback(() => {
    const User = getFromStorage("@userAdmin");
    if (User && !!Object.keys(User).length) {
      setUserContext(User);
    } else {
      // return push('/signin');
      console.log("s");
    }
  }, [setUserContext, push]);

  useEffect(
    () => handleUserData(),
    // eslint-disable-next-line
    []
  );
  const darkMode = useTypedSelector((state) => state.darkMode);
  const classes = `c-app c-default-layout ${darkMode ? "c-dark-theme" : ""}`;

  return (
    <div className={classes}>
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default memo(TheLayout);
