//处理首页导航部分
define(['jquery'], function ($) {
    function download() {
        //数据下载
        $.ajax({
            type: "get",
            url: "./data/nav.json",
            success: function (result) {
                // alert(result);
                var bannerArr = result.banner;

                for (var i = 0; i < bannerArr.length; i++) {
                    $(`<a href="${bannerArr[i].url}"><img class="swiper-lazy swiper-lazy-loaded" src="./images/banner/${bannerArr[i].img}" alt=""></a>`).appendTo("#J_homeSwiper .swiper-slide");

                    var node = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`);
                    if (i == 0) {
                        node.addClass("swiper-pagination-bullet-active");
                    }
                    node.appendTo(".swiper-pagination");
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })

        leftNavDownload();
        topNavDownload();
    }

    //轮播图轮播效果
    function banner() {
        var iNow = 0;   //当前图片的下标
        var aImgs = null;   //记录图片
        var aBtns = null;   //记录小圆圈

        var timer = setInterval(function () {
            iNow++;
            tab();
        }, 2500)

        //封装切换函数
        function tab() {
            if (!aImgs) {
                aImgs = $("#J_homeSwiper .swiper-slide").find("a");
            }
            if (!aBtns) {
                aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
            }
            if (iNow == 5) {
                iNow = 0;
            }

            //图片切换
            aImgs.hide().css("opacity", '0.2').eq(iNow).show().animate({ opacity: 1 });
            //小圆点切换
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        //鼠标移入图片停止轮播
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").on({
            mouseenter: function () {
                clearInterval(timer);
            },
            mouseleave: function () {
                timer = setInterval(function () {
                    iNow++;
                    tab();
                }, 2500)
            }
        })

        //点击小圆圈切换图片,通过事件委托
        $("#J_homeSwiper .swiper-pagination").on("click", "a", function () {
            iNow = $(this).index();
            tab();
            return false;   //阻止a链接默认行为
        })

        //左右按钮切换图片
        $(".swiper-button-prev,.swiper-button-next").click(function () {
            if (this.className == "swiper-button-prev") {
                iNow--;
                if (iNow == -1) {
                    iNow = 4;
                }
                tab();
            } else {
                iNow++;
                tab();
            }
        })
    }

    //左侧列表导航
    function leftNavDownload() {
        //数据下载
        $.ajax({
            type: "get",
            url: "./data/nav.json",
            success: function (result) {
                var sideArr = result.sideNav;

                for (var i = 0; i < sideArr.length; i++) {
                    var node = $(`
                    <li class='category-item'>
                        <a href="/index.html" class='title'>
                            ${sideArr[i].title}
                            <em class='iconfont-arrow-right-big'></em>
                        </a>
                        <div class="children clearfix">
                            
                        </div>
                    </li>
                    `);
                    node.appendTo("#J_categoryList");
                    //获取对应的子节点的个数
                    var childArr = sideArr[i].child;
                    //计算子节点需要的列数
                    var col = Math.ceil(childArr.length / 6);
                    node.find(".children").addClass("children-col-" + col);
                    //通过循环在右边插入数据
                    for(var j = 0;j<childArr.length;j++){
                        if(j % 6 == 0){
                            var newUl = $(`<ul class="children-list children-list-col children-list-col-1"></ul>`);
                            newUl.appendTo(node.find(".children"));
                        }
                        $(`
                        <li>
                            <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                                <span class="text">${childArr[j].title}</span>
                            </a>
                        </li>
                        `).appendTo(newUl);
                    }

                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //侧边导航添加移入移出效果  选项卡的切换效果
    function leftNavTab(){
        //通过事件委托添加
        $("#J_categoryList").on("mouseenter",".category-item",function(){
            $(this).addClass("category-item-active");
        })
        $("#J_categoryList").on("mouseleave",".category-item",function(){
            $(this).removeClass("category-item-active");
        })
    }


    //顶部导航数据下载
    function topNavDownload(){
        $.ajax({
            url: "./data/nav.json",
            success: function(result){
                var topNavArr = result.topNav;
                topNavArr.push({title: "服务"},{title: "社区"});
                //创建顶部导航菜单
                for(var i = 0;i<topNavArr.length;i++){
                    $(`<li data-index="${i}" class="nav-item">
                    <a href="javascript: void(0);" class="link">
                        <span class="text">${topNavArr[i].title}</span>
                    </a>
                    </li>`).appendTo(".header-nav .nav-list");

                    //创建下拉菜单
                    var node = $(`<ul class="children-list clearfix" style="display: ${i == 0 ? "block" : "none"}"></ul>`);
                    node.appendTo("#J_navMenu .container");

                    //取出所有子菜单
                    if(topNavArr[i].childs){
                        var childArr = topNavArr[i].childs;
                        for(var j = 0;j<childArr.length;j++){
                            $(`<li>
                                    <a href="#">
                                        <div class="figure figure-thumb"><img src="${childArr[j].img}" alt=""></div>
                                        <div class="title">${childArr[j].a}</div>
                                        <p class="price">${childArr[j].i}</p>
                                    </a>
                                </li>`).appendTo(node);
                        }
                    }
                }
            },
            error: function(msg){
                console.log(msg)
            }
        })
    }

    //顶部导航移入移出效果
    function topNavTab(){
        $(".header-nav .nav-list").on("mouseenter",".nav-item",function(){
            $(this).addClass("nav-item-active");
            var index = $(this).index() - 1;
            $("#J_navMenu").css("display",'block').removeClass("slide-up").addClass("slide-down");
            $("#J_navMenu .container").find('.children-list').eq(index).css("display",'block').siblings(".children-list").css("display",'none');
            if($(this).find("span").html() == "服务" || $(this).find("span").html() == "社区"){
                $("#J_navMenu").removeClass("slide-down").addClass("slide-up");
            }
        })

        $(".header-search").on("mouseenter",function(){
            $("#J_navMenu").css("display",'block').removeClass("slide-down").addClass("slide-up");
        })

        $(".header-nav .nav-list").on("mouseleave",".nav-item",function(){
            $(this).removeClass("nav-item-active");
        })

        $(".site-header").mouseleave(function(){
            $("#J_navMenu").css("display",'block').removeClass("slide-down").addClass("slide-up");
            
        })
    }

    //搜索框
    function search(){
        var node = $(`<li data-key="小米 9">
        <a href="//search.mi.com/search_%E5%B0%8F%E7%B1%B3%209">
            <span class="keyword"></span>
            小米 9
        </a>
    </li>
    <li data-key="Redmi K20 pro">
        <a href="//search.mi.com/search_Redmi%20K20%20pro">
            <span class="keyword"></span>
            Redmi K20 pro
        </a>
    </li>
    <li data-key="Redmi K20">
        <a href="//search.mi.com/search_Redmi%20K20">
            <span class="keyword"></span>
            Redmi K20
        </a>
    </li>
    <li data-key="Redmi Note 7 Pro">
        <a href="//search.mi.com/search_Redmi%20Note%207%20Pro">
            <span class="keyword"></span>
            Redmi Note 7 Pro
        </a>
    </li>
    <li data-key="Redmi&nbsp;note&nbsp;7">
        <a href="//search.mi.com/search_Redmi%26nbsp%3Bnote%26nbsp%3B7">
            <span class="keyword"></span>
            Redmi&nbsp;note&nbsp;7
        </a>
    </li>
    <li data-key="小米电视4c">
        <a href="//search.mi.com/search_%E5%B0%8F%E7%B1%B3%E7%94%B5%E8%A7%864c">
            <span class="keyword"></span>
            小米电视4c
        </a>
    </li>
    <li data-key="电视32英寸">
        <a href="//search.mi.com/search_%E7%94%B5%E8%A7%8632%E8%8B%B1%E5%AF%B8">
            <span class="keyword"></span>
            电视32英寸
        </a>
    </li>
    <li data-key="笔记本pro">
        <a href="//search.mi.com/search_%E7%AC%94%E8%AE%B0%E6%9C%ACpro">
            <span class="keyword"></span>
            笔记本pro
        </a>
    </li>
    <li data-key="小爱音箱">
        <a href="//search.mi.com/search_%E5%B0%8F%E7%88%B1%E9%9F%B3%E7%AE%B1">
            <span class="keyword"></span>
            小爱音箱
        </a>
    </li>
    <li data-key="净水器">
        <a href="//search.mi.com/search_%E5%87%80%E6%B0%B4%E5%99%A8">
            <span class="keyword"></span>
            净水器
        </a>
    </li>`)
        $(".header-search .search-form #search").focus(function(){
            $("#J_keywordList").removeClass("hide").addClass("show");
            if(!$(this).val()){
                $(".result-list").empty().append(node);
            }
        }).blur(function(){
            $("#J_keywordList").removeClass("show").addClass("hide");
        });
        $(".header-search .search-form #search").keyup(function(){
            var value = $(this).val();
            if(!value){
                $(".result-list").empty().append(node);
            }else{
                $("#J_keywordList .result-list").empty();
                $.ajax({
                    url: `http://suggestion.baidu.com/su?wd=${value}`,
                    dataType: 'jsonp',
                    jsonp: "cb",
                    success: function(result){
                        var searchArr = result.s;
                        $(".result-list").empty();
                        for(var i = 0;i<searchArr.length;i++){
                            $(`<li><a href="http://www.baidu.com/s?wd=${searchArr[i]}" target = "_blank">${searchArr[i]}</a></li>`).appendTo(".result-list");
                        }
                    },
                    error: function(msg){
                        console.log(msg);
                    }

                })
            }
        })
    }

    //全部商品下拉导航
    function allGoodsTab(){
        $(".header-nav .nav-list").on("mouseenter",".nav-category",function(){
            $(this).addClass("nav-category-active");
            $(this).find(".site-category").css("display",'block');
            $("#J_navMenu").removeClass("slide-down").addClass("slide-up").delay(1000).css("display","none");
        })
        $(".header-nav .nav-list").on("mouseleave",".nav-category",function(){
            $(this).removeClass("nav-category-active");
            $(this).find(".site-category").css("display",'none');
        })
    }

    
    return {
        download: download,
        banner: banner,
        leftNavTab: leftNavTab,
        topNavTab: topNavTab,
        search: search,
        leftNavDownload: leftNavDownload,
        topNavDownload: topNavDownload,
        allGoodsTab: allGoodsTab
    }
});