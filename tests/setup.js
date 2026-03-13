import Vue from 'vue';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

Vue.config.productionTip = false;

global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn()
};
