const Koa = require("./koa");
let app = new Koa(); // 创建一个应用

app.use((ctx) => {
  // 用户请求发送的时候会执行此回调方法  (req 客户端的信息,res 服务端的响应对象)
  ctx.body = "hello world";
});

app.listen(3000, () => {
  console.log("server start 3000");
});

// nodemon可以监控文件的变化 文件变化后可以自动重启服务
// npm install nodemon -g
// nodemon 1.server.js

// koa 默认就是对我们的node原生的http服务进行了封装
// application.js 整个的应用
// context.js 代表的是上下文
// request.js 用于扩展请求的
// response.js 用于扩展响应的
