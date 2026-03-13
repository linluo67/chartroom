import { shallowMount } from '@vue/test-utils';
import QuoteMessage from '../../src/components/QuoteMessage.vue';

describe('QuoteMessage.vue', () => {
  // 测试数据
  const mockTextMessage = {
    id: 'msg_1',
    name: '测试用户',
    msg: '这是一条测试消息',
    chatType: 0, // 文字消息
    uid: '1002'
  };

  const mockImageMessage = {
    id: 'msg_2',
    name: '图片发送者',
    msg: '/assets/img/test.png',
    chatType: 1, // 图片消息
    uid: '1003'
  };

  const mockFileMessage = {
    id: 'msg_3',
    name: '文件发送者',
    msg: { name: 'test.pdf' },
    chatType: 2, // 文件消息
    uid: '1004'
  };

  // 测试组件渲染
  describe('组件渲染', () => {
    it('应该正确渲染文字引用消息', () => {
      const wrapper = shallowMount(QuoteMessage, {
        propsData: {
          quoteData: mockTextMessage
        }
      });
      
      expect(wrapper.find('.quote-message').exists()).toBe(true);
      expect(wrapper.find('.quote-sender').text()).toBe('测试用户');
      expect(wrapper.find('.quote-text').text()).toBe('这是一条测试消息');
    });

    it('应该正确渲染图片引用消息', () => {
      const wrapper = shallowMount(QuoteMessage, {
        propsData: {
          quoteData: mockImageMessage
        }
      });
      
      expect(wrapper.find('.quote-img').exists()).toBe(true);
      expect(wrapper.find('.quote-img img').exists()).toBe(true);
      expect(wrapper.find('.quote-img span').text()).toBe('[图片]');
    });

    it('应该正确渲染文件引用消息', () => {
      const wrapper = shallowMount(QuoteMessage, {
        propsData: {
          quoteData: mockFileMessage
        }
      });
      
      expect(wrapper.find('.quote-file').exists()).toBe(true);
      expect(wrapper.find('.quote-file span').text()).toBe('test.pdf');
    });

    it('应该显示关闭按钮', () => {
      const wrapper = shallowMount(QuoteMessage, {
        propsData: {
          quoteData: mockTextMessage
        }
      });
      
      expect(wrapper.find('.quote-close').exists()).toBe(true);
    });

    it('应该显示蓝色竖线标识', () => {
      const wrapper = shallowMount(QuoteMessage, {
        propsData: {
          quoteData: mockTextMessage
        }
      });
      
      expect(wrapper.find('.quote-line').exists()).toBe(true);
    });
  });

  // 测试事件触发
  describe('事件触发', () => {
    it('点击关闭按钮应该触发close事件', async () => {
      const wrapper = shallowMount(QuoteMessage, {
        propsData: {
          quoteData: mockTextMessage
        }
      });
      
      await wrapper.find('.quote-close').trigger('click');
      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close').length).toBe(1);
    });

    it('点击引用内容应该触发jump事件并传递消息ID', async () => {
      const wrapper = shallowMount(QuoteMessage, {
        propsData: {
          quoteData: mockTextMessage
        }
      });
      
      await wrapper.find('.quote-content').trigger('click');
      expect(wrapper.emitted('jump')).toBeTruthy();
      expect(wrapper.emitted('jump')[0]).toEqual(['msg_1']);
    });
  });

  // 测试Props验证
  describe('Props验证', () => {
    it('应该正确接收quoteData属性', () => {
      const wrapper = shallowMount(QuoteMessage, {
        propsData: {
          quoteData: mockTextMessage
        }
      });
      
      expect(wrapper.props('quoteData')).toEqual(mockTextMessage);
    });

    it('quoteData应该包含必需的字段', () => {
      const wrapper = shallowMount(QuoteMessage, {
        propsData: {
          quoteData: mockTextMessage
        }
      });
      
      const quoteData = wrapper.props('quoteData');
      expect(quoteData).toHaveProperty('id');
      expect(quoteData).toHaveProperty('name');
      expect(quoteData).toHaveProperty('msg');
      expect(quoteData).toHaveProperty('chatType');
      expect(quoteData).toHaveProperty('uid');
    });
  });

  // 测试样式
  describe('样式测试', () => {
    it('引用消息应该有正确的CSS类', () => {
      const wrapper = shallowMount(QuoteMessage, {
        propsData: {
          quoteData: mockTextMessage
        }
      });
      
      expect(wrapper.find('.quote-message').exists()).toBe(true);
      expect(wrapper.find('.quote-content').exists()).toBe(true);
      expect(wrapper.find('.quote-info').exists()).toBe(true);
    });
  });
});
