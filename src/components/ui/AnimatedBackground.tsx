'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function AnimatedBackground() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; emoji: string }>>([])
  const [balloons, setBalloons] = useState<Array<{ id: number; x: number; y: number; color: string; duration: number }>>([])
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([])

  useEffect(() => {
    // Generate random hearts and balloons
    const generateElements = () => {
      const emojis = ['💕', '💖', '💗', '💓', '💞', '💝', '🌸', '🌺', '🌹', '🌷', '✨', '⭐', '🌟']
      const newHearts = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 25 + 15,
        duration: Math.random() * 15 + 10,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      }))
      setHearts(newHearts)

      const colors = ['#ff6b9d', '#ff8fab', '#ffb3c1', '#ffe0e9', '#ff1493', '#ff69b4', '#ffb6c1']
      const newBalloons = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 15
      }))
      setBalloons(newBalloons)
    }

    generateElements()
    const interval = setInterval(generateElements, 30000) // Regenerate every 30 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Generate floating particles
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      }))
      setParticles(newParticles)
    }

    generateParticles()
    const particleInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vx: particle.x < 0 || particle.x > window.innerWidth ? -particle.vx : particle.vx,
        vy: particle.y < 0 || particle.y > window.innerHeight ? -particle.vy : particle.vy
      })))
    }, 50)

    return () => clearInterval(particleInterval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Enhanced animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #ffeef8 0%, #ffe0f0 25%, #ffd1e8 50%, #ffc2e0 75%, #ffb3d8 100%)',
            'linear-gradient(135deg, #ffe0f0 0%, #ffd1e8 25%, #ffc2e0 50%, #ffb3d8 75%, #ffa4d0 100%)',
            'linear-gradient(135deg, #ffd1e8 0%, #ffc2e0 25%, #ffb3d8 50%, #ffa4d0 75%, #ff95c8 100%)',
            'linear-gradient(135deg, #ffc2e0 0%, #ffb3d8 25%, #ffa4d0 50%, #ff95c8 75%, #ff86c0 100%)',
            'linear-gradient(135deg, #ffb3d8 0%, #ffa4d0 25%, #ff95c8 50%, #ff86c0 75%, #ffeef8 100%)',
            'linear-gradient(135deg, #ffeef8 0%, #ffe0f0 25%, #ffd1e8 50%, #ffc2e0 75%, #ffb3d8 100%)',
          ]
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute w-1 h-1 bg-pink-300 rounded-full opacity-30"
          style={{
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Floating hearts and emojis */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute opacity-40"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: heart.duration,
            ease: "easeInOut",
            repeat: Infinity
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}

      {/* Floating balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={`balloon-${balloon.id}`}
          className="absolute opacity-30"
          style={{
            left: `${balloon.x}%`,
            top: `${balloon.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 30 - 15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: balloon.duration,
            ease: "easeInOut",
            repeat: Infinity
          }}
        >
          <div
            className="w-6 h-8 rounded-t-full border-2 border-white/50"
            style={{ backgroundColor: balloon.color }}
          />
          <div className="w-0.5 h-6 bg-gray-400 mx-auto" />
        </motion.div>
      ))}

      {/* Enhanced sparkle effects */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.8, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            ease: "easeInOut",
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Magical glow orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-32 h-32 rounded-full opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(255,192,203,0.3) 0%, rgba(255,182,193,0.1) 50%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Overlay gradients for depth and premium feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-200/30 via-transparent to-purple-200/20" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-pink-100/10 to-rose-200/20" />
    </div>
  )
}
