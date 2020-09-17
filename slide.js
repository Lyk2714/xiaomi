define(["jquery"], function ($) {
    //下载数据
    function download() {
        $.ajax({
            url: "./data/slide.json",
            success: function (result) {
                var slideArr = result.data.list.list;
                for (var i = 0; i < slideArr.length; i++) {
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                        <a href="#" target = "_blank">
                            <div class = 'content'>
                                <div class = 'thumb'>
                                    <img width="160" height="160" src="${slideArr[i].pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                                </div>
                                <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                                <p class = 'desc'>${slideArr[i].desc}</p>
                                <p class = 'price'>
                                    <span>${slideArr[i].seckill_Price}</span>元
                                    <del>${slideArr[i].goods_price}</del>
                                </p>
                            </div>
                        </a>
                    </li>`).appendTo($("#J_flashSaleList .swiper-wrapper"));

                }
                // alert(slideArr.length);
                slideTab(slideArr.length);
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //商品列表滚动
    function slideTab(slideArr) {
        var aSpans = $(".swiper-controls").find("span");
        var iNow = 0;
        var count = Math.floor(slideArr / 4);
        // alert(slideArr);

        //启动定时器，商品自行滚动
        var timer = setInterval(function () {

            iNow++;
            iNow = Math.min(count,iNow);
            tab();
            if (iNow == count) {
                clearInterval(timer);
                /* for(var i = 0;i<4;i++){
                    var node = $("#J_flashSaleList .swiper-wrapper").find("li").eq(i).clone();
                    node.appendTo($("#J_flashSaleList .swiper-wrapper"));
                } */
            }
            /* if(iNow == count + 1){
                iNow = 0;
                $("#J_flashSaleList .swiper-wrapper").css("transform","");
                $("#J_flashSaleList .swiper-wrapper").css("transform","translate3d(0px,0px,0px)");
            }else{
                iNow++;
                tab();
            } */
        }, 4000);

        function tab(complete) {
            iNow == 0 ? aSpans.eq(0).addClass("swiper-button-disabled") : aSpans.eq(0).removeClass("swiper-button-disabled");
            iNow == count ? aSpans.eq(1).addClass("swiper-button-disabled") : aSpans.eq(1).removeClass("swiper-button-disabled");

            // alert(iNow);
            var iTarget = iNow == count ? iNow * -992 + 496 : iNow * -992;
            if(iNow == count + 1){
                iTarget = iNow * -992 + 496;
            }
            // alert(iTarget);
            $("#J_flashSaleList .swiper-wrapper").css({
                transform: `translate3d(${iTarget}px,0px,0px)`,
                transitionDuration: `1000ms`
            },);
            // alert(1);
            if(complete){
                complete();
            }
        }

        //左右点击按钮
        aSpans.click(function () {
            //左键
            if ($(this).index() == 0) {
                iNow--;
                iNow = Math.max(0, iNow);
                tab();
            } else {
                iNow++;
                iNow = Math.min(count, iNow);
                tab();
            }
        })

        $("#J_flashSaleList").mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            //启动定时器，商品自行滚动
            timer = setInterval(function () {

                iNow++;
                iNow = Math.min(count,iNow);
                tab();

                if (iNow == count) {
                    clearInterval(timer);
                    /* for(var i = 0;i<4;i++){
                        var node = $("#J_flashSaleList .swiper-wrapper").find("li").eq(i).clone();
                        node.appendTo($("#J_flashSaleList .swiper-wrapper"));
                    } */
                }
                /* if(iNow == count + 1){
                    iNow = 0;
                    $("#J_flashSaleList .swiper-wrapper").css("transform","");
                    $("#J_flashSaleList .swiper-wrapper").css("transform","translate3d(0px,0px,0px)");
                }else{
                    iNow++;
                    tab();
                } */
            }, 4000);
        })
    }

    return {
        download: download,
        slideTab: slideTab
    }
})