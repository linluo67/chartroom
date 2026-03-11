const Mock = require("mockjs");

Mock.mock(/friend\/friendList/, 'post', () => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    return friendList
})

Mock.mock(/friend\/chatMsg/, 'post', (config) => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    let params = JSON.parse(config.body)
    if (params.frinedId == "1002")
        return chatMsg1002
    if (params.frinedId == "1003")
        return chatMsg1003
    if (params.frinedId == "1004")
        return chatMsg1004
})

Mock.mock(/group\/groupList/, 'post', () => {
    return groupList
})

Mock.mock(/group\/chatMsg/, 'post', (config) => {
    let params = JSON.parse(config.body)
    if (params.groupId == "group_001")
        return groupChatMsg001
    if (params.groupId == "group_002")
        return groupChatMsg002
    if (params.groupId == "group_003")
        return groupChatMsg003
    if (params.groupId == "group_004")
        return groupChatMsg004
    return []
})


let friendList = Mock.mock(
    [
        {
            img: "",
            name: "大毛",
            detail: "我是大毛",
            lastMsg: "to do",
            id: "1002",
            headImg: require("@/assets/img/head_portrait1.jpg"),

        },
        {
            img: "",
            name: "小毛",
            detail: "我是小毛",
            lastMsg: "dada dw ertgthy j uy",
            id: "1003",
            headImg: require("@/assets/img/head_portrait2.jpg"),

        },
        {
            img: "",
            name: "小王",
            detail: "我是小王",
            lastMsg: "大萨达萨达所大大萨达",
            id: "1004",
            headImg: require("@/assets/img/head_portrait3.jpg"),

        },
    ]
)

let chatMsg1002 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: " 在吗？",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },

        {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "大毛",
            time: "09：12 AM",
            msg: " 怎么了？",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "问你个问题",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "大毛",
            time: "09：12 AM",
            msg: "别问",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
    ]
)
let chatMsg1003 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "在干嘛呢",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: "吃饭",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "吃的什么饭",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: "蛋炒饭",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "加蛋了吗？",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: "你说呢",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1002", //uid
        },
    ]
)
let chatMsg1004 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: " sadasdawdas sadsad sad sad as despite ofhaving so much to do",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: "09：12 AM",
            msg: " 21312大萨达萨达",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "111212",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: "09：12 AM",
            msg: "大萨达萨达所大大萨达",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
    ]
)

let groupChatMsg001 = Mock.mock([
    {
        headImg: require("@/assets/img/head_portrait1.jpg"),
        name: "小明",
        time: "10:30 AM",
        msg: "Vue3 的 Composition API 真的很好用！",
        chatType: 0,
        uid: "1005",
    },
    {
        headImg: require("@/assets/img/head_portrait2.jpg"),
        name: "小毛",
        time: "10:32 AM",
        msg: "确实，比 Options API 灵活多了",
        chatType: 0,
        uid: "1003",
    },
    {
        headImg: require("@/assets/img/head_portrait3.jpg"),
        name: "小王",
        time: "10:35 AM",
        msg: "有人用过 Pinia 吗？",
        chatType: 0,
        uid: "1004",
    },
])

let groupChatMsg002 = Mock.mock([
    {
        headImg: require("@/assets/img/head_portrait2.jpg"),
        name: "小李",
        time: "09:00 AM",
        msg: "新的 UI 设计稿已经上传了",
        chatType: 0,
        uid: "1006",
    },
    {
        headImg: require("@/assets/img/head_portrait.jpg"),
        name: "大毛是小白",
        time: "09:15 AM",
        msg: "看到了，颜色搭配很不错",
        chatType: 0,
        uid: "1001",
    },
])

let groupChatMsg003 = Mock.mock([
    {
        headImg: require("@/assets/img/head_portrait3.jpg"),
        name: "HR",
        time: "08:00 AM",
        msg: "本周五下午3点会议室集合",
        chatType: 0,
        uid: "1007",
    },
    {
        headImg: require("@/assets/img/head_portrait1.jpg"),
        name: "小明",
        time: "08:30 AM",
        msg: "收到！",
        chatType: 0,
        uid: "1005",
    },
    {
        headImg: require("@/assets/img/head_portrait2.jpg"),
        name: "小毛",
        time: "08:35 AM",
        msg: "好的，准时到",
        chatType: 0,
        uid: "1003",
    },
])

let groupChatMsg004 = Mock.mock([
    {
        headImg: require("@/assets/img/head_portrait.jpg"),
        name: "张三",
        time: "14:00 PM",
        msg: "下期的主题是大模型应用",
        chatType: 0,
        uid: "1008",
    },
    {
        headImg: require("@/assets/img/head_portrait1.jpg"),
        name: "小明",
        time: "14:30 PM",
        msg: "期待！",
        chatType: 0,
        uid: "1005",
    },
])

let groupList = Mock.mock(
    [
        {
            id: "group_001",
            name: "前端开发交流群",
            headImg: require("@/assets/img/head_portrait1.jpg"),
            lastMsg: "小王：有人用过 Pinia 吗？",
            memberCount: 128,
            description: "前端技术交流，分享学习心得",
            createTime: "2024-01-15"
        },
        {
            id: "group_002",
            name: "产品设计讨论组",
            headImg: require("@/assets/img/head_portrait2.jpg"),
            lastMsg: "大毛是小白：看到了，颜色搭配很不错",
            memberCount: 45,
            description: "产品设计相关讨论",
            createTime: "2024-02-20"
        },
        {
            id: "group_003",
            name: "公司团建活动群",
            headImg: require("@/assets/img/head_portrait3.jpg"),
            lastMsg: "小毛：好的，准时到",
            memberCount: 256,
            description: "团建活动通知和讨论",
            createTime: "2024-03-01"
        },
        {
            id: "group_004",
            name: "技术分享会",
            headImg: require("@/assets/img/head_portrait.jpg"),
            lastMsg: "小明：期待！",
            memberCount: 89,
            description: "定期技术分享交流",
            createTime: "2024-03-10"
        },
    ]
)