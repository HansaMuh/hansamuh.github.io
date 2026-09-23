"use client";

import { cn } from "@/lib/utils";
import { m, type MotionValue, useMotionValue, useSpring, useTransform } from "motion/react";
// Local change: renders `m.*` instead of `motion.*` so the animation features load once,
// through the LazyMotion provider in layout.tsx, instead of in every component.
import { createContext, useContext, useRef, type ReactNode } from "react";

interface DockProps {
  className?: string;
  children: ReactNode;
  magnification?: number;
  distance?: number;
  baseSize?: number;
}

interface DockIconProps {
  className?: string;
  children?: ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 100;
const BASE_SIZE = 40;
const BASE_ICON_SIZE = 20;
const ICON_SIZE_RATIO = 0.5;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

interface DockContextValue {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
  baseSize: number;
}

const DockContext = createContext<DockContextValue | null>(null);

const Dock = ({
  className,
  children,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  baseSize = BASE_SIZE,
}: DockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance, baseSize }}>
      <m.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto flex h-full w-max items-end justify-center overflow-visible rounded-full border",
          className,
        )}
      >
        {children}
      </m.div>
    </DockContext.Provider>
  );
};

const DockIcon = ({ className, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(DockContext);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component");
  }

  const { mouseX, magnification, distance, baseSize } = context;
  const baseIconSize = baseSize * (BASE_ICON_SIZE / BASE_SIZE);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const containerSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [baseSize, magnification, baseSize]),
    SPRING,
  );
  const iconSize = useSpring(
    useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [baseIconSize, magnification * ICON_SIZE_RATIO, baseIconSize],
    ),
    SPRING,
  );

  return (
    <m.div
      ref={ref}
      style={{ width: containerSize, height: containerSize }}
      className={cn(
        "relative flex aspect-square shrink-0 items-center justify-center rounded-full",
        className,
      )}
    >
      <m.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center"
      >
        {children}
      </m.div>
    </m.div>
  );
};

export { Dock, DockIcon };
export type { DockProps, DockIconProps };
