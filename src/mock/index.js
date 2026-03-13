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
            id: "msg_1002_1",
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: " 在吗？",
            chatType: 0,
            uid: "1001",
        },

        {
            id: "msg_1002_2",
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "大毛",
            time: "09：12 AM",
            msg: " 怎么了？",
            chatType: 0,
            uid: "1002",
        },
        {
            id: "msg_1002_3",
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "问你个问题",
            chatType: 0,
            uid: "1001",
        },
        {
            id: "msg_1002_4",
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "大毛",
            time: "09：12 AM",
            msg: "别问",
            chatType: 0,
            uid: "1002",
        },
        {
            id: "msg_1002_5",
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1,
            extend: {
                imgType: 1,
            },
            uid: "1001",
        },
    ]
)
let chatMsg1003 = Mock.mock(
    [
        {
            id: "msg_1003_1",
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "在干嘛呢",
            chatType: 0,
            uid: "1001",
        },
        {
            id: "msg_1003_2",
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1,
            extend: {
                imgType: 1,
            },
            uid: "1001",
        },
        {
            id: "msg_1003_3",
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: "吃饭",
            chatType: 0,
            uid: "1002",
        },
        {
            id: "msg_1003_4",
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "吃的什么饭",
            chatType: 0,
            uid: "1001",
        },
        {
            id: "msg_1003_5",
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: "蛋炒饭",
            chatType: 0,
            uid: "1002",
        },
        {
            id: "msg_1003_6",
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "加蛋了吗？",
            chatType: 0,
            uid: "1001",
        },
        {
            id: "msg_1003_7",
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: "你说呢",
            chatType: 0,
            uid: "1002",
        },
        {
            id: "msg_1003_8",
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1,
            extend: {
                imgType: 1,
            },
            uid: "1002",
        },
    ]
)
let chatMsg1004 = Mock.mock(
    [
        {
            id: "msg_1004_1",
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: " sadasdawdas sadsad sad sad as despite ofhaving so much to do",
            chatType: 0,
            uid: "1001",
        },
        {
            id: "msg_1004_2",
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1,
            extend: {
                imgType: 1,
            },
            uid: "1001",
        },
        {
            id: "msg_1004_3",
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: "09：12 AM",
            msg: " 21312大萨达萨达",
            chatType: 0,
            uid: "1002",
        },
        {
            id: "msg_1004_4",
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "111212",
            chatType: 0,
            uid: "1001",
        },
        {
            id: "msg_1004_5",
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: "09：12 AM",
            msg: "大萨达萨达所大大萨达",
            chatType: 0,
            uid: "1002",
        },
    ]
)
