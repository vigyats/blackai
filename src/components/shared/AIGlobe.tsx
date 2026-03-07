import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const AIGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [impacted, setImpacted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Globe parameters
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) * 0.85;
    let rotation = 0;
    let isRotating = false;
    let glowIntensity = 0;

    // Meteor class
    class Meteor {
      x: number;
      y: number;
      speed: number;
      size: number;
      angle: number;
      active: boolean;

      constructor() {
        this.angle = Math.random() * Math.PI / 3 - Math.PI / 6;
        this.x = -100;
        this.y = centerY + (Math.random() - 0.5) * radius;
        this.speed = 8 + Math.random() * 4;
        this.size = 3 + Math.random() * 2;
        this.active = true;
      }

      update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        // Check collision with globe
        const dx = this.x - centerX;
        const dy = this.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= radius + 10) {
          this.active = false;
          if (!impacted) {
            setImpacted(true);
            isRotating = true;
            glowIntensity = 1;
          }
        }

        if (this.x > canvas.offsetWidth + 100) {
          this.active = false;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Meteor trail
        const gradient = ctx.createLinearGradient(
          this.x - 30 * Math.cos(this.angle),
          this.y - 30 * Math.sin(this.angle),
          this.x,
          this.y
        );
        gradient.addColorStop(0, 'rgba(255, 204, 0, 0)');
        gradient.addColorStop(1, 'rgba(255, 204, 0, 0.8)');

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - 30 * Math.cos(this.angle),
          this.y - 30 * Math.sin(this.angle)
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.stroke();

        // Meteor head
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 204, 0, 1)';
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 204, 0, 0.3)';
        ctx.fill();
      }
    }

    // Particle system for neural network effect
    class Particle {
      lat: number;
      lon: number;
      x: number;
      y: number;
      z: number;
      alpha: number;
      connections: Particle[];

      constructor() {
        this.lat = Math.random() * Math.PI - Math.PI / 2;
        this.lon = Math.random() * Math.PI * 2;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.alpha = Math.random() * 0.5 + 0.5;
        this.connections = [];
      }

      update(rot: number) {
        const adjustedLon = this.lon + rot;
        this.x = radius * Math.cos(this.lat) * Math.cos(adjustedLon);
        this.y = radius * Math.sin(this.lat);
        this.z = radius * Math.cos(this.lat) * Math.sin(adjustedLon);
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.z > 0) return;

        const scale = 1 - (this.z + radius) / (radius * 2);
        const size = 2.5 * scale;
        const opacity = this.alpha * scale * (1 + glowIntensity);

        ctx.beginPath();
        ctx.arc(
          centerX + this.x,
          centerY + this.y,
          size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 204, 0, ${opacity})`;
        ctx.fill();

        // Enhanced glow during impact
        if (glowIntensity > 0) {
          ctx.beginPath();
          ctx.arc(
            centerX + this.x,
            centerY + this.y,
            size * 3,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(255, 204, 0, ${opacity * 0.3 * glowIntensity})`;
          ctx.fill();
        }
      }

      drawConnections(ctx: CanvasRenderingContext2D) {
        if (this.z > 0) return;

        this.connections.forEach(particle => {
          if (particle.z > 0) return;

          const scale1 = 1 - (this.z + radius) / (radius * 2);
          const scale2 = 1 - (particle.z + radius) / (radius * 2);
          const opacity = Math.min(scale1, scale2) * 0.4 * (1 + glowIntensity * 0.5);

          ctx.beginPath();
          ctx.moveTo(centerX + this.x, centerY + this.y);
          ctx.lineTo(centerX + particle.x, centerY + particle.y);
          ctx.strokeStyle = `rgba(255, 204, 0, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        });
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Create connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const latDiff = Math.abs(p1.lat - p2.lat);
        const lonDiff = Math.abs(p1.lon - p2.lon);
        const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
        
        if (distance < 0.7 && Math.random() > 0.6) {
          p1.connections.push(p2);
        }
      });
    });

    // Create meteors
    const meteors: Meteor[] = [];
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        meteors.push(new Meteor());
      }, i * 200);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw globe outline with glow
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 204, 0, ${0.15 + glowIntensity * 0.3})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Outer glow during impact
      if (glowIntensity > 0) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 204, 0, ${glowIntensity * 0.3})`;
        ctx.lineWidth = 20;
        ctx.stroke();
      }

      // Draw latitude lines
      for (let i = -2; i <= 2; i++) {
        const lat = (i * Math.PI) / 6;
        const y = centerY + radius * Math.sin(lat);
        const r = radius * Math.cos(lat);

        ctx.beginPath();
        ctx.ellipse(centerX, y, r, r * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 204, 0, ${0.08 + glowIntensity * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw longitude lines
      for (let i = 0; i < 8; i++) {
        const lon = (i * Math.PI) / 8 + rotation;
        
        ctx.beginPath();
        for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += 0.1) {
          const x = radius * Math.cos(lat) * Math.cos(lon);
          const z = radius * Math.cos(lat) * Math.sin(lon);
          const y = radius * Math.sin(lat);

          if (z <= 0) {
            const px = centerX + x;
            const py = centerY + y;
            
            if (lat === -Math.PI / 2) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
        }
        ctx.strokeStyle = `rgba(255, 204, 0, ${0.08 + glowIntensity * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Update and draw meteors
      meteors.forEach((meteor, index) => {
        if (meteor.active) {
          meteor.update();
          meteor.draw(ctx);
        }
      });

      // Update and draw particles
      particles.forEach(p => p.update(rotation));
      particles.forEach(p => p.drawConnections(ctx));
      particles.forEach(p => p.draw(ctx));

      // Rotate globe after impact
      if (isRotating) {
        rotation += 0.003;
      }

      // Fade glow
      if (glowIntensity > 0) {
        glowIntensity -= 0.01;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [impacted]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0 0 60px rgba(255, 204, 0, 0.4))',
        }}
      />
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent blur-3xl" />
    </motion.div>
  );
};
