"use client";
import React from 'react';
import { Particles } from "@tsparticles/react";
import { particlesInit, baseParticlesConfig } from '@/utils/particlesConfig';

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
  speed = 0.5
}) => {
  return (
    <Particles
      id={id}
      init={particlesInit}
      options={{
        ...baseParticlesConfig,
        particles: {
          ...baseParticlesConfig.particles,
          color: { value: particleColor },
          links: {
            ...baseParticlesConfig.particles.links,
            color: linkColor,
          },
          move: {
            ...baseParticlesConfig.particles.move,
            speed: speed,
          },
          number: { 
            density: { enable: true, area: 1000 }, 
            value: quantity 
          },
        }
      }}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticlesBackground;
