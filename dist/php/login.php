<?php
header('content-type:text/html;charset=utf-8');

// var_dump($_POST);
//设置统一的返回格式
$responseData = array("code" => 0, "message" => "");

//获取提交的数据
$username = $_POST['username'];
$password = $_POST['password'];

//对数据进行简单的判断
if (!$username) {
    $responseData['code'] = 1;
    $responseData['message'] = '用户名不能为空';
    //将数据按统一的返回格式返回
    echo json_encode($responseData);
    exit;
};

if (!$password) {
    $responseData['code'] = 2;
    $responseData['message'] = '密码不能为空';
    //将数据按统一的返回格式返回
    echo json_encode($responseData);
    exit;
};
//链接数据库
$link = mysqli_connect("127.0.0.1", "root", "");
//判断数据库是否链接成功
if (!$link) {
    $responseData['code'] = 4;
    $responseData['message'] = '服务器忙';
    //将数据按统一的返回格式返回
    echo json_encode($responseData);
    exit;
};

//设置字符集
mysqli_set_charset($link, "utf8");
//选择数据库
mysqli_select_db($link, "xiaomi");
//密码加密
$str = md5(md5(md5($password) . "jiami") . "ercijiami");
//准备sql语句进行登录
$sql = "SELECT * FROM user WHERE username='{$username}' AND password='{$str}'";
//发送sql语句
$res = mysqli_query($link, $sql);
//取出一行数据 有数据则登录成功
$row = mysqli_fetch_assoc($res);
if (!$row) {
    $responseData['code'] = 5;
    $responseData['message'] = '用户名或密码错误';
    //将数据按统一的返回格式返回
    echo json_encode($responseData);
    exit;
}else{
    $responseData['message'] = '登录成功';
    echo json_encode($responseData);
};

//关闭数据库
mysqli_close($link);