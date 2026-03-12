import { mount, createLocalVue } from "@vue/test-utils";
import ElementUI from "element-ui";
import ChatWindow from "@/view/pages/chatHome/chatwindow.vue";
import MessageSearch from "@/components/MessageSearch.vue";

const localVue = createLocalVue();
localVue.use(ElementUI);

describe("ChatWindow 搜索功能集成测试", () => {
  const mockFriendInfo = {
    id: "1002",
    name: "测试好友",
    detail: "这是测试好友的详细信息",
    headImg: "test-head.jpg"
  };

  const mockChatMessages = [
    {
      id: 1,
      headImg: "head1.jpg",
      name: "用户A",
      time: "09:00 AM",
      msg: "早上好",
      chatType: 0,
      uid: "1001"
    },
    {
      id: 2,
      headImg: "head2.jpg",
      name: "用户B",
      time: "09:01 AM",
      msg: "早上好，今天天气不错",
      chatType: 0,
      uid: "1002"
    },
    {
      id: 3,
      headImg: "head1.jpg",
      name: "用户A",
      time: "09:02 AM",
      msg: "是的，适合出去散步",
      chatType: 0,
      uid: "1001"
    }
  ];

  it("包含 MessageSearch 组件", () => {
    const wrapper = mount(ChatWindow, {
      localVue,
      propsData: {
        frinedInfo: mockFriendInfo
      },
      data() {
        return {
          chatList: mockChatMessages,
          displayChatList: mockChatMessages
        };
      }
    });
    expect(wrapper.findComponent(MessageSearch).exists()).toBe(true);
  });

  it("初始状态 displayChatList 等于 chatList", () => {
    const wrapper = mount(ChatWindow, {
      localVue,
      propsData: {
        frinedInfo: mockFriendInfo
      },
      data() {
        return {
          chatList: mockChatMessages,
          displayChatList: mockChatMessages,
          searchKeyword: ""
        };
      }
    });
    expect(wrapper.vm.displayChatList).toEqual(wrapper.vm.chatList);
  });

  it("handleSearchResult 方法正确更新状态", async () => {
    const wrapper = mount(ChatWindow, {
      localVue,
      propsData: {
        frinedInfo: mockFriendInfo
      },
      data() {
        return {
          chatList: mockChatMessages,
          displayChatList: mockChatMessages,
          searchKeyword: ""
        };
      }
    });

    const searchResult = {
      messages: [mockChatMessages[0], mockChatMessages[1]],
      keyword: "早上"
    };

    wrapper.vm.handleSearchResult(searchResult);
    expect(wrapper.vm.searchKeyword).toBe("早上");
    expect(wrapper.vm.displayChatList.length).toBe(2);
  });

  it("清空搜索时恢复原始列表", async () => {
    const wrapper = mount(ChatWindow, {
      localVue,
      propsData: {
        frinedInfo: mockFriendInfo
      },
      data() {
        return {
          chatList: mockChatMessages,
          displayChatList: [mockChatMessages[0]],
          searchKeyword: "早上"
        };
      }
    });

    wrapper.vm.handleSearchResult({ messages: [], keyword: "" });
    expect(wrapper.vm.searchKeyword).toBe("");
    expect(wrapper.vm.displayChatList).toEqual(mockChatMessages);
  });

  it("highlightText 方法正确高亮关键词", () => {
    const wrapper = mount(ChatWindow, {
      localVue,
      propsData: {
        frinedInfo: mockFriendInfo
      },
      data() {
        return {
          searchKeyword: "早上"
        };
      }
    });

    const result = wrapper.vm.highlightText("早上好，今天天气不错");
    expect(result).toContain("早上");
    expect(result).toContain("#ffeb3b");
    expect(result).toContain("#333");
  });

  it("highlightText 方法处理空关键词", () => {
    const wrapper = mount(ChatWindow, {
      localVue,
      propsData: {
        frinedInfo: mockFriendInfo
      },
      data() {
        return {
          searchKeyword: ""
        };
      }
    });

    const result = wrapper.vm.highlightText("早上好");
    expect(result).toBe("早上好");
  });

  it("highlightText 方法处理特殊字符", () => {
    const wrapper = mount(ChatWindow, {
      localVue,
      propsData: {
        frinedInfo: mockFriendInfo
      },
      data() {
        return {
          searchKeyword: "(测试)"
        };
      }
    });

    const result = wrapper.vm.highlightText("这是一个(测试)消息");
    expect(result).toContain("(测试)");
    expect(result).toContain("#ffeb3b");
  });

  it("搜索区域正确渲染", () => {
    const wrapper = mount(ChatWindow, {
      localVue,
      propsData: {
        frinedInfo: mockFriendInfo
      }
    });
    expect(wrapper.find(".search-area").exists()).toBe(true);
  });

  it("MessageSearch 组件接收正确的 messageList prop", () => {
    const wrapper = mount(ChatWindow, {
      localVue,
      propsData: {
        frinedInfo: mockFriendInfo
      },
      data() {
        return {
          chatList: mockChatMessages,
          displayChatList: mockChatMessages
        };
      }
    });
    const messageSearch = wrapper.findComponent(MessageSearch);
    expect(messageSearch.props("messageList")).toEqual(mockChatMessages);
  });
});
