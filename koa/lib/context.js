const context = {};

function defineGetter(target, key) {
    context.__defineGetter__(key, function() { // defineProperty get方法
        return this[target][key]
    })
}
function defineSetter(target, key) {
    context.__defineSetter__(key, function(value) { // defineProperty get方法
       this[target][key] = value
    })
}
defineGetter('request', 'path')
defineGetter('request', 'url')
defineGetter('request', 'query')

defineGetter('response', 'body')
defineSetter('response', 'body')

// delegate -> 


// ctx.path == ctx.request.path


module.exports = context;