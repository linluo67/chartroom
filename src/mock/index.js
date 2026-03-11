const Mock = require("mockjs");

Mock.mock(/friend\/friendList/, 'post', () => {
    return friendList
})

Mock.mock(/friend\/chatMsg/, 'post', (config) => {
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

Mock.mock(/group\/groupMsg/, 'post', (config) => {
    let params = JSON.parse(config.body)
    if (params.groupId == "2001")
        return groupMsg2001
    if (params.groupId == "2002")
        return groupMsg2002
    if (params.groupId == "2003")
        return groupMsg2003
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

let groupList = Mock.mock(
    [
        {
            id: "2001",
            name: "前端开发交流群",
            memberCount: 15,
            lastMsg: "今天的需求讨论得怎么样了？",
            headImg: require("@/assets/img/head_portrait.jpg"),
            members: [
                { id: "1001", name: "大毛是小白", headImg: require("@/assets/img/head_portrait.jpg") },
                { id: "1002", name: "大毛", headImg: require("@/assets/img/head_portrait1.jpg") },
                { id: "1003", name: "小毛", headImg: require("@/assets/img/head_portrait2.jpg") },
                { id: "1004", name: "小王", headImg: require("@/assets/img/head_portrait3.jpg") }
            ]
        },
        {
            id: "2002",
            name: "周末活动群",
            memberCount: 8,
            lastMsg: "周六下午三点老地方集合！",
            headImg: require("@/assets/img/head_portrait1.jpg"),
            members: [
                { id: "1001", name: "大毛是小白", headImg: require("@/assets/img/head_portrait.jpg") },
                { id: "1002", name: "大毛", headImg: require("@/assets/img/head_portrait1.jpg") },
                { id: "1003", name: "小毛", headImg: require("@/assets/img/head_portrait2.jpg") }
            ]
        },
        {
            id: "2003",
            name: "项目讨论组",
            memberCount: 5,
            lastMsg: "文档已经更新，大家看一下",
            headImg: require("@/assets/img/head_portrait2.jpg"),
            members: [
                { id: "1001", name: "大毛是小白", headImg: require("@/assets/img/head_portrait.jpg") },
                { id: "1002", name: "大毛", headImg: require("@/assets/img/head_portrait1.jpg") },
                { id: "1004", name: "小王", headImg: require("@/assets/img/head_portrait3.jpg") }
            ]
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
            chatType: 0,
            uid: "1002",
        },
    ]
)

let groupMsg2001 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "大毛",
            time: "09：30 AM",
            msg: "大家好，今天的需求讨论得怎么样了？",
            chatType: 0,
            uid: "1002",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：32 AM",
            msg: "我这边已经完成了UI设计稿",
            chatType: 0,
            uid: "1003",
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：35 AM",
            msg: "好的，我来看一下",
            chatType: 0,
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: "09：40 AM",
            msg: "后端接口文档也更新了",
            chatType: 0,
            uid: "1004",
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：45 AM",
            msg: "收到，大家辛苦了！",
            chatType: 0,
            uid: "1001",
        },
    ]
)

let groupMsg2002 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "大毛",
            time: "02：00 PM",
            msg: "周末有什么活动安排吗？",
            chatType: 0,
            uid: "1002",
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "02：05 PM",
            msg: "可以一起去爬山",
            chatType: 0,
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "02：10 PM",
            msg: "好主意！周六下午三点老地方集合！",
            chatType: 0,
            uid: "1003",
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "02：15 PM",
            msg: "没问题，我带水和零食",
            chatType: 0,
            uid: "1001",
        },
    ]
)

let groupMsg2003 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "大毛",
            time: "10：00 AM",
            msg: "项目进度怎么样了？",
            chatType: 0,
            uid: "1002",
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "10：05 AM",
            msg: "前端部分已经完成80%了",
            chatType: 0,
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: "10：10 AM",
            msg: "文档已经更新，大家看一下",
            chatType: 0,
            uid: "1004",
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "10：15 AM",
            msg: "好的，马上看",
            chatType: 0,
            uid: "1001",
        },
    ]
)