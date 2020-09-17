define(['jquery', 'jquery-cookie'], function ($) {

    //下载数据
    function download() {
        //获取详情页商品的id
        var product_id = valueByName(location.search, "product_id");
        //通过商品id找到商品信息
        $.ajax({
            type: "get",
            url: "../data/goodsList.json",
            success: function (arr) {
                var goodsMsg = arr.find(item => item.product_id == product_id);
                $(`
                    <!-- 导航 -->
                    <div id = 'J_proHeader' data-name="${goodsMsg.name}">
                        <div class = 'xm-product-box'>
                            <div id = 'J_headNav' class = 'nav-bar'>
                                <div class = 'container J_navSwitch'>
                                    <h2 class = 'J_proName'>${goodsMsg.name}</h2>
                                    <div class = 'con'>
                                        <div class = 'left'>
                                            <span class = 'separator'>|</span>
                                            <a href="#">${goodsMsg.title}</a>
                                        </div>
                                        <div class = 'right'>
                                            <a href="#">概述</a>
                                            <span class = 'separator'>|</span>
                                            <a href="#">参数</a>
                                            <span class = 'separator'>|</span>
                                            <a href="#">F码通道</a>
                                            <span class = 'separator'>|</span>
                                            <a href="#">用户评价</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 商品详情数据展示 -->
                    <div class = 'xm-buyBox' id = 'J_buyBox'>
                        <div class = 'box clearfix'>
                            <!-- 商品数据 -->
                            <div class = 'pro-choose-main container clearfix'>
                                <div class = 'pro-view span10'>
                                    <!-- img-con fix 设置图片浮动 -->
                                    <div id = 'J_img' class = 'img-con' style = 'left: 338px; margin: 0px;'>
                                        <div class = 'ui-wrapper' style="max-width: 100%;">
                                            <!-- 图片 -->
                                            <div class = 'ui-viewport' style="width: 100%; overflow: hidden; position: relative; height: 560px;">
                                                <div id = 'J_sliderView' class = 'sliderWrap' style = 'width: auto; position: relative;'>

                                                </div>
                                            </div>
                                            <!-- 显示第几张图片的下标 -->
                                            <div class = 'ui-controls ui-has-pager ui-has-controls-direction'>
                                                <div class = 'ui-pager ui-default-pager'>
                                                    
                                                </div>
                                                <div class = 'ui-controls-direction'>
                                                    <a class="ui-prev" href="">上一张</a>
                                                    <a class="ui-next" href="">下一张</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class = 'pro-info span10'>
                                    <!-- 标题 -->
                                    <h1 class = 'pro-title J_proName'>
                                        <span class = 'img'></span>
                                        <span class = 'name'>${goodsMsg.name}</span>
                                    </h1>
                                    <!-- 提示 -->
                                    <p class = 'sale-desc' id = 'J_desc'>
                                        ${goodsMsg.product_desc_ext}
                                    </p>
                                    <div class = 'loading J_load hide'>
                                        <div class = 'loader'></div>
                                    </div>
                                    <!-- 主体 -->
                                    <div class = 'J_main'>
                                        <!-- 经营主题 -->
                                        <p class = 'aftersale-company' id = 'J_aftersaleCompany' type = '1' desc = 'null'>小米自营</p>
                                        <!-- 价格 -->
                                        <div class = 'pro-price J_proPrice'>
                                            <span class = 'price'>
                                                ${goodsMsg.price_max}元
                                                <del>${goodsMsg.market_price_max}元</del>
                                            </span>
                                            <span class="seckill-notic hide"><em></em><i></i><span><span></span></span></span>
                                        </div>
                                        <!-- 常态秒杀倒计时 -->
                                        <div class = 'pro-time J_proSeckill'>
                                            <div class="pro-time-head">
                                                <em class="seckill-icon"></em> 
                                                <i>秒杀</i>
                                                <span class="time J_seckillTime">距结束 03 时 24 分 46 秒</span>
                                        </div>
                                            <div class = 'pro-time-con'>
                                                <span class = 'pro-time-price'>
                                                    ￥
                                                    <em class = 'J_seckillPrice'>${goodsMsg.price_min}</em>
                                                    <del>
                                                        ￥
                                                        <em class = 'J_seckillPriceDel'>${goodsMsg.market_price_min}</em>
                                                    </del>
                                                </span>
                                            </div>
                                        </div>
                                            <!-- 已经选择产品 -->
                                            <div class = 'pro-list' id = 'J_proList'>
                                                <ul>
                                                    <li>${goodsMsg.name} ${goodsMsg.value}  
                                                        <del>${goodsMsg.market_price_min}元</del>  
                                                        <span>  ${goodsMsg.price_min} 元 </span> 
                                                    </li>
                                                    <li class="totlePrice" data-name="seckill">   
                                                        秒杀价   ：${goodsMsg.price_min}元  
                                                    </li>
                                                </ul>
                                            </div>
                                            <!-- 购买按钮 -->
                                            <ul class="btn-wrap clearfix" id="J_buyBtnBox">     
                                                <li>  
                                                    <a href="#" class="btn btn-primary btn-biglarge J_login" id = "${goodsMsg.product_id}">加入购物车</a>  
                                                </li>   
                                                <li>  
                                                    <a href="goodsCar.html" class="btn-gray btn-like btn-biglarge"> 
                                                        <i class="iconfont default"></i>查看购物车 
                                                    </a>  
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).insertAfter("#app .header");

                //找到当前详情页所有的图片
                var aImgs = goodsMsg.images;
                //判断图片是不是一张
                if (aImgs.length == 1) {
                    $(`<img class = 'slider done' src="${aImgs[0]}" style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: block;" alt=""/>`).appendTo("#J_sliderView");
                    //隐藏左右切换按钮
                    $(".ui-controls").hide();
                } else {
                    //多张图片 循环创建
                    for (var i = 0; i < aImgs.length; i++) {
                        //显示几张图片的按钮
                        $(`<div class = 'ui-pager-item'>
                                <a href="#" data-slide-index = "0" class = 'ui-pager-link ${i == 0 ? "active" : ""}'>1</a>
                        </div>`).appendTo("#J_img .ui-pager");

                        //创建图片
                        $(`<img class = 'slider done' src="${aImgs[i]}" style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: block;" alt=""/>`).appendTo("#J_sliderView");
                    }
                }
                
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //图片轮播
    function banner() {
        var iNow = 0;   //下标
        var aImages = null; //所有图片
        var aBtns = null;   //所有图片按钮
        var timer = null;   //定时器

        $("#app div").on("click", "#J_img .ui-controls .ui-pager a", function () {
            iNow = $(this).parent().index();
            tab();
            return false;
        })

        timer = setInterval(function () {
            iNow++;
            tab();
        }, 3000);

        //移入移出效果
        $("#app div").on("mouseenter", "#J_img #J_sliderView", function () {
            clearInterval(timer);
        });

        $("#app div").on("mouseleave", "#J_img #J_sliderView", function () {
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 3000);
        });

        //左右切换按钮
        $("#app div").on("click", ".ui-prev,.ui-next", function () {
            if (this.className == "ui-prev") {
                iNow--;
                if (iNow == -1) {
                    iNow = aImages.size() - 1;
                }
            } else {
                iNow++;
            }
            tab()
            return false;
        })

        //图片切换效果
        function tab() {
            if (!aImages) {
                aImages = $("#J_img").find("img");
            }
            if (!aBtns) {
                aBtns = $("#J_img .ui-controls .ui-pager a");
            }

            if (aImages.size() == 1) {
                clearInterval(timer);
            } else {
                if (iNow == aImages.size()) {
                    iNow = 0;
                }
            }

            aBtns.removeClass("active").eq(iNow).addClass("active");
            aImages.hide().eq(iNow).show();
        }

        //点击添加购物车
        $("#app div").on("click",".J_login",function(){
            //获取当前商品列表
            var id = this.id;
            //判断cookie中是否存在商品信息
            var first = $.cookie("goods") == null ? true : false;

            //如果是第一次添加
            if(first){
                var cookieStr = `[{"id":${id},"num": 1}]`;
                $.cookie("goods",cookieStr,{expires:7});
            }else{
                //如果不是第一次添加，判断之前是否添加过该商品
                var same = false;   //假设没有添加过该商品
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                for(var i = 0;i<cookieArr.length;i++){
                    //如果之前添加过该商品，则same = true
                    if(cookieArr[i].id == id){
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                //如果之前没有添加过该商品,则 same = false
                if(!same){
                    //新增一条商品数据
                    var obj = {id:id,num:1};
                    cookieArr.push(obj);
                }
                //最后存回cookie中
                $.cookie("goods",JSON.stringify(cookieArr),{expires:7})
            }

        })
    }

    //获取当前要加载详情的商品数据
    function valueByName(search, name) {
        //查找这个键值对开始的位置
        var start = search.indexOf(name + "=");
        if (start == -1) {
            return null;
        }
        var end = search.indexOf("&", start);
        if (end == -1) {
            end = search.length;
        }

        //提取想要的键值对
        var str = search.substring(start, end);
        var arr = str.split("=");
        return arr[1];
    }

    return {
        download: download,
        banner: banner
    }
});