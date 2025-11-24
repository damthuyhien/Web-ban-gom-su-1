<?php
// Load Composer autoloader
require_once __DIR__ . '/vendor/autoload.php';

// Khởi tạo Google Client
$client = new Google_Client();
$client->setClientId('YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com');
$client->setClientSecret('YOUR_GOOGLE_CLIENT_SECRET');
$client->setRedirectUri('http://localhost/your-project/google-callback.php');
$client->addScope('email');
$client->addScope('profile');
$client->setAccessType('offline');
$client->setPrompt('consent');

// Hoặc nếu dùng hosting thật
// $client->setRedirectUri('https://yourdomain.com/google-callback.php');
?>