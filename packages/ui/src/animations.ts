export const animationConfig = {
  "100ms": {
    type: "timing" as const,
    duration: 100,
  },
  bouncy: {
    type: "spring" as const,
    damping: 9,
    mass: 0.9,
    stiffness: 150,
  },
  lazy: {
    type: "spring" as const,
    damping: 18,
    stiffness: 50,
  },
  medium: {
    type: "spring" as const,
    damping: 15,
    stiffness: 120,
    mass: 1,
  },
  slow: {
    type: "spring" as const,
    damping: 15,
    stiffness: 40,
  },
  quick: {
    type: "spring" as const,
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  tooltip: {
    type: "spring" as const,
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
};
