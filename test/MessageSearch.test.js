const assert = require('assert');

function testDebounceFunction() {
  let callCount = 0;
  let debounceTimer = null;
  
  function testSearch() {
    callCount++;
  }
  
  function handleSearch() {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      testSearch();
    }, 300);
  }
  
  handleSearch();
  handleSearch();
  handleSearch();
  
  return new Promise((resolve) => {
    setTimeout(() => {
      assert.strictEqual(callCount, 1, '防抖应该只调用一次');
      console.log('✓ 防抖功能测试通过');
      resolve();
    }, 500);
  });
}

function testFilterFunction() {
  const chatList = [
    { id: 1, msg: 'hello world', chatType: 0 },
    { id: 2, msg: 'hello vue', chatType: 0 },
    { id: 3, msg: 'test message', chatType: 0 },
    { id: 4, msg: '[emoji]', chatType: 1 },
  ];
  
  function filterList(searchKeyword) {
    if (!searchKeyword) {
      return chatList;
    }
    const keyword = searchKeyword.toLowerCase();
    return chatList.filter((item) => {
      if (item.chatType !== 0) return false;
      return item.msg.toLowerCase().includes(keyword);
    });
  }
  
  assert.strictEqual(filterList('').length, 4, '无关键词时返回全部');
  assert.strictEqual(filterList('hello').length, 2, '搜索hello应该返回2条');
  assert.strictEqual(filterList('test').length, 1, '搜索test应该返回1条');
  assert.strictEqual(filterList('notexist').length, 0, '搜索不存在的关键词返回0条');
  
  console.log('✓ 消息过滤功能测试通过');
}

function testHighlightFunction() {
  function highlightKeyword(text, searchKeyword) {
    if (!searchKeyword || typeof text !== 'string') {
      return text;
    }
    const keyword = searchKeyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<span class="highlight-keyword">$1</span>');
  }
  
  const result1 = highlightKeyword('hello world', 'hello');
  assert.strictEqual(result1, '<span class="highlight-keyword">hello</span> world', '关键词高亮不正确');
  
  const result2 = highlightKeyword('Hello HELLO hello', 'hello');
  assert.strictEqual(result2, '<span class="highlight-keyword">Hello</span> <span class="highlight-keyword">HELLO</span> <span class="highlight-keyword">hello</span>', '大小写不敏感高亮不正确');
  
  const result3 = highlightKeyword('test message', '');
  assert.strictEqual(result3, 'test message', '空关键词时不应该高亮');
  
  console.log('✓ 关键词高亮功能测试通过');
}

async function runTests() {
  console.log('开始测试消息搜索功能...\n');
  
  testFilterFunction();
  testHighlightFunction();
  await testDebounceFunction();
  
  console.log('\n✓ 所有测试通过！');
}

runTests();
