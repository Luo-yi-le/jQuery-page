# jQuery-page
自己开发的jQuery分页插件

### 支持
兼容　UMD、 CMD、　AMD 

使用node.js测试util.js通过

### 用法
<div class="showPage"></div>

调用接口方法

$(".showPage").createPage({

        pageCount:6,//总页数
        limit:2,
        currentTarget :1,//当前页
        collback:function (page) {
            console.log("这是第"+page+" 页");
        }
    });
