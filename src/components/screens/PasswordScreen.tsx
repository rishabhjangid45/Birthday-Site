'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Lock, Sparkles } from 'lucide-react'

interface PasswordScreenProps {
  secretCode: string
  onUnlock: () => void
  userName: string
}

export default function PasswordScreen({ secretCode, onUnlock, userName }: PasswordScreenProps) {
  const [inputCode, setInputCode] = useState('')
  const [isWrong, setIsWrong] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (inputCode === secretCode) {
      onUnlock()
    } else {
      setIsWrong(true)
      setIsShaking(true)
      setTimeout(() => {
        setIsShaking(false)
      }, 500)
      setTimeout(() => {
        setIsWrong(false)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-md ${isShaking ? 'animate-pulse' : ''}`}
      >
        <Card className="backdrop-blur-md bg-white/80 border-pink-200 shadow-2xl">
          <CardContent className="p-8">
            <motion.div
              className="text-center mb-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="p-3 bg-pink-100 rounded-full"
                >
                  <Lock className="w-8 h-8 text-pink-500" />
                </motion.div>
              </div>
              <h1 className="text-2xl font-bold text-rose-600 mb-2">
                A Special Message Awaits
              </h1>
              <p className="text-rose-500 text-sm">
                Enter the secret code to unlock your surprise
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              animate={{ y: 0 }}
              initial={{ y: 20 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Enter secret code..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className={`text-center text-lg py-3 border-pink-200 focus:border-pink-400 focus:ring-pink-200 ${
                    isWrong ? 'border-red-400 animate-pulse' : ''
                  }`}
                  autoFocus
                />
                {isWrong && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -bottom-8 left-0 right-0 text-center"
                  >
                    <p className="text-red-500 text-sm">Oops! That's not quite right 💕</p>
                  </motion.div>
                )}
              </div>

              <motion.div
                className="flex justify-center space-x-2 mt-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-2 rounded-full font-semibold shadow-lg"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Unlock Surprise
                </Button>
              </motion.div>
            </motion.form>

            {/* Sad teddy bear for wrong password */}
            {isWrong && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 text-center"
              >
                <div className="text-6xl mb-2">🧸</div>
                <p className="text-rose-400 text-xs">The teddy bear is sad... try again!</p>
              </motion.div>
            )}

            {/* Decorative elements */}
            <div className="absolute top-2 left-2 text-pink-200">
              <Heart className="w-4 h-4" />
            </div>
            <div className="absolute top-2 right-2 text-pink-200">
              <Heart className="w-4 h-4" />
            </div>
            <div className="absolute bottom-2 left-2 text-pink-200">
              <Heart className="w-4 h-4" />
            </div>
            <div className="absolute bottom-2 right-2 text-pink-200">
              <Heart className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        {/* Floating hint */}
        <motion.div
          className="text-center mt-6 text-rose-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
        >
          <p>This surprise is specially for {userName} 💕</p>
        </motion.div>
      </motion.div>
    </div>
  )
}