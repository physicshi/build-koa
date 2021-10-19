const Koa = require('./koa');
const app = new Koa();
// 所有的异步逻辑都要变成 promise的形式
function sleep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('sleep');
            resolve();
        }, 2000);
    })
}
app.use(async (ctx, next) => {
    console.log(1);
    ctx.body = '1'
   await next(); // 在这里加了next  会等待后面的逻辑执行完毕  后面的执行完毕后
   console.log(2222);
    await  next();
    console.log(2)
    ctx.body = '2'
})
app.use(async (ctx, next) => {
    console.log(3);
    ctx.body = '3'
    await sleep()
    next();
    console.log(4)
    ctx.body = '4'
})
app.use((ctx, next) => {
    console.log(5);
    ctx.body = '5'
    console.log(6)
    ctx.body = '6';
})
app.use((ctx, next) => {
    console.log(5);
    ctx.body = '5'
    console.log(6)
    ctx.body = '6';
})

app.on('error', function(err) {
    console.log(err, 'my error');
})

// [fn,fn,fn]
app.listen(3000, function() {
    console.log('server start 3000')
})

// 1.koa 中可以去丰富ctx  2.而且内部提供了一个中间处理流程   3.提供了更好的错误处理