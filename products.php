<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sản phẩm - Gốm Sứ Tinh Hoa</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/products.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header -->
    <?php include 'header.php'; ?>

    <!-- Products Section -->
    <section class="products-section">
        <div class="container">
            <div class="products-header">
                <h1 class="page-title">Sản Phẩm Gốm Sứ</h1>
                <div class="breadcrumb">
                    <a href="index.php">Trang chủ</a> / <span>Sản phẩm</span>
                </div>
            </div>

            <div class="products-layout">
                <!-- Sidebar Filters -->
                <aside class="filters-sidebar">
                    <div class="filter-group">
                        <h3 class="filter-title">Danh mục</h3>
                        <ul class="filter-list">
                            <li><a href="#" class="active">Tất cả sản phẩm</a></li>
                            <li><a href="#">Gốm mỹ nghệ</a></li>
                            <li><a href="#">Bộ ấm chén</a></li>
                            <li><a href="#">Đồ trang trí</a></li>
                            <li><a href="#">Quà tặng</a></li>
                        </ul>
                    </div>

                    <div class="filter-group">
                        <h3 class="filter-title">Giá</h3>
                        <div class="price-range">
                            <div class="range-inputs">
                                <input type="number" placeholder="Từ" min="0" class="min-price">
                                <span>-</span>
                                <input type="number" placeholder="Đến" min="0" class="max-price">
                            </div>
                            <button class="btn btn-primary btn-small">Áp dụng</button>
                        </div>
                    </div>

                    <div class="filter-group">
                        <h3 class="filter-title">Kích thước</h3>
                        <ul class="filter-list">
                            <li><label><input type="checkbox"> Nhỏ (dưới 15cm)</label></li>
                            <li><label><input type="checkbox"> Trung bình (15-30cm)</label></li>
                            <li><label><input type="checkbox"> Lớn (trên 30cm)</label></li>
                        </ul>
                    </div>

                    <div class="filter-group">
                        <h3 class="filter-title">Màu sắc</h3>
                        <div class="color-filters">
                            <span class="color-option" style="background-color: #8b7355;" title="Nâu"></span>
                            <span class="color-option" style="background-color: #c9a96e;" title="Vàng"></span>
                            <span class="color-option" style="background-color: #1a365d;" title="Xanh"></span>
                            <span class="color-option" style="background-color: #ffffff; border: 1px solid #ccc;" title="Trắng"></span>
                            <span class="color-option" style="background-color: #000000;" title="Đen"></span>
                        </div>
                    </div>

                    <div class="filter-group">
                        <h3 class="filter-title">Sắp xếp theo</h3>
                        <select class="sort-select">
                            <option value="popular">Phổ biến nhất</option>
                            <option value="newest">Mới nhất</option>
                            <option value="price-low">Giá thấp đến cao</option>
                            <option value="price-high">Giá cao đến thấp</option>
                            <option value="name">Tên A-Z</option>
                        </select>
                    </div>

                    <button class="btn btn-secondary btn-full">Xóa bộ lọc</button>
                </aside>

                <!-- Products Grid -->
                <main class="products-main">
                    <div class="products-toolbar">
                        <div class="products-count">
                            Hiển thị <span>12</span> của <span>48</span> sản phẩm
                        </div>
                        <div class="view-options">
                            <button class="view-btn active" data-view="grid">
                                <i class="fas fa-th"></i>
                            </button>
                            <button class="view-btn" data-view="list">
                                <i class="fas fa-list"></i>
                            </button>
                        </div>
                    </div>

                    <div class="products-grid" id="productsView">
                        <!-- Product cards will be generated here -->
                    </div>

                    <!-- Pagination -->
                    <div class="pagination">
                        <a href="#" class="page-nav disabled">
                            <i class="fas fa-chevron-left"></i>
                        </a>
                        <a href="#" class="page-number active">1</a>
                        <a href="#" class="page-number">2</a>
                        <a href="#" class="page-number">3</a>
                        <a href="#" class="page-number">4</a>
                        <a href="#" class="page-nav">
                            <i class="fas fa-chevron-right"></i>
                        </a>
                    </div>
                </main>
            </div>
        </div>
    </section>

    <!-- Quick View Modal -->
    <div class="modal" id="quickViewModal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="quick-view-content">
                <!-- Content will be loaded dynamically -->
            </div>
        </div>
    </div>

    <script src="js/main.js"></script>
    <script src="js/products.js"></script>
</body>
</html>