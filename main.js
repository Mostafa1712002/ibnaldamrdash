// Matrix Rain Effect
const canvas = document.getElementById('matrix-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters for the matrix rain
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Drops array
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    // Drawing function
    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0'; // Neon Green
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);
}

// Typing Effect for Hero Text
const heroText = "Hello, World! I'm Mostafa.";
const heroElement = document.getElementById('hero-text');
if (heroElement) {
    let i = 0;
    function typeWriter() {
        if (i < heroText.length) {
            heroElement.textContent += heroText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    setTimeout(typeWriter, 500);
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');

        const email = emailInput.value;
        const message = messageInput.value;

        // Construct mailto link
        const subject = "Portfolio Contact: Connection Request";
        const body = `From: ${email}\n\nMessage:\n${message}`;

        const mailtoLink = `mailto:mostafaibrahim1712002@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open default mail client
        window.location.href = mailtoLink;

        // Optional: clear form or show success feedback
        messageInput.value = '';
        alert('Opening your email client to send the packet...');
    });
}

// Project Loader
async function loadProjects(filter = 'all') {
    const container = document.querySelector('.logs-container');

    // Simple loading state
    container.innerHTML = '<div class="log-entry" style="text-align:center;"><span style="color: var(--accent-cyan)">Loading projects data...</span></div>';

    try {
        const response = await fetch(`projects.json?v=${Date.now()}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Clear container
        container.innerHTML = '';

        // Filter Data
        const filteredData = filter === 'all'
            ? data
            : data.filter(p => p.category === filter);

        if (filteredData.length === 0) {
            container.innerHTML = '<div class="log-entry" style="text-align:center;"><span style="color: var(--accent-yellow)">No projects found in this category.</span></div>';
            return;
        }

        // Render Projects
        filteredData.forEach(proj => {
            const entry = document.createElement('div');
            entry.className = 'log-entry';

            // Allow HTML in message (for <strong>)
            let metaHtml = proj.meta;

            entry.innerHTML = `
                <div class="timestamp">${proj.timestamp}</div>
                <div class="log-level ${proj.level}">${proj.label}</div>
                <div class="log-message">${proj.message}</div>
                <div class="log-meta">${metaHtml}</div>
            `;
            container.appendChild(entry);
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = `<div class="log-entry"><span style="color: var(--accent-red)">Error loading projects.log: ${err.message}</span></div>`;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initial Load
    loadProjects('all');

    // Filter Buttons logic
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            buttons.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            // value
            const filterValue = btn.getAttribute('data-filter');
            loadProjects(filterValue);
        });
    });

    // Smooth scroll for nav links (optional if needed)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
