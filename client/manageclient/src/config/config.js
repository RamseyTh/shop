export default class Config {
  static Agreement = "http://";
  static BaseUrl = "127.0.0.1";
  static ServerUrl = "";
  static ServerPort = ":1024";
  static Path = "/";
  static CryptoKey = "tokenkey"; //crypto
  static FilePath = this.Agreement + this.BaseUrl + this.ServerPort + this.Path;
  static ServerApi = {
    token: "user/checkToken",
    user: {
      userLogin: "user/userLogin",
      userList: "user/userList",
      addUser: "user/addUser",
      freezeUser: "user/freezeUser",
      delUser: "user/delUser",
      updateUser: "user/updateUser",
    },
    shop: {
      shopList: "shop/shopList",
      addShop: "shop/addShop",
      freezeShop: "shop/freezeShop",
      delShop: "shop/delShop",
      updateShop: "shop/updateShop",
    },
    order: {
      orderList: "order/orderList",
      addOrder: "order/addOrder",
      delOrder: "order/delOrder",
      updateOrder: "order/updateOrder",
    },
  };
  static UploadName = {
    headPic: "upload/headPic",
    shopPic: "upload/shopPic",
  };
  static UploadKey = {
    headKey: "headPic",
    shopKey: "shopPic",
  };
  static StorageName = {
    token: "token",
    userInfo: "userInfo",
  };
  static FormDefaultVal = {
    user: {
      sex: "man",
      userType: "user",
      mailurl: "@gmail.com",
      alladdress: ["xx", "xxx", "xxxx"],
    },
    shop: {
      shopType: "0",
      picType: "0",
      shopNum: 100,
      shopPrice: 1,
      shopScale: 100,
      taste: "good",
      address: "somewhere",
      expiryDate: "180 days",
    },
  };
  static EventName = {
    ADD_USER: "addUser",
    UPDATE_USER: "updateUser",
    ADD_SHOP: "addShop",
    UPDATE_SHOP: "updateShop",
    ADD_ORDER: "addOrder",
  };
}
