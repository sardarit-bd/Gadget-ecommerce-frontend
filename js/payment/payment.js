// Payment Page JavaScript
class PaymentPage {
    constructor() {
        this.currentPaymentMethod = 'card';
        this.isProcessing = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
        this.loadCartData();
    }

    setupEventListeners() {
        // Payment method selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', (e) => {
                this.selectPaymentMethod(e.currentTarget.dataset.method);
            });
        });

        // Billing address toggle
        document.getElementById('sameAsShipping').addEventListener('change', (e) => {
            this.toggleBillingAddress(!e.target.checked);
        });

        // Form input formatting
        document.getElementById('cardNumber').addEventListener('input', (e) => {
            this.formatCardNumber(e.target);
        });

        document.getElementById('expiryDate').addEventListener('input', (e) => {
            this.formatExpiryDate(e.target);
        });

        document.getElementById('cvv').addEventListener('input', (e) => {
            this.formatCVV(e.target);
        });

        // Promo code
        document.getElementById('applyPromo').addEventListener('click', (e) => {
            e.preventDefault();
            this.applyPromoCode();
        });

        // Action buttons
        document.getElementById('backBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.goBack();
        });

        document.getElementById('placeOrderBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.placeOrder();
        });

        // Modal buttons
        document.getElementById('continueShopping').addEventListener('click', () => {
            this.continueShopping();
        });

        document.getElementById('viewOrder').addEventListener('click', () => {
            this.viewOrderDetails();
        });

        // PayPal and Apple Pay buttons
        document.getElementById('paypalBtn').addEventListener('click', () => {
            this.processPayPalPayment();
        });

        document.getElementById('applepayBtn').addEventListener('click', () => {
            this.processApplePayPayment();
        });
    }

    setupFormValidation() {
        // Card number validation
        document.getElementById('cardNumber').addEventListener('blur', (e) => {
            this.validateCardNumber(e.target);
        });

        // Expiry date validation
        document.getElementById('expiryDate').addEventListener('blur', (e) => {
            this.validateExpiryDate(e.target);
        });

        // CVV validation
        document.getElementById('cvv').addEventListener('blur', (e) => {
            this.validateCVV(e.target);
        });
    }

    selectPaymentMethod(method) {
        this.currentPaymentMethod = method;

        // Update UI
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.remove('active');
        });
        document.querySelector(`[data-method="${method}"]`).classList.add('active');

        document.querySelectorAll('.payment-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(`${method}Form`).classList.add('active');
    }

    toggleBillingAddress(show) {
        const billingForm = document.getElementById('billingForm');
        if (show) {
            billingForm.style.display = 'block';
        } else {
            billingForm.style.display = 'none';
        }
    }

    formatCardNumber(input) {
        // Remove non-digits
        let value = input.value.replace(/\D/g, '');

        // Add spaces every 4 digits
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

        // Limit to 16 digits + 3 spaces
        if (value.length > 19) {
            value = value.substring(0, 19);
        }

        input.value = value;
    }

    formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');

        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }

        if (value.length > 5) {
            value = value.substring(0, 5);
        }

        input.value = value;
    }

    formatCVV(input) {
        let value = input.value.replace(/\D/g, '');

        // Limit to 3 or 4 digits based on card type
        const maxLength = this.detectCardType(document.getElementById('cardNumber').value) === 'amex' ? 4 : 3;
        if (value.length > maxLength) {
            value = value.substring(0, maxLength);
        }

        input.value = value;
    }

    detectCardType(cardNumber) {
        const cleanNumber = cardNumber.replace(/\D/g, '');

        if (/^4/.test(cleanNumber)) return 'visa';
        if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
        if (/^3[47]/.test(cleanNumber)) return 'amex';
        if (/^6(?:011|5)/.test(cleanNumber)) return 'discover';

        return 'unknown';
    }

    validateCardNumber(input) {
        const value = input.value.replace(/\D/g, '');
        const isValid = this.luhnCheck(value) && value.length >= 13 && value.length <= 19;

        this.setValidationState(input, isValid);
        return isValid;
    }

    validateExpiryDate(input) {
        const value = input.value;
        const [month, year] = value.split('/');

        if (!month || !year || month.length !== 2 || year.length !== 2) {
            this.setValidationState(input, false);
            return false;
        }

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        const expMonth = parseInt(month);
        const expYear = parseInt(year);

        const isValid = expMonth >= 1 && expMonth <= 12 &&
            (expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth));

        this.setValidationState(input, isValid);
        return isValid;
    }

    validateCVV(input) {
        const value = input.value;
        const cardType = this.detectCardType(document.getElementById('cardNumber').value);
        const expectedLength = cardType === 'amex' ? 4 : 3;
        const isValid = /^\d+$/.test(value) && value.length === expectedLength;

        this.setValidationState(input, isValid);
        return isValid;
    }

    setValidationState(input, isValid) {
        if (isValid) {
            input.style.borderColor = '#27ae60';
        } else {
            input.style.borderColor = '#e74c3c';
        }
    }

    luhnCheck(cardNumber) {
        let sum = 0;
        let isEven = false;

        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    }

    applyPromoCode() {
        const promoInput = document.getElementById('promoCode');
        const promoCode = promoInput.value.trim().toUpperCase();

        if (!promoCode) {
            this.showNotification('Please enter a promo code', 'error');
            return;
        }

        // Simulate API call
        this.showLoading(true);

        setTimeout(() => {
            this.showLoading(false);

            const validPromoCodes = {
                'WELCOME10': 0.1,
                'SAVE20': 0.2,
                'BAMBULAB': 0.15
            };

            if (validPromoCodes[promoCode]) {
                const discount = validPromoCodes[promoCode];
                this.applyDiscount(discount, promoCode);
                this.showNotification(`Promo code applied! ${discount * 100}% discount`, 'success');
                promoInput.value = '';
            } else {
                this.showNotification('Invalid promo code', 'error');
            }
        }, 1500);
    }

    applyDiscount(discount, code) {
        // Update UI with discount
        const discountElement = document.querySelector('.price-row.discount');
        const totalElement = document.querySelector('.price-row.total span:last-child');

        // Calculate new total
        const currentTotal = parseFloat(totalElement.textContent.replace('$', ''));
        const discountAmount = currentTotal * discount;
        const newTotal = currentTotal - discountAmount;

        discountElement.innerHTML = `
            <span>Discount (${code})</span>
            <span>-$${discountAmount.toFixed(2)}</span>
        `;

        totalElement.textContent = `$${newTotal.toFixed(2)}`;
    }

    loadCartData() {
        // In a real app, this would load from localStorage or API
        const cartData = {
            items: [
                {
                    name: 'X1 Carbon 3D Printer',
                    price: 1499.00,
                    quantity: 1,
                    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
                    variant: 'Color: Black • With AMS'
                },
                {
                    name: 'AMS Multi-Color System',
                    price: 349.00,
                    quantity: 1,
                    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
                    variant: '4-color printing'
                }
            ],
            subtotal: 1848.00,
            shipping: 0.00,
            tax: 147.84,
            discount: 200.00,
            total: 1795.84
        };

        // Update order summary with cart data
        this.updateOrderSummary(cartData);
    }

    updateOrderSummary(cartData) {
        // This would update the order summary with actual cart data
        // For now, we're using static data from HTML
    }

    validateForm() {
        if (this.currentPaymentMethod === 'card') {
            return this.validateCardForm();
        }

        return true;
    }

    validateCardForm() {
        const cardNumberValid = this.validateCardNumber(document.getElementById('cardNumber'));
        const expiryValid = this.validateExpiryDate(document.getElementById('expiryDate'));
        const cvvValid = this.validateCVV(document.getElementById('cvv'));
        const nameValid = document.getElementById('cardholderName').value.trim().length > 0;

        if (!nameValid) {
            document.getElementById('cardholderName').style.borderColor = '#e74c3c';
        }

        return cardNumberValid && expiryValid && cvvValid && nameValid;
    }

    placeOrder() {
        if (this.isProcessing) return;

        if (!this.validateForm()) {
            this.showNotification('Please check your payment information', 'error');
            return;
        }

        this.isProcessing = true;
        this.showLoading(true);

        // Simulate payment processing
        setTimeout(() => {
            this.showLoading(false);
            this.isProcessing = false;
            this.showSuccessModal();
        }, 3000);
    }

    processPayPalPayment() {
        this.showLoading(true);

        // Simulate PayPal redirect
        setTimeout(() => {
            this.showLoading(false);
            this.showSuccessModal();
        }, 2000);
    }

    processApplePayPayment() {
        if (!window.ApplePaySession) {
            this.showNotification('Apple Pay is not supported in this browser', 'error');
            return;
        }

        this.showLoading(true);

        // Simulate Apple Pay processing
        setTimeout(() => {
            this.showLoading(false);
            this.showSuccessModal();
        }, 2000);
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.add('active');
        } else {
            overlay.classList.remove('active');
        }
    }

    showSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.classList.add('active');
    }

    hideSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.classList.remove('active');
    }

    goBack() {
        window.history.back();
    }

    continueShopping() {
        window.location.href = 'products.html';
    }

    viewOrderDetails() {
        // In a real app, this would redirect to order details page
        const orderNumber = 'BL-2023-789456';
        alert(`Redirecting to order details for: ${orderNumber}`);
        this.hideSuccessModal();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

        // Set background color based on type
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db',
            warning: '#f39c12'
        };

        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);

        // Add CSS animations
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
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
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize the payment page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PaymentPage();
});