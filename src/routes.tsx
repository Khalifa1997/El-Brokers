// import { BrowserRouter, Route, Switch } from "react-router-dom";

import BaseScreen from "./views/baseScreen";
import BrokerCompanies from "./views/broker_companies/BrokerCompanies";
import BrokerCompaniesStats from "./views/stats/BrokerCompanies";
import Leads from "./views/leads/Leads";
import MyTeam from "./views/my_team/MyTeam";
import PromoCodes from "./views/promocodes/PromoCodes";
import Properties from "./views/properties/Properties";
import PushNotifications from "./views/pushNofications/PushNotifications";
import React from "react";
import Signin from "./views/signin";
import Subscriptions from "./views/subscriptions/Subscriptions";
import Users from "./views/users/Users";

//import Dashboard from "./views/dashboard/Dashboard";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

// export default () => (
//   <BrowserRouter>
//     <React.Suspense fallback={false}>
//       <Switch>
//       {Routes}
//       </Switch>
//     </React.Suspense>
//   </BrowserRouter>
// );

// This Month - This Quarter - This Year - Custom Date Range

const Routes = [
  { path: "/", exact: true, name: "base", component: Dashboard },
  { path: "/base", exact: true, name: "base", component: Dashboard },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  {
    path: "/broker_companies",
    name: "Broker Companies",
    component: BrokerCompanies,
  },
  { path: "/users", name: "Users", component: Users },
  { path: "/properties", name: "Properties", component: Properties },
  { path: "/leads", name: "Leads", component: Leads },
  { path: "/subscriptions", name: "Subscriptions", component: Subscriptions },
  { path: "/promo_codes", name: "PromoCodes", component: PromoCodes },
  {
    path: "/push_notifications",
    name: "Push Notifications",
    component: PushNotifications,
  },
  { path: "/reports", name: "Reports", component: Dashboard },
  { path: "/maintenance", name: "Maintenance", component: Dashboard },
  { path: "/my_team", name: "My Team", component: MyTeam },
  {
    path: "/brokerStats",
    name: "Broker Stats",
    component: BrokerCompaniesStats,
  },
  {
    path: "/property",
    name: "Property Stats",
    component: BrokerCompaniesStats,
  },
  {
    path: "/userStats",
    name: "Financial Stats",
    component: BrokerCompaniesStats,
  },
  {
    path: "/financialStats",
    name: "Broker Stats",
    component: BrokerCompaniesStats,
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin,
  },
];

export default Routes;
