<?php
header('content-type:text/html;charset=utf-8');

// var_dump($_POST);
//设置统一的返回格式
$responseData = array("code" => 0, "message" => "");

//获取提交的数据
$username = $_POST['username'];
$password = $_POST['password'];
$repassword = $_POST['repassword'];
$createtime = $_POST['createtime'];

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

if ($password != $repassword) {
    $responseData['code'] = 3;
    $responseData['message'] = '两次密码输入不一致';
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
//准备sql语句验证是否注册过
$sql = "SELECT * FROM user WHERE username='{$username}'";
//发送sql语句
$res = mysqli_query($link, $sql);

//取出一行数据 null 则没有注册过
$row = mysqli_fetch_assoc($res);
if ($row) {
    $responseData['code'] = 5;
    $responseData['message'] = '用户名重名';
    //将数据按统一的返回格式返回
    echo json_encode($responseData);
    exit;
};
//可以注册
//密码加密
$str = md5(md5(md5($password) . "jiami") . "ercijiami");
//插入数据库
$sql2 = "INSERT INTO user(username,password,createtime) VALUES('{$username}','{$str}',{$createtime})";
$res2 = mysqli_query($link, $sql2);
if (!$res2) {
    $responseData['code'] = 6;
    $responseData['message'] = '注册失败';
    //将数据按统一的返回格式返回
    echo json_encode($responseData);
    exit;
};

$responseData['message'] = "注册成功";

echo json_encode($responseData);

//关闭数据库
mysqli_close($link);
