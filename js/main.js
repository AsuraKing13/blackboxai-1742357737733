// Navigation and Menu Handling
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !expanded);
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Close mobile menu if open
                    if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });
});

// Form Validation
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } else {
            clearError(input);
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                showError(input, 'Please enter a valid email address');
            }
        }
    });

    return isValid;
}

// Error handling functions
function showError(input, message) {
    const errorDiv = input.parentElement.querySelector('.error-message') || 
                    createErrorElement(message);
    
    input.classList.add('border-red-500');
    if (!input.parentElement.querySelector('.error-message')) {
        input.parentElement.appendChild(errorDiv);
    }
}

function clearError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.classList.remove('border-red-500');
}

function createErrorElement(message) {
    const div = document.createElement('div');
    div.className = 'error-message text-red-500 text-sm mt-1';
    div.textContent = message;
    return div;
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };

    toast.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 translate-y-[-100%] opacity-0`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 100);

    // Animate out
    setTimeout(() => {
        toast.style.transform = 'translateY(-100%)';
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
}

// Modal functions
window.openAddModal = function() {
    const modal = document.getElementById('clusterModal');
    if (modal) {
        document.getElementById('modalTitle').textContent = 'Add New Cluster';
        // Clear form fields
        modal.querySelectorAll('input, textarea, select').forEach(field => {
            field.value = '';
        });
        modal.classList.remove('hidden');
    }
};

window.openEditModal = function(clusterId) {
    const modal = document.getElementById('clusterModal');
    if (modal) {
        document.getElementById('modalTitle').textContent = 'Edit Cluster';
        
        // Populate the modal with the cluster's current details
        const clusterData = {
            name: "Cultural Heritage Center",
            category: "Cultural",
            location: "Kuching",
            description: "A scenic walking trail along Kuching's historic waterfront.",
            status: "Active"
        };

        modal.querySelector('input[type="text"]').value = clusterData.name;
        modal.querySelector('select').value = clusterData.category;
        modal.querySelectorAll('input[type="text"]')[1].value = clusterData.location;
        modal.querySelector('textarea').value = clusterData.description;
        modal.querySelectorAll('select')[1].value = clusterData.status;

        modal.classList.remove('hidden');
    }
};

window.openDeleteModal = function() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
};

window.saveCluster = function() {
    const modal = document.getElementById('clusterModal');
    const form = modal.querySelector('form');
    
    if (validateForm(form)) {
        // Here you would typically make an API call to save the data
        showToast('Cluster saved successfully!', 'success');
        closeModal('clusterModal');
    }
};

window.deleteCluster = function() {
    // Here you would typically make an API call to delete the cluster
    showToast('Cluster deleted successfully!', 'success');
    closeModal('deleteModal');
};

// Initialize any interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add click outside to close for all modals
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Initialize form handlers
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const clusterForm = document.querySelector('#clusterModal form');
    if (clusterForm) {
        clusterForm.addEventListener('submit', handleClusterForm);
    }
});

// Form handling functions
function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    
    if (validateForm(form)) {
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;

        // Here you would typically make an API call to verify credentials
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }
}

function handleClusterForm(e) {
    e.preventDefault();
    const form = e.target;
    
    if (validateForm(form)) {
        // Here you would typically make an API call to save the cluster
        showToast('Cluster saved successfully!', 'success');
        closeModal('clusterModal');
    }
}