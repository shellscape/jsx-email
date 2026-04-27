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
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const componentVisibilityAmount = window.innerWidth < 1025 ? 0.25 : visibilityAmount;
    setLocalVisibilityAmount(componentVisibilityAmount);
  }, [visibilityAmount]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: localVisibilityAmount
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [localVisibilityAmount]);

  useEffect(() => {
    if (setIsInViewport) {
      setIsInViewport(isInView);
    }
  }, [isInView, setIsInViewport]);

  return (
    <div ref={ref} className={`${fadeEdges ? 'relative overflow-hidden fade-x-10' : ''}`} {...rest}>
      <div
        style={{
          opacity: isInView ? 1 : 0.5,
          transform: isInView ? 'translateY(0) scale(1)' : 'translateY(5px) scale(0.99)',
          transition: 'opacity 0.5s ease, transform 0.5s ease'
        }}
      >
        {children}
      </div>
    </div>
  );
};
