// Create animated background canvas
const canvas = document.createElement('canvas');
canvas.id = 'bg-animation';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle system
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(255, ${Math.floor(Math.random() * 60 + 107)}, 0, ${Math.random() * 0.5 + 0.2})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY *= -1;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Floating shapes
class FloatingShape {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 100 + 50;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.type = Math.floor(Math.random() * 3); // 0: circle, 1: square, 2: triangle
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, 'rgba(255, 107, 0, 0.1)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;

        if (this.type === 0) {
            // Circle
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 1) {
            // Square
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else {
            // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();
        }
        
        ctx.restore();
    }
}

// Wave effect
class Wave {
    constructor(yOffset, amplitude, frequency, speed, color) {
        this.yOffset = yOffset;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.color = color;
        this.time = 0;
    }

    update() {
        this.time += this.speed;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 + this.yOffset);

        for (let x = 0; x < canvas.width; x++) {
            const y = Math.sin((x * this.frequency) + this.time) * this.amplitude;
            ctx.lineTo(x, canvas.height / 2 + this.yOffset + y);
        }

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Initialize particles
const particles = [];
const particleCount = 80;
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Initialize floating shapes
const shapes = [];
const shapeCount = 8;
for (let i = 0; i < shapeCount; i++) {
    shapes.push(new FloatingShape());
}

// Initialize waves
const waves = [
    new Wave(100, 30, 0.01, 0.02, 'rgba(255, 107, 0, 0.1)'),
    new Wave(150, 40, 0.008, 0.015, 'rgba(255, 165, 0, 0.08)'),
    new Wave(200, 25, 0.012, 0.025, 'rgba(255, 107, 0, 0.06)')
];

// Connect particles
function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.strokeStyle = `rgba(255, 107, 0, ${1 - distance / 120})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Glowing orbs
class GlowOrb {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50 + 30;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulsePhase += this.pulseSpeed;

        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
    }

    draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const currentSize = this.size * pulse;
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentSize);
        gradient.addColorStop(0, 'rgba(255, 107, 0, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 165, 0, 0.15)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize glowing orbs
const orbs = [];
const orbCount = 5;
for (let i = 0; i < orbCount; i++) {
    orbs.push(new GlowOrb());
}

// Animation loop
function animate() {
    // Clear with fade effect
    ctx.fillStyle = 'rgba(26, 26, 26, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw and update glowing orbs
    orbs.forEach(orb => {
        orb.update();
        orb.draw();
    });

    // Draw and update waves
    waves.forEach(wave => {
        wave.update();
        wave.draw();
    });

    // Draw and update floating shapes
    shapes.forEach(shape => {
        shape.update();
        shape.draw();
    });

    // Draw and update particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Connect particles
    connectParticles();

    requestAnimationFrame(animate);
}

// Mouse interaction
let mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;

    // Create ripple effect on mouse move
    particles.forEach(particle => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            particle.speedX -= Math.cos(angle) * force * 0.1;
            particle.speedY -= Math.sin(angle) * force * 0.1;
        }
    });
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start animation
animate();

console.log('Background animation initialized successfully!');
