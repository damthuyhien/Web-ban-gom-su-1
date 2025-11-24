<?php
require_once 'vendor/autoload.php';

try {
    $client = new Google_Client();
    echo "✅ Google API Client đã được cài đặt thành công!<br>";
    echo "✅ Phiên bản: " . Google_Client::LIBVER . "<br>";
    
    // Kiểm tra các scope
    $client->addScope('email');
    $client->addScope('profile');
    echo "✅ Scopes: " . implode(', ', $client->getScopes()) . "<br>";
    
} catch (Exception $e) {
    echo "❌ Lỗi: " . $e->getMessage() . "<br>";
    echo "Chi tiết lỗi: <pre>";
    var_dump($e);
    echo "</pre>";
}
?>