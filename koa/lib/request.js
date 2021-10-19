const url = require('url');
const request = {
    get url(){ // 这就是为什么在request身上加上一个req属性，为了在取值的时候可以快速获取到原生的req
        return this.req.url
    },
    get path(){
        let {pathname} = url.parse(this.req.url);// 不带查询参数的
        return pathname
    },
    get query(){
        let {pathname,query} = url.parse(this.req.url,true);// 不带查询参数的
        return query
    }
};

module.exports = request