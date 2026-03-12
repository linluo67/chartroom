import { mount } from "@vue/test-utils";
import MessageSearch from "@/components/MessageSearch.vue";

describe("MessageSearch.vue", () => {
  const mockMessages = [
    {
      id: 1,
      headImg: "test1.jpg",
      name: "用户A",
      time: "10:00 AM",
      msg: "你好，这是一条测试消息",
      chatType: 0,
      uid: "1001"
    },
    {
      id: 2,
      headImg: "test2.jpg",
      name: "用户B",
      time: "10:01 AM",
      msg: "收到，我正在吃饭",
      chatType: 0,
      uid: "1002"
    },
    {
      id: 3,
      headImg: "test3.jpg",
      name: "用户A",
      time: "10:02 AM",
      msg: "吃的什么饭？",
      chatType: 0,
      uid: "1001"
    },
    {
      id: 4,
      headImg: "test4.jpg",
      name: "用户B",
      time: "10:03 AM",
      msg: "蛋炒饭",
      chatType: 0,
      uid: "1002"
    },
    {
      id: 5,
      headImg: "test5.jpg",
      name: "用户A",
      time: "10:04 AM",
      msg: "test-image.png",
      chatType: 1,
      uid: "1001",
      extend: { imgType: 2 }
    }
  ];

  it("组件名称正确", () => {
    const wrapper = mount(MessageSearch);
    expect(wrapper.name()).toBe("MessageSearch");
  });

  it("渲染搜索输入框", () => {
    const wrapper = mount(MessageSearch);
    expect(wrapper.find(".search-input").exists()).toBe(true);
    expect(wrapper.find(".search-input").attributes("placeholder")).toBe("搜索历史消息...");
  });

  it("初始状态不显示清空按钮", () => {
    const wrapper = mount(MessageSearch);
    expect(wrapper.find(".clear-btn").exists()).toBe(false);
  });

  it("输入内容后显示清空按钮", async () => {
    const wrapper = mount(MessageSearch);
    const input = wrapper.find(".search-input");
    await input.setValue("测试");
    expect(wrapper.find(".clear-btn").exists()).toBe(true);
  });

  it("点击清空按钮清除搜索内容", async () => {
    const wrapper = mount(MessageSearch);
    const input = wrapper.find(".search-input");
    await input.setValue("测试");
    await wrapper.find(".clear-btn").trigger("click");
    expect(wrapper.vm.searchKeyword).toBe("");
  });

  it("清空搜索时触发事件", async () => {
    const wrapper = mount(MessageSearch);
    await wrapper.setData({ searchKeyword: "测试" });
    await wrapper.vm.clearSearch();
    expect(wrapper.emitted("searchResult")).toBeTruthy();
    expect(wrapper.emitted("searchResult")[0][0]).toEqual({
      messages: [],
      keyword: ""
    });
  });

  it("搜索功能 - 关键词匹配", async () => {
    const wrapper = mount(MessageSearch, {
      propsData: {
        messageList: mockMessages
      }
    });
    await wrapper.setData({ searchKeyword: "饭" });
    await wrapper.vm.performSearch();
    expect(wrapper.vm.filteredMessages.length).toBe(3);
  });

  it("搜索功能 - 无匹配结果", async () => {
    const wrapper = mount(MessageSearch, {
      propsData: {
        messageList: mockMessages
      }
    });
    await wrapper.setData({ searchKeyword: "不存在的关键词xyz" });
    await wrapper.vm.performSearch();
    expect(wrapper.vm.filteredMessages.length).toBe(0);
  });

  it("搜索功能 - 大小写不敏感", async () => {
    const wrapper = mount(MessageSearch, {
      propsData: {
        messageList: mockMessages
      }
    });
    await wrapper.setData({ searchKeyword: "TEST" });
    await wrapper.vm.performSearch();
    expect(wrapper.vm.filteredMessages.length).toBe(1);
    expect(wrapper.vm.filteredMessages[0].msg).toBe("你好，这是一条测试消息");
  });

  it("搜索功能 - 忽略图片类型消息", async () => {
    const wrapper = mount(MessageSearch, {
      propsData: {
        messageList: mockMessages
      }
    });
    await wrapper.setData({ searchKeyword: "png" });
    await wrapper.vm.performSearch();
    expect(wrapper.vm.filteredMessages.length).toBe(0);
  });

  it("防抖功能 - 300ms延迟", async () => {
    jest.useFakeTimers();
    const wrapper = mount(MessageSearch, {
      propsData: {
        messageList: mockMessages
      }
    });
    const input = wrapper.find(".search-input");
    await input.setValue("测试");
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);
    jest.useRealTimers();
  });

  it("显示搜索结果数量", async () => {
    const wrapper = mount(MessageSearch, {
      propsData: {
        messageList: mockMessages
      }
    });
    await wrapper.setData({ searchKeyword: "饭" });
    await wrapper.vm.performSearch();
    expect(wrapper.find(".search-results-info").text()).toBe("找到 3 条匹配消息");
  });

  it("显示无匹配结果提示", async () => {
    const wrapper = mount(MessageSearch, {
      propsData: {
        messageList: mockMessages
      }
    });
    await wrapper.setData({ searchKeyword: "不存在的关键词" });
    await wrapper.vm.performSearch();
    expect(wrapper.find(".search-results-info").text()).toBe("未找到匹配消息");
  });

  it("高亮关键词方法正常工作", () => {
    const wrapper = mount(MessageSearch);
    wrapper.setData({ searchKeyword: "测试" });
    const result = wrapper.vm.highlightKeyword("这是一条测试消息", "测试");
    expect(result).toContain("测试");
    expect(result).toContain('<mark class="highlight">');
  });

  it("转义特殊正则字符", () => {
    const wrapper = mount(MessageSearch);
    const result = wrapper.vm.escapeRegExp("测试(特殊)字符.*+");
    expect(result).toBe("测试\\(特殊\\)字符\\.\\*\\+");
  });

  it("空关键词时高亮返回原文", () => {
    const wrapper = mount(MessageSearch);
    wrapper.setData({ searchKeyword: "" });
    const result = wrapper.vm.highlightKeyword("这是一条测试消息", "");
    expect(result).toBe("这是一条测试消息");
  });

  it("props messageList 默认为空数组", () => {
    const wrapper = mount(MessageSearch);
    expect(wrapper.props("messageList")).toEqual([]);
  });
});
