// Matrix Rain Animation
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

// Configuration
const cols = Math.floor(width / 20) + 1;
const ypos = Array(cols).fill(0);
const chars = '0123456789ABCDEF';

// Render loop
function matrix() {
    // Clear with semi-transparent black to create trailing effect
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0f0'; // Basic neon green
    ctx.font = '15pt monospace';

    ypos.forEach((y, i) => {
        // Pick random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 20;

        // Vary colors for "depth" (some brighter, some dimmer)
        const isBright = Math.random() > 0.95;
        ctx.fillStyle = isBright ? '#fff' : (Math.random() > 0.9 ? '#39d353' : '#033a16');

        ctx.fillText(text, x, y);

        // Randomly reset column to top
        if (y > 100 + Math.random() * 10000) ypos[i] = 0;
        else ypos[i] = y + 20;
    });
}

setInterval(matrix, 50);

// Typing Effect
const heroElement = document.getElementById('hero-text');
const phrases = [
    "BUILDING SCALABLE SYSTEMS",
    "OPTIMIZING DATA PIPELINES",
    "DESIGNING ROBUST APIS"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        heroElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        heroElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    // Blinking cursor logic is in CSS, just text here

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Finished typing phrase
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before next
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typing on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// "Execute" Button interaction
const execBtn = document.getElementById('execute-btn');
/*
if (execBtn) {
  execBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
  });
}
*/

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
