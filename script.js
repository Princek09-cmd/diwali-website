// Fireworks Canvas Setup
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fireworks Array
let fireworks = [];

// Firework Class
class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetX = Math.random() * canvas.width;
        this.targetY = Math.random() * canvas.height / 2;
        this.size = Math.random() * 4 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.speed = 2;
        this.alpha = 1;
    }

    update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        this.x += dx / this.speed;
        this.y += dy / this.speed;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.03) {
        fireworks.push(new Firework());
    }
    fireworks = fireworks.filter(firework => firework.alpha > 0);
    fireworks.forEach(firework => {
        firework.update();
        firework.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// Glow Effect on Scroll
const glow = document.querySelector('.glow');
window.addEventListener('scroll', () => {
    glow.style.opacity = '1';
    setTimeout(() => {
        glow.style.opacity = '0';
    }, 300);
});

// Responsive Canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
