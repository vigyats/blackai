import { motion } from 'framer-motion';

interface SparkleIconProps {
  size?: number;
  className?: string;
}

export const SparkleIcon = ({ size = 24, className = '' }: SparkleIconProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <path
        d="M12 2L13.09 8.26L19 9.27L14.55 13.97L15.82 20L12 16.77L8.18 20L9.45 13.97L5 9.27L10.91 8.26L12 2Z"
        fill="currentColor"
      />
    </motion.svg>
  );
};
