import Config from "../config/config";
import Axios from "axios";
import { Component } from "react";
import { message } from "antd";
Axios.defaults.baseURL =
  Config.Agreement + Config.BaseUrl + Config.ServerPort + Config.Path;
Axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  function (response) {
    if (response.data.result === -999) {
      return message.error(response.data.msg).then((res) => {
        if (window.location.href.indexOf("login") === -1) {
          localStorage.removeItem(Config.StorageName.token);
          window.location.href = "/";
        }
      });
    }
    return response.data;
  },
  function (error) {
    console.log(error);
    message.error("操作失败");
    return Promise.reject(error);
  }
);

Component.prototype.$axios = Axios;
