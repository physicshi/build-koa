const http = require('http');
// 我们用户不能直接修改context,request,response
const context = require('./context');
const request = require('./request');
const response = require('./response');
const EventEmitter = require('events')
class Application extends EventEmitter {
    constructor() {
        super();
        // this.context.__proto__ = context
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);

        this.middlewares = [];
    }
    use(middleware) {
        this.middlewares.push(middleware)
    }
    createContext(req, res) {
        const ctx = Object.create(this.context);
        const request = Object.create(this.request);
        const response = Object.create(this.response);
        ctx.request = request; // 自己封装的
        ctx.request.req = ctx.req = req; // 原生的

        ctx.response = response; // 自己封装的
        ctx.response.res = ctx.res = res; // 原生的
        return ctx;
    }
    compose(ctx){
        let index = -1
        const dispatch = (i)=>{
            console.log('111111',i,index)
            if(i <= index){
                return Promise.reject('next() call multiples times')
            }
            index = i;
            if(this.middlewares.length == i) return Promise.resolve();
            let middleware = this.middlewares[i];
            try{
                return Promise.resolve(middleware(ctx,()=> dispatch(i+1))); // next函数 是()=> dispatch(i+1)
            }catch(e){
                return Promise.reject(e)
            }
        }
        return dispatch(0); // 我要执行第一个中间件

        // 将功能组合在依次执行
    }
    handleRequest = (req, res) => {
        // ...   req,res（原生的）   request和response(自己扩展)
        //  统一放到ctx上
        const ctx = this.createContext(req, res);
        res.statusCode = 404;
        this.compose(ctx).then(() => {
            // 等待ctx赋值后响应给用户
            let body = ctx.body;
            if (body) {
                res.end(body); // 返回最终的结果响应给用户
            } else {
                res.end('Not Found')
            }
        }).catch((e)=>{
            this.emit('error',e)
        })

    }
    listen() {
        // 默认不采用箭头函数回调中的this指向我们http创建的服务
        const server = http.createServer(this.handleRequest);
        server.listen(...arguments)
    }
}

module.exports = Application