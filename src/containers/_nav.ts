export default [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Companies",
    to: "/broker_companies",
    icon: "cil-building",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/users",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Properties",
    to: "/properties",
    icon: "cil-house",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Leads",
    to: "/leads",
    icon: "cil-speedometer",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Subscriptions",
    to: "/subscriptions",
    icon: "cil-speedometer",
  },
  {
    _tag: "CSidebarNavItem",
    name: "PromoCodes",
    to: "/promo_codes",
    icon: "cil-speedometer",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Push Notifications",
    to: "/push_notifications",
    icon: "cil-speedometer",
  },
  // Property Stats - Broker Companies Stats - User Stats - Financial Stats
  {
    _tag: "CSidebarNavDropdown",
    name: "Statistics",
    route: "/reports",
    icon: "cil-bar-chart",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Property Stats",
        to: "/property",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Broker Companies Stats",
        to: "/brokerStats",
      },
      {
        _tag: "CSidebarNavItem",
        name: "User Stats",
        to: "/userStats",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Financial Stats",
        to: "/financialStats",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "My Team",
    to: "/my_team",
    icon: "cil-speedometer",
  },
];
