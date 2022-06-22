import "./scss/style.scss";

// import { BrowserRouter, Route, Switch } from "react-router-dom";

// import AppRoutes from './routes'
import React from "react";
// import SignIn from '../src/views/signin'
import UserStore from "./userStore";
import AppContainer from './AppContainer'
// import BaseScreen from "./views/baseScreen";
// import TheLayout from './containers/TheLayout'


// // Containers
// const TheLayout = React.lazy(() => import("./containers/TheLayout"));

const App = () => {
    return (
      //@ts-ignore
      <UserStore>
     <AppContainer/>
      </UserStore>
      
    )

}

export default App;
