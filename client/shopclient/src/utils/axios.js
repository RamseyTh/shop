import Vue from "vue";
import Axios from "axios";
import Config from "../config/config";
import { Toast, Indicator } from "mint-ui";
Axios.defaults.baseURL = Config.RequestPath; 
Axios.defaults.timeout = Config.RequestTimeOut; 
Axios.interceptors.request.use(
  function(config) {
    Indicator.open("Loading...");
    return config;
  },
  function(error) {
    Indicator.close();
    return Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  function(response) {
    Indicator.close();
    if (response.data.result != 1) {
      Toast(response.data.msg);
    }
    if (response.data.result === -999) {
    }
    return response.data;
  },
  function(error) {
    Indicator.close();
    Toast("Load Failed");
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = Axios;
