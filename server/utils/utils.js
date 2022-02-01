const fs = require("fs");
const jwt = require("jsonwebtoken");
const cryptoJS = require("crypto-js");
const config = require("../config/config");
const SendMail = require("./sendmail");
let { UserKey, AdminKey, CryptoKey, EmailConfig } = config;
const bcrypt = require("bcryptjs");
const { json } = require("express");
let key = cryptoJS.enc.Utf8.parse(CryptoKey);
module.exports = class Utils {
  constructor() {}
  static parseUrl(req) {
    //get front params
    return req.method == "POST" ? req.body : this.urlSplit(req.url);
  }
  static urlSplit(url) {
    //get analysis params
    let list = url.split("?")[1].split("&");
    let leng = list.length;
    let obj = {};
    for (let i = 0; i < leng; i++) {
      let key = list[i].split("=")[0];
      let val = list[i].split("=")[1];
      obj[key] = val;
    }
    return obj;
  }
  /*
   * @param {string} type 'user'||'admin'      user type
   * @param {string} user                      user name
   * @param {bool} rempsd                      password memory
   */
  static createToken = (type, user, rempsd) => {
    let payload = {
      user: user,
    };
    return jwt.sign(payload, type == "admin" ? AdminKey : UserKey, {
      expiresIn: rempsd ? "10d" : "6h",
    });
  };
  /*
   * @param {object} req      
   * @param {object} res       
   * @param {fn} next        
   */
  static checkToken = (req, res, next) => {
    let _data = this.parseUrl(req); 
    if (_data.crypto) {
      _data = this.getCrypto(_data.crypto); 
    }
    let isUser = true; 
    let isAdmin = true; 
    let _decoded = ""; 
    jwt.verify(_data.token, UserKey, function (err, decoded) {
      if (err) {
        isUser = false;
      } else {
        _decoded = decoded;
      }
    });
    jwt.verify(_data.token, AdminKey, function (err, decoded) {
      if (err) {
        isAdmin = false;
      } else {
        _decoded = decoded;
      }
    });
    if (isUser || isAdmin) {
      _data.id = _decoded;
      _data.userTokenType = isAdmin ? "admin" : "user";
      res._data = _data;
      next(); 
    } else {
      res.send({
        result: -999,
        msg: "Please login again.",
      });
    }
  };
  /* Crypto
   * @param {object} _data      
   */
  static setCrypto(_data) {
    let encrypted = cryptoJS.AES.encrypt(JSON.stringify(_data), key, {
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }
  /* Crypto
   * @param {string} _token     
   */
  static getCrypto(_token) {
    _token = decodeURIComponent(_token); 
    let decrypt = cryptoJS.AES.decrypt(_token, key, {
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7,
    });
    return JSON.parse(cryptoJS.enc.Utf8.stringify(decrypt).toString());
  }
  /* 
   * @param {object} _file      
   */
  static readPicFile(_file) {
    let { path, mimetype } = _file;
    let file = fs.readFileSync(path);
    let fileName =
      new Date().getTime() +
      parseInt(Math.random() * Math.random() * 1000000) +
      "." +
      mimetype.split("/")[1];
    this.delPicFile(path);
    return this.writePicFile(file, fileName);
  }
  /* 
   * @param {object} _file       
   * @param {string} _fileName   
   */
  static writePicFile(_file, _fileName) {
    let fileName = "./public/assets/img/" + _fileName;
    fs.writeFileSync(fileName, _file);
    return fileName.split("./")[1];
  }
  static delPicFile(_path) {
    fs.unlink(_path, (err) => {
      if (err) {
        console.log("Delete file error!");
      }
    });
  }
  static createBcrypt(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
  static checkBcrypt(_password, _hash) {
    return bcrypt.compareSync(_password, _hash);
  }
  static joinDate() {
    return new Date();
  }

  /* RandomCode
   * @method    codeLength
   * @for    Utils
   * @param {number/string} len  
   * @return {string}  _count   
   */
  static codeLength(len) {
    let _count = "";
    for (let i = 0; i < len; i++) {
      _count += Math.floor(Math.random() * 10); 
    }
    return _count;
  }
  /* Timestamp
   * @method    randomCode
   * @for    Utils
   * @param
   * @return {object}  _count  
   */
  static randomCode() {
    return {
      code: this.codeLength(EmailConfig.codeLength), 
      sendTime: new Date().getTime() + EmailConfig.sendTime, 
      targetTime: new Date().getTime() + EmailConfig.targetTime,
    };
  }
  /* 
   * @method    createEmailCode
   * @for    Utils
   * @param   {Object} codeList 
   * @param   {String} email   
   * @param   {Object} findRes  
   * @return {Boolean}  isSuccess   
   */
  static async createEmailCode(codeList, email, findRes) {
    if (!codeList[email] || new Date().getTime() > codeList[email].sendTime) {
      codeList[email] = this.randomCode();
      codeList[email].info = findRes;
      return await this.sendEmailCode(codeList[email].code, email);
    } else {
      return false;
    }
  }
  /* 
   * @method    sendEmailCode
   * @for    Utils
   * @param   {String} code  
   * @param   {String} email   
   */
  static async sendEmailCode(code, email) {
    return await SendMail.sendEmail(
      email,
      EmailConfig.title,
      `Your verification code is:${code}, in ${EmailConfig.time} min`
    );
  }
  /* VerifyCode
   * @method    checkEmailCode
   * @for    Utils
   * @param   {Object} codeList 
   * @param   {String} key  
   * @param   {Object} _data  
   * @return   {Object} res 
   */
  static checkEmailCode(codeList, key, _data) {
    if (!codeList[key]) {
      return {
        result: 0,
        msg: "Verification code is not sent.",
      };
    } else if (
      new Date().getTime() < codeList[key].targetTime &&
      _data.mailcode == codeList[key].code
    ) {
      let _obj = {
        result: 1,
        token: Utils.createToken(
          codeList[key].info.userType || "",
          codeList[key].info.username || "",
          _data.remember || ""
        ),
        msg: "Verification code is correct.",
      };
      codeList[key] = null;
      return _obj;
    } else if (new Date().getTime() > codeList[key].targetTime) {
      return {
        result: 0,
        msg: "Verification code is timeout.",
      };
    } else {
      return {
        result: 0,
        msg: "Verification code is incorrect.",
      };
    }
  }
  static createOrderNo() {
    let _date = new Date();
    return (
      "D" +
      _date.getFullYear() +
      (_date.getMonth() + 1) +
      _date.getDate() +
      _date.getHours() +
      _date.getMinutes() +
      _date.getSeconds() +
      parseInt(Math.random() * 10000)
    );
  }
  static deepCopy(org) {
    return JSON.parse(JSON.stringify(org));
  }
};
