'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, MessageCircle, Sparkles } from 'lucide-react'

interface MessageScreenProps {
  onNext: () => void
  userName: string
}

export default function MessageScreen({ onNext, userName }: MessageScreenProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [showButton, setShowButton] = useState(false)

  const fullMessage = `Dear ${userName},

On this special day, I wanted to create something just for you — something that would bring a smile to your face and warmth to your heart.

You are like a rare and beautiful flower that blooms in the most unexpected places, bringing joy and color to everyone around you. Your laughter is like music, your kindness is like sunshine, and your presence makes the world a brighter place.

Today, as we celebrate you, I hope you know how much you are loved, appreciated, and cherished. You deserve all the happiness in the world, and I hope this little surprise brings a moment of joy to your special day.

May your birthday be filled with love, laughter, and all the things that make you happiest. You are truly special, and today is all about celebrating YOU!

With all my love and best wishes... 💕`

  useEffect(() => {
    let currentIndex = 0
    const typingSpeed = 30 // milliseconds per character

    const typeWriter = () => {
      if (currentIndex < fullMessage.length) {
        setDisplayedText(fullMessage.substring(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeWriter, typingSpeed)
      } else {
        setShowButton(true)
      }
    }

    typeWriter()

    return () => {
      // Cleanup if component unmounts
    }
  }, [fullMessage])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
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
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="p-3 bg-pink-100 rounded-full">
                  <MessageCircle className="w-8 h-8 text-pink-500" />
                </div>
              </motion.div>
              <h1 className="text-3xl font-bold text-rose-600 mb-2">
                A Message From the Heart
              </h1>
              <p className="text-rose-500 text-sm">
                Just for you, {userName} 💕
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-6 min-h-[300px] max-h-[400px] overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <pre className="text-rose-700 text-sm leading-relaxed font-serif whitespace-pre-wrap">
                  {displayedText}
                  <motion.span
                    className="inline-block w-2 h-4 bg-rose-400 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </pre>
                
                {/* Decorative corner elements */}
                <div className="absolute top-2 left-2 text-pink-200 text-xl">🌸</div>
                <div className="absolute top-2 right-2 text-pink-200 text-xl">🌹</div>
                <div className="absolute bottom-2 left-2 text-pink-200 text-xl">💕</div>
                <div className="absolute bottom-2 right-2 text-pink-200 text-xl">✨</div>
              </div>
            </motion.div>

            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.p
                  className="text-rose-400 mb-4 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  There's one more surprise waiting for you...
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={onNext}
                    className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Continue to Your Surprise
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {!showButton && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex justify-center space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-pink-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
                <p className="text-rose-400 text-sm mt-2">Typing your message...</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}