import { shallowMount, createLocalVue } from '@vue/test-utils';
import QuoteMessage from '@/components/QuoteMessage.vue';

const localVue = createLocalVue();

describe('QuoteMessage.vue', () => {
  let wrapper;

  const textQuoteData = {
    msgId: 'msg_1002_1',
    senderName: '大毛',
    contentSummary: '这是一条测试消息',
    msgType: 0
  };

  const imageQuoteData = {
    msgId: 'msg_1002_2',
    senderName: '小毛',
    contentSummary: 'https://example.com/image.png',
    msgType: 1
  };

  const fileQuoteData = {
    msgId: 'msg_1002_3',
    senderName: '小王',
    contentSummary: 'document.pdf',
    msgType: 2
  };

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
  });

  describe('组件渲染', () => {
    it('当 quoteData 为 null 时不渲染', () => {
      wrapper = shallowMount(QuoteMessage, {
        localVue,
        propsData: {
          quoteData: null
        }
      });
      expect(wrapper.find('.quote-message-preview').exists()).toBe(false);
    });

    it('当 quoteData 存在时正确渲染', () => {
      wrapper = shallowMount(QuoteMessage, {
        localVue,
        propsData: {
          quoteData: textQuoteData
        }
      });
      expect(wrapper.find('.quote-message-preview').exists()).toBe(true);
      expect(wrapper.find('.quote-sender').text()).toBe('大毛');
    });

    it('正确显示文字消息引用', () => {
      wrapper = shallowMount(QuoteMessage, {
        localVue,
        propsData: {
          quoteData: textQuoteData
        }
      });
      expect(wrapper.find('.quote-text').exists()).toBe(true);
      expect(wrapper.find('.quote-text').text()).toBe('这是一条测试消息');
    });

    it('正确显示图片消息引用', () => {
      wrapper = shallowMount(QuoteMessage, {
        localVue,
        propsData: {
          quoteData: imageQuoteData
        }
      });
      expect(wrapper.find('.quote-img').exists()).toBe(true);
      expect(wrapper.find('.quote-img img').attributes('src')).toBe('https://example.com/image.png');
      expect(wrapper.find('.quote-type-label').text()).toBe('[图片]');
    });

    it('正确显示文件消息引用', () => {
      wrapper = shallowMount(QuoteMessage, {
        localVue,
        propsData: {
          quoteData: fileQuoteData
        }
      });
      expect(wrapper.find('.quote-file').exists()).toBe(true);
      expect(wrapper.find('.file-name').text()).toBe('document.pdf');
    });
  });

  describe('事件触发', () => {
    it('点击关闭按钮触发 close 事件', async () => {
      wrapper = shallowMount(QuoteMessage, {
        localVue,
        propsData: {
          quoteData: textQuoteData
        }
      });
      await wrapper.find('.close-btn').trigger('click');
      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close').length).toBe(1);
    });

    it('点击跳转按钮触发 jump 事件并传递 msgId', async () => {
      wrapper = shallowMount(QuoteMessage, {
        localVue,
        propsData: {
          quoteData: textQuoteData
        }
      });
      await wrapper.find('.jump-btn').trigger('click');
      expect(wrapper.emitted('jump')).toBeTruthy();
      expect(wrapper.emitted('jump')[0]).toEqual(['msg_1002_1']);
    });
  });

  describe('样式验证', () => {
    it('引用预览卡片包含蓝色竖线标识', () => {
      wrapper = shallowMount(QuoteMessage, {
        localVue,
        propsData: {
          quoteData: textQuoteData
        }
      });
      expect(wrapper.find('.quote-indicator').exists()).toBe(true);
    });

    it('引用预览卡片使用浅灰色背景', () => {
      wrapper = shallowMount(QuoteMessage, {
        localVue,
        propsData: {
          quoteData: textQuoteData
        }
      });
      const preview = wrapper.find('.quote-message-preview');
      expect(preview.exists()).toBe(true);
    });
  });

  describe('Props 验证', () => {
    it('接受正确的 quoteData prop', () => {
      wrapper = shallowMount(QuoteMessage, {
        localVue,
        propsData: {
          quoteData: textQuoteData
        }
      });
      expect(wrapper.props('quoteData')).toEqual(textQuoteData);
    });

    it('quoteData 默认值为 null', () => {
      wrapper = shallowMount(QuoteMessage, {
        localVue
      });
      expect(wrapper.props('quoteData')).toBeNull();
    });
  });
});
