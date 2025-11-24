// About page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeAboutPage();
});

function initializeAboutPage() {
    animateStatistics();
    setupGalleryInteractions();
}

function animateStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function startCounting(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const step = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, duration / steps);
}

function setupGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            showImageModal(this.querySelector('img').src);
        });
    });
}

function showImageModal(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'modal image-modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imageSrc}" alt="Xưởng gốm">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add modal styles if not already present
if (!document.querySelector('.image-modal-styles')) {
    const styles = document.createElement('style');
    styles.className = 'image-modal-styles';
    styles.textContent = `
        .image-modal .modal-content {
            max-width: 90%;
            max-height: 90%;
            background: transparent;
            box-shadow: none;
        }
        
        .image-modal img {
            width: 100%;
            height: auto;
            border-radius: var(--border-radius);
        }
        
        .image-modal .close-modal {
            color: white;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            font-size: 2rem;
            top: 20px;
            right: 20px;
        }
    `;
    document.head.appendChild(styles);
}