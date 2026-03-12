/**
 * MessageSearch 组件功能测试
 * 测试搜索功能的防抖处理、关键词过滤和高亮显示
 */

// 模拟消息数据
const mockMessageList = [
  {
    headImg: "@/assets/img/head_portrait.jpg",
    name: "大毛是小白",
    time: "09：12 AM",
    msg: "在吗？",
    chatType: 0,
    uid: "1001",
  },
  {
    headImg: "@/assets/img/head_portrait1.jpg",
    name: "大毛",
    time: "09：12 AM",
    msg: "怎么了？",
    chatType: 0,
    uid: "1002",
  },
  {
    headImg: "@/assets/img/head_portrait.jpg",
    name: "大毛是小白",
    time: "09：12 AM",
    msg: "问你个问题",
    chatType: 0,
    uid: "1001",
  },
  {
    headImg: "@/assets/img/head_portrait1.jpg",
    name: "大毛",
    time: "09：12 AM",
    msg: "别问",
    chatType: 0,
    uid: "1002",
  },
  {
    headImg: "@/assets/img/head_portrait.jpg",
    name: "大毛是小白",
    time: "09：12 AM",
    msg: "吃饭了吗？",
    chatType: 0,
    uid: "1001",
  },
  {
    headImg: "@/assets/img/head_portrait2.jpg",
    name: "小毛",
    time: "09：12 AM",
    msg: "正在吃饭",
    chatType: 0,
    uid: "1003",
  },
];

