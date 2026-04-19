// ==========================================
// ✨ 1. CUSTOM CURSOR & CLICK RIPPLES (SPREAD LOVE)
// ==========================================
const cursor = document.getElementById("cursor");
const cursorBlur = document.getElementById("cursor-blur");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    setTimeout(() => {
        cursorBlur.style.left = e.clientX + "px";
        cursorBlur.style.top = e.clientY + "px";
    }, 60); // Softer, slightly more delayed trail
});

// Interactive hover scaling
document.querySelectorAll('button, .polaroid, .sticky-note').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(2)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
});

// "Spread Love" Click Effect 💖✨
const heartsArr = ['💖', '✨', '🦋', '🌸'];
document.addEventListener('click', (e) => {
    for(let i=0; i<3; i++) {
        const heart = document.createElement('div');
        heart.classList.add('click-heart');
        heart.innerText = heartsArr[Math.floor(Math.random() * heartsArr.length)];
        heart.style.left = (e.clientX - 15 + (Math.random()*30 - 15)) + 'px';
        heart.style.top = (e.clientY - 15 + (Math.random()*30 - 15)) + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
});

// ==========================================
// 💌 2. ENVELOPE OPENING LOGIC
// ==========================================
const envelopeScreen = document.getElementById('envelope-screen');
const mainWorld = document.getElementById('main-world');
const bgMusic = document.getElementById('bg-music');
const musicToggleIcon = document.querySelector('#music-toggle i');
let isPlaying = false;

envelopeScreen.addEventListener('click', () => {
    // Hide envelope
    envelopeScreen.style.opacity = '0';
    setTimeout(() => {
        envelopeScreen.style.visibility = 'hidden';
        envelopeScreen.style.display = 'none';
        
        // Show world
        mainWorld.classList.add('active');
        
        // Fade in Music
        bgMusic.volume = 0;
        bgMusic.play().catch(e => console.log("Audio play blocked"));
        isPlaying = true;
        musicToggleIcon.classList.replace('fa-music', 'fa-pause');
        
        let vol = 0;
        let fadeAudio = setInterval(() => {
            if (vol < 0.4) { // Soft volume
                vol += 0.05;
                bgMusic.volume = vol;
            } else {
                clearInterval(fadeAudio);
            }
        }, 200);

        // Start typing effect
        startTyping();
    }, 1500);
});

// Music Toggle Button
document.getElementById('music-toggle').addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent ripple overriding
    if(isPlaying) {
        bgMusic.pause();
        musicToggleIcon.classList.replace('fa-pause', 'fa-music');
    } else {
        bgMusic.play();
        musicToggleIcon.classList.replace('fa-music', 'fa-pause');
    }
    isPlaying = !isPlaying;
});

// ==========================================
// 🌸 3. TYPING EFFECT
// ==========================================
const textToType = "Happy Birthday Arshii 💖";
const typingElement = document.getElementById('typing-text');
let typeIdx = 0;

function startTyping() {
    if (typeIdx < textToType.length) {
        typingElement.innerHTML += textToType.charAt(typeIdx);
        typeIdx++;
        setTimeout(startTyping, 120);
    }
}

// ==========================================
// 🦋 4. FLOATING ELEMENTS BACKGROUND
// ==========================================
const floatContainer = document.getElementById('floating-elements');
function createFloatingElement() {
    const el = document.createElement('div');
    el.classList.add('float-item');
    el.innerText = heartsArr[Math.floor(Math.random() * heartsArr.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    el.style.animationDuration = (Math.random() * 10 + 15) + 's'; // Slow and soft
    
    floatContainer.appendChild(el);
    setTimeout(() => el.remove(), 25000);
}
setInterval(createFloatingElement, 800); // Gentle frequency

// ==========================================
// 🎂 5. COUNTDOWN TIMER
// ==========================================
function updateCountdown() {
    const now = new Date();
    let currentYear = now.getFullYear();
    let targetDate = new Date(currentYear, 3, 20); // April 20

    if (now > targetDate) {
        targetDate.setFullYear(currentYear + 1);
    }

    const diff = targetDate - now;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = d.toString().padStart(2, '0');
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ==========================================
// ✨ 6. SCROLL REVEAL
// ==========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ==========================================
// 🎁 7. SURPRISE MOMENT (DRAMATIC CONFETTI)
// ==========================================
const surpriseBtn = document.getElementById('surprise-btn');
const surpriseModal = document.getElementById('surprise-modal');
const closeSurprise = document.getElementById('close-surprise');

surpriseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Blur Background
    mainWorld.style.filter = "blur(15px)";
    mainWorld.style.transition = "filter 1s ease";
    
    // Show Modal
    surpriseModal.classList.add('active');

    // Premium Soft Confetti Explosion
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 40, spread: 360, ticks: 100, zIndex: 100000, colors: ['#ffb6c1', '#e6ccff', '#ffffff', '#ff6b8b', '#ffdab9'] };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 60 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
});

closeSurprise.addEventListener('click', () => {
    surpriseModal.classList.remove('active');
    mainWorld.style.filter = "none";
});
