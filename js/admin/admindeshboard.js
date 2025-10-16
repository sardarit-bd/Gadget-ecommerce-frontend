// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeDashboard();
});

function initializeDashboard() {
    // Initialize all dashboard functionality
    initNavigation();
    initForms();
    initResponsiveSidebar();
    initDynamicParts();
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetSection = this.getAttribute('data-section');

            // Update active navigation link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Show target section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });

            // Update page title
            updatePageTitle(targetSection);

            // Close sidebar on mobile after selection
            if (window.innerWidth <= 992) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });
    });
}

// Update page title based on active section
function updatePageTitle(sectionId) {
    const pageTitle = document.getElementById('pageTitle');
    const titles = {
        'dashboard': 'Dashboard',
        'new-product': 'New Product',
        'new-printer-part': 'Printer Parts',
        'new-assembly': 'Assemblies',
        'new-printer-model': 'Printer Models',
        'reports': 'Reports & Analytics',
        'settings': 'System Settings'
    };

    pageTitle.textContent = titles[sectionId] || 'Dashboard';
}

// Responsive sidebar functionality
function initResponsiveSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.add('active');
    });

    closeSidebar.addEventListener('click', function () {
        sidebar.classList.remove('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 992 &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target) &&
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

// Form handling
function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmit(this);
        });

        // Add input validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });
        });
    });
}

// Form submission handler
function handleFormSubmit(form) {
    const formId = form.id;
    const formData = new FormData(form);

    // Simulate form submission
    showNotification('Form submitted successfully!', 'success');

    // Reset form after successful submission
    setTimeout(() => {
        form.reset();
    }, 2000);
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');

    if (isRequired && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }

    // Additional validation based on field type
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }

    if (field.type === 'number' && value) {
        if (parseFloat(value) < 0) {
            showFieldError(field, 'Value must be positive');
            return false;
        }
    }

    clearFieldError(field);
    return true;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    field.style.borderColor = '#e63946';

    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#e63946';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;

    field.parentNode.appendChild(errorElement);
}

// Clear field error
function clearFieldError(field) {
    field.style.borderColor = '';
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Dynamic parts functionality for assembly form
function initDynamicParts() {
    const addPartBtn = document.getElementById('addPartBtn');
    const partsList = document.getElementById('partsList');

    if (addPartBtn && partsList) {
        addPartBtn.addEventListener('click', function () {
            addPartRow(partsList);
        });

        // Initialize with one part row
        addPartRow(partsList);
    }
}

// Add new part row
function addPartRow(container) {
    const partRow = document.createElement('div');
    partRow.className = 'part-item';
    partRow.innerHTML = `
        <input type="text" placeholder="Part number" class="part-input">
        <input type="number" placeholder="Qty" class="qty-input" min="1" value="1">
        <button type="button" class="btn btn-remove">
            <i class="fas fa-times"></i>
        </button>
    `;

    const removeBtn = partRow.querySelector('.btn-remove');
    removeBtn.addEventListener('click', function () {
        if (container.children.length > 1) {
            partRow.remove();
        } else {
            showNotification('At least one part is required', 'warning');
        }
    });

    container.appendChild(partRow);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Set background color based on type
    const colors = {
        success: '#4cc9f0',
        error: '#e63946',
        warning: '#f72585',
        info: '#4361ee'
    };

    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Window resize handler
window.addEventListener('resize', function () {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 992) {
        sidebar.classList.remove('active');
    }
});

// Export functions for potential use in other modules
window.Dashboard = {
    showNotification,
    validateField
};