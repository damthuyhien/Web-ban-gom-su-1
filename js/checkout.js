// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCheckout();
});

function initializeCheckout() {
    loadOrderSummary();
    setupEventListeners();
    setupAddressSelection();
}

function loadOrderSummary() {
    const orderItemsContainer = document.querySelector('.order-items');
    const cartItems = window.cartManager ? window.cartManager.getCartItems() : [];
    
    if (cartItems.length === 0) {
        orderItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-cart"></i>
                <p>Giỏ hàng của bạn đang trống</p>
                <a href="products.html" class="btn btn-primary">Mua sắm ngay</a>
            </div>
        `;
        return;
    }
    
    orderItemsContainer.innerHTML = '';
    
    cartItems.forEach(item => {
        const orderItem = createOrderItem(item);
        orderItemsContainer.appendChild(orderItem);
    });
    
    updateOrderSummary();
}

function createOrderItem(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'order-item';
    
    const total = item.price * item.quantity;
    
    itemElement.innerHTML = `
        <div class="order-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="order-item-info">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-details">
                <span>${item.quantity} × ${formatPrice(item.price)}</span>
                <span class="order-item-price">${formatPrice(total)}</span>
            </div>
        </div>
    `;
    
    return itemElement;
}

function updateOrderSummary() {
    const cartItems = window.cartManager ? window.cartManager.getCartItems() : [];
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 1000000 ? 0 : 30000;
    const discount = 0;
    const total = subtotal + shipping - discount;
    
    document.getElementById('orderSubtotal').textContent = formatPrice(subtotal);
    document.getElementById('orderShipping').textContent = formatPrice(shipping);
    document.getElementById('orderDiscount').textContent = formatPrice(-discount);
    document.getElementById('orderTotal').textContent = formatPrice(total);
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function setupEventListeners() {
    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            updatePaymentInfo(this.value);
        });
    });
    
    // Form submission
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processCheckout();
    });
    
    // City selection
    const citySelect = document.getElementById('city');
    citySelect.addEventListener('change', function() {
        updateDistricts(this.value);
    });
}

function setupAddressSelection() {
    // Sample address data
    const addressData = {
        hanoi: [
            'Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Đống Đa', 'Cầu Giấy',
            'Thanh Xuân', 'Hoàng Mai', 'Long Biên', 'Nam Từ Liêm', 'Bắc Từ Liêm'
        ],
        hcm: [
            'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5',
            'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10'
        ],
        danang: [
            'Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu'
        ]
    };
    
    window.addressData = addressData;
}

function updateDistricts(city) {
    const districtSelect = document.getElementById('district');
    districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';
    
    if (city && window.addressData[city]) {
        window.addressData[city].forEach(district => {
            const option = document.createElement('option');
            option.value = district.toLowerCase().replace(/\s+/g, '-');
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

function updatePaymentInfo(paymentMethod) {
    const bankingInfo = document.getElementById('bankingInfo');
    
    if (paymentMethod === 'banking') {
        bankingInfo.style.display = 'block';
    } else {
        bankingInfo.style.display = 'none';
    }
}

function processCheckout() {
    const form = document.getElementById('checkoutForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Validate form
    if (!validateCheckoutForm()) {
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const formData = getFormData();
        const orderData = {
            ...formData,
            items: window.cartManager ? window.cartManager.getCartItems() : [],
            orderTotal: calculateOrderTotal(),
            orderNumber: generateOrderNumber()
        };
        
        console.log('Order data:', orderData);
        
        // Show success modal
        showOrderSuccess(orderData.orderNumber);
        
        // Clear cart
        if (window.cartManager) {
            window.cartManager.clearCart();
        }
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function validateCheckoutForm() {
    const requiredFields = [
        'fullName', 'email', 'phone', 'address', 'city', 'district'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showFieldError(field, 'Trường này là bắt buộc');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Validate email
    const email = document.getElementById('email').value;
    if (email && !validateEmail(email)) {
        showFieldError(document.getElementById('email'), 'Email không hợp lệ');
        isValid = false;
    }
    
    // Validate phone
    const phone = document.getElementById('phone').value;
    if (phone && !validatePhone(phone)) {
        showFieldError(document.getElementById('phone'), 'Số điện thoại không hợp lệ');
        isValid = false;
    }
    
    return isValid;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return phoneRegex.test(cleanPhone);
}

function showFieldError(field, message) {
    field.style.borderColor = '#e74c3c';
    
    let errorElement = field.parentElement.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        field.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.style.borderColor = '';
    
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function getFormData() {
    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);
    
    return {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        district: formData.get('district'),
        notes: formData.get('notes'),
        paymentMethod: formData.get('paymentMethod')
    };
}

function calculateOrderTotal() {
    const cartItems = window.cartManager ? window.cartManager.getCartItems() : [];
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 1000000 ? 0 : 30000;
    return subtotal + shipping;
}

function generateOrderNumber() {
    return 'GH' + Date.now().toString().slice(-6);
}

function showOrderSuccess(orderNumber) {
    const modal = document.getElementById('orderSuccessModal');
    const orderNumberElement = document.getElementById('orderNumber');
    
    orderNumberElement.textContent = `#${orderNumber}`;
    modal.classList.add('active');
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Store order in localStorage for order history
    saveOrderToHistory(orderNumber);
}

function saveOrderToHistory(orderNumber) {
    const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    const orderData = {
        orderNumber: orderNumber,
        date: new Date().toISOString(),
        items: window.cartManager ? window.cartManager.getCartItems() : [],
        total: calculateOrderTotal(),
        status: 'pending'
    };
    
    orders.unshift(orderData);
    localStorage.setItem('userOrders', JSON.stringify(orders));
}

// Add clearCart method to cartManager
if (window.cartManager) {
    window.cartManager.clearCart = function() {
        cartItems = [];
        if (typeof renderCartItems === 'function') {
            renderCartItems();
        }
        if (typeof updateCartSummary === 'function') {
            updateCartSummary();
        }
    };
}