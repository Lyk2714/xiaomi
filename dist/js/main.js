console.log("加载成功");

//配置路径和依赖
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        "slide": "slide",
        "data": "data"
    },
    shim: {
        "jquery-cookie": ["jquery"]
    }
})

//引入调用的模块
require(["nav", "slide", "data"], function (nav, slide, data) {
    nav.download();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.search();

    slide.download();
    // slide.slideTab();
    data.download();
    data.tabMenu();
})