import { UserCredential } from "firebase/auth";
import { getUser } from "./fireStoreMain";

export const userPrev = {
  Admin: ["all"],
  dashboard: ["manager", "teamLeader"],
  managment: ["manager"],
  findTechncians: ["dispatcher", "teamLeader", "manager"],
  dispatcher: ["dispatcher"],
  teamLeader: ["teamLeader"],
  quotation: ["dataTeam"],
  invoicing: ["dataTeam"],
  sales: ["dataTeam"],
  accounting: ["dataTeam"],
  clientPortal: ["manager"],
};

// export const DispAccess = {
//   if (user.selectedtype = dispatcher) {

//    classes: "nav-item disabled" }
//   };

// export const teamLeaderAccess = {
//   if (user.selectedtype = teamLeader) {

//    classes: "nav-item disabled" }
//   };

// setPages = (type) => {
//   if (type === "admin") {
//   } else if (type === "manager") {
//   } else if (type ==="teamLeader") {
//   } else if (type ==="dispatcher") {
//   } else if (type ==="dataTeam") {
//   }
// };

// Dashboard, managment, client portal, sales team, TeamLeader, find tech, dispatcher, quotationteam, invoicing, accounting

// Admin", "Manager", "Team leader", "Dispatcher", "dataTeam
