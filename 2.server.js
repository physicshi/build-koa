const Koa = require('./koa');
let app = new Koa(); 
// 1.每个应用创建的时候 使用的上下文应该是不同的
// 2.每次请求的上下文应该是一个独立的上下
// 默认情况下 node原生的req和res 功能弱，我们核心目的就是为了扩展原生的req和res

app.use((ctx) => { // ctx是koa自己封装的一个对象 内部包含了node中http模块中的原生req和res

    console.log(ctx.req.url);
    console.log(ctx.request.req.url); // 通过自己封装的request对象可以拿到原生的req对象

    console.log(ctx.request.query); // request 和 response 是koa中新封装的
    console.log(ctx.path); // 默认我们访问ctx.path 属性 会被代理到ctx.request.path

    // ctx.body = 'hello'
});



app.listen(3000, () => {
    console.log('server start 3000')
});