const Koa = require('koa');
const app= new Koa();

// koa默认是洋葱模型 调用上一个next 会走下一个中间件函数
// 异步怎么做呢 koa中所有的异步操作都要基于promise
// koa内部会将所有的中间件进行组合操作  组合成了一个大的promise  只要从开头走到了结束就算完成了
// koa 中的中间件必须增加 await next() 或者return next()  否则异步逻辑可能出错
function sleep(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('sleep');
            resolve();
        }, 2000);
    })
}
// await 和 return 都会等待promise执行完毕，return后面的代码不会执行
app.use(async (ctx,next)=>{  // 1 3 (开始睡两秒)  2  显示2   5 6 4
    console.log(1);
    ctx.body = '1'
    return next(); // next表示执行下一个中间件
    console.log(2)
    ctx.body = '2'
})
app.use(async (ctx,next)=>{
    console.log(3);
    ctx.body = '3'
    await sleep()
    next(); // next表示执行下一个中间件
    console.log(4)
    ctx.body = '4'
})
app.use((ctx,next)=>{
    console.log(5);
    ctx.body = '5'
    next(); // next表示执行下一个中间件
    console.log(6)
    ctx.body = '6';
})

app.listen(3000,function(){
    console.log('server start 3000')
})

// 1 3 2 等 sleep 5 6 4