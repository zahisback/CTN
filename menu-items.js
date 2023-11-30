export default {
  items: [
    {
      id: "managment1",
      title: "Managment",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/mainScreen/Dashboard",
          icon: "feather icon-home",
        },
        {
          id: "Managment",
          title: "Managment",
          type: "item",
          icon: "feather icon-home",
          url: "/mainScreen/Managment",
        },
        {
          id: "ClientPortal",
          title: "Clients Portal",
          type: "item",
          icon: "feather icon-home",
          url: "/mainScreen/ClientPortal",
        },
        {
          id: "SalesTeam",
          title: "SalesTeam",
          type: "item",
          url: "/mainScreen/SalesTeam",
          icon: "feather icon-home",
        },
      ],
    },
    {
      id: "dispdep",
      title: "Dispatch Department",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "teamLeader",
          title: "Team Leader",
          type: "item",
          icon: "feather icon-home",
          url: "/mainScreen/TeamLeader",
        },
        {
          id: "findTech",
          title: "FindnewTech",
          type: "item",
          icon: "feather icon-user",
          classes: "nav-item",
          url: "https://onslow.craigslist.org/",
          target: true,
          external: true,
          badge: {
            title: "v1.0",
            type: "label-primary",
          },
        },
        {
          id: "disp",
          title: "Dispatcher",
          type: "item",
          icon: "feather icon-home",
          url: "/mainScreen/Dispatcher",
        },
        {
          id: "techList",
          title: "TechList",
          type: "item",
          icon: "feather icon-home",
          url: "/mainScreen/TechList",
        },
      ],
    },

    {
      id: "dataTeam",
      title: "Data Team",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "QuotationTeam",
          title: "Quotation Team",
          type: "item",
          url: "/MainScreen/Quotation",
          icon: "feather icon-home",
        },
        {
          id: "Invoicing",
          title: "Invoicing",
          type: "item",
          icon: "feather icon-home",
          url: "/mainScreen/Invoicing",
        },
        {
          id: "Accounting",
          title: "Accounting",
          type: "item",
          icon: "feather icon-home",
          url: "/mainScreen/Accounting",
        },
      ],
    },
  ],
};
