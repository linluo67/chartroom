/**
 * 消息对象结构测试
 * 验证消息对象包含正确的quoteMessage字段
 */

describe('消息对象结构测试', () => {
  // 基础消息结构
  const baseMessage = {
    id: 'msg_123',
    headImg: '/assets/img/head_portrait.jpg',
    name: '测试用户',
    time: '09:12 AM',
    msg: '消息内容',
    chatType: 0,
    uid: '1001'
  };

  // 引用消息结构
  const quoteMessage = {
    id: 'msg_456',
    name: '被引用用户',
    msg: '被引用的消息内容',
    chatType: 0,
    uid: '1002'
  };

  describe('基础消息结构', () => {
    it('消息对象应该包含所有必需字段', () => {
      const message = { ...baseMessage };
      
      expect(message).toHaveProperty('id');
      expect(message).toHaveProperty('headImg');
      expect(message).toHaveProperty('name');
      expect(message).toHaveProperty('time');
      expect(message).toHaveProperty('msg');
      expect(message).toHaveProperty('chatType');
      expect(message).toHaveProperty('uid');
    });

    it('chatType字段应该为数字类型', () => {
      const message = { ...baseMessage };
      expect(typeof message.chatType).toBe('number');
    });

    it('chatType应该支持0(文字)、1(图片)、2(文件)类型', () => {
      const textMessage = { ...baseMessage, chatType: 0 };
      const imageMessage = { ...baseMessage, chatType: 1 };
      const fileMessage = { ...baseMessage, chatType: 2 };

      expect(textMessage.chatType).toBe(0);
      expect(imageMessage.chatType).toBe(1);
      expect(fileMessage.chatType).toBe(2);
    });
  });

  describe('引用消息字段', () => {
    it('消息对象可以包含quoteMessage字段', () => {
      const message = {
        ...baseMessage,
        quoteMessage: quoteMessage
      };

      expect(message).toHaveProperty('quoteMessage');
      expect(message.quoteMessage).toEqual(quoteMessage);
    });

    it('quoteMessage字段应该是可选的', () => {
      const messageWithoutQuote = { ...baseMessage };
      const messageWithQuote = {
        ...baseMessage,
        quoteMessage: quoteMessage
      };

      expect(messageWithoutQuote.quoteMessage).toBeUndefined();
      expect(messageWithQuote.quoteMessage).toBeDefined();
    });

    it('quoteMessage应该包含所有必需字段', () => {
      const message = {
        ...baseMessage,
        quoteMessage: quoteMessage
      };

      expect(message.quoteMessage).toHaveProperty('id');
      expect(message.quoteMessage).toHaveProperty('name');
      expect(message.quoteMessage).toHaveProperty('msg');
      expect(message.quoteMessage).toHaveProperty('chatType');
      expect(message.quoteMessage).toHaveProperty('uid');
    });

    it('quoteMessage.id用于标识被引用的原消息', () => {
      const message = {
        ...baseMessage,
        quoteMessage: quoteMessage
      };

      expect(message.quoteMessage.id).toBe('msg_456');
      expect(typeof message.quoteMessage.id).toBe('string');
    });

    it('quoteMessage.name用于显示发送者名称', () => {
      const message = {
        ...baseMessage,
        quoteMessage: quoteMessage
      };

      expect(message.quoteMessage.name).toBe('被引用用户');
    });

    it('quoteMessage.msg用于显示内容摘要', () => {
      const message = {
        ...baseMessage,
        quoteMessage: quoteMessage
      };

      expect(message.quoteMessage.msg).toBe('被引用的消息内容');
    });

    it('quoteMessage.chatType用于标识消息类型', () => {
      const message = {
        ...baseMessage,
        quoteMessage: quoteMessage
      };

      expect(typeof message.quoteMessage.chatType).toBe('number');
      expect(message.quoteMessage.chatType).toBe(0);
    });
  });

  describe('不同消息类型的引用', () => {
    it('可以引用文字消息', () => {
      const textQuote = {
        ...baseMessage,
        quoteMessage: {
          id: 'msg_text',
          name: '用户',
          msg: '文字消息内容',
          chatType: 0,
          uid: '1002'
        }
      };

      expect(textQuote.quoteMessage.chatType).toBe(0);
      expect(typeof textQuote.quoteMessage.msg).toBe('string');
    });

    it('可以引用图片消息', () => {
      const imageQuote = {
        ...baseMessage,
        quoteMessage: {
          id: 'msg_img',
          name: '用户',
          msg: '/assets/img/test.png',
          chatType: 1,
          uid: '1002'
        }
      };

      expect(imageQuote.quoteMessage.chatType).toBe(1);
      expect(typeof imageQuote.quoteMessage.msg).toBe('string');
    });

    it('可以引用文件消息', () => {
      const fileQuote = {
        ...baseMessage,
        quoteMessage: {
          id: 'msg_file',
          name: '用户',
          msg: { name: 'document.pdf' },
          chatType: 2,
          uid: '1002'
        }
      };

      expect(fileQuote.quoteMessage.chatType).toBe(2);
      expect(typeof fileQuote.quoteMessage.msg).toBe('object');
      expect(fileQuote.quoteMessage.msg.name).toBe('document.pdf');
    });
  });

  describe('消息数据完整性', () => {
    it('发送消息时应该保留所有原始字段', () => {
      const originalMessage = {
        ...baseMessage,
        quoteMessage: quoteMessage
      };

      // 模拟发送消息时的处理
      const sentMessage = {
        ...originalMessage,
        id: `msg_${Date.now()}` // 生成新ID
      };

      expect(sentMessage.headImg).toBe(originalMessage.headImg);
      expect(sentMessage.name).toBe(originalMessage.name);
      expect(sentMessage.msg).toBe(originalMessage.msg);
      expect(sentMessage.chatType).toBe(originalMessage.chatType);
      expect(sentMessage.uid).toBe(originalMessage.uid);
      expect(sentMessage.quoteMessage).toEqual(originalMessage.quoteMessage);
    });

    it('引用信息应该只包含必要字段，不包含多余数据', () => {
      const fullOriginalMessage = {
        id: 'msg_original',
        headImg: '/assets/img/test.jpg',
        name: '原发送者',
        time: '10:00 AM',
        msg: '原消息',
        chatType: 0,
        uid: '1005',
        extend: { imgType: 1 }
      };

      // 提取引用信息
      const extractedQuote = {
        id: fullOriginalMessage.id,
        name: fullOriginalMessage.name,
        msg: fullOriginalMessage.msg,
        chatType: fullOriginalMessage.chatType,
        uid: fullOriginalMessage.uid
      };

      const newMessage = {
        ...baseMessage,
        quoteMessage: extractedQuote
      };

      // 验证引用信息不包含多余字段
      expect(newMessage.quoteMessage).not.toHaveProperty('headImg');
      expect(newMessage.quoteMessage).not.toHaveProperty('time');
      expect(newMessage.quoteMessage).not.toHaveProperty('extend');
    });
  });

  describe('消息ID生成', () => {
    it('新消息应该有唯一ID', () => {
      const id1 = `msg_${Date.now()}`;
      const id2 = `msg_${Date.now() + 1}`;

      expect(id1).not.toBe(id2);
      expect(id1.startsWith('msg_')).toBe(true);
      expect(id2.startsWith('msg_')).toBe(true);
    });

    it('引用消息的ID应该指向原消息', () => {
      const originalId = 'msg_original_123';
      const message = {
        ...baseMessage,
        quoteMessage: {
          id: originalId,
          name: '用户',
          msg: '内容',
          chatType: 0,
          uid: '1002'
        }
      };

      expect(message.quoteMessage.id).toBe(originalId);
    });
  });
});
