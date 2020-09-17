define([
    'jquery',
], function ($) {
    function download() {
        $.ajax({
            type: "get",
            url: "./data/goodsList2.json",
            success: function (arr) {
                $(`
                <div data-v-61428f58 class = 'section'>
                    <div data-v-61428f58 class = 'components-list-box'>
                        <div data-v-a2d6c756 class="channel-product-imgText">
                            <div data-v-a2d6c756 class = 'channel-product-top'>
                                <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                    <div data-v-a2d6c756 class = 'figure'>
                                        <a href="goodsDesc.html?product_id=${arr[0].product_id}">
                                            <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${arr[0].image}" alt=""/>
                                        </a>
                                    </div>
                                    <div data-v-a2d6c756 class = 'content'>
                                        <h3 data-v-a2d6c756 class = 'title'>
                                            <a data-v-a2d6c756 href="goodsDesc.html?product_id=${arr[0].product_id}">
                                                ${arr[0].name} 
                                            </a>
                                        </h3>
                                        <p data-v-a2d6c756 class = 'desc'>${arr[0].desc}</p>
                                        <p data-v-a2d6c756 class = 'price'>
                                            <strong data-v-a2d6c756>${arr[0].price}</strong>元
                                            <span data-v-a2d6c756>起</span>
                                            <del data-v-a2d6c756>${arr[0].del}</del>
                                        </p>
                                        <p data-v-a2d6c756 class = 'link'>
                                            <a data-v-a2d6c756 href="#">立即购买</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `).appendTo(".app-body");

                //创建小图商品
                for (var i = 1; i < arr.length; i++) {
                    if (i % 2 !== 0) {
                        var node = $(`
                        <div data-v-61428f58 class = 'section'>
                            <div data-v-61428f58 class = 'components-list-box'>
                                <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
                                    <div data-v-45ef62b1 class = 'row'>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        `);
                        node.appendTo(".app-body");
                    }
                    $(`
                    <div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                        <div data-v-45ef62b1 class = 'figure'>
                            <a data-v-45ef62b1 href="goodsDesc.html?product_id=${arr[i].product_id}" class = 'exposure'>
                                <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${arr[i].image}" alt=""/>
                            </a>
                        </div>
                        <h3 data-v-45ef62b1 class = 'title'>
                            <a data-v-45ef62b1 href="goodsDesc.html?product_id=${arr[i].product_id}">${arr[i].name}</a>
                        </h3>
                        <p data-v-45ef62b1 class = 'desc'>${arr[i].desc}</p>
                        <p data-v-45ef62b1 class = 'price'>
                            <strong data-v-45ef62b1>${arr[i].price}</strong>元
                            <span data-v-45ef62b1>起</span>
                            <del data-v-45ef62b1>${arr[i].del}</del>
                        </p>
                    </div>
                    `).appendTo(node.find(".row"));
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //商品列表页轮播图
    function banner() {
        var node = $(".swiper-container .swiper-wrapper div").eq(0).clone();
        node.appendTo(".swiper-container .swiper-wrapper");

        //默认显示图片的下标
        var iNow = 0;
        //定时器
        var timer = null;
        //小圆圈
        var aBtns = $(".gallery-one .swiper-container .swiper-pagination").find("a");

        timer = setInterval(function(){
            iNow++;
            tab();
        },4000)

        aBtns.click(function () {
            iNow = $(this).index();
            tab();
            return false;
        });

        //图片切换
        function tab(){
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
            
            if(iNow == aBtns.size()){
                aBtns.eq(0).addClass("swiper-pagination-bullet-active");
            };

            $(".swiper-container .swiper-wrapper").animate({
                left: iNow * -2560
            },1000,function(){
                if(iNow == aBtns.size()){
                    iNow = 0;
                    $(".swiper-container .swiper-wrapper").css("left",0);
                }
            });

        }

        $(".swiper-container").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },4000)
        });

        $(".swiper-button-prev").click(function(){
            // alert(0);
            iNow--;
            /* if(iNow<0){
                iNow = aBtns.length -2
            } */
            tab();
        })
        $(".swiper-button-next").click(function(){
            iNow++;
            // alert(iNow);
            /* if(iNow>aBtns.length-2){
                iNow = 0;
            } */
            tab();
        })
    }

    return {
        download: download,
        banner: banner
    }
});