let Mock = require('mockjs');
Mock.mock('/api/login', 'post', function (config) {
    let obj = JSON.parse(config.body);
    let user = obj.user;
    let pwd = obj.pwd;
    if (user === "admin" && pwd === "123456") {
        return {
            status: 200,
            message: "success",
            data: {
                user: "admin",
                pwd: "123456",
                token: "吴懈可击"
            }
        }
    } else {
        return {
            status: 200,
            message: "fail",
            data:{
                message:"用户或密码错误"
            }
        }
    }
})