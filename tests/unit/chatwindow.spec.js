import { shallowMount, mount } from '@vue/test-utils';
import ChatWindow from '../../src/view/pages/chatHome/chatwindow.vue';

// Mock Element UI
describe('chatwindow.vue - 引用回复功能测试', () => {
  const mockFriendInfo = {
    id: '1002',
    name: '大毛',
    detail: '我是大毛',
    headImg: '/assets/img/head_portrait1.jpg'
  };

  const mockMessage = {
    id: 'msg_1',
    headImg: '/assets/img/head_portrait1.jpg',
    name: '大毛',
    time: '09:12 AM',
    msg: '测试消息',
    chatType: 0,
    uid: '1002'
  };

  // 基础渲染测试
  describe('基础渲染', () => {
    it('应该正确渲染聊天窗口', () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image', 'el-message']
      });
      
      expect(wrapper.find('.chat-window').exists()).toBe(true);
      expect(wrapper.find('.top').exists()).toBe(true);
      expect(wrapper.find('.botoom').exists()).toBe(true);
    });

    it('应该显示好友信息', () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });
      
      expect(wrapper.find('.name').text()).toBe('大毛');
      expect(wrapper.find('.detail').text()).toBe('我是大毛');
    });
  });

  // 右键菜单测试
  describe('右键菜单功能', () => {
    it('右键点击消息应该显示上下文菜单', async () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [mockMessage],
            showMenu: false,
            menuX: 0,
            menuY: 0,
            selectedMessage: null,
            quotingMessage: null
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      const messageElement = wrapper.find('.chat-friend');
      await messageElement.trigger('contextmenu.prevent', {
        clientX: 100,
        clientY: 200
      });

      expect(wrapper.vm.showMenu).toBe(true);
      expect(wrapper.vm.menuX).toBe(100);
      expect(wrapper.vm.menuY).toBe(200);
      expect(wrapper.vm.selectedMessage).toEqual(mockMessage);
    });

    it('应该渲染右键菜单', () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [],
            showMenu: true,
            menuX: 100,
            menuY: 200
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      expect(wrapper.find('.context-menu').exists()).toBe(true);
      expect(wrapper.find('.menu-item').text()).toBe('引用回复');
    });
  });

  // 引用功能测试
  describe('引用回复功能', () => {
    it('点击引用回复应该设置quotingMessage', async () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [],
            showMenu: false,
            selectedMessage: null,
            quotingMessage: null
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      // 设置选中的消息
      await wrapper.setData({ selectedMessage: mockMessage });
      
      // 调用handleQuote方法
      wrapper.vm.handleQuote();

      expect(wrapper.vm.quotingMessage).toEqual(mockMessage);
      expect(wrapper.vm.showMenu).toBe(false);
    });

    it('取消引用应该清除quotingMessage', async () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [],
            quotingMessage: mockMessage
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      wrapper.vm.cancelQuote();
      expect(wrapper.vm.quotingMessage).toBeNull();
    });

    it('当quotingMessage存在时应该显示QuoteMessage组件', () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [],
            quotingMessage: mockMessage
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      expect(wrapper.find('quotemessage-stub').exists()).toBe(true);
    });
  });

  // 消息发送测试
  describe('消息发送与引用', () => {
    it('发送文字消息时应该包含引用信息', async () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [],
            inputMsg: '回复消息',
            quotingMessage: mockMessage
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      // 监听sendMsg方法
      const sendMsgSpy = jest.spyOn(wrapper.vm, 'sendMsg');
      
      // 发送消息
      wrapper.vm.sendText();

      // 验证发送的消息包含引用信息
      expect(sendMsgSpy).toHaveBeenCalled();
      const sentMessage = sendMsgSpy.mock.calls[0][0];
      expect(sentMessage.quoteMessage).toBeDefined();
      expect(sentMessage.quoteMessage.id).toBe('msg_1');
      expect(sentMessage.quoteMessage.name).toBe('大毛');
    });

    it('发送消息后应该清除引用状态', async () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [],
            inputMsg: '测试回复',
            quotingMessage: mockMessage
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      wrapper.vm.sendText();

      expect(wrapper.vm.quotingMessage).toBeNull();
      expect(wrapper.vm.inputMsg).toBe('');
    });
  });

  // 引用消息显示测试
  describe('引用消息显示', () => {
    it('消息应该显示引用内容', () => {
      const messageWithQuote = {
        id: 'msg_2',
        headImg: '/assets/img/head_portrait.jpg',
        name: '大毛是小白',
        time: '09:12 AM',
        msg: '这是回复',
        chatType: 0,
        uid: '1001',
        quoteMessage: {
          id: 'msg_1',
          name: '大毛',
          msg: '原消息',
          chatType: 0,
          uid: '1002'
        }
      };

      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [messageWithQuote]
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      expect(wrapper.find('.chat-quote').exists()).toBe(true);
      expect(wrapper.find('.quote-name').text()).toBe('大毛');
      expect(wrapper.find('.quote-content').text()).toBe('原消息');
    });

    it('引用图片消息应该显示[图片]', () => {
      const messageWithImageQuote = {
        id: 'msg_2',
        headImg: '/assets/img/head_portrait.jpg',
        name: '大毛是小白',
        time: '09:12 AM',
        msg: '这是回复',
        chatType: 0,
        uid: '1001',
        quoteMessage: {
          id: 'msg_1',
          name: '大毛',
          msg: '/assets/img/test.png',
          chatType: 1, // 图片类型
          uid: '1002'
        }
      };

      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [messageWithImageQuote]
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      expect(wrapper.find('.quote-content').text()).toBe('[图片]');
    });

    it('引用文件消息应该显示[文件]', () => {
      const messageWithFileQuote = {
        id: 'msg_2',
        headImg: '/assets/img/head_portrait.jpg',
        name: '大毛是小白',
        time: '09:12 AM',
        msg: '这是回复',
        chatType: 0,
        uid: '1001',
        quoteMessage: {
          id: 'msg_1',
          name: '大毛',
          msg: { name: 'test.pdf' },
          chatType: 2, // 文件类型
          uid: '1002'
        }
      };

      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [messageWithFileQuote]
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      expect(wrapper.find('.quote-content').text()).toBe('[文件]');
    });
  });

  // 跳转到原消息测试
  describe('跳转到原消息功能', () => {
    it('点击引用内容应该调用jumpToMessage方法', async () => {
      const messageWithQuote = {
        id: 'msg_2',
        headImg: '/assets/img/head_portrait.jpg',
        name: '大毛是小白',
        time: '09:12 AM',
        msg: '这是回复',
        chatType: 0,
        uid: '1001',
        quoteMessage: {
          id: 'msg_1',
          name: '大毛',
          msg: '原消息',
          chatType: 0,
          uid: '1002'
        }
      };

      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [messageWithQuote]
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      const jumpToMessageSpy = jest.spyOn(wrapper.vm, 'jumpToMessage');
      
      await wrapper.find('.chat-quote').trigger('click');
      
      expect(jumpToMessageSpy).toHaveBeenCalledWith('msg_1');
    });
  });

  // 数据流测试
  describe('数据流测试', () => {
    it('QuoteMessage组件应该通过props接收数据', () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [],
            quotingMessage: mockMessage
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      const quoteMessageStub = wrapper.find('quotemessage-stub');
      expect(quoteMessageStub.exists()).toBe(true);
      expect(quoteMessageStub.attributes('quotedata')).toBeDefined();
    });

    it('QuoteMessage组件应该通过emit事件与父组件通信', async () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [],
            quotingMessage: mockMessage
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      // 模拟子组件触发close事件
      wrapper.vm.cancelQuote = jest.fn();
      const quoteMessageStub = wrapper.find('quotemessage-stub');
      await quoteMessageStub.vm.$emit('close');
      
      // 验证父组件响应事件
      expect(wrapper.vm.quotingMessage).toEqual(mockMessage);
    });
  });
});
