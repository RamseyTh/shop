import ShopList from "../page/shop/shopList/shopList";
import UserList from "../page/user/userList/userList";
import Orderlist from "../page/order/orderlist/orderList";
export default class RouteList {
  static leftMenu = [
    {
      name: "Product List",
      route: "/admin/shopList",
      comp: ShopList,
    },
    {
      name: "User List",
      route: "/admin/userlist",
      comp: UserList,
    },
    {
      name: "Order List",
      route: "/admin/orderlist",
      comp: Orderlist,
    },
  ];
}
