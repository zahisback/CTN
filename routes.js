import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Managment = React.lazy(() => import("./MainScreen/Managment"));
const TeamLeader = React.lazy(() => import("./MainScreen/TeamLeader"));
const ClientPortal = React.lazy(() => import("./MainScreen/ClientPortal"));
const SalesTeam = React.lazy(() => import("./MainScreen/SalesTeam"));
const Quotation = React.lazy(() => import("./MainScreen/Quotation"));
const Invoicing = React.lazy(() => import("./MainScreen/Invoicing"));
const Accounting = React.lazy(() => import("./MainScreen/Accounting"));
const Dispatcher = React.lazy(() => import("./MainScreen/Dispatcher"));
const TechList = React.lazy(() => import("./MainScreen/TechList"));
const Dashboard = React.lazy(() => import("./MainScreen/Dashboard"));
const Administration = React.lazy(() =>
  import("./MainScreen/Authentication/Administration")
);

const routes = [
  {
    path: "/mainScreen/Dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/mainScreen/Managment",
    exact: true,
    name: "Managment",
    component: Managment,
  },
  {
    path: "/mainScreen/TeamLeader",
    exact: true,
    name: "TeamLeader",
    component: TeamLeader,
  },
  {
    path: "/mainScreen/ClientPortal",
    exact: true,
    name: "ClientPortal",
    component: ClientPortal,
  },
  {
    path: "/mainScreen/SalesTeam",
    exact: true,
    name: "SalesTeam",
    component: SalesTeam,
  },
  {
    path: "/mainScreen/Quotation",
    exact: true,
    name: "Quotation",
    component: Quotation,
  },
  {
    path: "/mainScreen/Invoicing",
    exact: true,
    name: "Invoicing",
    component: Invoicing,
  },
  {
    path: "/mainScreen/Accounting",
    exact: true,
    name: "Accounting",
    component: Accounting,
  },
  {
    path: "/mainScreen/Dispatcher",
    exact: true,
    name: "Dispatcher",
    component: Dispatcher,
  },
  {
    path: "/mainScreen/TechList",
    exact: true,
    name: "TechList",
    component: TechList,
  },

  {
    path: "/mainScreen/Administration",
    exact: true,
    name: "Administration",
    component: Administration,
  },
];

export default routes;
