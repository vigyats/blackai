import { motion } from 'framer-motion';

interface FloatingShapesProps {
  variant?: 'hero' | 'section';
}

export const FloatingShapes = ({ variant = 'hero' }: FloatingShapesProps) => {
  const shapes = variant === 'hero' ? [
    { size: 200, x: '10%', y: '20%', delay: 0, opacity: 0.1 },
    { size: 150, x: '80%', y: '30%', delay: 0.5, opacity: 0.08 },
    { size: 100, x: '70%', y: '70%', delay: 1, opacity: 0.06 },
    { size: 80, x: '20%', y: '80%', delay: 1.5, opacity: 0.05 },
    { size: 120, x: '50%', y: '10%', delay: 2, opacity: 0.07 },
  ] : [
    { size: 100, x: '5%', y: '30%', delay: 0, opacity: 0.05 },
    { size: 80, x: '90%', y: '60%', delay: 0.5, opacity: 0.04 },
    { size: 60, x: '85%', y: '20%', delay: 1, opacity: 0.03 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border border-border/30"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            opacity: shape.opacity,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: shape.opacity,
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{
            opacity: { duration: 1, delay: shape.delay },
            scale: { duration: 1, delay: shape.delay },
            y: { 
              duration: 6 + index, 
              repeat: Infinity, 
              ease: 'easeInOut',
              delay: shape.delay 
            },
          }}
        />
      ))}
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          left: '60%',
          top: '20%',
          background: 'radial-gradient(circle, hsl(45, 100%, 60%, 0.03) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          left: '10%',
          top: '60%',
          background: 'radial-gradient(circle, hsl(270, 60%, 50%, 0.02) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
