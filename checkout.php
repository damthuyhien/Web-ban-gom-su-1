<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thanh toán - Gốm Sứ Tinh Hoa</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/checkout.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header (giống các trang khác) -->
    <?php include 'header.php'; ?>
    <!-- Checkout Section -->
    <section class="checkout-section">
        <div class="container">
            <div class="checkout-header">
                <h1 class="page-title">Thanh Toán</h1>
                <div class="breadcrumb">
                    <a href="index.php">Trang chủ</a> / 
                    <a href="cart.php">Giỏ hàng</a> / 
                    <span>Thanh toán</span>
                </div>
            </div>

            <div class="checkout-layout">
                <div class="checkout-form">
                    <form id="checkoutForm">
                        <!-- Shipping Information -->
                        <div class="form-section">
                            <h3 class="section-title">
                                <i class="fas fa-truck"></i>
                                Thông tin giao hàng
                            </h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="fullName">Họ và tên *</label>
                                    <input type="text" id="fullName" name="fullName" required>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="email">Email *</label>
                                    <input type="email" id="email" name="email" required>
                                </div>
                                <div class="form-group">
                                    <label for="phone">Số điện thoại *</label>
                                    <input type="tel" id="phone" name="phone" required>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="address">Địa chỉ *</label>
                                <input type="text" id="address" name="address" required>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="city">Tỉnh/Thành phố *</label>
                                    <select id="city" name="city" required>
                                        <option value="">Chọn tỉnh/thành phố</option>
                                        <option value="hanoi">Hà Nội</option>
                                        <option value="hcm">TP. Hồ Chí Minh</option>
                                        <option value="danang">Đà Nẵng</option>
                                        <!-- Add more cities -->
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="district">Quận/Huyện *</label>
                                    <select id="district" name="district" required>
                                        <option value="">Chọn quận/huyện</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="notes">Ghi chú đơn hàng (tùy chọn)</label>
                                <textarea id="notes" name="notes" rows="3" placeholder="Ghi chú về đơn hàng, ví dụ: thời gian giao hàng..."></textarea>
                            </div>
                        </div>

                        <!-- Payment Method -->
                        <div class="form-section">
                            <h3 class="section-title">
                                <i class="fas fa-credit-card"></i>
                                Phương thức thanh toán
                            </h3>
                            
                            <div class="payment-methods">
                                <div class="payment-method">
                                    <input type="radio" id="cod" name="paymentMethod" value="cod" checked>
                                    <label for="cod">
                                        <i class="fas fa-money-bill-wave"></i>
                                        <span>Thanh toán khi nhận hàng (COD)</span>
                                    </label>
                                </div>
                                
                                <div class="payment-method">
                                    <input type="radio" id="banking" name="paymentMethod" value="banking">
                                    <label for="banking">
                                        <i class="fas fa-university"></i>
                                        <span>Chuyển khoản ngân hàng</span>
                                    </label>
                                </div>
                                
                                <div class="payment-method">
                                    <input type="radio" id="momo" name="paymentMethod" value="momo">
                                    <label for="momo">
                                        <i class="fas fa-mobile-alt"></i>
                                        <span>Ví điện tử MoMo</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div class="payment-info" id="bankingInfo" style="display: none;">
                                <div class="bank-info">
                                    <h4>Thông tin chuyển khoản</h4>
                                    <div class="bank-details">
                                        <div class="bank-detail">
                                            <span>Ngân hàng:</span>
                                            <strong>Vietcombank</strong>
                                        </div>
                                        <div class="bank-detail">
                                            <span>Số tài khoản:</span>
                                            <strong>0123456789</strong>
                                        </div>
                                        <div class="bank-detail">
                                            <span>Chủ tài khoản:</span>
                                            <strong>CÔNG TY TNHH GỐM SỨ TINH HOA</strong>
                                        </div>
                                        <div class="bank-detail">
                                            <span>Nội dung chuyển khoản:</span>
                                            <strong>Mã đơn hàng + Số điện thoại</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-actions">
                            <a href="cart.php" class="btn btn-secondary">
                                <i class="fas fa-arrow-left"></i> Quay lại giỏ hàng
                            </a>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-lock"></i> Hoàn tất đơn hàng
                            </button>
                        </div>
                    </form>
                </div>

                <div class="order-summary">
                    <div class="summary-card">
                        <h3 class="summary-title">Đơn hàng của bạn</h3>
                        
                        <div class="order-items">
                            <!-- Order items will be loaded here -->
                        </div>
                        
                        <div class="summary-details">
                            <div class="summary-row">
                                <span>Tạm tính:</span>
                                <span id="orderSubtotal">0₫</span>
                            </div>
                            
                            <div class="summary-row">
                                <span>Phí vận chuyển:</span>
                                <span id="orderShipping">0₫</span>
                            </div>
                            
                            <div class="summary-row">
                                <span>Giảm giá:</span>
                                <span id="orderDiscount">-0₫</span>
                            </div>
                            
                            <div class="summary-divider"></div>
                            
                            <div class="summary-row total">
                                <span>Tổng cộng:</span>
                                <span id="orderTotal">0₫</span>
                            </div>
                        </div>
                        
                        <div class="security-badges">
                            <div class="security-badge">
                                <i class="fas fa-shield-alt"></i>
                                <span>Bảo mật SSL</span>
                            </div>
                            <div class="security-badge">
                                <i class="fas fa-lock"></i>
                                <span>Thanh toán an toàn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Order Success Modal -->
    <div class="modal" id="orderSuccessModal">
        <div class="modal-content success-modal">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Đặt hàng thành công!</h2>
            <p class="success-message">Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là <strong id="orderNumber">#GH12345</strong></p>
            <p class="success-details">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.</p>
            <div class="success-actions">
                <a href="index.php" class="btn btn-primary">Tiếp tục mua sắm</a>
                <a href="profile.php" class="btn btn-secondary">Theo dõi đơn hàng</a>
            </div>
        </div>
    </div>

    <script src="js/main.js"></script>
    <script src="js/checkout.js"></script>
</body>
</html>