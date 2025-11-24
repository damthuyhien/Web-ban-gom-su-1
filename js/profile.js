// Profile functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
});

function initializeProfile() {
    loadUserData();
    setupTabNavigation();
    setupEventListeners();
    loadOrders();
    loadAddresses();
    loadWishlist();
}

function loadUserData() {
    // In a real application, this would come from your backend
    const userData = {
        firstName: "Nguyễn Văn",
        lastName: "A",
        email: "nguyenvana@email.com",
        phone: "0123456789",
        birthday: "1990-01-01",
        gender: "male"
    };
    
    // Populate form fields
    document.getElementById('profileFirstName').value = userData.firstName;
    document.getElementById('profileLastName').value = userData.lastName;
    document.getElementById('profileEmail').value = userData.email;
    document.getElementById('profilePhone').value = userData.phone;
    document.getElementById('profileBirthday').value = userData.birthday;
    document.getElementById('profileGender').value = userData.gender;
}

function setupTabNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function setupEventListeners() {
    // Personal info edit
    const editPersonalBtn = document.getElementById('editPersonalInfo');
    const personalForm = document.getElementById('personalForm');
    const cancelPersonalEdit = document.getElementById('cancelPersonalEdit');
    
    editPersonalBtn.addEventListener('click', function() {
        enablePersonalFormEditing(true);
    });
    
    cancelPersonalEdit.addEventListener('click', function() {
        enablePersonalFormEditing(false);
        loadUserData(); // Reset form data
    });
    
    personalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        savePersonalInfo();
    });
    
    // Add new address
    const addAddressBtn = document.getElementById('addNewAddress');
    addAddressBtn.addEventListener('click', function() {
        showAddressModal();
    });
    
    // Password form
    const passwordForm = document.getElementById('passwordForm');
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        changePassword();
    });
    
    // Password visibility toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Password strength indicator
    const newPasswordInput = document.getElementById('newPassword');
    newPasswordInput.addEventListener('input', function() {
        checkPasswordStrength(this.value);
    });
    
    // Password match validation
    const confirmPasswordInput = document.getElementById('confirmNewPassword');
    confirmPasswordInput.addEventListener('input', validatePasswordMatch);
}

function enablePersonalFormEditing(enable) {
    const inputs = document.querySelectorAll('#personalForm input, #personalForm select');
    const formActions = document.getElementById('personalFormActions');
    const editBtn = document.getElementById('editPersonalInfo');
    
    inputs.forEach(input => {
        if (input.type !== 'email') { // Keep email readonly
            input.readOnly = !enable;
        }
        if (input.tagName === 'SELECT') {
            input.disabled = !enable;
        }
    });
    
    if (enable) {
        formActions.style.display = 'flex';
        editBtn.style.display = 'none';
    } else {
        formActions.style.display = 'none';
        editBtn.style.display = 'block';
    }
}

function savePersonalInfo() {
    const form = document.getElementById('personalForm');
    const formData = new FormData(form);
    
    // Simulate API call
    setTimeout(() => {
        console.log('Saving personal info:', {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phone: formData.get('phone'),
            birthday: formData.get('birthday'),
            gender: formData.get('gender')
        });
        
        enablePersonalFormEditing(false);
        showNotification('Cập nhật thông tin thành công!', 'success');
    }, 1000);
}

