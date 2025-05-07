import { Engine } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import type { RecursivePartial } from "@tsparticles/engine";
import type { IOptions, MoveDirection, OutMode } from "@tsparticles/engine";

// Shared initialization function
export const particlesInit = async (engine: Engine): Promise<void> => {
  await loadAll(engine);
};

// Base configuration that can be customized per component
export const baseParticlesConfig: RecursivePartial<IOptions> = {
  fullScreen: { enable: false },
  background: { color: { value: "#0a0a0a" } },
  fpsLimit: 120,
  particles: {
    color: { value: "#6366f1" },
    links: {
      color: "#a855f7",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1
    },
    move: {
      direction: "none" as MoveDirection,
      enable: true,
      outModes: { 
        default: "bounce" as OutMode
      },
      random: true,
      speed: 0.6,
      straight: false,
    },
    number: { density: { enable: true, area: 1200 }, value: 40 },
    opacity: { value: 0.2 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2 } },
  },
  detectRetina: true
};
