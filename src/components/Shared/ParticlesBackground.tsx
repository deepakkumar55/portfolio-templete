"use client";
import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine } from '@tsparticles/engine';

interface ParticlesBackgroundProps {
  id: string;
  particleColor?: string;
  linkColor?: string;
  quantity?: number;
  speed?: number;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ 
  id, 
  particleColor = "#6366f1", 
  linkColor = "#a855f7",
  quantity = 60,
  speed = 0.7
}) => {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id={id}
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "#0a0a0a" } },
        fpsLimit: 120,
        particles: {
          color: { value: particleColor },
          links: {
            color: linkColor,
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
            speed: speed,
            straight: false,
          },
          number: { density: { enable: true, area: 1200 }, value: quantity },
          opacity: { value: 0.2 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab"
            }
          },
          modes: {
            grab: {
              distance: 150,
              links: {
                opacity: 0.5
              }
            }
          }
        }
      }}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticlesBackground;