function loadOrders() {
    const ordersList = document.querySelector('.orders-list');
    
    // Get orders from localStorage or use sample data
    const orders = JSON.parse(localStorage.getItem('userOrders')) || getSampleOrders();
    
    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-bag"></i>
                <h3>Chưa có đơn hàng</h3>
                <p>Bạn chưa có đơn hàng nào. Hãy khám phá các sản phẩm của chúng tôi!</p>
                <a href="products.html" class="btn btn-primary">Mua sắm ngay</a>
            </div>
        `;
        return;
    }
    
    ordersList.innerHTML = '';
    
    orders.forEach(order => {
        const orderCard = createOrderCard(order);
        ordersList.appendChild(orderCard);
    });
}

function getSampleOrders() {
    return [
        {
            orderNumber: 'GH12345',
            date: '2024-01-15',
            status: 'delivered',
            items: [
                { name: 'Bình Hoa Gốm Bát Tràng', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', quantity: 1, price: 850000 },
                { name: 'Bộ Ấm Chén Men Lam', image: 'https://images.unsplash.com/photo-1594736797933-d0d69c3bc2db?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', quantity: 1, price: 450000 }
            ],
            total: 1300000
        },
        {
            orderNumber: 'GH12346',
            date: '2024-01-10',
            status: 'shipping',
            items: [
                { name: 'Đĩa Treo Tường Gốm Sứ', image: 'https://images.unsplash.com/photo-1580745374183-d7fbf5f5b4da?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', quantity: 2, price: 320000 }
            ],
            total: 640000
        }
    ];
}

function createOrderCard(order) {
    const card = document.createElement('div');
    card.className = 'order-card';
    
    const statusClass = `status-${order.status}`;
    const statusText = getStatusText(order.status);
    const formattedDate = formatDate(order.date);
    const formattedTotal = formatPrice(order.total);
    
    card.innerHTML = `
        <div class="order-header">
            <div class="order-info">
                <h3>Đơn hàng #${order.orderNumber}</h3>
                <div class="order-date">${formattedDate}</div>
            </div>
            <div class="order-status ${statusClass}">${statusText}</div>
        </div>
        
        <div class="order-items-preview">
            ${order.items.map(item => `
                <div class="order-item-preview">
                    <img src="${item.image}" alt="${item.name}">
                </div>
            `).join('')}
        </div>
        
        <div class="order-footer">
            <div class="order-total">${formattedTotal}</div>
            <div class="order-actions">
                <button class="btn btn-secondary btn-small view-order" data-order="${order.orderNumber}">
                    <i class="fas fa-eye"></i> Xem chi tiết
                </button>
                ${order.status === 'delivered' ? `
                    <button class="btn btn-secondary btn-small reorder" data-order="${order.orderNumber}">
                        <i class="fas fa-redo"></i> Mua lại
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xác nhận',
        'confirmed': 'Đã xác nhận',
        'shipping': 'Đang giao hàng',
        'delivered': 'Đã giao hàng',
        'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function loadAddresses() {
    const addressesList = document.querySelector('.addresses-list');
    
    // Sample addresses
    const addresses = [
        {
            id: 1,
            name: "Nhà riêng",
            fullName: "Nguyễn Văn A",
            phone: "0123456789",
            address: "123 Đường ABC",
            city: "Hà Nội",
            district: "Cầu Giấy",
            isDefault: true
        },
        {
            id: 2,
            name: "Công ty",
            fullName: "Nguyễn Văn A",
            phone: "0987654321",
            address: "456 Đường XYZ",
            city: "Hà Nội",
            district: "Thanh Xuân",
            isDefault: false
        }
    ];
    
    addressesList.innerHTML = '';
    
    addresses.forEach(address => {
        const addressCard = createAddressCard(address);
        addressesList.appendChild(addressCard);
    });
}

function createAddressCard(address) {
    const card = document.createElement('div');
    card.className = `address-card ${address.isDefault ? 'default' : ''}`;
    
    card.innerHTML = `
        ${address.isDefault ? '<span class="address-default-badge">Mặc định</span>' : ''}
        <div class="address-name">${address.name}</div>
        <div class="address-details">
            <strong>${address.fullName}</strong><br>
            ${address.phone}<br>
            ${address.address}, ${address.district}, ${address.city}
        </div>
        <div class="address-actions">
            <button class="btn btn-secondary btn-small edit-address" data-id="${address.id}">
                <i class="fas fa-edit"></i> Sửa
            </button>
            ${!address.isDefault ? `
                <button class="btn btn-secondary btn-small set-default-address" data-id="${address.id}">
                    <i class="fas fa-star"></i> Đặt mặc định
                </button>
                <button class="btn btn-secondary btn-small delete-address" data-id="${address.id}">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            ` : ''}
        </div>
    `;
    
    return card;
}

function loadWishlist() {
    const wishlistGrid = document.querySelector('.wishlist-grid');
    
    // Sample wishlist items
    const wishlistItems = [
        {
            id: 1,
            name: "Bình Hoa Gốm Bát Tràng Men Rạn Cổ",
            price: 850000,
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 2,
            name: "Bộ Ấm Chén Men Lam Họa Tiết Cổ",
            price: 450000,
            image: "https://images.unsplash.com/photo-1594736797933-d0d69c3bc2db?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        }
    ];
    
    wishlistGrid.innerHTML = '';
    
    if (wishlistItems.length === 0) {
        wishlistGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <h3>Danh sách yêu thích trống</h3>
                <p>Hãy thêm sản phẩm bạn yêu thích vào danh sách!</p>
                <a href="products.html" class="btn btn-primary">Khám phá sản phẩm</a>
            </div>
        `;
        return;
    }
    
    wishlistItems.forEach(item => {
        const wishlistItem = createWishlistItem(item);
        wishlistGrid.appendChild(wishlistItem);
    });
}

