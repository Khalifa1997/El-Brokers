import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BaseScreen from "./views/baseScreen";
import Signin from "./views/signin";
import TheLayout from "./containers/TheLayout";

export default () => (
  <BrowserRouter>
    <React.Suspense fallback={false}>
      <Switch>
        <Route path="/" component={TheLayout} exact />
        <Route path="/base" component={TheLayout} exact />

        <Route path="/dashboard" component={TheLayout} exact />
        <Route path="/leads" component={TheLayout} exact />
        <Route path="/broker_companies" component={TheLayout} exact />
        <Route path="/users" component={TheLayout} exact />
        <Route path="/properties" component={TheLayout} exact />
        <Route path="/subscriptions" component={TheLayout} exact />
        <Route path="/promo_codes" component={TheLayout} exact />
        <Route path="/push_notifications" component={TheLayout} exact />
        <Route path="/reports" component={TheLayout} exact />
        <Route path="/maintenance" component={TheLayout} exact />
        <Route path="/my_team" component={TheLayout} exact />
        <Route path="/brokerStats" component={TheLayout} exact />
        <Route path="/property" component={TheLayout} exact />
        <Route path="/userStats" component={TheLayout} exact />
        <Route path="/financialStats" component={TheLayout} exact />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);
