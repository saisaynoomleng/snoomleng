'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AnimateSlideInProps = {
  direction: 'left' | 'right' | 'top' | 'bottom';
  duration?: number;
  delay?: number;
  children: React.ReactNode;
  offset?: number;
  className?: string;
};

export const AnimateSlideIn = ({
  direction,
  duration = 1,
  delay = 0,
  children,
  offset = 100,
  className,
}: AnimateSlideInProps): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const vars: gsap.TweenVars = {
        opacity: 0,
        duration,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      };

      if (direction === 'left') vars.x = -offset;
      if (direction === 'right') vars.x = offset;
      if (direction === 'top') vars.y = -offset;
      if (direction === 'bottom') vars.y = offset;

      gsap.from(containerRef.current, vars);
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={twMerge(className)}>
      {children}
    </div>
  );
};

export const AnimateSlideInGroup = ({
  delay = 0,
  direction,
  duration = 1,
  offset = 100,
  children,
  className,
}: AnimateSlideInProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = containerRef.current;

      if (!element) return;

      const items = element.querySelectorAll('[data-animate-item]');

      gsap.defaults({ opacity: 0 });

      const vars: gsap.TweenVars = {
        delay,
        duration,
        ease: 'power4.inOut',
        stagger: {
          from: 'random',
          amount: 0.3,
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      };

      if (direction === 'left') vars.x = -offset;
      if (direction === 'right') vars.x = offset;
      if (direction === 'top') vars.y = -offset;
      if (direction === 'bottom') vars.y = offset;

      gsap.from(items, vars);
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={twMerge(className)}>
      {children}
    </div>
  );
};

export const AnimateImageFillIn = ({
  children,
  className,
}: {
  children: Readonly<React.ReactNode>;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = containerRef.current;

      if (!element) return;

      gsap.fromTo(
        element,
        {
          opacity: 0,
          clipPath: 'inset(0% 0% 100% 0%)',
        },
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={twMerge(className)}>
      {children}
    </div>
  );
};

type AnimcateScrollScrubProps = {
  className?: string;
  children: React.ReactNode;
};

export const AnimateScrollScrub = ({
  className,
  children,
}: AnimcateScrollScrubProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = containerRef.current;

      if (!element) return;

      gsap.fromTo(
        element,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 100%',
            end: 'bottom 100%',
            scrub: 1,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={twMerge(className)}>
      {children}
    </div>
  );
};