function createWishlistItem(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'wishlist-item';
    
    itemElement.innerHTML = `
        <div class="wishlist-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="wishlist-item-name">${item.name}</div>
        <div class="wishlist-item-price">${formatPrice(item.price)}</div>
        <div class="wishlist-item-actions">
            <button class="btn btn-primary btn-small add-to-cart-from-wishlist" data-id="${item.id}">
                <i class="fas fa-shopping-cart"></i> Thêm giỏ
            </button>
            <button class="btn btn-secondary btn-small remove-from-wishlist" data-id="${item.id}">
                <i class="fas fa-trash"></i> Xóa
            </button>
        </div>
    `;
    
    return itemElement;
}

function showAddressModal() {
    const modal = document.getElementById('addressModal');
    modal.classList.add('active');
    
    // Setup modal content
    const form = document.getElementById('addressForm');
    form.innerHTML = `
        <div class="form-group">
            <label for="addressName">Tên địa chỉ (ví dụ: Nhà riêng, Công ty)</label>
            <input type="text" id="addressName" name="addressName" required>
        </div>
        
        <div class="form-group">
            <label for="addressFullName">Họ và tên *</label>
            <input type="text" id="addressFullName" name="fullName" required>
        </div>
        
        <div class="form-group">
            <label for="addressPhone">Số điện thoại *</label>
            <input type="tel" id="addressPhone" name="phone" required>
        </div>
        
        <div class="form-group">
            <label for="addressDetail">Địa chỉ cụ thể *</label>
            <input type="text" id="addressDetail" name="address" required>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label for="addressCity">Tỉnh/Thành phố *</label>
                <select id="addressCity" name="city" required>
                    <option value="">Chọn tỉnh/thành phố</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                </select>
            </div>
            <div class="form-group">
                <label for="addressDistrict">Quận/Huyện *</label>
                <select id="addressDistrict" name="district" required>
                    <option value="">Chọn quận/huyện</option>
                </select>
            </div>
        </div>
        
        <div class="form-options">
            <label class="checkbox">
                <input type="checkbox" name="setAsDefault">
                <span class="checkmark"></span>
                Đặt làm địa chỉ mặc định
            </label>
        </div>
        
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" id="cancelAddress">Hủy</button>
            <button type="submit" class="btn btn-primary">Lưu địa chỉ</button>
        </div>
    `;
    
    // Setup modal events
    const cancelBtn = document.getElementById('cancelAddress');
    const closeBtn = modal.querySelector('.close-modal');
    
    cancelBtn.addEventListener('click', () => modal.classList.remove('active'));
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveAddress();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function saveAddress() {
    const form = document.getElementById('addressForm');
    const formData = new FormData(form);
    
    console.log('Saving address:', {
        name: formData.get('addressName'),
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        district: formData.get('district'),
        isDefault: formData.get('setAsDefault') === 'on'
    });
    
    document.getElementById('addressModal').classList.remove('active');
    showNotification('Thêm địa chỉ thành công!', 'success');
    loadAddresses(); // Reload addresses
}

function changePassword() {
    const form = document.getElementById('passwordForm');
    const formData = new FormData(form);
    
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmNewPassword');
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp', 'error');
        return;
    }
    
    // Validate password strength
    if (newPassword.length < 8) {
        showNotification('Mật khẩu phải có ít nhất 8 ký tự', 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        console.log('Changing password...');
        form.reset();
        showNotification('Đổi mật khẩu thành công!', 'success');
    }, 1000);
}

function checkPasswordStrength(password) {
    const strengthBar = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('passwordText');
    
    let strength = 0;
    let text = '';
    let className = '';
    
    if (password.length >= 8) strength++;
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength++;
    if (password.match(/([0-9])/)) strength++;
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength++;
    
    switch(strength) {
        case 0:
            text = 'Rất yếu';
            className = '';
            break;
        case 1:
            text = 'Yếu';
            className = 'weak';
            break;
        case 2:
            text = 'Trung bình';
            className = 'medium';
            break;
        case 3:
            text = 'Mạnh';
            className = 'strong';
            break;
        case 4:
            text = 'Rất mạnh';
            className = 'strong';
            break;
    }
    
    strengthBar.className = 'strength-fill ' + className;
    strengthText.textContent = text;
}

function validatePasswordMatch() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;
    const errorElement = document.getElementById('passwordMatchError');
    
    if (confirmPassword && newPassword !== confirmPassword) {
        errorElement.textContent = 'Mật khẩu xác nhận không khớp';
        errorElement.classList.add('show');
    } else {
        errorElement.classList.remove('show');
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
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}