'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Music, Volume2, VolumeX, PartyPopper, Cake } from 'lucide-react'

interface FinalSurpriseScreenProps {
  onNext: () => void
  userName: string
}

export default function FinalSurpriseScreen({ onNext, userName }: FinalSurpriseScreenProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Create confetti pieces
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100 - 100,
    color: ['bg-pink-400', 'bg-rose-400', 'bg-yellow-400', 'bg-purple-400', 'bg-blue-400'][Math.floor(Math.random() * 5)],
    size: Math.random() * 8 + 4,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }))

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              className={`absolute ${piece.color} rounded-full`}
              style={{
                left: `${piece.x}%`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
              }}
              initial={{
                y: piece.y,
                rotate: 0,
                opacity: 1
              }}
              animate={{
                y: '100vh',
                rotate: 360,
                opacity: 0
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'easeIn'
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="backdrop-blur-md bg-white/90 border-pink-200 shadow-2xl">
          <CardContent className="p-8">
            <motion.div
              className="text-center mb-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="flex justify-center mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="p-4 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full">
                  <Cake className="w-12 h-12 text-white" />
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
              >
                Happy Birthday
              </motion.h1>
              
              <motion.h2 
                className="text-3xl font-bold text-rose-600 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {userName}! 🎉
              </motion.h2>
              
              <motion.p
                className="text-rose-500 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Today is all about celebrating YOU!
              </motion.p>
            </motion.div>

            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <div className="text-8xl animate-bounce">🧸</div>
            </motion.div>

            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-pink-100 rounded-full px-4 py-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="text-pink-600 font-medium">With all my love</span>
                <Heart className="w-5 h-5 text-pink-500" />
              </motion.div>
              
              <motion.p
                className="text-rose-400 text-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                You make the world a brighter place just by being in it! ✨
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col items-center space-y-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onNext}
                  className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
                >
                  <PartyPopper className="w-5 h-5 mr-2" />
                  Read My Final Letter
                </Button>
              </motion.div>

              {/* Music controls */}
              <motion.div
                className="flex items-center space-x-2 text-pink-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.5 }}
              >
                <Music className="w-4 h-4" />
                <span className="text-sm">Background music</span>
                <motion.button
                  onClick={toggleMute}
                  className="p-1 hover:bg-pink-100 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Floating decorations */}
            <div className="absolute top-4 left-4 text-pink-200 text-2xl animate-bounce">🎈</div>
            <div className="absolute top-4 right-4 text-pink-200 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎁</div>
            <div className="absolute bottom-4 left-4 text-pink-200 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🎀</div>
            <div className="absolute bottom-4 right-4 text-pink-200 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>🌸</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Hidden audio element for background music */}
      <audio
        ref={audioRef}
        loop
        autoPlay
        muted={isMuted}
        className="hidden"
      >
        <source src="/birthday-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}