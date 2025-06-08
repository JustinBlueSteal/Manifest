document.addEventListener('DOMContentLoaded', function() {
    // File upload validation
    const fileInput = document.getElementById('manifest');
    const uploadBtn = document.getElementById('uploadBtn');
    const processBtn = document.getElementById('processBtn');

    if (fileInput && uploadBtn) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const fileSize = file.size / 1024 / 1024;
                const fileName = file.name.toLowerCase();
                if (fileSize > 10) {
                    showAlert('File size must be less than 10MB', 'error');
                    fileInput.value = '';
                    return;
                }
                const validExtensions = ['.xls', '.xlsx', '.csv'];
                const isValid = validExtensions.some(ext => fileName.endsWith(ext));
                if (!isValid) {
                    showAlert('Please select a valid Excel or CSV file', 'error');
                    fileInput.value = '';
                    return;
                }
            }
        });
        const uploadForm = document.getElementById('uploadForm');
        if (uploadForm) {
            uploadForm.addEventListener('submit', function(e) {
                if (!fileInput.files[0]) {
                    e.preventDefault();
                    showAlert('Please select a file first', 'error');
                    return;
                }
                uploadBtn.disabled = true;
                uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Uploading...';
            });
        }
    }

    // Processing form submission
    if (processBtn) {
        const processingForm = processBtn.closest('form');
        if (processingForm) {
            processingForm.addEventListener('submit', function(e) {
                const requiredFields = ['Product Name', 'Quantity', 'Orig. Retail'];
                let missingFields = [];
                requiredFields.forEach(field => {
                    const select = document.querySelector(`select[name="${field}"]`);
                    if (select && !select.value) {
                        missingFields.push(field);
                    }
                });
                if (missingFields.length > 0) {
                    e.preventDefault();
                    showAlert(`Please map the following required fields: ${missingFields.join(', ')}`, 'error');
                    return;
                }
                processBtn.disabled = true;
                processBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
                showAlert('Processing your manifest and fetching eBay prices. This may take a few minutes...', 'info');
            });
        }
    }

    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        if (!alert.querySelector('.btn-close')) return;
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    });

    // Enhance select dropdowns with search functionality
    const selects = document.querySelectorAll('select.form-select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.classList.add('border-success');
                this.classList.remove('border-danger');
            } else {
                this.classList.remove('border-success');
                if (this.hasAttribute('required')) {
                    this.classList.add('border-danger');
                }
            }
        });
    });
});

// Utility function to show alerts
function showAlert(message, type = 'info') {
    const alertContainer = document.querySelector('.container');
    if (!alertContainer) return;
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    const existingAlerts = alertContainer.querySelector('.alert');
    if (existingAlerts) {
        alertContainer.insertBefore(alertDiv, existingAlerts.nextSibling);
    } else {
        alertContainer.appendChild(alertDiv);
    }
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}