import { motion, type MotionProps } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type FadeInProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}> &
  MotionProps;

export function FadeIn({ children, className, delay = 0, ...motionProps }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
