// Sample product data
const products = [
    {
        id: 1,
        name: "Bình Hoa Gốm Bát Tràng Men Rạn Cổ",
        category: "Gốm mỹ nghệ",
        price: 850000,
        originalPrice: 1200000,
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Bình hoa gốm Bát Tràng với men rạn cổ truyền thống, hoa văn tinh xảo, phù hợp trang trí phòng khách, phòng làm việc.",
        rating: 4.8,
        reviewCount: 24,
        badge: "Bán chạy",
        inStock: true
    },
    {
        id: 2,
        name: "Bộ Ấm Chén Men Lam Họa Tiết Cổ",
        category: "Bộ ấm chén",
        price: 450000,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1594736797933-d0d69c3bc2db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Bộ ấm chén 6 món với men lam đặc trưng, họa tiết cổ điển mang đậm nét văn hóa Việt.",
        rating: 4.6,
        reviewCount: 18,
        badge: null,
        inStock: true
    },
    // Add more products as needed
];

// Initialize products
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
});

function renderProducts() {
    const productsContainer = document.getElementById('productsView');
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-img">
            <img src="${product.image}" alt="${product.name}">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-actions-overlay">
                <button class="quick-view-btn" data-product="${product.id}">
                    <i class="fas fa-eye"></i> Xem nhanh
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-description">${product.description}</div>
            <div class="product-price">
                <span class="current-price">${formatPrice(product.price)}</span>
                ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>
            <div class="product-rating">
                <div class="rating-stars">
                    ${generateStarRating(product.rating)}
                </div>
                <span class="rating-count">(${product.reviewCount})</span>
            </div>
            <div class="product-actions">
                <button class="add-to-cart" data-product="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Thêm giỏ
                </button>
                <button class="wishlist" data-product="${product.id}">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    return card;
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function setupEventListeners() {
    // View toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsView = document.getElementById('productsView');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update view
            productsView.className = 'products-grid';
            if (viewType === 'list') {
                productsView.classList.add('list-view');
            }
        });
    });
    
    // Quick view modal
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const modal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            openQuickView(productId);
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Color filter
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            addToCart(productId);
        });
    });
    
    // Wishlist
    document.querySelectorAll('.wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            toggleWishlist(productId, this);
        });
    });
}

function openQuickView(productId) {
    const product = products.find(p => p.id == productId);
    const modal = document.getElementById('quickViewModal');
    const content = modal.querySelector('.quick-view-content');
    
    if (product) {
        content.innerHTML = `
            <div class="quick-view-product">
                <div class="product-images">
                    <div class="main-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                </div>
                <div class="product-details">
                    <h2>${product.name}</h2>
                    <div class="product-category">${product.category}</div>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <div class="product-rating">
                        <div class="rating-stars">
                            ${generateStarRating(product.rating)}
                        </div>
                        <span class="rating-count">${product.rating} (${product.reviewCount} đánh giá)</span>
                    </div>
                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>
                    <div class="product-actions">
                        <div class="quantity-selector">
                            <label>Số lượng:</label>
                            <div class="quantity-controls">
                                <button class="quantity-btn minus">-</button>
                                <input type="number" value="1" min="1" class="quantity-input">
                                <button class="quantity-btn plus">+</button>
                            </div>
                        </div>
                        <button class="btn btn-primary add-to-cart-full" data-product="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng
                        </button>
                        <button class="btn btn-secondary wishlist-full" data-product="${product.id}">
                            <i class="far fa-heart"></i> Yêu thích
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        
        // Add event listeners for quick view actions
        setupQuickViewEvents();
    }
}

function setupQuickViewEvents() {
    // Quantity controls
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    minusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
    
    // Add to cart from quick view
    document.querySelector('.add-to-cart-full').addEventListener('click', function() {
        const productId = this.getAttribute('data-product');
        const quantity = parseInt(document.querySelector('.quantity-input').value);
        addToCart(productId, quantity);
    });
    
    // Wishlist from quick view
    document.querySelector('.wishlist-full').addEventListener('click', function() {
        const productId = this.getAttribute('data-product');
        toggleWishlist(productId, this);
    });
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id == productId);
    if (product) {
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = parseInt(cartCount.textContent) + quantity;
        
        // Show success message
        alert(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng!`);
        
        // Close modal if open
        const modal = document.getElementById('quickViewModal');
        modal.classList.remove('active');
    }
}

function toggleWishlist(productId, button) {
    const product = products.find(p => p.id == productId);
    const icon = button.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.style.color = 'var(--accent-gold)';
        alert(`Đã thêm "${product.name}" vào danh sách yêu thích!`);
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.style.color = '';
        alert(`Đã xóa "${product.name}" khỏi danh sách yêu thích!`);
    }
}