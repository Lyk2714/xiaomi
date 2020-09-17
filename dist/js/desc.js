console.log("加载成功");
//配置当前项目引入模块
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        "goodsDesc": "goodsDesc"
    },
    shim: {
        "jquery-cookie": ["jquery"]
    }
})

//引入调用的模块
require(["nav","goodsDesc"],function(nav,goodsDesc){
    nav.leftNavDownload();
    nav.topNavDownload();
    nav.leftNavTab();
    nav.topNavTab();
    nav.search();
    nav.allGoodsTab();

    goodsDesc.download();
    goodsDesc.banner();
})