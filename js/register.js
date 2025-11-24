document.addEventListener('DOMContentLoaded', function() {
    initializeRegisterForm();
});

function initializeRegisterForm() {
    const form = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Password visibility toggle
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
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
    passwordInput.addEventListener('input', function() {
        checkPasswordStrength(this.value);
    });

    // Real-time validation
    emailInput.addEventListener('blur', function() {
        validateEmail(this.value);
    });

    phoneInput.addEventListener('blur', function() {
        validatePhone(this.value);
    });

    confirmPasswordInput.addEventListener('input', function() {
        validatePasswordMatch();
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            registerUser();
        }
    });
}

function checkPasswordStrength(password) {
    const strengthBar = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('passwordText');
    
    let strength = 0;
    let text = '';
    let className = '';
    
    // Check password length
    if (password.length >= 8) strength++;
    
    // Check for mixed case
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength++;
    
    // Check for numbers
    if (password.match(/([0-9])/)) strength++;
    
    // Check for special characters
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength++;
    
    // Update the strength bar and text
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

function validateEmail(email) {
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError(emailError, 'Email không được để trống');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError(emailError, 'Email không hợp lệ');
        return false;
    }
    
    hideError(emailError);
    return true;
}

function validatePhone(phone) {
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    
    if (!phone) {
        showError(phoneError, 'Số điện thoại không được để trống');
        return false;
    }
    
    // Remove spaces and special characters
    const cleanPhone = phone.replace(/[^\d]/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
        showError(phoneError, 'Số điện thoại không hợp lệ');
        return false;
    }
    
    hideError(phoneError);
    return true;
}

function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    if (confirmPassword && password !== confirmPassword) {
        showError(confirmPasswordError, 'Mật khẩu xác nhận không khớp');
        return false;
    }
    
    hideError(confirmPasswordError);
    return true;
}

function validateForm() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.querySelector('input[name="terms"]').checked;
    
    let isValid = true;
    
    // Validate required fields
    if (!firstName.trim()) {
        showFieldError('firstName', 'Họ không được để trống');
        isValid = false;
    }
    
    if (!lastName.trim()) {
        showFieldError('lastName', 'Tên không được để trống');
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        isValid = false;
    }
    
    if (!validatePhone(phone)) {
        isValid = false;
    }
    
    if (!password) {
        showFieldError('password', 'Mật khẩu không được để trống');
        isValid = false;
    }
    
    if (!validatePasswordMatch()) {
        isValid = false;
    }
    
    if (!terms) {
        alert('Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = '#e74c3c';
    
    // Create or update error message
    let errorElement = field.parentElement.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error form-error show';
        field.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function hideError(errorElement) {
    errorElement.classList.remove('show');
}

function registerUser() {
    const form = document.getElementById('registerForm');
    const submitBtn = document.getElementById('registerBtn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value,
            birthday: document.getElementById('birthday').value,
            gender: document.getElementById('gender').value,
            newsletter: document.querySelector('input[name="newsletter"]').checked
        };
        
        // In a real application, you would send this data to your backend
        console.log('Registration data:', formData);
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

document.querySelector('.btn-facebook').addEventListener('click', function() {
    alert('Chức năng đăng ký với Facebook sẽ được tích hợp sau');
});