<?php
// header.php
if(!isset($_SESSION)) 
{ 
    session_start(); 
}

// Kiểm tra trạng thái đăng nhập
$isLoggedIn = isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
$userName = $isLoggedIn ? ($_SESSION['user_name'] ?? $_SESSION['user_email']) : '';
$userRole = $isLoggedIn ? ($_SESSION['user_role'] ?? 'user') : '';
?>

<header>
        <div class="header-top">
            <div class="container">
                <div class="header-contact">
                    <span><i class="fas fa-phone"></i> 0123 456 789</span>
                    <span><i class="fas fa-envelope"></i> info@gomsutinhhoa.vn</span>
                </div>
                <div class="header-actions">
                    <?php if ($isLoggedIn): ?>
                        <span>Xin chào, <?php echo htmlspecialchars($userName); ?></span>
                        <a href="logout.php">Đăng xuất</a>
                    <?php else: ?>
                        <a href="login.php">Đăng nhập</a>
                        <a href="register.php">Đăng ký</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <div class="header-main">
            <div class="container">
                <div class="logo">
                    <div class="logo-placeholder">
                        <i class="fas fa-vase"></i>
                    </div>
                    <div class="logo-text">Gốm Sứ <span>Tinh Hoa</span></div>
                </div>
                <div class="search-bar">
                    <input type="text" placeholder="Tìm kiếm sản phẩm...">
                    <button><i class="fas fa-search"></i></button>
                </div>
                <div class="header-icons">
                    <a href="profile.php"><i class="fas fa-user"></i></a>
                    <a href="wishlist.php"><i class="fas fa-heart"></i></a>
                    <a href="cart.php">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count">3</span>
                    </a>
                </div>
                <button class="mobile-menu-btn">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
        <nav>
            <div class="container">
                <ul class="nav-menu">
                    <li><a href="index.php">Trang chủ</a></li>
                    <li>
                        <a href="products.php">Sản phẩm <i class="fas fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="products.php?category=1">Gốm mỹ nghệ</a></li>
                            <li><a href="products.php?category=2">Bộ ấm chén</a></li>
                            <li><a href="products.php?category=3">Đồ trang trí</a></li>
                            <li><a href="products.php?category=4">Quà tặng</a></li>
                        </ul>
                    </li>
                    <li><a href="about.php">Về chúng tôi</a></li>
                    <li><a href="contact.php">Liên hệ</a></li>
                </ul>
            </div>
        </nav>
    </header>