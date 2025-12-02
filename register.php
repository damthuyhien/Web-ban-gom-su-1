<?php
require 'conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Kiểm tra và làm sạch dữ liệu
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';
    $trangthai = 1;
    $vaitro = 'user';
    
    $errors = [];
    
    // Kiểm tra dữ liệu không rỗng
    if (empty($name)) $errors[] = "Vui lòng nhập họ tên";
    if (empty($email)) $errors[] = "Vui lòng nhập email";
    if (empty($password)) $errors[] = "Vui lòng nhập mật khẩu";
    if (empty($confirmPassword)) $errors[] = "Vui lòng xác nhận mật khẩu";
    
    // Kiểm tra email hợp lệ
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email không hợp lệ";
    }
    
    // Kiểm tra mật khẩu khớp
    if ($password !== $confirmPassword) {
        $errors[] = "Mật khẩu xác nhận không khớp";
    }
    
    // Kiểm tra độ dài mật khẩu
    if (strlen($password) < 6) {
        $errors[] = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    
    // Kiểm tra email đã tồn tại chưa
    if (empty($errors)) {
        $check_email = $conn->prepare("SELECT manguoidung FROM tbl_nguoidung WHERE tendangnhap = ?");
        $check_email->bind_param("s", $email);
        $check_email->execute();
        $check_email->store_result();
        
        if ($check_email->num_rows > 0) {
            $errors[] = "Email này đã được đăng ký";
        }
        $check_email->close();
    }
    
    // Nếu có lỗi, hiển thị và dừng
    if (!empty($errors)) {
        $error_message = implode("<br>", $errors);
        echo "<script>alert('$error_message');</script>";
    } else {
        // Hash mật khẩu
        $pass = password_hash($password, PASSWORD_DEFAULT);
        
        // Sử dụng prepared statement để tránh SQL injection
        $query = "INSERT INTO tbl_nguoidung (hotennguoidung, tendangnhap, matkhau, trangthai, vaitro) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        
        if ($stmt) {
            $stmt->bind_param("sssss", $name, $email, $pass, $trangthai, $vaitro);
            
            if ($stmt->execute()) {
                echo "<script>
                    document.getElementById('successModal').style.display = 'block';
                </script>";
            } else {
                echo "<script>alert('Lỗi hệ thống: " . $stmt->error . "');</script>";
            }
            
            $stmt->close();
        } else {
            echo "<script>alert('Lỗi hệ thống: " . $conn->error . "');</script>";
        }
    }
    
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng ký - Gốm Sứ Tinh Hoa</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/auth.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header -->
    <?php include 'header.php'; ?>

    <!-- Register Section -->
    <section class="auth-section">
        <div class="container">
            <div class="auth-container">
                <div class="auth-form">
                    <h2>Tạo Tài Khoản</h2>
                    <form id="registerForm" method="POST" action="">
                        <div class="form-group">
                            <label for="firstName">Họ Tên</label>
                            <input type="text" id="name" name="name" required>
                        </div>

                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                            <div class="form-error" id="emailError"></div>
                        </div>

                        <!-- <div class="form-group">
                            <label for="phone">Số điện thoại</label>
                            <input type="tel" id="phone" name="phone" required>
                            <div class="form-error" id="phoneError"></div>
                        </div> -->

                        <div class="form-group">
                            <label for="password">Mật khẩu</label>
                            <div class="password-input">
                                <input type="password" id="password" name="password" required>
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
                            <label for="confirmPassword">Xác nhận mật khẩu</label>
                            <div class="password-input">
                                <input type="password" id="confirmPassword" name="confirmPassword" required>
                                <button type="button" class="toggle-password">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                            <div class="form-error" id="confirmPasswordError"></div>
                        </div>

                        <!-- <div class="form-group">
                            <label for="birthday">Ngày sinh</label>
                            <input type="date" id="birthday" name="birthday">
                        </div>

                        <div class="form-group">
                            <label for="gender">Giới tính</label>
                            <select id="gender" name="gender">
                                <option value="">Chọn giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>

                        <div class="form-options">
                            <label class="checkbox">
                                <input type="checkbox" name="newsletter" checked>
                                <span class="checkmark"></span>
                                Nhận thông tin khuyến mãi qua email
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" name="terms" required>
                                <span class="checkmark"></span>
                                Tôi đồng ý với <a href="terms.php" target="_blank">Điều khoản dịch vụ</a> và <a href="privacy.php" target="_blank">Chính sách bảo mật</a> *
                            </label>
                        </div> -->

                        <button type="submit" class="btn btn-primary btn-full" id="registerBtn">
                            <i class="fas fa-user-plus"></i> Đăng Ký
                        </button>
                    </form>

                    <div class="auth-divider">
                        <span>Hoặc đăng ký với</span>
                    </div>

                    <div class="social-login">
                        <button type="button" class="btn btn-social btn-google">
                            <a href="google-callback.php"></a>
                            <i class="fab fa-google"></i>
                            Google
                        </button>
                        <button type="button" class="btn btn-social btn-facebook">
                            <i class="fab fa-facebook-f"></i>
                            Facebook
                        </button>
                    </div>

                    <div class="auth-switch">
                        Đã có tài khoản? <a href="login.php">Đăng nhập ngay</a>
                    </div>
                </div>

                <div class="auth-image">
                    <img src="https://images.unsplash.com/photo-1580745374183-d7fbf5f5b4da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Gốm sứ tinh xảo">
                    <div class="auth-benefits">
                        <h3>Lợi ích khi đăng ký</h3>
                        <ul>
                            <li><i class="fas fa-check"></i> Theo dõi đơn hàng dễ dàng</li>
                            <li><i class="fas fa-check"></i> Lưu địa chỉ giao hàng</li>
                            <li><i class="fas fa-check"></i> Nhận ưu đãi đặc biệt</li>
                            <li><i class="fas fa-check"></i> Xem lịch sử mua hàng</li>
                            <li><i class="fas fa-check"></i> Tích lũy điểm thưởng</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Success Modal -->
    <div class="modal" id="successModal">
        <div class="modal-content success-modal">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Đăng Ký Thành Công!</h2>
            <p class="success-message">Chào mừng bạn đến với Gốm Sứ Tinh Hoa</p>
            <p class="success-details">Tài khoản của bạn đã được tạo thành công. Vui lòng kiểm tra email để xác thực tài khoản.</p>
            <div class="success-actions">
                <a href="login.php" class="btn btn-primary">Đăng nhập ngay</a>
                <a href="index.php" class="btn btn-secondary">Về trang chủ</a>
            </div>
        </div>
    </div>

    <script src="js/main.js"></script>
    <script src="js/register.js"></script>
</body>
</html>