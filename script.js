// ===========================
// Form Elements
// ===========================
const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const phone = document.getElementById('phone');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const terms = document.getElementById('terms');
const submitBtn = document.getElementById('submitBtn');
const modal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');

// Password Toggle Elements
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

// Password Strength Elements
const strengthBars = [
    document.getElementById('bar1'),
    document.getElementById('bar2'),
    document.getElementById('bar3'),
    document.getElementById('bar4')
];
const strengthText = document.getElementById('strengthText');

// Password Requirements Elements
const reqLength = document.getElementById('req-length');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

// ===========================
// Validation Patterns
// ===========================
const patterns = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\d{10}$/,
    password: {
        minLength: /.{8,}/,
        hasNumber: /\d/,
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/
    },
    fullName: /^[a-zA-Z\s]{2,}$/
};

// ===========================
// Error Messages
// ===========================
const errorMessages = {
    fullName: {
        empty: 'Full name is required',
        invalid: 'Please enter a valid name (letters only)'
    },
    email: {
        empty: 'Email address is required',
        invalid: 'Please enter a valid email address'
    },
    password: {
        empty: 'Password is required',
        weak: 'Password must be at least 8 characters with 1 number and 1 special character'
    },
    confirmPassword: {
        empty: 'Please confirm your password',
        mismatch: 'Passwords do not match'
    },
    phone: {
        empty: 'Phone number is required',
        invalid: 'Phone number must be exactly 10 digits'
    },
    gender: {
        empty: 'Please select your gender'
    },
    terms: {
        unchecked: 'You must agree to the Terms & Conditions'
    }
};

