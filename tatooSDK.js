(function (a) {
    var u = navigator.userAgent;
    var tatoo = {
        data: {},//用于存放从客户端获得的数据
        callbackFunction:{},//异步时注册的回调列表

        get: function (target, next) {//用户从客户端获取数据
            //------------------------------------------
            //
            //   target为获取内容
            //   格式：<字符串> target
            //   例如:
            //       userInfo
            //
            //-------------------------------------------

            if(tatoo.isAndroid){
                var method = 'get' + target.substr(0,1).toUpperCase() + target.substr(1);
                console.log(method);
                tatoo.data[target] = window[tattoo_and][method]();
                return next();
            }else if(tatoo.isiOS){
                tatoo.callbackFunction[target] = next;//注册回调事件
                return $.get('wsdk://'+target);
            }

        },

        callback: function (str) {//用于给客户端回调
            //------------------------------------------
            //
            //   str为返回值
            //   格式：<字符串> target|dataJson
            //   例如:
            //       userInfo|"{'nickname':'呵呵哒'}"
            //
            //-------------------------------------------

            if(tatoo.isiOS){
                var params = str.split('|');
                var target = params[0];
                tatoo.data[target] = JSON.parse(params[1]);//存放数据
                tatoo.callbackFunction[target]();//执行回调
                tatoo.callbackFunction[target] = null;//解除回调事件的注册
            }
        },

        //isAndroid:true,
        isAndroid: u.indexOf('Android') > -1, //android终端
        isiOS: u.match(/iPhone/i)||navigator.userAgent.match(/iPad/i) != null//ios终端

    };

    return a.tatoo = tatoo;
})(window);

//web端JS调用方式
// tatoo.get('userInfo',function(){
//     console.dir(tatoo.data.userInfo);
// })