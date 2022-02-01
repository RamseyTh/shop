export default class MenuList {
  static leftMenu = [
    {
      name: "Product List",
      list: [
        { name: "Product List", route: "/admin/shopList" },
      ]
    },
    {
      name: "User List",
      list: [
        { name: "User List", route: "/admin/userlist" },
      ]
    },
    {
      name: "Order List",
      list: [
        { name: "Order List", route: "/admin/orderlist" },
      ]
    }
  ];
}
