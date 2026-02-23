import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ value, suffix = '', duration = 2 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutExpo = (x: number) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      const easedProgress = easeOutExpo(progress);
      setCount(Math.floor(easedProgress * numericValue));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, numericValue, duration]);

  const formatNumber = (num: number) => {
    if (value.includes(',')) return num.toLocaleString();
    return num;
  };

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="tabular-nums"
    >
      {value.startsWith('+') && '+'}
      {formatNumber(count)}
      {suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
