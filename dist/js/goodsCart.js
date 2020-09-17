define(["jquery", "jquery-cookie"], function ($) {
    function download() {
        $.ajax({
            type: "get",
            url: "./data/goodsCarList.json",
            success: function (arr) {
                var cartArr = arr.data;
                for (var i = 0; i < cartArr.length; i++) {
                    $(`
                    <li class="J_xm-recommend-list span4">    
                        <dl> 
                            <dt> 
                                <a href="#"> 
                                    <img src="${cartArr[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="${cartArr[i].name}"> 
                                </a> 
                            </dt> 
                            <dd class="xm-recommend-name"> 
                                <a href="#"> 
                                ${cartArr[i].name} 
                                </a> 
                            </dd> 
                            <dd class="xm-recommend-price">${cartArr[i].price}元</dd> 
                            <dd class="xm-recommend-tips">   ${cartArr[i].comments}人好评    
                                <a href="#" class="btn btn-small btn-line-primary J_xm-recommend-btn" style="display: none;" id="${cartArr[i].goodsid}">加入购物车</a>  
                            </dd> 
                            <dd class="xm-recommend-notice">
                            </dd> 
                        </dl>  
                    </li>
                    `).appendTo("#J_miRecommendBox .xm-recommend .row");

                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //加载已加入购物车的商品
    function loadCarData() {
        new Promise(function (resolve, reject) {
            //每次加载前清除上一次的内容
            $("#J_cartListBody .J_cartGoods").empty();
            //下载第一份数据
            $.ajax({
                type: "get",
                url: "../data/goodsCarList.json",
                success: function (obj) {
                    resolve(obj.data)
                },
                error: function (msg) {
                    reject(msg);
                }
            })
        }).then(function (arr1) {
            return new Promise(function (resolve, reject) {
                //下载第二份数据
                $.ajax({
                    type: "get",
                    url: "../data/goodsList2.json",
                    success: function (obj2) {
                        var newArr = arr1.concat(obj2);
                        resolve(newArr);
                    },
                    error: function (msg) {
                        reject(msg);
                    }
                })
            })
        }).then(function (newArr) {
            // console.log(newArr)
            // console.log($.cookie("goods"));
            //拿到cookie中的数据
            var cookieStr = $.cookie("goods");
            if (cookieStr) {
                var cookieArr = JSON.parse(cookieStr);
                var allArr = [];

                for (var i = 0; i < cookieArr.length; i++) {
                    for (var j = 0; j < newArr.length; j++) {
                        if (cookieArr[i].id == newArr[j].goodsid || cookieArr[i].id == newArr.product_id) {
                            newArr[j].num = cookieArr[i].num;
                            newArr[j].id = newArr[j].goodsid ? newArr[j].goodsid : newArr.product_id;
                            allArr.push(newArr[j]);
                        }
                    }
                }
                console.log(allArr);
                //在页面上创建商品节点
                for (var i = 0; i < allArr.length; i++) {
                    var node = $(`
                    <div class="item-row clearfix" id="${allArr[i].id}"> 
                        <div class="col col-check">  
                            <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                        </div> 
                        <div class="col col-img">  
                            <a href="//item.mi.com/${allArr[i].id}.html" target="_blank"> 
                                <img alt="" src="${allArr[i].image}" width="80" height="80"> 
                            </a>  
                        </div> 
                        <div class="col col-name">  
                            <div class="tags">   
                            </div>     
                            <div class="tags">  
                            </div>   
                            <h3 class="name">  
                                <a href="//item.mi.com/${allArr[i].id}.html" target="_blank"> 
                                ${allArr[i].name} 
                                </a>  
                            </h3>        
                        </div> 
                        <div class="col col-price"> 
                        ${allArr[i].price}元 
                            <p class="pre-info">  </p> 
                        </div> 
                        <div class="col col-num">  
                            <div class="change-goods-num clearfix J_changeGoodsNum"> 
                                <a href="javascript:void(0)" class="J_minus">
                                    <i class="iconfont"></i>
                                </a> 
                                <input tyep="text" name="2192300031_0_buy" value="${allArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                                <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                            </div>  
                        </div> 
                        <div class="col col-total"> 
                        ${(allArr[i].num * allArr[i].price).toFixed(1)}元 
                            <p class="pre-info">  </p> 
                        </div> 
                        <div class="col col-action"> 
                            <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                        </div> 
                    </div> 
                    `);
                    node.appendTo("#J_cartListBody .J_cartGoods");
                }
            }
            isCheckAll();
        })
    }

    //鼠标移入移出效果  添加购物车
    function cartHover() {
        $("#J_miRecommendBox .xm-recommend .row").on("mouseenter", ".J_xm-recommend-list", function () {
            $(this).find(".xm-recommend-tips a").css("display", "block");
        })
        $("#J_miRecommendBox .xm-recommend .row").on("mouseleave", ".J_xm-recommend-list", function () {
            $(this).find(".xm-recommend-tips a").css("display", "none");
        })

        //点击添加购物车
        $("#J_miRecommendBox .xm-recommend .row").on("click", ".J_xm-recommend-list .xm-recommend-tips .btn", function () {
            //获取当前商品列表
            var id = this.id;
            //判断cookie中是否存在商品信息
            var first = $.cookie("goods") == null ? true : false;

            //如果是第一次添加
            if (first) {
                var cookieStr = `[{"id":${id},"num": 1}]`;
                $.cookie("goods", cookieStr, { expires: 7 });
            } else {
                //如果不是第一次添加，判断之前是否添加过该商品
                var same = false;   //假设没有添加过该商品
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                for (var i = 0; i < cookieArr.length; i++) {
                    //如果之前添加过该商品，则same = true
                    if (cookieArr[i].id == id) {
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                //如果之前没有添加过该商品,则 same = false
                if (!same) {
                    //新增一条商品数据
                    var obj = { id: id, num: 1 };
                    cookieArr.push(obj);
                }
                //最后存回cookie中
                $.cookie("goods", JSON.stringify(cookieArr), { expires: 7 })

            }

            isCheckAll();
            loadCarData();
            return false;
        })
    }

    //全选按钮和单选按钮 添加点击
    function checkFunc() {
        $("#J_cartBox .list-head .col-check").find("i").click(function () {
            //获取每一个商品的单选框
            var allChecks = $("#J_cartListBody .J_cartGoods").find(".item-row .col-check i");

            if ($(this).hasClass("icon-checkbox-selected")) {
                $(this).add(allChecks).removeClass("icon-checkbox-selected");
            } else {
                $(this).add(allChecks).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        })

        //每一个商品的单选框添加点击
        $("#J_cartListBody .J_cartGoods").on("click", ".item-row .col-check i", function () {
            if ($(this).hasClass("icon-checkbox-selected")) {
                $(this).removeClass("icon-checkbox-selected");
            } else {
                $(this).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        })
    }

    //判断有多少个商品被选中
    function isCheckAll() {
        var checkAll = $("#J_cartListBody .J_cartGoods .item-row");
        var isAll = true;   //假设全都选中
        var total = 0;  //计算总价
        var count = 0; //记录被选中的商品数量
        var totalCount = 0; //记录商品总数
        checkAll.each(function (index, item) {
            if (!$(item).find(".col-check i").hasClass("icon-checkbox-selected")) {
                isAll = false;
            } else {
                total += parseFloat($(item).find(".col-price").html().trim()) * parseFloat($(item).find(".col-num input").val());
                count += parseInt($(item).find(".col-num input").val());
            }
            totalCount += parseInt($(item).find(".col-num input").val());
        })
        $("#J_cartTotalPrice").html(total.toFixed(2));
        $("#J_cartTotalNum").html(totalCount);
        $("#J_selTotalNum").html(count);

        //判断是否全选
        if(isAll){
            $("#J_cartBox .list-head .col-check").find("i").addClass("icon-checkbox-selected");
        }else{
            $("#J_cartBox .list-head .col-check").find("i").removeClass("icon-checkbox-selected");
        }
    }

    //给页面上的商品添加删除、数量加减功能
    function changeCars(){
        $("#J_cartListBody .J_cartGoods").on("click",".item-row .col-action .J_delGoods",function(){
            //获取商品ID
            var id = $(this).closest(".item-row").remove().attr("id");

            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i =0;i<cookieArr.length;i++){
                if(id == cookieArr[i].id){
                    cookieArr.splice(i,1);
                    break;
                }
            }
            if(cookieArr.length == 0){
                $.cookie("goods",null);
            }else{
                $.cookie("goods",JSON.stringify(cookieArr),{expires:7});
            }
            isCheckAll();

            return false;
        });

        $("#J_cartListBody .J_cartGoods").on("click",".J_minus, .J_plus",function(){
            //获取商品id
            var id = $(this).closest(".item-row").attr("id");
            //查找cookie
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i =0;i<cookieArr.length;i++){
                if(id == cookieArr[i].id){
                    if(this.className == "J_minus"){
                        //数量-1
                        cookieArr[i].num == 1 ? alert("数量已经为1 不能再减少") : cookieArr[i].num--;
                    }else{
                        cookieArr[i].num++;
                    }
                    break;
                    
                }
            }
            //更新页面上商品数量
            $(this).siblings(".J_goodsNum").val(cookieArr[i].num);

            var price = parseFloat($(this).closest(".item-row").find(".col-price").html().trim());
            $(this).closest(".item-row").find(".col-total").html((price*cookieArr[i].num).toFixed(1));

            $.cookie("goods",JSON.stringify(cookieArr),{expires:7});
            isCheckAll();

        })

        $("#J_cartListBody .J_cartGoods").on("keyup",".col-num .J_goodsNum",function(){
            // alert(event.which);
             //获取商品id
             var id = $(this).closest(".item-row").attr("id");
             //查找cookie
             var cookieStr = $.cookie("goods");
             var cookieArr = JSON.parse(cookieStr);
            //  alert(event.which)
             for(var i =0;i<cookieArr.length;i++){
                if(id == cookieArr[i].id){
                    if(event.which >= 96 && event.which <= 105 || event.which >= 48 && event.which <= 57){
                        if($(this).val() < 1){
                            alert("数量最低为1")
                            $(this).val(1);
                            cookieArr[i].num = $(this).val();
                        }else{
                            cookieArr[i].num = $(this).val();
                        }
                    }else if(event.which == 8){
                        if(!$(this).val()){
                            $(this).val(1);
                            alert("数量不能为空");
                            cookieArr[i].num = $(this).val();
                        }else{
                            cookieArr[i].num = $(this).val();
                        }
                    }else{
                        alert("数量只能为数字");
                    }
                    break;
                }
            }

            var price = parseFloat($(this).closest(".item-row").find(".col-price").html().trim());
            $(this).closest(".item-row").find(".col-total").html((price*cookieArr[i].num).toFixed(1));

            $.cookie("goods",JSON.stringify(cookieArr),{expires:7});
            isCheckAll();
        })
    }
    
    return {
        download: download,
        cartHover: cartHover,
        loadCarData: loadCarData,
        checkFunc: checkFunc,
        changeCars: changeCars
    }
});