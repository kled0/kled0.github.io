function initServicePage() {
    
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabContents = document.querySelectorAll('.tab-content');

    tabHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const tabId = header.getAttribute('data-tab');
            
            tabHeaders.forEach(h => h.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            header.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    const formatOptions = document.querySelectorAll('.format-option');
    formatOptions.forEach(option => {
        option.addEventListener('click', () => {
            formatOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const format = option.getAttribute('data-format');
            const price = option.getAttribute('data-price');
            
            if (price) {
                document.querySelector('.current-price').textContent = price + ' ₽';
            }
        });
    });

    const durationOptions = document.querySelectorAll('.duration-option');
    durationOptions.forEach(option => {
        option.addEventListener('click', () => {
            durationOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const duration = option.getAttribute('data-duration');
            const price = option.getAttribute('data-price');
            
            if (price) {
                document.querySelector('.current-price').textContent = price + ' ₽';
            }
        });
    });

    const bookButton = document.getElementById('bookService');
    if (bookButton) {
        bookButton.addEventListener('click', () => {
            const selectedFormat = document.querySelector('.format-option.active');
            const format = selectedFormat ? selectedFormat.getAttribute('data-format') : 'group';
            
            showNotification(`Вы записаны на курс! Формат: ${format === 'group' ? 'Групповой' : 'Индивидуальный'}`, 'success');
        });
    }

    const consultButton = document.getElementById('consultService');
    if (consultButton) {
        consultButton.addEventListener('click', () => {
            showNotification('Запрос на консультацию отправлен! Мы свяжемся с вами в течение 24 часов.', 'success');
        });
    }

    const smoothScrollToTabs = () => {
        const tabsSection = document.querySelector('.service-tabs');
        if (tabsSection) {
            tabsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function showNotification(message, type = "info") {
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        alert(message);
    }
}

document.addEventListener('DOMContentLoaded', initServicePage);