// ===========================
// Utility Functions
// ===========================
function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}Error`);
    errorElement.textContent = message;
    input.classList.add('invalid');
    input.classList.remove('valid');
}

function clearError(input) {
    const errorElement = document.getElementById(`${input.id}Error`);
    errorElement.textContent = '';
    input.classList.remove('invalid');
}

function setValid(input) {
    clearError(input);
    input.classList.add('valid');
}

function clearRadioError() {
    const errorElement = document.getElementById('genderError');
    errorElement.textContent = '';
}

function clearCheckboxError() {
    const errorElement = document.getElementById('termsError');
    errorElement.textContent = '';
}

// ===========================
// Validation Functions
// ===========================
function validateFullName() {
    const value = fullName.value.trim();
    
    if (value === '') {
        showError(fullName, errorMessages.fullName.empty);
        return false;
    }
    
    if (!patterns.fullName.test(value)) {
        showError(fullName, errorMessages.fullName.invalid);
        return false;
    }
    
    setValid(fullName);
    return true;
}

function validateEmail() {
    const value = email.value.trim();
    
    if (value === '') {
        showError(email, errorMessages.email.empty);
        return false;
    }
    
    if (!patterns.email.test(value)) {
        showError(email, errorMessages.email.invalid);
        return false;
    }
    
    setValid(email);
    return true;
}

function validatePassword() {
    const value = password.value;
    
    if (value === '') {
        showError(password, errorMessages.password.empty);
        return false;
    }
    
    const hasMinLength = patterns.password.minLength.test(value);
    const hasNumber = patterns.password.hasNumber.test(value);
    const hasSpecial = patterns.password.hasSpecial.test(value);
    
    if (!hasMinLength || !hasNumber || !hasSpecial) {
        showError(password, errorMessages.password.weak);
        return false;
    }
    
    setValid(password);
    return true;
}

function validateConfirmPassword() {
    const value = confirmPassword.value;
    
    if (value === '') {
        showError(confirmPassword, errorMessages.confirmPassword.empty);
        return false;
    }
    
    if (value !== password.value) {
        showError(confirmPassword, errorMessages.confirmPassword.mismatch);
        return false;
    }
    
    setValid(confirmPassword);
    return true;
}

function validatePhone() {
    const value = phone.value.trim();
    
    if (value === '') {
        showError(phone, errorMessages.phone.empty);
        return false;
    }
    
    if (!patterns.phone.test(value)) {
        showError(phone, errorMessages.phone.invalid);
        return false;
    }
    
    setValid(phone);
    return true;
}

function validateGender() {
    const isChecked = Array.from(genderInputs).some(input => input.checked);
    const errorElement = document.getElementById('genderError');
    
    if (!isChecked) {
        errorElement.textContent = errorMessages.gender.empty;
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function validateTerms() {
    const errorElement = document.getElementById('termsError');
    
    if (!terms.checked) {
        errorElement.textContent = errorMessages.terms.unchecked;
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

// ===========================
// Password Strength Meter
// ===========================
function updatePasswordStrength() {
    const value = password.value;
    
    if (value === '') {
        strengthBars.forEach(bar => {
            bar.classList.remove('active', 'weak', 'medium');
        });
        strengthText.textContent = '';
        strengthText.className = 'strength-label';
        return;
    }
    
    let strength = 0;
    const checks = {
        length: value.length >= 8,
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        number: /\d/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
    };
    
    // Calculate strength
    if (checks.length) strength += 20;
    if (checks.lowercase) strength += 20;
    if (checks.uppercase) strength += 20;
    if (checks.number) strength += 20;
    if (checks.special) strength += 20;
    
    // Reset all bars
    strengthBars.forEach(bar => {
        bar.classList.remove('active', 'weak', 'medium');
    });
    
    // Update bars based on strength
    if (strength <= 40) {
        strengthBars[0].classList.add('active', 'weak');
        strengthText.textContent = 'WEAK';
        strengthText.className = 'strength-label weak';
    } else if (strength <= 60) {
        strengthBars[0].classList.add('active', 'medium');
        strengthBars[1].classList.add('active', 'medium');
        strengthText.textContent = 'FAIR';
        strengthText.className = 'strength-label medium';
    } else if (strength <= 80) {
        strengthBars[0].classList.add('active');
        strengthBars[1].classList.add('active');
        strengthBars[2].classList.add('active');
        strengthText.textContent = 'GOOD';
        strengthText.className = 'strength-label medium';
    } else {
        strengthBars.forEach(bar => bar.classList.add('active'));
        strengthText.textContent = 'STRONG';
        strengthText.className = 'strength-label strong';
    }
}

// ===========================
// Password Requirements Checker
// ===========================
function updatePasswordRequirements() {
    const value = password.value;
    
    // Check minimum length
    if (patterns.password.minLength.test(value)) {
        reqLength.classList.add('met');
    } else {
        reqLength.classList.remove('met');
    }
    
    // Check for number
    if (patterns.password.hasNumber.test(value)) {
        reqNumber.classList.add('met');
    } else {
        reqNumber.classList.remove('met');
    }
    
    // Check for special character
    if (patterns.password.hasSpecial.test(value)) {
        reqSpecial.classList.add('met');
    } else {
        reqSpecial.classList.remove('met');
    }
}

// ===========================
// Password Toggle Visibility
// ===========================
function togglePasswordVisibility(inputField, toggleButton) {
    const toggleText = toggleButton.querySelector('.toggle-text');
    
    if (inputField.type === 'password') {
        inputField.type = 'text';
        toggleText.textContent = 'HIDE';
    } else {
        inputField.type = 'password';
        toggleText.textContent = 'SHOW';
    }
}

// ===========================
// Phone Number Input Filter
// ===========================
function filterPhoneInput(e) {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
}

// ===========================
// Show Success Modal
// ===========================
function showSuccessModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    form.reset();
    
    // Clear all validations
    const inputs = [fullName, email, password, confirmPassword, phone];
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
        clearError(input);
    });
    
    // Reset password strength
    strengthBars.forEach(bar => {
        bar.classList.remove('active', 'weak', 'medium');
    });
    strengthText.textContent = '';
    strengthText.className = 'strength-label';
    
    // Reset password requirements
    [reqLength, reqNumber, reqSpecial].forEach(req => req.classList.remove('met'));
    
    // Reset toggle buttons
    const toggleTexts = document.querySelectorAll('.toggle-text');
    toggleTexts.forEach(text => text.textContent = 'SHOW');
}

// ===========================
// Event Listeners - Real-time Validation
// ===========================
fullName.addEventListener('blur', validateFullName);
fullName.addEventListener('input', () => {
    if (fullName.value.trim() !== '') {
        validateFullName();
    }
});

email.addEventListener('blur', validateEmail);
email.addEventListener('input', () => {
    if (email.value.trim() !== '') {
        validateEmail();
    }
});

password.addEventListener('input', () => {
    updatePasswordStrength();
    updatePasswordRequirements();
    if (password.value !== '') {
        clearError(password);
    }
    if (confirmPassword.value !== '') {
        validateConfirmPassword();
    }
});

password.addEventListener('blur', validatePassword);

confirmPassword.addEventListener('input', () => {
    if (confirmPassword.value !== '') {
        validateConfirmPassword();
    }
});

confirmPassword.addEventListener('blur', validateConfirmPassword);

phone.addEventListener('input', filterPhoneInput);
phone.addEventListener('blur', validatePhone);
phone.addEventListener('input', () => {
    if (phone.value.trim() !== '') {
        validatePhone();
    }
});

genderInputs.forEach(input => {
    input.addEventListener('change', () => {
        clearRadioError();
    });
});

terms.addEventListener('change', () => {
    clearCheckboxError();
});

// Password Toggle Event Listeners
togglePassword.addEventListener('click', () => {
    togglePasswordVisibility(password, togglePassword);
});

toggleConfirmPassword.addEventListener('click', () => {
    togglePasswordVisibility(confirmPassword, toggleConfirmPassword);
});

// Close Modal Event Listener
closeModalBtn.addEventListener('click', closeSuccessModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeSuccessModal();
    }
});

// ===========================
// Form Submission
// ===========================
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Run all validations
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isPhoneValid = validatePhone();
    const isGenderValid = validateGender();
    const isTermsValid = validateTerms();
    
    // Check if all validations passed
    const isFormValid = 
        isFullNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isPhoneValid &&
        isGenderValid &&
        isTermsValid;
    
    if (isFormValid) {
        // Get selected gender
        const selectedGender = Array.from(genderInputs).find(input => input.checked)?.value;
        
        // Create form data object
        const formData = {
            fullName: fullName.value.trim(),
            email: email.value.trim(),
            password: password.value,
            phone: phone.value.trim(),
            gender: selectedGender,
            agreedToTerms: terms.checked,
            submittedAt: new Date().toISOString()
        };
        
        // Log form data (in production, this would be sent to a server)
        console.log('Form submitted successfully:', formData);
        
        // Show success modal
        showSuccessModal();
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.invalid');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
});

// ===========================
// Prevent Space at Start
// ===========================
[fullName, email].forEach(input => {
    input.addEventListener('keydown', (e) => {
        if (e.key === ' ' && input.value.length === 0) {
            e.preventDefault();
        }
    });
});

// ===========================
// Accessibility - Enter Key on Modal
// ===========================
modal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && modal.classList.contains('show')) {
        closeSuccessModal();
    }
});

// ===========================
// Initialize
// ===========================
console.log('Brutalist registration form initialized!');