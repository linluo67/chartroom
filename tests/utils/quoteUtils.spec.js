describe('引用消息工具函数测试', () => {
  describe('消息内容摘要生成', () => {
    const getContentSummary = (message) => {
      if (message.chatType === 0) {
        return message.msg;
      } else if (message.chatType === 1) {
        return '[图片]';
      } else if (message.chatType === 2) {
        return message.msg ? message.msg.name || '[文件]' : '[文件]';
      }
      return '[消息]';
    };

    it('文字消息返回原文本', () => {
      const msg = { chatType: 0, msg: '你好，这是一条测试消息' };
      expect(getContentSummary(msg)).toBe('你好，这是一条测试消息');
    });

    it('图片消息返回 [图片]', () => {
      const msg = { chatType: 1, msg: 'image.png' };
      expect(getContentSummary(msg)).toBe('[图片]');
    });

    it('文件消息返回文件名', () => {
      const msg = { chatType: 2, msg: { name: 'document.pdf' } };
      expect(getContentSummary(msg)).toBe('document.pdf');
    });

    it('文件消息无文件名时返回 [文件]', () => {
      const msg = { chatType: 2, msg: null };
      expect(getContentSummary(msg)).toBe('[文件]');
    });

    it('未知消息类型返回 [消息]', () => {
      const msg = { chatType: 99, msg: 'unknown' };
      expect(getContentSummary(msg)).toBe('[消息]');
    });
  });

  describe('引用数据结构验证', () => {
    const createQuoteData = (message) => {
      return {
        msgId: message.id,
        senderName: message.name,
        contentSummary: message.msg,
        msgType: message.chatType
      };
    };

    it('正确创建引用数据对象', () => {
      const message = {
        id: 'msg_001',
        name: '测试用户',
        msg: '测试内容',
        chatType: 0
      };
      const quoteData = createQuoteData(message);
      
      expect(quoteData).toHaveProperty('msgId', 'msg_001');
      expect(quoteData).toHaveProperty('senderName', '测试用户');
      expect(quoteData).toHaveProperty('contentSummary', '测试内容');
      expect(quoteData).toHaveProperty('msgType', 0);
    });
  });

  describe('消息 ID 生成', () => {
    const generateMessageId = (counter) => {
      return 'msg_' + Date.now() + '_' + counter;
    };

    it('生成的 ID 包含正确前缀', () => {
      const id = generateMessageId(1);
      expect(id.startsWith('msg_')).toBe(true);
    });

    it('不同计数器生成不同 ID', () => {
      const id1 = generateMessageId(1);
      const id2 = generateMessageId(2);
      expect(id1).not.toBe(id2);
    });
  });
});
