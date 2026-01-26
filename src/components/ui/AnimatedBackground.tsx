'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function AnimatedBackground() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([])

  useEffect(() => {
    // Generate random hearts
    const generateHearts = () => {
      const newHearts = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 10 + 10
      }))
      setHearts(newHearts)
    }

    generateHearts()
    const interval = setInterval(generateHearts, 20000) // Regenerate every 20 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
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
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute opacity-20"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: heart.duration,
            ease: "easeInOut",
            repeat: Infinity
          }}
        >
          💕
        </motion.div>
      ))}

      {/* Sparkle effects */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-200/20 via-transparent to-purple-200/20" />
    </div>
  )
}