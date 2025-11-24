<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giỏ hàng - Gốm Sứ Tinh Hoa</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/cart.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header (giống các trang khác) -->
    <?php include 'header.php'; ?>
    <!-- Cart Section -->
    <section class="cart-section">
        <div class="container">
            <div class="cart-header">
                <h1 class="page-title">Giỏ Hàng</h1>
                <div class="breadcrumb">
                    <a href="index.php">Trang chủ</a> / <span>Giỏ hàng</span>
                </div>
            </div>

            <div class="cart-layout">
                <div class="cart-items">
                    <div class="cart-table-header">
                        <div class="col-product">Sản phẩm</div>
                        <div class="col-price">Giá</div>
                        <div class="col-quantity">Số lượng</div>
                        <div class="col-total">Tổng</div>
                        <div class="col-remove"></div>
                    </div>

                    <div class="cart-items-list">
                        <!-- Cart items will be loaded here -->
                    </div>

                    <div class="cart-actions">
                        <a href="products.php" class="btn btn-secondary">
                            <i class="fas fa-arrow-left"></i> Tiếp tục mua sắm
                        </a>
                        <button class="btn btn-secondary" id="clearCart">
                            <i class="fas fa-trash"></i> Xóa giỏ hàng
                        </button>
                    </div>
                </div>

                <div class="cart-summary">
                    <div class="summary-card">
                        <h3 class="summary-title">Tóm tắt đơn hàng</h3>
                        
                        <div class="summary-row">
                            <span>Tạm tính:</span>
                            <span id="subtotal">0₫</span>
                        </div>
                        
                        <div class="summary-row">
                            <span>Phí vận chuyển:</span>
                            <span id="shipping">0₫</span>
                        </div>
                        
                        <div class="summary-row">
                            <span>Giảm giá:</span>
                            <span id="discount">-0₫</span>
                        </div>
                        
                        <div class="summary-divider"></div>
                        
                        <div class="summary-row total">
                            <span>Tổng cộng:</span>
                            <span id="total">0₫</span>
                        </div>

                        <div class="coupon-section">
                            <input type="text" placeholder="Mã giảm giá" id="couponCode">
                            <button class="btn btn-primary" id="applyCoupon">Áp dụng</button>
                        </div>

                        <a href="checkout.php" class="btn btn-primary btn-full" id="checkoutBtn">
                            Tiến hành thanh toán
                        </a>

                        <div class="security-info">
                            <div class="security-item">
                                <i class="fas fa-shield-alt"></i>
                                <span>Thanh toán an toàn</span>
                            </div>
                            <div class="security-item">
                                <i class="fas fa-truck"></i>
                                <span>Miễn phí vận chuyển đơn từ 1.000.000₫</span>
                            </div>
                            <div class="security-item">
                                <i class="fas fa-undo"></i>
                                <span>Đổi trả trong 7 ngày</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="js/main.js"></script>
    <script src="js/cart.js"></script>
</body>
</html>