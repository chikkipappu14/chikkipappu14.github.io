// Floating hearts animation
function createFloatingHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 300);

// Messages for the "No" button
const messages = [
    "Are you sure? 🥺",
    "Really sure?? 💔",
    "Are you positive? 🤔",
    "Pookie please... 🥺",
    "Just think about it! 💭",
    "If you say no I will be really sad 😢",
    "I will be very sad... 💔",
    "My heart will break... 💔",
    "Please reconsider... 🙏",
    "One more chance? 💝",
    "You know you want to say yes! 😊",
    "I believe in us! 💕",
    "Don't break my heart! 💔",
    "Think of all our memories! 🥰",
    "You're my everything! 💖",
    "I can't imagine life without you! 😢",
    "Pretty pretty please? 🥺",
    "With a cherry on top? 🍒",
    "You're making me cry! 😭",
    "This is your last chance! ⚠️",
    "I'll love you forever! 💕",
    "Just say yes already! 😊"
];

let messageIndex = 0;
let noClickCount = 0;

// Handle "No" button click
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const messageEl = document.getElementById('message');
const subtitleEl = document.getElementById('subtitle');
const mainCard = document.getElementById('mainCard');

noBtn.addEventListener('click', function () {
    noClickCount++;

    // Change message
    if (messageIndex < messages.length) {
        messageEl.textContent = messages[messageIndex];
        messageIndex++;
    }

    // Make Yes button bigger
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (currentSize * 1.15) + 'px';
    yesBtn.style.padding = '18px 35px';

    // Make No button smaller and move it
    const currentNoSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
    noBtn.style.fontSize = (currentNoSize * 0.9) + 'px';

    // Move No button randomly
    const container = document.querySelector('.button-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width;
    const maxY = 100;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY - 50;

    noBtn.style.position = 'relative';
    noBtn.style.transform = `translate(${randomX - btnRect.left + containerRect.left}px, ${randomY}px)`;

    // Add shake animation to message
    messageEl.style.animation = 'shake 0.5s';
    setTimeout(() => {
        messageEl.style.animation = '';
    }, 500);
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Handle "Yes" button click
yesBtn.addEventListener('click', function () {
    // Create explosion of hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createCelebrationHeart();
        }, i * 50);
    }

    // Change the message
    messageEl.textContent = "I love you too! 💖";
    messageEl.style.color = '#ff69b4';

    // Show subtitle
    subtitleEl.textContent = "I knew you would say yes";
    subtitleEl.classList.add('show');

    // Hide No button
    noBtn.style.display = 'none';

    // Change Yes button
    yesBtn.textContent = "💕 Forever & Always 💕";
    yesBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';

    // Add confetti effect
    setTimeout(() => {
        createConfetti();
    }, 500);

    // Create floating photos in background
    setTimeout(() => {
        createFloatingPhotos();
    }, 1000);

    // Show special message after delay
    setTimeout(() => {
        showSpecialMessage();
    }, 2000);
});

// Create celebration hearts
function createCelebrationHeart() {
    const heart = document.createElement('div');
    heart.style.position = 'fixed';
    heart.style.fontSize = '30px';
    heart.innerHTML = '💖';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';

    document.body.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 200 + 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    let x = 0, y = 0;
    let opacity = 1;

    const animate = () => {
        x += vx * 0.016;
        y += vy * 0.016;
        opacity -= 0.02;

        heart.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        heart.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            heart.remove();
        }
    };

    animate();
}

