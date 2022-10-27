const SIDENAV = [
  {
    name: "dashboard",
    to: "/",
    icon: "bi bi-speedometer2",
    text: "Dashboard",
    items: [],
  },
  {
    name: "categories",
    to: "/",
    icon: "bi bi-grid-fill",
    text: "Categories",
    items: [
      {
        name: "add",
        to: "/category/add",
        text: "Add",
      },
      {
        name: "view",
        to: "/categories/view",
        text: "View",
      },
    ],
  },
  {
    name: "Services",
    to: "/services",
    icon: "bi bi-briefcase-fill",
    text: "Services",
    items: [],
  },
  {
    name: "sellers",
    to: "/sellers",
    icon: "bi bi-people-fill",
    text: "Sellers",
    items: [],
  },
  {
    name: "buyers",
    to: "/buyers",
    icon: "bi bi-people-fill",
    text: "Buyers",
    items: [],
  },
];

export default SIDENAV;
