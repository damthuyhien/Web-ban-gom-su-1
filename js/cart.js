// Sample cart data
let cartItems = [
    {
        id: 1,
        name: "Bình Hoa Gốm Bát Tràng Men Rạn Cổ",
        category: "Gốm mỹ nghệ",
        price: 850000,
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        quantity: 1
    },
    {
        id: 2,
        name: "Bộ Ấm Chén Men Lam Họa Tiết Cổ",
        category: "Bộ ấm chén",
        price: 450000,
        image: "https://images.unsplash.com/photo-1594736797933-d0d69c3bc2db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        quantity: 2
    }
];

// Initialize cart
document.addEventListener('DOMContentLoaded', function() {
    renderCartItems();
    updateCartSummary();
    setupEventListeners();
});

function renderCartItems() {
    const cartContainer = document.querySelector('.cart-items-list');
    
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h3>Giỏ hàng của bạn đang trống</h3>
                <p>Hãy khám phá các sản phẩm gốm sứ tinh xảo của chúng tôi và thêm vào giỏ hàng.</p>
                <a href="products.html" class="btn btn-primary">Mua sắm ngay</a>
            </div>
        `;
        document.querySelector('.cart-actions').style.display = 'none';
        document.querySelector('.cart-table-header').style.display = 'none';
        return;
    }
    
    cartContainer.innerHTML = '';
    
    cartItems.forEach(item => {
        const cartItem = createCartItem(item);
        cartContainer.appendChild(cartItem);
    });
}

function createCartItem(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.setAttribute('data-id', item.id);
    
    const total = item.price * item.quantity;
    
    itemElement.innerHTML = `
        <div class="cart-product">
            <div class="cart-product-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-product-info">
                <div class="cart-product-name">${item.name}</div>
                <div class="cart-product-category">${item.category}</div>
            </div>
        </div>
        <div class="cart-product-price">${formatPrice(item.price)}</div>
        <div class="cart-quantity">
            <button class="quantity-btn minus" data-id="${item.id}">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
            <button class="quantity-btn plus" data-id="${item.id}">+</button>
        </div>
        <div class="cart-item-total">${formatPrice(total)}</div>
        <div class="cart-remove">
            <button class="remove-btn" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    return itemElement;
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function updateCartSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 1000000 ? 0 : 30000;
    const discount = 0; // Could be calculated based on coupons
    const total = subtotal + shipping - discount;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = formatPrice(shipping);
    document.getElementById('discount').textContent = formatPrice(-discount);
    document.getElementById('total').textContent = formatPrice(total);
    
    // Update cart count in header
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
    
    // Disable checkout if cart is empty
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (cartItems.length === 0) {
        checkoutBtn.style.opacity = '0.6';
        checkoutBtn.style.pointerEvents = 'none';
    } else {
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.pointerEvents = 'auto';
    }
}

function setupEventListeners() {
    // Quantity controls
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const isPlus = e.target.classList.contains('plus');
            updateQuantity(itemId, isPlus);
        }
    });
    
    // Quantity input changes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                setQuantity(itemId, newQuantity);
            } else {
                e.target.value = 1;
                setQuantity(itemId, 1);
            }
        }
    });
    
    // Remove items
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-btn')) {
            const itemId = parseInt(e.target.closest('.remove-btn').getAttribute('data-id'));
            removeFromCart(itemId);
        }
    });
    
    // Clear cart
    document.getElementById('clearCart').addEventListener('click', function() {
        if (cartItems.length > 0 && confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
            cartItems = [];
            renderCartItems();
            updateCartSummary();
            showNotification('Đã xóa tất cả sản phẩm khỏi giỏ hàng', 'success');
        }
    });
    
    // Apply coupon
    document.getElementById('applyCoupon').addEventListener('click', function() {
        const couponCode = document.getElementById('couponCode').value.trim();
        if (couponCode) {
            applyCoupon(couponCode);
        } else {
            showNotification('Vui lòng nhập mã giảm giá', 'error');
        }
    });
    
    // Enter key for coupon
    document.getElementById('couponCode').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('applyCoupon').click();
        }
    });
}

function updateQuantity(itemId, isPlus) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        if (isPlus) {
            item.quantity += 1;
        } else if (item.quantity > 1) {
            item.quantity -= 1;
        }
        
        updateCartItem(item);
        updateCartSummary();
    }
}

function setQuantity(itemId, quantity) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.quantity = quantity;
        updateCartItem(item);
        updateCartSummary();
    }
}

function updateCartItem(updatedItem) {
    const itemElement = document.querySelector(`.cart-item[data-id="${updatedItem.id}"]`);
    if (itemElement) {
        const quantityInput = itemElement.querySelector('.quantity-input');
        const totalElement = itemElement.querySelector('.cart-item-total');
        
        quantityInput.value = updatedItem.quantity;
        totalElement.textContent = formatPrice(updatedItem.price * updatedItem.quantity);
    }
}

function removeFromCart(itemId) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
        cartItems = cartItems.filter(item => item.id !== itemId);
        renderCartItems();
        updateCartSummary();
        showNotification('Đã xóa sản phẩm khỏi giỏ hàng', 'success');
    }
}

function applyCoupon(code) {
    // Simulate coupon validation
    const validCoupons = {
        'WELCOME10': 0.1,  // 10% discount
        'FIRSTORDER': 0.15, // 15% discount
        'FREESHIP': 'freeship' // Free shipping
    };
    
    if (validCoupons[code]) {
        showNotification(`Áp dụng mã giảm giá thành công!`, 'success');
        // In a real application, you would calculate the discount here
    } else {
        showNotification('Mã giảm giá không hợp lệ hoặc đã hết hạn', 'error');
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles for notification
    if (!document.querySelector('.notification-styles')) {
        const styles = document.createElement('style');
        styles.className = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: var(--border-radius);
                box-shadow: var(--box-shadow);
                border-left: 4px solid var(--primary-dark);
                z-index: 3000;
                animation: slideInRight 0.3s ease;
                max-width: 350px;
            }
            
            .notification.success {
                border-left-color: #27ae60;
            }
            
            .notification.error {
                border-left-color: #e74c3c;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification.success i {
                color: #27ae60;
            }
            
            .notification.error i {
                color: #e74c3c;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export functions for use in other files
window.cartManager = {
    addToCart: function(product, quantity = 1) {
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        renderCartItems();
        updateCartSummary();
        showNotification(`Đã thêm "${product.name}" vào giỏ hàng`, 'success');
    },
    
    getCartItems: function() {
        return cartItems;
    },
    
    getCartTotal: function() {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
};