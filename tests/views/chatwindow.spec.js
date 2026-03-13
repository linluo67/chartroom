import { shallowMount, createLocalVue } from '@vue/test-utils';
import chatwindow from '@/view/pages/chatHome/chatwindow.vue';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

const mockFrinedInfo = {
  id: '1002',
  name: '大毛',
  detail: '我是大毛',
  headImg: ''
};

jest.mock('@/api/getData', () => ({
  getChatMsg: jest.fn(() => Promise.resolve([
    {
      id: 'msg_test_1',
      headImg: '',
      name: '大毛',
      time: '09:12 AM',
      msg: '测试消息',
      chatType: 0,
      uid: '1002'
    },
    {
      id: 'msg_test_2',
      headImg: '',
      name: '大毛是小白',
      time: '09:13 AM',
      msg: '回复消息',
      chatType: 0,
      uid: '1001'
    }
  ]))
}));

describe('chatwindow.vue', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
    jest.clearAllMocks();
  });

  describe('组件基础功能', () => {
    it('正确渲染组件', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      expect(wrapper.find('.chat-window').exists()).toBe(true);
    });

    it('正确接收 frinedInfo prop', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      expect(wrapper.props('frinedInfo')).toEqual(mockFrinedInfo);
    });
  });

  describe('引用功能', () => {
    it('初始状态下 currentQuote 为 null', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      expect(wrapper.vm.currentQuote).toBeNull();
    });

    it('初始状态下右键菜单隐藏', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      expect(wrapper.vm.showContextMenu).toBe(false);
    });

    it('getContentSummary 正确处理文字消息', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      const message = {
        chatType: 0,
        msg: '这是一条文字消息'
      };
      expect(wrapper.vm.getContentSummary(message)).toBe('这是一条文字消息');
    });

    it('getContentSummary 正确处理图片消息', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      const message = {
        chatType: 1,
        msg: 'image.png'
      };
      expect(wrapper.vm.getContentSummary(message)).toBe('[图片]');
    });

    it('getContentSummary 正确处理文件消息', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      const message = {
        chatType: 2,
        msg: { name: 'document.pdf' }
      };
      expect(wrapper.vm.getContentSummary(message)).toBe('document.pdf');
    });

    it('generateMessageId 生成唯一 ID', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      const id1 = wrapper.vm.generateMessageId();
      const id2 = wrapper.vm.generateMessageId();
      expect(id1).not.toBe(id2);
      expect(id1).toContain('msg_');
    });

    it('clearQuote 清除当前引用', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      wrapper.vm.currentQuote = {
        msgId: 'test_id',
        senderName: '测试用户',
        contentSummary: '测试内容',
        msgType: 0
      };
      wrapper.vm.clearQuote();
      expect(wrapper.vm.currentQuote).toBeNull();
    });

    it('handleQuoteReply 正确设置引用数据', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      wrapper.vm.selectedMessage = {
        id: 'msg_test_1',
        name: '大毛',
        msg: '测试引用',
        chatType: 0
      };
      wrapper.vm.handleQuoteReply();
      expect(wrapper.vm.currentQuote).toEqual({
        msgId: 'msg_test_1',
        senderName: '大毛',
        contentSummary: '测试引用',
        msgType: 0
      });
    });

    it('handleRightClick 正确设置右键菜单位置', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      const mockEvent = {
        clientX: 100,
        clientY: 200
      };
      const message = { id: 'test', name: 'test', msg: 'test', chatType: 0 };
      wrapper.vm.handleRightClick(mockEvent, message);
      expect(wrapper.vm.showContextMenu).toBe(true);
      expect(wrapper.vm.selectedMessage).toEqual(message);
      expect(wrapper.vm.contextMenuStyle.left).toBe('100px');
      expect(wrapper.vm.contextMenuStyle.top).toBe('200px');
    });

    it('handleDocumentClick 关闭右键菜单', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      wrapper.vm.showContextMenu = true;
      wrapper.vm.handleDocumentClick();
      expect(wrapper.vm.showContextMenu).toBe(false);
    });

    it('handleDocumentContextMenu 关闭右键菜单', () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      wrapper.vm.showContextMenu = true;
      wrapper.vm.handleDocumentContextMenu();
      expect(wrapper.vm.showContextMenu).toBe(false);
    });
  });

  describe('消息发送功能', () => {
    it('发送消息后清空输入框', async () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      wrapper.vm.inputMsg = '测试消息';
      wrapper.vm.sendText();
      expect(wrapper.vm.inputMsg).toBe('');
    });

    it('发送消息后清除引用', async () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      wrapper.vm.inputMsg = '测试回复';
      wrapper.vm.currentQuote = {
        msgId: 'msg_test_1',
        senderName: '大毛',
        contentSummary: '测试引用',
        msgType: 0
      };
      wrapper.vm.sendText();
      expect(wrapper.vm.currentQuote).toBeNull();
    });

    it('发送带引用的消息包含 quoteMessage 字段', async () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      const quoteData = {
        msgId: 'msg_test_1',
        senderName: '大毛',
        contentSummary: '测试引用',
        msgType: 0
      };
      wrapper.vm.inputMsg = '回复内容';
      wrapper.vm.currentQuote = quoteData;
      
      wrapper.vm.sendText();
      const lastMessage = wrapper.vm.chatList[wrapper.vm.chatList.length - 1];
      
      expect(lastMessage.quoteMessage).toEqual(quoteData);
    });

    it('发送消息包含唯一 ID', async () => {
      wrapper = shallowMount(chatwindow, {
        localVue,
        propsData: {
          frinedInfo: mockFrinedInfo
        }
      });
      wrapper.vm.inputMsg = '测试消息';
      wrapper.vm.sendText();
      const lastMessage = wrapper.vm.chatList[wrapper.vm.chatList.length - 1];
      expect(lastMessage.id).toBeDefined();
      expect(lastMessage.id).toContain('msg_');
    });
  });
});
