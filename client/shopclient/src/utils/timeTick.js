import Vue from "vue";
import Config from "../config/config";
const { GetCodeTime, CodeText } = Config;
class TimeTick {
  static timer = GetCodeTime / 1000;
  static _timeTick = null;
  static timeTick(fn) {
    if (!TimeTick._timeTick) {
      TimeTick._timeTick = setInterval(() => {
        if (TimeTick.timer-- <= 1) {
          TimeTick.clearTick();
          fn({ content: CodeText, res: 1 });
        } else {
          fn({ content: TimeTick.timer + "S", res: 0 });
        }
      }, 1000);
    }
  }
  static clearTick() {
    clearInterval(TimeTick._timeTick);
    TimeTick._timeTick = null;
  }
}
Vue.prototype.$timeTick = TimeTick;
