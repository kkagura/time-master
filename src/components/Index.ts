import { defineComponent, reactive, h } from "vue";
import { holiday, noWorkTime, weekend, salaryDay } from "../index";
import { secondToString } from "../utils";

export default defineComponent({
  setup() {
    const data = reactive({
      hName: "",
      n: 0,
      h: 0,
      w: 0,
      s: 0,
    });
    holiday().then((d) => {
      data.h = d.value;
      data.hName = d.name;
    });
    data.n = noWorkTime();
    data.w = weekend();
    data.s = salaryDay();
    setInterval(() => {
      data.n = noWorkTime();
    }, 1000);
    return () =>
      h("div", {}, [
        h("p", {}, `距离下班还有${secondToString(data.n)}`),
        h("p", {}, `距离周末还有${data.w}天`),
        h("p", {}, `距离发工资还有${data.s}天`),
        h("p", {}, `距离${data.hName}还有${data.h}天`),
      ]);
  },
});
