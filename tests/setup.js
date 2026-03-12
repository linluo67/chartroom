import Vue from "vue";
import ElementUI from "element-ui";

Vue.use(ElementUI);

global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn()
};