// Create confetti
function createConfetti() {
    const colors = ['#ff6b9d', '#c06c84', '#f67280', '#355c7d', '#6c5ce7'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '999';
            confetti.style.pointerEvents = 'none';

            document.body.appendChild(confetti);

            const duration = Math.random() * 3 + 2;
            const xMovement = (Math.random() - 0.5) * 200;

            confetti.animate([
                { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(100vh) translateX(${xMovement}px) rotate(720deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, i * 30);
    }
}

// Create floating photos in background
// Flag is set inside function to prevent re-runs if needed, 
// but we check it early.
let photosCreated = false;

function createFloatingPhotos() {
    // Only create photos once
    if (photosCreated) return;
    photosCreated = true;

    // We want exactly 10 photos: 5 on left, 5 on right
    const photoCount = 10;
    const photoSize = 150;
    const placedPhotos = [];

    // Get fresh container bounds
    const mainCard = document.getElementById('mainCard');
    const headerHeight = 150; // Approximate height for "Be My Valentine" text

    function checkOverlap(x, y, size) {
        // Get fresh container bounds each time (in case it moved)
        const cardRect = mainCard.getBoundingClientRect();

        // Check overlap with header area
        if (y < headerHeight) {
            return true;
        }

        // Check overlap with center card (add simple padding)
        const padding = 20;
        if (x + size > cardRect.left - padding &&
            x < cardRect.right + padding &&
            y + size > cardRect.top - padding &&
            y < cardRect.bottom + padding) {
            return true;
        }

        // Check overlap with other placed photos
        for (const photo of placedPhotos) {
            const dx = x - photo.x;
            const dy = y - photo.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            // Ensure significant spacing so they don't clutter on top of each other
            if (distance < size + 15) {
                return true;
            }
        }

        return false;
    }

    function findValidPosition(side) {
        let attempts = 0;
        const maxAttempts = 200;
        const cardRect = mainCard.getBoundingClientRect();

        while (attempts < maxAttempts) {
            let x;
            // Define left and right zones relative to the card's current position
            if (side === 'left') {
                // Must be to the left of the card
                // Range: [0, cardRect.left - photoSize - margin]
                const maxLeftX = Math.max(0, cardRect.left - photoSize - 20);
                x = Math.random() * maxLeftX;
            } else {
                // Must be to the right of the card
                // Range: [cardRect.right + margin, window.innerWidth - photoSize]
                const minRightX = cardRect.right + 20;
                const availableWidth = window.innerWidth - minRightX - photoSize;
                x = minRightX + Math.random() * Math.max(0, availableWidth);
            }

            const y = Math.random() * (window.innerHeight - photoSize);

            // Validate position
            if (!checkOverlap(x, y, photoSize)) {
                return { x, y };
            }
            attempts++;
        }

        return null; // Could not find a spot
    }

    for (let i = 0; i < photoCount; i++) {
        setTimeout(() => {
            // First 5 (0-4) on left, next 5 (5-9) on right
            const side = i < 5 ? 'left' : 'right';
            const position = findValidPosition(side);

            if (!position) {
                console.log(`Could not find valid position for photo ${i + 1} on ${side}`);
                return;
            }

            placedPhotos.push({ x: position.x, y: position.y });

            const photo = document.createElement('img');
            // Use 1.jpeg to 10.jpeg
            photo.src = `${i + 1}.jpeg`;
            photo.style.position = 'fixed';
            photo.style.width = photoSize + 'px';
            photo.style.height = photoSize + 'px';
            photo.style.objectFit = 'cover';
            photo.style.borderRadius = '15px';
            photo.style.border = '3px solid white';
            photo.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            photo.style.left = position.x + 'px';
            photo.style.top = position.y + 'px';
            photo.style.zIndex = '5';
            photo.style.opacity = '0';
            photo.style.transform = 'scale(0) rotate(' + (Math.random() * 360) + 'deg)';
            photo.style.transition = 'all 0.8s ease-out';

            document.body.appendChild(photo);

            // Animate in
            setTimeout(() => {
                photo.style.opacity = '0.8';
                photo.style.transform = 'scale(1) rotate(' + (Math.random() * 20 - 10) + 'deg)';
            }, 50);

            // Gentle float animation
            const baseX = position.x;
            const baseY = position.y;
            let floatOffset = Math.random() * 10;

            const floatAnimation = setInterval(() => {
                floatOffset += 0.02;
                const offsetX = Math.sin(floatOffset) * 5; // slightly more movement
                const offsetY = Math.cos(floatOffset * 0.7) * 5;
                photo.style.left = (baseX + offsetX) + 'px';
                photo.style.top = (baseY + offsetY) + 'px';
            }, 50);

            // Store for cleanup
            photo.dataset.floatInterval = floatAnimation;
        }, i * 200);
    }
}

// Show special message
function showSpecialMessage() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '10000';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.5s';

    const specialMsg = document.createElement('div');
    specialMsg.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    specialMsg.style.padding = '50px';
    specialMsg.style.borderRadius = '20px';
    specialMsg.style.textAlign = 'center';
    specialMsg.style.maxWidth = '500px';
    specialMsg.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.5)';
    specialMsg.innerHTML = `
        <h2 style="font-family: 'Pacifico', cursive; font-size: 2.5rem; color: white; margin-bottom: 20px;">
            Happy Valentine's Day! 💕
        </h2>
        <p style="font-size: 1.2rem; color: white; line-height: 1.6; margin-bottom: 20px;">
            You make every day special, sometimes happy sometimes not but in the end I still love you 
            for what you are and who you are. I'm glad that I have you in my life and today is extra 
            special because I get to tell you how much you mean to me. 
        </p>
        <p style="font-size: 1.2rem; color: white; line-height: 1.6; margin-bottom: 2px;">
            My Valentine 🩷
        </p>
        <p style="font-size: 1.2rem; color: white; line-height: 1.6; margin-bottom: 2px;">
            My Love 💘
        </p>
        <p style="font-size: 1.2rem; color: white; line-height: 1.6; margin-bottom: 2px;">
            My Mommy 🥰
        </p>
        <p style="font-size: 1.2rem; color: white; line-height: 1.6; margin-bottom: 2px;">
            My Future Wife 💍
        </p>
        <p style="font-size: 1.2rem; color: white; line-height: 1.6; margin-bottom: 20px;">
            My Everything 💖
        </p>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: white; color: #764ba2; border: none; padding: 15px 40px; 
                       border-radius: 50px; font-size: 1.1rem; font-weight: 600; cursor: pointer;
                       font-family: 'Poppins', sans-serif; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            Close 💝
        </button>
    `;

    overlay.appendChild(specialMsg);
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 100);
}

// Add sparkle effect on mouse move
document.addEventListener('mousemove', function (e) {
    if (Math.random() > 0.9) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '20px';
        sparkle.style.zIndex = '999';

        document.body.appendChild(sparkle);

        sparkle.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-30px) scale(0)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Initial animation on load
window.addEventListener('load', function () {
    // Create initial burst of hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createFloatingHeart, i * 200);
    }

    // Try to play music after 2 seconds
    setTimeout(() => {
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.volume = 0.1;
        bgMusic.play().catch(error => {
            console.log('Auto-play prevented by browser policy. Interaction required.');
            // Fallback: Play on first interaction if auto-play fails
            document.body.addEventListener('click', function playOnInteraction() {
                bgMusic.play();
                document.body.removeEventListener('click', playOnInteraction);
            }, { once: true });
        });
    }, 2000);
});
