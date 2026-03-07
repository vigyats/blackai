import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const AIGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const radius = Math.min(centerX, centerY) * 0.7;
    let rotation = 0;

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
        if (this.z > 0) return; // Only draw front hemisphere

        const scale = 1 - (this.z + radius) / (radius * 2);
        const size = 2 * scale;
        const opacity = this.alpha * scale;

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

        // Glow effect
        ctx.beginPath();
        ctx.arc(
          centerX + this.x,
          centerY + this.y,
          size * 2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 204, 0, ${opacity * 0.2})`;
        ctx.fill();
      }

      drawConnections(ctx: CanvasRenderingContext2D) {
        if (this.z > 0) return;

        this.connections.forEach(particle => {
          if (particle.z > 0) return;

          const scale1 = 1 - (this.z + radius) / (radius * 2);
          const scale2 = 1 - (particle.z + radius) / (radius * 2);
          const opacity = Math.min(scale1, scale2) * 0.3;

          ctx.beginPath();
          ctx.moveTo(centerX + this.x, centerY + this.y);
          ctx.lineTo(centerX + particle.x, centerY + particle.y);
          ctx.strokeStyle = `rgba(255, 204, 0, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Create connections between nearby particles
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const latDiff = Math.abs(p1.lat - p2.lat);
        const lonDiff = Math.abs(p1.lon - p2.lon);
        const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
        
        if (distance < 0.8 && Math.random() > 0.7) {
          p1.connections.push(p2);
        }
      });
    });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw globe outline
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 204, 0, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw latitude lines
      for (let i = -2; i <= 2; i++) {
        const lat = (i * Math.PI) / 6;
        const y = centerY + radius * Math.sin(lat);
        const r = radius * Math.cos(lat);

        ctx.beginPath();
        ctx.ellipse(centerX, y, r, r * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 204, 0, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw longitude lines (only front half)
      for (let i = 0; i < 6; i++) {
        const lon = (i * Math.PI) / 6 + rotation;
        
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
        ctx.strokeStyle = 'rgba(255, 204, 0, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach(p => p.update(rotation));
      particles.forEach(p => p.drawConnections(ctx));
      particles.forEach(p => p.draw(ctx));

      // Rotate
      rotation += 0.002;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
      style={{
        filter: 'blur(0.5px)',
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0 0 40px rgba(255, 204, 0, 0.3))',
        }}
      />
      {/* Additional glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent blur-3xl" />
    </motion.div>
  );
};
