import { Engine } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

// Shared initialization function
export const particlesInit = async (engine: Engine): Promise<void> => {
  await loadAll(engine);
};

// Base configuration that can be customized per component
export const baseParticlesConfig = {
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
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
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
