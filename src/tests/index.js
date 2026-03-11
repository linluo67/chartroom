/**
 * 群组聊天功能测试入口
 * 运行所有测试
 */

const { runGroupCardTests } = require('./components/GroupCard.test.js');
const { runCreateGroupDialogTests } = require('./components/CreateGroupDialog.test.js');
const { runGroupChatTests } = require('./views/groupChat.test.js');
const { runGroupMockTests } = require('./mock/groupMock.test.js');
const { runRouterTests } = require('./router/index.test.js');

function runAllTests() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║          群组聊天功能测试套件                               ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const results = [];

  // 运行组件测试
  results.push({ name: 'GroupCard', passed: runGroupCardTests() });
  results.push({ name: 'CreateGroupDialog', passed: runCreateGroupDialogTests() });

  // 运行页面测试
  results.push({ name: 'groupChat', passed: runGroupChatTests() });

  // 运行 Mock 数据测试
  results.push({ name: 'groupMock', passed: runGroupMockTests() });

  // 运行路由测试
  results.push({ name: 'router', passed: runRouterTests() });

  // 输出测试总结
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                      测试总结                               ║');
  console.log('╠════════════════════════════════════════════════════════════╣');

  let passedCount = 0;
  let failedCount = 0;

  results.forEach(result => {
    const status = result.passed ? '✅ 通过' : '❌ 失败';
    console.log(`║  ${result.name.padEnd(30)} ${status.padEnd(10)} ║`);
    if (result.passed) {
      passedCount++;
    } else {
      failedCount++;
    }
  });

  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log(`║  总计: ${results.length.toString().padEnd(3)} 通过: ${passedCount.toString().padEnd(3)} 失败: ${failedCount.toString().padEnd(3)}          ║`);
  console.log('╚════════════════════════════════════════════════════════════╝');

  return failedCount === 0;
}

// 导出测试运行函数
module.exports = { runAllTests };

// 如果直接运行此文件
if (require.main === module) {
  const success = runAllTests();
  process.exit(success ? 0 : 1);
}
