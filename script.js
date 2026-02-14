function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
        
        if (currentPage === "register.html" && link.getAttribute("href") === "login.html") {
            link.classList.add("active");
        }
    });
}


function createStars() {
    const starsContainer = document.querySelector(".stars-container");
    if (!starsContainer) return;

    for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";

        
        const size = (Math.random() * 2 + 1).toFixed(2);
        const left = (Math.random() * 100).toFixed(2);
        const top = (Math.random() * 100).toFixed(2);
        const opacity = (Math.random() * 0.5 + 0.3).toFixed(2);
        const duration = (Math.random() * 3 + 2).toFixed(2);
        const delay = (Math.random() * 3).toFixed(2);

        star.style.setProperty("--star-size", `${size}px`);
        star.style.setProperty("--star-left", `${left}%`);
        star.style.setProperty("--star-top", `${top}%`);
        star.style.setProperty("--star-opacity", opacity);
        star.style.setProperty("--star-duration", `${duration}s`);
        star.style.setProperty("--star-delay", `${delay}s`);

        starsContainer.appendChild(star);
    }
}

(function addStarStyles() {
    const style = document.createElement("style");
    style.textContent = `
        .star {
            position: fixed;
            width: var(--star-size);
            height: var(--star-size);
            background: white;
            border-radius: 50%;
            left: var(--star-left);
            top: var(--star-top);
            opacity: var(--star-opacity);
            pointer-events: none;
            z-index: -1;
            animation: twinkle var(--star-duration) infinite;
            animation-delay: var(--star-delay);
        }

        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }

        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: 600;
            z-index: 2000;
            backdrop-filter: blur(10px);
            max-width: 400px;
            word-wrap: break-word;
            color: #fff;
        }

        .notification-success {
            background: rgba(16, 185, 129, 0.9);
        }

        .notification-error {
            background: rgba(239, 68, 68, 0.9);
        }

        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
})();

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}


function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    if (type === "success") {
        notification.classList.add("notification-success");
    } else if (type === "error") {
        notification.classList.add("notification-error");
    }

    notification.textContent = message;
    notification.style.animation = "slideIn 0.3s ease";

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


function setupForms() {
    const loginForm = document.querySelector("#loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = loginForm.querySelector("input[type='email']").value.trim();
            const password = loginForm.querySelector("input[type='password']").value;

            if (!validateEmail(email)) {
                showNotification("Введите корректный email.", "error");
                return;
            }
            if (!validatePassword(password)) {
                showNotification("Пароль должен быть не короче 6 символов.", "error");
                return;
            }

            showNotification("Вход выполнен. Добро пожаловать!", "success");
            loginForm.reset();
        });
    }

    const registerForm = document.querySelector("#registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = registerForm.querySelector("input[type='text']").value.trim();
            const email = registerForm.querySelector("input[type='email']").value.trim();
            const passwords = registerForm.querySelectorAll("input[type='password']");
            const password = passwords[0].value;
            const confirmPassword = passwords[1].value;

            if (name.length < 3) {
                showNotification("Имя должно содержать не менее 3 символов.", "error");
                return;
            }
            if (!validateEmail(email)) {
                showNotification("Введите корректный email.", "error");
                return;
            }
            if (!validatePassword(password)) {
                showNotification("Пароль должен быть не короче 6 символов.", "error");
                return;
            }
            if (password !== confirmPassword) {
                showNotification("Пароли не совпадают.", "error");
                return;
            }

            showNotification("Аккаунт успешно создан!", "success");
            registerForm.reset();
        });
    }
}


function setupContactForm() {
    const contactForm = document.querySelector("#contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showNotification("Сообщение отправлено. Скоро с вами свяжемся!", "success");
            contactForm.reset();
        });
    }
}


function setupMobileMenu() {
    const burger = document.querySelector(".hamburger");
    const menu = document.querySelector(".nav-menu");

    if (!burger || !menu) return;

    burger.addEventListener("click", () => {
        menu.classList.toggle("open");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    highlightCurrentPage();
    createStars();
    setupForms();
    setupContactForm();
    setupMobileMenu();
});
