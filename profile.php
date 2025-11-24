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
    <title>Hồ sơ - Gốm Sứ Tinh Hoa</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/profile.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header (giống các trang khác) -->
    <?php include 'header.php'; ?>
    <!-- Profile Section -->
    <section class="profile-section">
        <div class="container">
            <div class="profile-header">
                <h1 class="page-title">Hồ Sơ Của Tôi</h1>
                <div class="breadcrumb">
                    <a href="index.php">Trang chủ</a> / <span>Hồ sơ</span>
                </div>
            </div>

            <div class="profile-layout">
                <!-- Sidebar -->
                <aside class="profile-sidebar">
                    <div class="user-info">
                        <div class="user-avatar">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Avatar">
                            <button class="edit-avatar">
                                <i class="fas fa-camera"></i>
                            </button>
                        </div>
                        <div class="user-details">
                            <?php if ($isLoggedIn): ?>
                            <h3 class="user-name"><?php echo htmlspecialchars($userName); ?></h3>
                            <p class="user-email"><?php echo htmlspecialchars($_SESSION['user_email'] ?? ''); ?></p>
                            <p class="user-phone"><?php echo htmlspecialchars($_SESSION['user_phone'] ?? ''); ?></p>
                            <?php else: ?>
                            <h3 class="user-name">Khách hàng</h3>
                            <p class="user-email">Chưa đăng nhập</p>
                            <p class="user-phone">Chưa đăng nhập</p>
                            <?php endif; ?>
                        </div>
                    </div>

                    <nav class="profile-nav">
                        <a href="#personal" class="nav-item active" data-tab="personal">
                            <i class="fas fa-user"></i>
                            Thông tin cá nhân
                        </a>
                        <a href="#orders" class="nav-item" data-tab="orders">
                            <i class="fas fa-shopping-bag"></i>
                            Đơn hàng của tôi
                            <span class="order-count">3</span>
                        </a>
                        <a href="#addresses" class="nav-item" data-tab="addresses">
                            <i class="fas fa-map-marker-alt"></i>
                            Sổ địa chỉ
                        </a>
                        <a href="#wishlist" class="nav-item" data-tab="wishlist">
                            <i class="fas fa-heart"></i>
                            Sản phẩm yêu thích
                            <span class="wishlist-count">5</span>
                        </a>
                        <a href="#change-password" class="nav-item" data-tab="change-password">
                            <i class="fas fa-lock"></i>
                            Đổi mật khẩu
                        </a>
                    </nav>
                </aside>

                <!-- Main Content -->
                <main class="profile-content">
                    <!-- Personal Information Tab -->
                    <div class="tab-content active" id="personal-tab">
                        <div class="tab-header">
                            <h2>Thông Tin Cá Nhân</h2>
                            <button class="btn btn-primary" id="editPersonalInfo">
                                <i class="fas fa-edit"></i> Chỉnh sửa
                            </button>
                        </div>

                        <form class="profile-form" id="personalForm">
                                <div class="form-group">
                                    <label for="profileFirstName">Họ Tên</label>
                                    <?php if ($isLoggedIn): ?>
                                    <input type="text" id="profileName" name="Name" value="<?php echo htmlspecialchars($_SESSION['user_name'] ?? ''); ?>" readonly>
                                    <?php else: ?>
                                    <input type="text" id="profileName" name="Name" value="" readonly>
                                    <?php endif; ?>
                                </div>
                    

                            <div class="form-group">
                                <label for="profileEmail">Email</label>
                                <?php if ($isLoggedIn): ?>
                                <input type="email" id="profileEmail" name="email" value="<?php echo htmlspecialchars($_SESSION['user_email'] ?? ''); ?>" readonly>
                                <?php else: ?>
                                <input type="email" id="profileEmail" name="email" value="" readonly>
                                <?php endif; ?>
                            </div>

                            <div class="form-group">
                                <label for="profilePhone">Số điện thoại</label>
                                <?php if ($isLoggedIn): ?>
                                <input type="tel" id="profilePhone" name="phone" value="<?php echo htmlspecialchars($_SESSION['user_phone'] ?? ''); ?>" readonly>
                                <?php else: ?>
                                <input type="tel" id="profilePhone" name="phone" value="" readonly>
                                <?php endif; ?>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="profileBirthday">Ngày sinh</label>
                                    <input type="date" id="profileBirthday" name="birthday" value="1990-01-01" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="profileGender">Giới tính</label>
                                    <select id="profileGender" name="gender" disabled>
                                        <option value="male" selected>Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="other">Khác</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-actions" style="display: none;" id="personalFormActions">
                                <button type="button" class="btn btn-secondary" id="cancelPersonalEdit">Hủy</button>
                                <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>

                    <!-- Orders Tab -->
                    <div class="tab-content" id="orders-tab">
                        <div class="tab-header">
                            <h2>Lịch Sử Đơn Hàng</h2>
                        </div>

                        <div class="orders-list">
                            <!-- Order items will be loaded here -->
                        </div>
                    </div>

                    <!-- Addresses Tab -->
                    <div class="tab-content" id="addresses-tab">
                        <div class="tab-header">
                            <h2>Sổ Địa Chỉ</h2>
                            <button class="btn btn-primary" id="addNewAddress">
                                <i class="fas fa-plus"></i> Thêm địa chỉ mới
                            </button>
                        </div>

                        <div class="addresses-list">
                            <!-- Address cards will be loaded here -->
                        </div>
                    </div>

                    <!-- Wishlist Tab -->
                    <div class="tab-content" id="wishlist-tab">
                        <div class="tab-header">
                            <h2>Sản Phẩm Yêu Thích</h2>
                        </div>

                        <div class="wishlist-grid">
                            <!-- Wishlist items will be loaded here -->
                        </div>
                    </div>

                    <!-- Change Password Tab -->
                    <div class="tab-content" id="change-password-tab">
                        <div class="tab-header">
                            <h2>Đổi Mật Khẩu</h2>
                        </div>

                        <form class="profile-form" id="passwordForm">
                            <div class="form-group">
                                <label for="currentPassword">Mật khẩu hiện tại</label>
                                <div class="password-input">
                                    <input type="password" id="currentPassword" name="currentPassword" required>
                                    <button type="button" class="toggle-password">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="newPassword">Mật khẩu mới</label>
                                <div class="password-input">
                                    <input type="password" id="newPassword" name="newPassword" required>
                                    <button type="button" class="toggle-password">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                                <div class="password-strength">
                                    <div class="strength-bar">
                                        <div class="strength-fill" id="passwordStrength"></div>
                                    </div>
                                    <span class="strength-text" id="passwordText">Độ mạnh mật khẩu</span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="confirmNewPassword">Xác nhận mật khẩu mới</label>
                                <div class="password-input">
                                    <input type="password" id="confirmNewPassword" name="confirmNewPassword" required>
                                    <button type="button" class="toggle-password">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                                <div class="form-error" id="passwordMatchError"></div>
                            </div>

                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">Đổi mật khẩu</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    </section>

    <!-- Add Address Modal -->
    <div class="modal" id="addressModal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Thêm Địa Chỉ Mới</h2>
            <form id="addressForm">
                <!-- Address form fields -->
            </form>
        </div>
    </div>

    <script src="js/main.js"></script>
    <script src="js/profile.js"></script>
</body>
</html>