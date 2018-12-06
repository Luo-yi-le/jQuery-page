//jquery.page 当前版本为第三版 支持UMD
;(function(factory){
    if(typeof  define==="function" &&(define.amd || define.cmd)){
        //amd,cmd
        define(["jquery"].factory);
    } else if(typeof exports === 'object'){
        //Node, CommonJS
        module.exports =factory('jquery');
    }
    else{
        factory(window,jQuery,document);
    }
})(function(win, $, doc){
    var page = {
        //使用IIFE加载loadHTML和bindEvent事件
        init:function(obj,param){
            return (function(){
                page.loadHTML(obj,param);//加载html
                page.bindEvent(obj,param);//加载绑定事件
            })();
        },
        //填充html 点 obj 和 args 两个参数
        loadHTML:function(obj,param){
            //返回事件
            return (function(){
                //先使用empty()方法从obj移除内容
                obj.empty();
                //上一页 currentTarget当前目标
                if(param.currentTarget > 1){
                    //Previous page 上一页
                    obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
                }else{
                	//当是第一页的时候禁用上一页
                    obj.remove('.prevPage');
                    obj.append('<span class="btnPage">上一页</span>');
                }
                //中间所有的页数 中间叶 Middle page
				//中间显示全部
                if(param.currentTarget != 1 && param.currentTarget >= 4 && param.pageCount != 4){
                    obj.append('<a href="javascript:;" class="midPage">'+1+'</a>');
                }
                //判断当前页大于2 且总数大于5时
                if(param.currentTarget -2 > 2 && param.currentTarget  <= param.pageCount && param.pageCount > 5){
                    //中间就会显示出...
                    obj.append('<span>...</span>');
                }

                //定义总条数和每页条数  从startLimit开始到 endLimit  从startLimit条开始-1后乘endLimit 获得showLimit条数据
                var showLimit=(param.startLimit-1)*(param.endLimit);

                //定义开始页和尾页
                var start = param.currentTarget -2,last = param.currentTarget +2;
                if((start > 1 && param.currentTarget  < 4)||param.currentTarget  == 1){
                    last++;
                }
                if(param.currentTarget  > param.pageCount-4 && param.currentTarget  >= param.pageCount){
                    start--;
                }
                for (;start <= last; start++) {
                    if(start <= param.pageCount && start >= 1){
                        if(start != param.currentTarget ){
                            obj.append('<a href="javascript:;" class="midPage">'+ start +'</a>');
                        }else{
                            obj.append('<span class="currentTarget">'+ start +'</span>');
                        }
                    }
                }
                if(param.currentTarget  + 2 < param.pageCount - 1 && param.currentTarget  >= 1 && param.pageCount > 5){
                    obj.append('<span>...</span>');
                }
                if(param.currentTarget  != param.pageCount && param.currentTarget  < param.pageCount -2  && param.pageCount != 4){
                    obj.append('<a href="javascript:;" class="midPage">'+param.pageCount+'</a>');
                }
                //下一页
                if(param.currentTarget  < param.pageCount){
                    obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
                }else{

                    obj.remove('.nextPage');
                    obj.append('<span class="btnPage">下一页</span>');
                }
            })();
        },
        //绑定事件 Binding events
        bindEvent:function(obj,param){
            return (function(){
                obj.on("click","a.midPage",function(){
                    var currentTarget  = parseInt($(this).text());
                    page.loadHTML(obj,{"currentTarget":currentTarget ,"pageCount":param.pageCount});
                    //判断collback的类型是否为function
                    if(typeof(param.collback)=="function"){
                        param.collback(currentTarget );
                    }
                });
                //上一页
                obj.on("click","a.prevPage",function(){
                    //使用children找到类名为 "span.currentTar" 的元素：
                    var currentTarget  = parseInt(obj.children("span.currentTarget").text());
                    page.loadHTML(obj,{"currentTarget":currentTarget -1,"pageCount":param.pageCount});
                    //判断collback的类型是否为function
                    if(typeof(param.collback)=="function"){
                        param.collback(currentTarget -1);
                    }
                });
                //下一页
                obj.on("click","a.nextPage",function(){
                    //使用children找到类名为 "span.currentTar" 的元素：
                    var currentTarget  = parseInt(obj.children("span.currentTarget").text());
                    page.loadHTML(obj,{"currentTarget":currentTarget +1,"pageCount":param.pageCount});
                    //判断collback的类型是否为function
                    if(typeof(param.collback)=="function"){
                        param.collback(currentTarget +1);
                    }
                });
            })();
        }
    }

    //创建分页 IIFE表达式
    //$.fn等于jQuery.prototype
    //sql: select * from 表 limit startLimit,endLimit
    $.fn.createPage = function(doc){
        //使用extend 扩展方法
        var param = $.extend({
            startLimit:1,
            endLimit:8,
            pageCount : 10,//页数
            limitCount:20,//总条数
			limit:1,//每页条数
            currentTarget : 1,//当前页
            collback : function(){}//回归事件
        },doc);
        page.init(this,param);//加载当前和参数
    }
});


