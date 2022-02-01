import Vue from 'vue'
import {
  Toast
} from "mint-ui";
import config from "../../config/config"
const {
  ServerApi,
  StorageName,
  EventName
} = config
export default class LoginBussiness extends Vue {
  constructor(_vueComponent) {
    super()
    this.vueComponent = _vueComponent
  }
  sendCode() {

    return new Promise((resolve, reject) => {
      if (!this.vueComponent.userInfo.username.length) {
        Toast('Please enter a valid email address');
        return
      }
      this.$axios
        .get(ServerApi.user.getMailCode, {
          params: {
            crypto: this.$crypto.setCrypto({
              codeType: "login",
              username: this.vueComponent.userInfo.username
            })
          },
        }).then(res => {
          switch (res.result) {
            case 1:
              Toast(res.msg);
              resolve(res)
              break;
            default:
              reject(res)
              break;
          }
        }).catch(err => {
          reject(err)
        })
    })

  }
  submitData() {
    if (!this.vueComponent.userInfo.username.length) {
      Toast('Please enter Username');
      return
    }
    switch (this.vueComponent.loginType) {
      case 'code':
        if (this.vueComponent.userInfo.mailcode.length != 4) {
          Toast('Please enter the correct verification code');
          return
        }
        break;
      case 'psd':
        if (!this.vueComponent.userInfo.password.length) {
          Toast('Please enter Password');
          return
        }
        break;
    }

    this.$axios
      .post(ServerApi.user.userLogin, {
        crypto: this.$crypto.setCrypto({
          loginType: this.vueComponent.loginType,
          ...this.vueComponent.userInfo
        })
      }).then(res => {
        this.vueComponent.userInfo.password = "";
        this.vueComponent.userInfo.mailcode = "";
        switch (res.result) {
          case 1:
            Toast(res.msg);
            this.vueComponent.userInfo.username = "";
            this.$storage.saveStorage(StorageName.Token, res.token)
            this.$events.emitEvent(EventName.IsLogin)
            break;
          default:
            break;
        }
      }).catch(err => {

      })
  }
}
