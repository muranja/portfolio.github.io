document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const whatsappMessage = `Greetings I'm ${name}, I would like to ${message}\n\nYou can reach me via ${email}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const phoneNumber = '254714389231';
            
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
            
            contactForm.reset();
        });
    }

    // Feather icons replacement
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // AOS initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const htmlElement = document.documentElement;
        const icon = themeToggle.querySelector('i');
        
        // Load saved theme or use system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
        
        if (isDark) {
            htmlElement.classList.add('dark');
            if (icon) icon.setAttribute('data-feather', 'sun');
        } else {
            if (icon) icon.setAttribute('data-feather', 'moon');
        }
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        themeToggle.addEventListener('click', () => {
            const currentIsDark = htmlElement.classList.contains('dark');
            const newIsDark = !currentIsDark;
            htmlElement.classList.toggle('dark', newIsDark);
            localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
            
            // Update icon
            if (icon) {
                if (newIsDark) {
                    icon.setAttribute('data-feather', 'sun');
                } else {
                    icon.setAttribute('data-feather', 'moon');
                }
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            }
        });
    }

    // Marquee functionality
    const marqueeContent = document.getElementById('marquee-content');
    if (marqueeContent) {
        const content = marqueeContent.innerHTML;
        marqueeContent.innerHTML += content; // Duplicate content for seamless scrolling

        const marqueeContainer = document.getElementById('marquee-container');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        marqueeContent.classList.add('scrolling');
                    } else {
                        marqueeContent.classList.remove('scrolling');
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        if (marqueeContainer) {
            observer.observe(marqueeContainer);
        }
    }
});
