const {
  delData,
  updateData,
  findByPage,
  getTotalPage,
  findData,
  addData,
} = require("../command/command");
const Util = require("../../utils/utils");
module.exports = class Bussiness {
  static async freezeInfo(_req, res, _mod) {
    let freezeRes = await updateData(_mod, res._data._id, {
      isactive: res._data.isactive,
    });
    if (freezeRes) {
      res.send({
        result: 1,
        msg: res._data.isactive ? "Activated!" : "Deactivated!",
      });
      return;
    }
    res.send({
      result: 0,
      msg: res._data.isactive ? "Activation Failed!" : "Deactivation Failed!",
    });
  }
  static async findInfo(_req, res, _mod, _sort, _keyWord) {
    let total = await getTotalPage(_mod, res._data.pageSize, _keyWord);
    res.send({
      result: 1,
      data: {
        page: res._data.page,
        pageSize: res._data.pageSize,
        totalPage: total.totalPage,
        allNum: total.allNum,
        list: await findByPage(
          _mod,
          _sort,
          res._data.page,
          res._data.pageSize,
          _keyWord
        ),
      },
      msg: "Found item!",
    });
  }
  static async delInfo(_req, res, _mod, _type) {
    if (
      res._data[_type] &&
      res._data[_type].length > 0 &&
      res._data[_type] != "public/assets/img/default.gif"
    ) {
      Util.delPicFile(res._data[_type]);
    }
    let deleteRes = await delData(_mod, res._data._id);
    if (deleteRes.ok) {
      res.send({
        result: 1,
        msg: "Deleted!",
      });
      return;
    }
    res.send({
      result: 0,
      msg: "Delete Failed!",
    });
  }
  static async addInfo(req, res, mod) {
    if (res._data.headPic) {
      res._data.headPic = Util.readPicFile(res._data.headPic || "") || "";
    }
    let findRes = await findData(mod, {
      $or: [
        {
          mailaddress: res._data.mailaddress,
          mailurl: res._data.mailurl,
        },
        {
          username: res._data.username,
        },
        {
          mailaddress: res._data.username,
        },
        {
          username: res._data.mailaddress + res._data.mailurl,
        },
      ],
    });
    if (findRes && findRes.length > 0) {
      res.send({
        result: 0,
        msg: "User already exists.",
      });
      Util.delPicFile(res._data.headPic || "");
      return;
    }
    res._data.time = Util.joinDate(); //????????????
    res._data.password = Util.createBcrypt(res._data.password); //?????????
    res._data.isactive = true;
    let addRes = await addData(mod, res._data);
    if (addRes) {
      res.send({
        result: 1,
        msg: "Added!",
      });
      return;
    }
    Util.delPicFile(res._data.headPic);
    res.send({
      result: 0,
      msg: "Add Failed!",
    });
  }
  static isAdmin(res) {
    if (res._data.userTokenType != "admin") {
      //Non-admin user
      res.send({
        result: -999,
        msg: "Please use an administrator account to log in.",
      });
      return false;
    }
    return true;
  }
  static async hasUser(_req, res, UserMod) {
    let userFindRes = await findData(UserMod, {
      $or: [
        {
          mailaddress: res._data.username.split("@")[0],
          mailurl: "@" + res._data.username.split("@")[1],
        },
        {
          username: res._data.username,
        },
        {
          phoneNum: res._data.username,
        },
      ],
    });
    if (!userFindRes || !userFindRes.length) {
      res.send({
        result: 0,
        msg: "User doesn't exist.",
      });
      return false;
    }
    return userFindRes;
  }
};
