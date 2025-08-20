import { motion, useAnimation, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export const FadeBlock = ({
  children,
  visibilityAmount = 0.25,
  setIsInViewport,
  fadeEdges = true,
  ...rest
}: {
  children: React.ReactNode;
  setIsInViewport?: (arg: boolean) => void;
  visibilityAmount?: number;
  fadeEdges?: boolean;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [localVisibilityAmount, setLocalVisibilityAmount] = useState(0.25);

  const isInView = useInView(ref, {
    amount: localVisibilityAmount,
    once: true
  });
  const controls = useAnimation();

  useEffect(() => {
    const componentVisibilityAmount = window.innerWidth < 1025 ? 0.25 : visibilityAmount;
    setLocalVisibilityAmount(componentVisibilityAmount);
  }, [isInView]);

  useEffect(() => {
    if (setIsInViewport) {
      setIsInViewport(isInView);
    }

    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className={`${fadeEdges ? 'relative overflow-hidden fade-x-10' : ''}`} {...rest}>
      <motion.div
        variants={{
          hidden: { opacity: 0.5, scale: 0.99, y: 5 },
          visible: { opacity: 1, scale: 1, y: 0 }
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
