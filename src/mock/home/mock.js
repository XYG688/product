let Mock = require("mockjs");
let data = [{
        id: 0,
        name: "吴湖四海",
        text: "无懈可击"
    },
    {
        id: 1,
        name: "wu",
        text: "无懈可击"
    },
    {
        id: 2,
        name: "吴2",
        text: "无懈可击"
    },
    {
        id: 3,
        name: "吴",
        text: "无懈可击"
    },
    {
        id: 4,
        name: "吴谢可击",
        text: "无懈可击"
    }
]
// 获取
Mock.mock("/api/homeindex", "get", function (config) {
    console.log(config)
    return data
})
// 删除
Mock.mock(/\/api\/homeindex\/\d/, "delete", function (config) {
    console.log(config)
    let arr = config.url.split("/")
    let id = arr.pop()
    data.splice(id, 1);
    // 解决数据凹陷
    data = data.map(function(item,id){
        return {
            id,
            name:item.name,
            text:item.text
        }
    })
    // data.forEach(function (item, index) {
    //     item.id = index
    // })
    return data
})
//修改
Mock.mock(/\/api\/homeindex\/edit\/\d/, "put", function (config) {
    console.log(config)
    let arr = config.url.split("/")
    let id = arr.pop();
    let canshu = config.body;
    canshu = JSON.parse(canshu);
    data[id].name = canshu.name;
    data[id].text = canshu.text
    return data
})
// 添加
Mock.mock("/api/homeindex", "post", function (config) {
    let obj = JSON.parse(config.body)
    let name = obj.name;
    let text = obj.text;
    data.push({
        id: data.length,
        name,
        text
    })
    return data;
})