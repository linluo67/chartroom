const Mock = require("mockjs");

Mock.mock(/friend\/friendList/, 'post', () => {
    return friendList
})

Mock.mock(/group\/groupList/, 'post', () => {
    return groupList
})

Mock.mock(/group\/create/, 'post', () => {
    return { code: 200, message: '创建成功' }
})

Mock.mock(/friend\/chatMsg/, 'post', (config) => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    let params = JSON.parse(config.body)
    if (params.frinedId == "1002")
        return chatMsg1002
    if (params.frinedId == "1003")
        return chatMsg1003
    if (params.frinedId == "1004")
        return chatMsg1004
    if (params.frinedId == "2001")
        return chatMsg2001
    if (params.frinedId == "2002")
        return chatMsg2002
    if (params.frinedId == "2003")
        return chatMsg2003
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
            chatType: 0,
            uid: "1002",
        },
    ]
)

let chatMsg2001 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "大毛",
            time: "10：00 AM",
            msg: "大家好，我是新来的大毛！",
            chatType: 0,
            uid: "1002",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "10：05 AM",
            msg: "欢迎大毛加入前端开发交流群！",
            chatType: 0,
            uid: "1003",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: "10：10 AM",
            msg: "大家周末有时间一起聚餐吗？",
            chatType: 0,
            uid: "1004",
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "群主",
            time: "10：15 AM",
            msg: "周末聚餐可以定在周六晚上，大家觉得怎么样？",
            chatType: 0,
            uid: "1001",
        },
    ]
)
let chatMsg2002 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "产品经理",
            time: "02：00 PM",
            msg: "明天下午3点开需求评审会议",
            chatType: 0,
            uid: "1002",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "前端开发",
            time: "02：05 PM",
            msg: "收到",
            chatType: 0,
            uid: "1003",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "后端开发",
            time: "02：10 PM",
            msg: "好的，准时参加",
            chatType: 0,
            uid: "1004",
        },
    ]
)
let chatMsg2003 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "健身教练",
            time: "08：00 AM",
            msg: "今天的运动计划完成了吗？",
            chatType: 0,
            uid: "1002",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "会员小明",
            time: "08：30 AM",
            msg: "已经完成5公里跑步啦！",
            chatType: 0,
            uid: "1003",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "会员小红",
            time: "09：00 AM",
            msg: "刚做完瑜伽，感觉很棒！",
            chatType: 0,
            uid: "1004",
        },
    ]
)

let groupList = Mock.mock(
    [
        {
            name: "前端开发交流群",
            lastMsg: "周末聚餐可以定在周六晚上，大家觉得怎么样？",
            id: "2001",
            headImg: require("@/assets/img/head_portrait.jpg"),
            memberCount: 15
        },
        {
            name: "项目讨论组",
            lastMsg: "好的，准时参加",
            id: "2002",
            headImg: require("@/assets/img/head_portrait1.jpg"),
            memberCount: 8
        },
        {
            name: "健身打卡群",
            lastMsg: "刚做完瑜伽，感觉很棒！",
            id: "2003",
            headImg: require("@/assets/img/head_portrait2.jpg"),
            memberCount: 22
        },
    ]
)