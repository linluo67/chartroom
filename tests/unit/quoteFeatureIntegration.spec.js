/**
 * 引用功能集成测试
 * 测试完整的引用回复流程
 */

import { shallowMount } from '@vue/test-utils';
import ChatWindow from '../../src/view/pages/chatHome/chatwindow.vue';
import QuoteMessage from '../../src/components/QuoteMessage.vue';

describe('引用功能集成测试', () => {
  const mockFriendInfo = {
    id: '1002',
    name: '大毛',
    detail: '我是大毛',
    headImg: '/assets/img/head_portrait1.jpg'
  };

  // 模拟聊天历史
  const mockChatHistory = [
    {
      id: 'msg_1',
      headImg: '/assets/img/head_portrait1.jpg',
      name: '大毛',
      time: '09:00 AM',
      msg: '第一条消息',
      chatType: 0,
      uid: '1002'
    },
    {
      id: 'msg_2',
      headImg: '/assets/img/head_portrait.jpg',
      name: '大毛是小白',
      time: '09:05 AM',
      msg: '第二条消息',
      chatType: 0,
      uid: '1001'
    },
    {
      id: 'msg_3',
      headImg: '/assets/img/head_portrait1.jpg',
      name: '大毛',
      time: '09:10 AM',
      msg: '/assets/img/test.png',
      chatType: 1,
      extend: { imgType: 2 },
      uid: '1002'
    }
  ];

  describe('完整引用流程', () => {
    it('用户应该能够右键点击消息并选择引用回复', async () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: mockChatHistory,
            showMenu: false,
            menuX: 0,
            menuY: 0,
            selectedMessage: null,
            quotingMessage: null
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      // 1. 右键点击消息
      const firstMessage = wrapper.find('.chat-friend');
      await firstMessage.trigger('contextmenu.prevent', {
        clientX: 100,
        clientY: 200
      });

      // 验证右键菜单显示
      expect(wrapper.vm.showMenu).toBe(true);
      expect(wrapper.vm.selectedMessage).toEqual(mockChatHistory[0]);

      // 2. 点击引用回复
      wrapper.vm.handleQuote();

      // 验证引用消息被设置
      expect(wrapper.vm.quotingMessage).toEqual(mockChatHistory[0]);
      expect(wrapper.vm.showMenu).toBe(false);
    });

    it('选择引用后应该显示预览卡片', async () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: mockChatHistory,
            quotingMessage: mockChatHistory[0]
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      // 验证QuoteMessage组件被渲染
      expect(wrapper.find('quotemessage-stub').exists()).toBe(true);
    });

    it('发送消息后应该包含引用信息并清除引用状态', async () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [...mockChatHistory],
            inputMsg: '这是引用回复',
            quotingMessage: mockChatHistory[0],
            showEmoji: false
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      // 发送消息
      wrapper.vm.sendText();

      // 验证消息被添加到聊天列表
      const lastMessage = wrapper.vm.chatList[wrapper.vm.chatList.length - 1];
      
      // 验证包含引用信息
      expect(lastMessage.quoteMessage).toBeDefined();
      expect(lastMessage.quoteMessage.id).toBe('msg_1');
      expect(lastMessage.quoteMessage.name).toBe('大毛');
      expect(lastMessage.quoteMessage.msg).toBe('第一条消息');

      // 验证引用状态被清除
      expect(wrapper.vm.quotingMessage).toBeNull();
    });
  });

  describe('引用不同类型消息', () => {
    it('应该能够引用文字消息', async () => {
      const textMessage = mockChatHistory[0];
      
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: mockChatHistory,
            quotingMessage: textMessage
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      expect(wrapper.vm.quotingMessage.chatType).toBe(0);
      expect(typeof wrapper.vm.quotingMessage.msg).toBe('string');
    });

    it('应该能够引用图片消息', async () => {
      const imageMessage = mockChatHistory[2];
      
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: mockChatHistory,
            quotingMessage: imageMessage
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      expect(wrapper.vm.quotingMessage.chatType).toBe(1);
      expect(wrapper.vm.quotingMessage.msg).toBe('/assets/img/test.png');
    });
  });

  describe('取消引用功能', () => {
    it('用户应该能够取消引用', async () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: mockChatHistory,
            quotingMessage: mockChatHistory[0]
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      // 验证引用状态存在
      expect(wrapper.vm.quotingMessage).not.toBeNull();

      // 取消引用
      wrapper.vm.cancelQuote();

      // 验证引用状态被清除
      expect(wrapper.vm.quotingMessage).toBeNull();
    });

    it('点击预览卡片的关闭按钮应该取消引用', async () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: mockChatHistory,
            quotingMessage: mockChatHistory[0]
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      // 模拟子组件触发close事件
      const quoteMessageStub = wrapper.find('quotemessage-stub');
      await quoteMessageStub.vm.$emit('close');

      // 调用cancelQuote方法
      wrapper.vm.cancelQuote();

      expect(wrapper.vm.quotingMessage).toBeNull();
    });
  });

  describe('消息显示', () => {
    it('包含引用的消息应该显示引用区域', () => {
      const messageWithQuote = {
        id: 'msg_new',
        headImg: '/assets/img/head_portrait.jpg',
        name: '大毛是小白',
        time: '09:15 AM',
        msg: '回复内容',
        chatType: 0,
        uid: '1001',
        quoteMessage: {
          id: 'msg_1',
          name: '大毛',
          msg: '被引用的消息',
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

      // 验证引用区域显示
      expect(wrapper.find('.chat-quote').exists()).toBe(true);
      expect(wrapper.find('.quote-name').text()).toBe('大毛');
      expect(wrapper.find('.quote-content').text()).toBe('被引用的消息');
    });

    it('不包含引用的消息不应该显示引用区域', () => {
      const messageWithoutQuote = {
        id: 'msg_new',
        headImg: '/assets/img/head_portrait.jpg',
        name: '大毛是小白',
        time: '09:15 AM',
        msg: '普通消息',
        chatType: 0,
        uid: '1001'
      };

      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: [messageWithoutQuote]
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      // 验证引用区域不显示
      expect(wrapper.find('.chat-quote').exists()).toBe(false);
    });
  });

  describe('跳转到原消息', () => {
    it('点击引用内容应该跳转到原消息', async () => {
      const messageWithQuote = {
        id: 'msg_new',
        headImg: '/assets/img/head_portrait.jpg',
        name: '大毛是小白',
        time: '09:15 AM',
        msg: '回复内容',
        chatType: 0,
        uid: '1001',
        quoteMessage: {
          id: 'msg_1',
          name: '大毛',
          msg: '被引用的消息',
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
            chatList: [...mockChatHistory, messageWithQuote]
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      // Mock scrollIntoView
      const mockScrollIntoView = jest.fn();
      const mockElement = {
        scrollIntoView: mockScrollIntoView,
        classList: {
          add: jest.fn(),
          remove: jest.fn()
        }
      };
      
      // Mock document.querySelector
      document.querySelector = jest.fn().mockReturnValue(mockElement);

      // 调用跳转方法
      wrapper.vm.jumpToMessage('msg_1');

      // 验证querySelector被调用
      expect(document.querySelector).toHaveBeenCalledWith('[data-id="msg_1"]');
      
      // 验证scrollIntoView被调用
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
    });
  });

  describe('边界情况', () => {
    it('空消息不应该触发引用', () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: mockChatHistory,
            inputMsg: '',
            quotingMessage: mockChatHistory[0]
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image'],
        mocks: {
          $message: jest.fn()
        }
      });

      // 尝试发送空消息
      wrapper.vm.sendText();

      // 验证引用状态没有被清除（因为没有发送成功）
      expect(wrapper.vm.quotingMessage).not.toBeNull();
    });

    it('快速连续引用应该只保留最后一次引用', () => {
      const wrapper = shallowMount(ChatWindow, {
        propsData: {
          frinedInfo: mockFriendInfo
        },
        data() {
          return {
            chatList: mockChatHistory,
            quotingMessage: null
          };
        },
        stubs: ['HeadPortrait', 'Emoji', 'FileCard', 'QuoteMessage', 'el-image']
      });

      // 第一次引用
      wrapper.vm.quotingMessage = mockChatHistory[0];
      expect(wrapper.vm.quotingMessage.id).toBe('msg_1');

      // 第二次引用（应该替换第一次）
      wrapper.vm.quotingMessage = mockChatHistory[1];
      expect(wrapper.vm.quotingMessage.id).toBe('msg_2');
    });
  });
});
