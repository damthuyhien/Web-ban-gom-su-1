<?php  
include 'conn.php';

if(!isset($_SESSION)) 
{ 
    session_start(); 
}

// Kiểm tra trạng thái đăng nhập
$isLoggedIn = isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
$userName = $isLoggedIn ? ($_SESSION['user_name'] ?? $_SESSION['user_email']) : '';
$userRole = $isLoggedIn ? ($_SESSION['user_role'] ?? 'user') : '';
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gốm Sứ Tinh Hoa - Trang chủ</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/home.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header -->
    <?php include 'header.php'; ?>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>Nét Đẹp Tinh Hoa Gốm Việt</h1>
                <p>Khám phá bộ sưu tập gốm sứ tinh xảo, kết tinh từ bàn tay tài hoa của những nghệ nhân làng gốm truyền thống</p>
                <div class="hero-buttons">
                    <a href="products.php" class="btn btn-primary">Mua sắm ngay</a>
                    <a href="about.php" class="btn btn-secondary">Tìm hiểu thêm</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Categories -->
    <section class="featured-categories">
        <div class="container">
            <h2 class="section-title">Danh Mục Nổi Bật</h2>
            <div class="categories-grid">
                <div class="category-card">
                    <div class="category-img">
                        <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Gốm mỹ nghệ">
                    </div>
                    <div class="category-name">Gốm Mỹ Nghệ</div>
                </div>
                <div class="category-card">
                    <div class="category-img">
                        <img src="https://images.unsplash.com/photo-1594736797933-d0d69c3bc2db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Bộ ấm chén">
                    </div>
                    <div class="category-name">Bộ Ấm Chén</div>
                </div>
                <div class="category-card">
                    <div class="category-img">
                        <img src="https://images.unsplash.com/photo-1580745374183-d7fbf5f5b4da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Đồ trang trí">
                    </div>
                    <div class="category-name">Đồ Trang Trí</div>
                </div>
                <div class="category-card">
                    <div class="category-img">
                        <img src="https://images.unsplash.com/photo-1594736797933-d0d69c3bc2db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Quà tặng">
                    </div>
                    <div class="category-name">Quà Tặng</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products">
        <div class="container">
            <h2 class="section-title">Sản Phẩm Nổi Bật</h2>
            <div class="products-grid">
                <div class="product-card">
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Bình hoa gốm Bát Tràng">
                        <span class="product-badge">Bán chạy</span>
                    </div>
                    <div class="product-info">
                        <div class="product-category">Gốm mỹ nghệ</div>
                        <h3 class="product-name">Bình Hoa Gốm Bát Tràng Men Rạn Cổ</h3>
                        <div class="product-price">
                            <span class="current-price">850.000₫</span>
                            <span class="original-price">1.200.000₫</span>
                        </div>
                        <div class="product-actions">
                            <button class="add-to-cart">Thêm vào giỏ</button>
                            <button class="wishlist"><i class="far fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                <!-- Thêm các sản phẩm khác tương tự -->
            </div>
            <div style="text-align: center; margin-top: 40px;">
                <a href="products.php" class="btn btn-secondary">Xem tất cả sản phẩm</a>
            </div>
        </div>
    </section>

    <!-- About Preview -->
    <section class="about-preview">
        <div class="container">
            <div class="about-content">
                <div class="about-img">
                    <img src="https://images.unsplash.com/photo-1587334984005-5eb3dfd8d155?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Nghệ nhân làm gốm">
                </div>
                <div class="about-text">
                    <h2>Hành Trình Gốm Sứ Tinh Hoa</h2>
                    <p>Với hơn 30 năm kinh nghiệm trong lĩnh vực gốm sứ, chúng tôi tự hào mang đến những sản phẩm tinh xảo nhất...</p>
                    <div class="about-features">
                        <!-- Các tính năng -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter">
        <div class="container">
            <h2>Đăng Ký Nhận Tin</h2>
            <p>Nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và các sự kiện từ Gốm Sứ Tinh Hoa</p>
            <form class="newsletter-form">
                <input type="email" placeholder="Nhập email của bạn">
                <button type="submit">Đăng ký</button>
            </form>
        </div>
    </section>

    <script src="js/main.js"></script>
    <script src="js/home.js"></script>
</body>
</html>