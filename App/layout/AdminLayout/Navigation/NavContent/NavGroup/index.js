import React from "react";
import { userPrev } from "../../../../../../helpers/UserPrev";
import Aux from "../../../../../../hoc/_Aux";
import NavCollapse from "./../NavCollapse";
import NavItem from "./../NavItem";

const navGroup = (props) => {
  let navItems = "";
  if (props.group.children) {
    const groups = props.group.children;
    navItems = Object.keys(groups).map((item) => {
      item = groups[item];
      console.log("222222222222222222222222222222222222222222222", props.user);
      switch (item.type) {
        case "collapse":
          return <NavCollapse key={item.id} collapse={item} type="main" />;
        case "item":
          // if ((item.title = "managment")) {
          if (userPrev.managment.indexOf("manager") > -1) {
            return <NavItem layout={props.layout} key={item.id} item={item} />;
            // }
          }
        // return <NavItem layout={props.layout} key={item.id} item={item} />;
        default:
          return false;
      }
    });
  }

  return (
    <Aux>
      <li key={props.group.id} className="nav-item pcoded-menu-caption">
        <label>{props.group.title}</label>
      </li>
      {navItems}
    </Aux>
  );
};

export default navGroup;
