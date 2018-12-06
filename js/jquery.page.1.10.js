//第一版 报错
;(function($){
	var page = {
		//加载
		init:function(obj,args){
			return (function(){
                page.bindEvent(obj,args);//加载绑定事件
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.on("click","a.midPage",function(){
					var current = parseInt($(this).text());
                    page.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
					if(typeof(args.back)=="function"){
						args.back(current);
					}
				});
				//上一页
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.children("span.current").text());
                    page.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					if(typeof(args.back)=="function"){
						args.back(current-1);
					}
				});
				//下一页
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.children("span.current").text());
                    page.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
					if(typeof(args.back)=="function"){
						args.back(current+1);
					}
				});
			})();
		}
	}
	//创建分页 IIFE表达式
	$.fn.createPage = function(options){
		var args = $.extend({
			pageCount : 10,//总页数
			current : 1,//当前页
			back : function(){}
		},options);
        page.init(this,args);//加载当前和参数
	}
})(jQuery);