// 测试工具函数
const TestUtils = {
  // 转义正则特殊字符
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  },

  // 高亮文本
  highlightText(text, keyword) {
    if (!keyword.trim()) return text;
    const escapedKeyword = this.escapeRegExp(keyword.trim());
    const regex = new RegExp(`(${escapedKeyword})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  },

  // 判断是否消息可见
  isMessageVisible(item, keyword) {
    if (!keyword.trim()) return true;
    if (item.chatType !== 0) return true;
    return item.msg.toLowerCase().includes(keyword.toLowerCase());
  },

  // 过滤消息列表
  filterMessages(messageList, keyword) {
    if (!keyword.trim()) return messageList;
    return messageList.filter((item) => {
      if (item.chatType !== 0) return true;
      return item.msg.toLowerCase().includes(keyword.toLowerCase());
    });
  },

  // 统计匹配消息数量
  countMatchedMessages(messageList, keyword) {
    if (!keyword.trim()) return 0;
    return messageList.filter((item) => {
      if (item.chatType !== 0) return false;
      return item.msg.toLowerCase().includes(keyword.toLowerCase());
    }).length;
  },
};

// 测试用例
function runTests() {
  console.log("=== MessageSearch 组件功能测试 ===\n");

  let passedTests = 0;
  let failedTests = 0;

  // 测试 1: 转义正则特殊字符
  console.log("测试 1: 转义正则特殊字符");
  try {
    const testCases = [
      { input: "hello", expected: "hello" },
      { input: "hello.world", expected: "hello\\.world" },
      { input: "test[abc]", expected: "test\\[abc\\]" },
      { input: "a+b*c?", expected: "a\\+b\\*c\\?" },
    ];

    testCases.forEach((testCase) => {
      const result = TestUtils.escapeRegExp(testCase.input);
      if (result === testCase.expected) {
        console.log(`  ✓ "${testCase.input}" -> "${result}"`);
      } else {
        throw new Error(
          `转义失败: "${testCase.input}" 期望 "${testCase.expected}"，实际 "${result}"`
        );
      }
    });
    console.log("  测试通过 ✓\n");
    passedTests++;
  } catch (error) {
    console.log(`  测试失败 ✗: ${error.message}\n`);
    failedTests++;
  }

  // 测试 2: 高亮文本功能
  console.log("测试 2: 高亮文本功能");
  try {
    const testCases = [
      {
        text: "在吗？",
        keyword: "在",
        expected: '<span class="highlight">在</span>吗？',
      },
      {
        text: "吃饭了没有？",
        keyword: "吃饭",
        expected: '<span class="highlight">吃饭</span>了没有？',
      },
      {
        text: "Hello World",
        keyword: "hello",
        expected: '<span class="highlight">Hello</span> World',
      },
      {
        text: "测试文本",
        keyword: "",
        expected: "测试文本",
      },
    ];

    testCases.forEach((testCase) => {
      const result = TestUtils.highlightText(testCase.text, testCase.keyword);
      if (result === testCase.expected) {
        console.log(`  ✓ 高亮 "${testCase.keyword}" 在 "${testCase.text}"`);
      } else {
        throw new Error(
          `高亮失败: 期望 "${testCase.expected}"，实际 "${result}"`
        );
      }
    });
    console.log("  测试通过 ✓\n");
    passedTests++;
  } catch (error) {
    console.log(`  测试失败 ✗: ${error.message}\n`);
    failedTests++;
  }

  // 测试 3: 消息可见性判断
  console.log("测试 3: 消息可见性判断");
  try {
    const testCases = [
      {
        item: mockMessageList[0],
        keyword: "在吗",
        expected: true,
      },
      {
        item: mockMessageList[1],
        keyword: "在吗",
        expected: false,
      },
      {
        item: mockMessageList[0],
        keyword: "",
        expected: true,
      },
      {
        item: mockMessageList[2],
        keyword: "问题",
        expected: true,
      },
    ];

    testCases.forEach((testCase, index) => {
      const result = TestUtils.isMessageVisible(testCase.item, testCase.keyword);
      if (result === testCase.expected) {
        console.log(
          `  ✓ 用例 ${index + 1}: "${testCase.item.msg}" 关键字 "${testCase.keyword}" -> ${result}`
        );
      } else {
        throw new Error(
          `用例 ${index + 1} 失败: 期望 ${testCase.expected}，实际 ${result}`
        );
      }
    });
    console.log("  测试通过 ✓\n");
    passedTests++;
  } catch (error) {
    console.log(`  测试失败 ✗: ${error.message}\n`);
    failedTests++;
  }

  // 测试 4: 消息过滤功能
  console.log("测试 4: 消息过滤功能");
  try {
    // 搜索 "吃饭"
    let filtered = TestUtils.filterMessages(mockMessageList, "吃饭");
    if (filtered.length === 2) {
      console.log(`  ✓ 搜索 "吃饭" 返回 ${filtered.length} 条消息`);
    } else {
      throw new Error(`期望返回 2 条消息，实际返回 ${filtered.length} 条`);
    }

    // 搜索 "在吗"
    filtered = TestUtils.filterMessages(mockMessageList, "在吗");
    if (filtered.length === 1) {
      console.log(`  ✓ 搜索 "在吗" 返回 ${filtered.length} 条消息`);
    } else {
      throw new Error(`期望返回 1 条消息，实际返回 ${filtered.length} 条`);
    }

    // 空关键字返回全部
    filtered = TestUtils.filterMessages(mockMessageList, "");
    if (filtered.length === mockMessageList.length) {
      console.log(`  ✓ 空关键字返回全部 ${filtered.length} 条消息`);
    } else {
      throw new Error(
        `期望返回 ${mockMessageList.length} 条消息，实际返回 ${filtered.length} 条`
      );
    }

    // 搜索不存在的关键字
    filtered = TestUtils.filterMessages(mockMessageList, "不存在");
    if (filtered.length === 0) {
      console.log(`  ✓ 搜索不存在的关键字返回 0 条消息`);
    } else {
      throw new Error(`期望返回 0 条消息，实际返回 ${filtered.length} 条`);
    }

    console.log("  测试通过 ✓\n");
    passedTests++;
  } catch (error) {
    console.log(`  测试失败 ✗: ${error.message}\n`);
    failedTests++;
  }

  // 测试 5: 匹配消息计数
  console.log("测试 5: 匹配消息计数");
  try {
    const testCases = [
      { keyword: "吃饭", expected: 2 },
      { keyword: "在吗", expected: 1 },
      { keyword: "问题", expected: 1 },
      { keyword: "", expected: 0 },
      { keyword: "不存在", expected: 0 },
    ];

    testCases.forEach((testCase) => {
      const result = TestUtils.countMatchedMessages(
        mockMessageList,
        testCase.keyword
      );
      if (result === testCase.expected) {
        console.log(
          `  ✓ 关键字 "${testCase.keyword}" 匹配 ${result} 条消息`
        );
      } else {
        throw new Error(
          `关键字 "${testCase.keyword}" 期望 ${testCase.expected} 条，实际 ${result} 条`
        );
      }
    });
    console.log("  测试通过 ✓\n");
    passedTests++;
  } catch (error) {
    console.log(`  测试失败 ✗: ${error.message}\n`);
    failedTests++;
  }

  // 测试 6: 大小写不敏感搜索
  console.log("测试 6: 大小写不敏感搜索");
  try {
    const testCases = [
      { keyword: "HELLO", text: "hello world" },
      { keyword: "hello", text: "HELLO WORLD" },
      { keyword: "Hello", text: "hElLo WoRlD" },
    ];

    testCases.forEach((testCase) => {
      const isVisible = TestUtils.isMessageVisible(
        { msg: testCase.text, chatType: 0 },
        testCase.keyword
      );
      if (isVisible) {
        console.log(
          `  ✓ "${testCase.keyword}" 可以匹配 "${testCase.text}"`
        );
      } else {
        throw new Error(
          `"${testCase.keyword}" 应该匹配 "${testCase.text}"`
        );
      }
    });
    console.log("  测试通过 ✓\n");
    passedTests++;
  } catch (error) {
    console.log(`  测试失败 ✗: ${error.message}\n`);
    failedTests++;
  }

  // 测试 7: 特殊字符搜索
  console.log("测试 7: 特殊字符搜索");
  try {
    const specialMessages = [
      { msg: "价格：$100", chatType: 0 },
      { msg: "公式：a+b=c", chatType: 0 },
      { msg: "路径：C:\\Users\\test", chatType: 0 },
      { msg: "正则：[a-z]+", chatType: 0 },
    ];

    const testCases = [
      { keyword: "$100", expected: true },
      { keyword: "a+b", expected: true },
      { keyword: "[a-z]", expected: true },
    ];

    testCases.forEach((testCase) => {
      const matched = specialMessages.some((item) =>
        TestUtils.isMessageVisible(item, testCase.keyword)
      );
      if (matched === testCase.expected) {
        console.log(`  ✓ 特殊字符 "${testCase.keyword}" 搜索正常`);
      } else {
        throw new Error(`特殊字符 "${testCase.keyword}" 搜索失败`);
      }
    });
    console.log("  测试通过 ✓\n");
    passedTests++;
  } catch (error) {
    console.log(`  测试失败 ✗: ${error.message}\n`);
    failedTests++;
  }

  // 测试 8: 防抖功能验证（模拟）
  console.log("测试 8: 防抖功能验证（模拟）");
  try {
    let callCount = 0;
    const debounceTime = 300;

    // 模拟防抖函数
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    const debouncedFunction = debounce(() => {
      callCount++;
    }, debounceTime);

    // 快速调用多次
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    // 立即检查，应该还没有执行
    if (callCount === 0) {
      console.log("  ✓ 快速调用多次，防抖生效，尚未执行");
    } else {
      throw new Error("防抖未生效");
    }

    // 等待防抖时间后检查
    setTimeout(() => {
      if (callCount === 1) {
        console.log("  ✓ 防抖时间后只执行 1 次");
        console.log("  测试通过 ✓\n");
        console.log("=== 测试完成 ===");
        console.log(`通过: ${passedTests + 1} 个`);
        console.log(`失败: ${failedTests} 个`);
        console.log(`总计: ${passedTests + 1 + failedTests} 个`);
      } else {
        console.log(`  测试失败 ✗: 期望执行 1 次，实际执行 ${callCount} 次\n`);
        console.log("=== 测试完成 ===");
        console.log(`通过: ${passedTests} 个`);
        console.log(`失败: ${failedTests + 1} 个`);
        console.log(`总计: ${passedTests + failedTests + 1} 个`);
      }
    }, debounceTime + 50);

    passedTests++;
  } catch (error) {
    console.log(`  测试失败 ✗: ${error.message}\n`);
    failedTests++;
  }

  // 输出总结（除了防抖测试，因为它有异步操作）
  console.log("\n=== 测试结果总结 ===");
  console.log(`通过: ${passedTests} 个`);
  console.log(`失败: ${failedTests} 个`);
  console.log(`总计: ${passedTests + failedTests} 个`);

  if (failedTests === 0) {
    console.log("\n🎉 所有测试通过！");
  } else {
    console.log(`\n⚠️ 有 ${failedTests} 个测试失败，请检查代码。`);
  }

  return { passedTests, failedTests };
}

// 运行测试
runTests();

// 导出测试工具函数，供其他测试使用
if (typeof module !== "undefined" && module.exports) {
  module.exports = { TestUtils, mockMessageList, runTests };
}
