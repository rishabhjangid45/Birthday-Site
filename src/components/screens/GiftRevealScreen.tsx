'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Gift, Sparkles, Heart } from 'lucide-react'

interface GiftRevealScreenProps {
  onNext: () => void
  userName: string
}

export default function GiftRevealScreen({ onNext, userName }: GiftRevealScreenProps) {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpenGift = () => {
    setIsOpened(true)
    setTimeout(() => {
      onNext()
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-md bg-white/80 border-pink-200 shadow-2xl">
          <CardContent className="p-8">
            <motion.div
              className="text-center mb-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <h1 className="text-3xl font-bold text-rose-600 mb-2">
                A Special Gift
              </h1>
              <p className="text-rose-500 text-lg">
                For you, {userName} 💕
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {!isOpened ? (
                  <div className="relative">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-8xl cursor-pointer"
                      onClick={handleOpenGift}
                    >
                      🎁
                    </motion.div>
                    <motion.div
                      className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    className="text-8xl"
                  >
                    🎉
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {!isOpened && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <motion.p
                  className="text-rose-400 mb-6"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click the gift to unwrap your surprise!
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleOpenGift}
                    className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    Open Gift
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {isOpened && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.h2
                  className="text-2xl font-bold text-rose-600 mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Surprise!
                </motion.h2>
                <motion.p
                  className="text-rose-500"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Get ready for something magical... ✨
                </motion.p>
              </motion.div>
            )}

            {/* Floating hearts */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-200 text-xl"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 15}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              >
                <Heart className="w-4 h-4" />
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}