<?php
require 'config.php';
require 'db.php';

if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token);

    $oauth = new Google\Service\Oauth2($client);
    $google_user = $oauth->userinfo->get();

    $email = $google_user->email;
    $name = $google_user->name;
    $google_id = $google_user->id;

    // kiểm tra user đã có trong DB chưa
    $result = $conn->query("SELECT * FROM tbl_nguoidung WHERE tendangnhap='$email'");
    if ($result->num_rows == 0) {
        $conn->query("INSERT INTO tbl_nguoidung (hotennguoidung, tendangnhap, matkhau) VALUES ('$name', '$email', '$google_id')");
    }

    session_start();
    $_SESSION['user'] = $name;

    header("Location: index.php");
    exit;
}
