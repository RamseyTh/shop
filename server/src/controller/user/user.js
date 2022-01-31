const router = require("express").Router();
const Mod = require("./mod");
const Util = require("../../../utils/utils");
const Config = require("../../../config/config");
const Bussiness = require("../../bussiness/bussiness");
const { addData, updateData, findData } = require("../../command/command");
userCodeList = {};
router.get(Config.ServerApi.checkToken, Util.checkToken, async (_req, res) => {
  let findRes = await findData(Mod, {
    _id: res._data.id.user,
  });
  if (findRes.length && findRes) {
    res.send({
      result: 1,
      msg: "User Confirmed!",
      data: findRes[0],
    });
    return;
  }
  res.send({
    result: 0,
    msg: "Cannot find user!",
  });
});
router.get(Config.ServerApi.getMailCode, async (_req, res) => {
  //Email verification code
  let _data = Util.getCrypto(Util.parseUrl(_req, res).crypto); //解密参数
  //查询用户是否存在，若未找到用户，则返回错误响应值，否则异步发送邮件验证码
  let findRes = await findData(Mod, {
    mailaddress: _data.username.split("@")[0],
    mailurl: "@" + _data.username.split("@")[1],
  });
  if ((!findRes.length || !findRes) && _data.codeType !== "reg") {
    //过滤区分用户注册登录
    res.send({
      result: 0,
      msg: "User does not exist!",
    });
    return;
  }
  (await Util.createEmailCode(userCodeList, _data.username, findRes[0] || {}))
    ? res.send({
        result: 1,
        msg: "Email verification code sent!",
      })
    : res.send({
        result: 0,
        msg: "Email verification code failed!",
      });
});
router.post(Config.ServerApi.userLogin, async (req, res) => {
  let _data = Util.getCrypto(Util.parseUrl(req, res).crypto); //解密前端入参
  switch (_data.loginType) {
    case "code"://verification code
      res.send(Util.checkEmailCode(userCodeList, _data.username, _data));
      break;
    case "psd"://password
    default:
      let findRes = await findData(Mod, {
        $or: [
          {
            mailaddress: _data.username.split("@")[0],
            mailurl: "@" + _data.username.split("@")[1],
          },
          {
            username: _data.username,
          },
          {
            phoneNum: _data.username,
          },
        ],
      });
      if (findRes && findRes.length > 0) {
        Util.checkBcrypt(_data.password, findRes[0].password)
          ? res.send({
              result: 1,
              token: Util.createToken(//生成前端token
                findRes[0].userType,
                findRes[0]._id,
                _data.remember
              ),
              msg: "Logged in",
            })
          : res.send({
              result: 0,
              msg: "Password error!",
            });
        return;
      }
      res.send({
        result: 0,
        msg: "User does not exist!",
      });
      break;
  }
});
router.post(Config.ServerApi.userReg, async (req, res) => {
  res._data = Util.getCrypto(Util.parseUrl(req, res).crypto); //解密前端请求参数
  let _result = Util.checkEmailCode(
    userCodeList,
    res._data.mailaddress + res._data.mailurl,
    res._data
  ); //Email verification 
  if (_result.result) {
    Bussiness.addInfo(req, res, Mod);
  } else {
    res.send(_result);
  }
});
router.post(Config.ServerApi.addUser, Util.checkToken, async (req, res) => {
  Bussiness.addInfo(req, res, Mod);
});
router.get(Config.ServerApi.userList, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  Bussiness.findInfo(
    req,
    res,
    Mod,
    {
      userType: res._data.sort,
    },
    res._data.keyWord.length
      ? {
          $or: [
            {
              mailaddress: new RegExp(res._data.keyWord, "i"),
            },
            {
              username: new RegExp(res._data.keyWord, "i"),
            },
          ],
        }
      : {}
  );
});
router.get(Config.ServerApi.freezeUser, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  Bussiness.freezeInfo(req, res, Mod);
});
router.get(Config.ServerApi.delUser, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  Bussiness.delInfo(req, res, Mod, "headPic");
});
router.post(Config.ServerApi.updateUser, Util.checkToken, async (req, res) => {
  let findRes = await findData(Mod, {
    _id: res._data._id,
  });
  if (!res._data.headPic || !res._data.headPic.length) {
    //这里判断是否是修改头像，若是新增，则是上传相关的头像信息，是个object类型，length属性不存在
    if (findRes[0].headPic != "public/assets/img/default.gif") {
      Util.delPicFile(findRes[0].headPic);
    }
    if (res._data.headPic) {
      res._data.headPic = Util.readPicFile(res._data.headPic || "");
    } else {
      res._data.headPic = "public/assets/img/default.gif";
    }
  }
  if (res._data.password !== findRes[0].password) {
    res._data.password = Util.createBcrypt(res._data.password); //密码盐加密
  }

  let updateRes = await updateData(Mod, res._data._id, res._data);
  if (updateRes) {
    res.send({
      result: 1,
      msg: "Updated!",
    });
    return;
  }
  Util.delPicFile(res._data.headPic);
  res.send({
    result: 0,
    msg: "Update failed!",
  });
});

module.exports = router;
