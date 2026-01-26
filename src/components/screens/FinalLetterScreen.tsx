'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, PenTool, Sparkles } from 'lucide-react'

interface FinalLetterScreenProps {
  userName: string
  customLetter?: string
}

export default function FinalLetterScreen({ userName, customLetter }: FinalLetterScreenProps) {
  const [isVisible] = useState(true)

  const closingMessage = customLetter || `My Dearest ${userName},

As I sit here writing this final letter, my heart is filled with so much warmth and affection for you. Today, on your birthday, I wanted to create something that would truly express how much you mean to me.

You are like a beautiful sunset — rare, breathtaking, and leaving everyone in awe of your beauty. Your smile lights up the darkest rooms, your laughter is the sweetest melody, and your kindness touches everyone you meet.

I hope this little journey through your birthday surprise has brought you joy, laughter, and a feeling of being truly special. Because that's exactly what you are — special, wonderful, and deeply loved.

May this next year of your life be filled with endless happiness, exciting adventures, and dreams coming true. May you always know how much you are cherished, not just today, but every single day.

Thank you for being you. Thank you for bringing so much light and love into this world. And thank you for letting me be a part of your special day.

Happy Birthday, my dear friend. This is just the beginning of something beautiful...

With all my heart, always and forever 💕

P.S. Remember: You are stronger than you know, more beautiful than you can see, and more loved than you could ever imagine.`

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <Card className="backdrop-blur-md bg-white/95 border-pink-200 shadow-2xl">
          <CardContent className="p-8">
            <motion.div
              className="text-center mb-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="flex justify-center mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="p-3 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              <h1 className="text-3xl font-bold text-rose-600 mb-2">
                My Final Letter to You
              </h1>
              <p className="text-rose-500 text-sm">
                From my heart to yours, {userName} 💕
              </p>
            </motion.div>

            <motion.div
              className="relative bg-gradient-to-br from-amber-50 to-pink-50 rounded-2xl p-8 mb-6 shadow-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {/* Paper texture overlay */}
              <div className="absolute inset-0 bg-white/30 rounded-2xl" />
              
              {/* Handwritten-style content */}
              <div className="relative z-10">
                <motion.div
                  className="text-rose-800 leading-relaxed"
                  style={{ 
                    fontFamily: 'cursive',
                    fontSize: '18px',
                    lineHeight: '1.8',
                    color: '#831843'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 2, delay: 0.8 }}
                >
                  {closingMessage.split('\n\n').map((paragraph, index) => (
                    <motion.p
                      key={index}
                      className="mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.3, duration: 0.8 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </motion.div>

                {/* Signature */}
                <motion.div
                  className="text-right mt-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                >
                  <div className="text-rose-700 text-2xl mb-2" style={{ fontFamily: 'cursive' }}>
                    With all my love,
                  </div>
                  <div className="text-rose-600 text-xl" style={{ fontFamily: 'cursive' }}>
                    Your birthday friend 💕
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 text-pink-300 text-xl opacity-50">🌹</div>
                <div className="absolute top-4 right-4 text-pink-300 text-xl opacity-50">🌸</div>
                <div className="absolute bottom-4 left-4 text-pink-300 text-xl opacity-50">💕</div>
                <div className="absolute bottom-4 right-4 text-pink-300 text-xl opacity-50">✨</div>
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full px-6 py-3"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="text-pink-600 font-medium">Made with love, just for you</span>
                <Sparkles className="w-5 h-5 text-pink-500" />
              </motion.div>
              
              <motion.p
                className="text-rose-400 text-sm mt-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 3.5 }}
              >
                Thank you for letting me celebrate you today 🎂
              </motion.p>
            </motion.div>

            {/* Floating hearts around the card */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-200 text-2xl"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 2) * 60}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                <Heart className="w-6 h-6" />
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}