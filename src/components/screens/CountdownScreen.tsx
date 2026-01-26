'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Calendar, Gift } from 'lucide-react'

interface CountdownScreenProps {
  targetDate: string
  onComplete: () => void
  userName: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// TimeUnit component moved outside to avoid creating components during render
const TimeUnit = ({ value, label, icon: Icon }: { value: number; label: string; icon: any }) => (
  <motion.div
    className="flex flex-col items-center p-4"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    <motion.div
      className="relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center shadow-lg">
        <Icon className="w-8 h-8 text-white mb-1" />
      </div>
      <motion.div
        className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {value}
      </motion.div>
    </motion.div>
    <span className="text-xs text-rose-600 mt-2 font-medium">{label}</span>
  </motion.div>
)

export default function CountdownScreen({ targetDate, onComplete, userName }: CountdownScreenProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        if (!isComplete) {
          setIsComplete(true)
          onComplete()
        }
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete, isComplete])

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="text-center"
        >
          <div className="text-8xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-rose-600 mb-2">Time's Up!</h1>
          <p className="text-rose-500">Your surprise is ready...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Card className="backdrop-blur-md bg-white/80 border-pink-200 shadow-2xl">
          <CardContent className="p-8">
            <motion.div
              className="text-center mb-8"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="flex justify-center mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="p-4 bg-pink-100 rounded-full">
                  <Calendar className="w-10 h-10 text-pink-500" />
                </div>
              </motion.div>
              <h1 className="text-3xl font-bold text-rose-600 mb-2">
                Something Special is Coming
              </h1>
              <p className="text-rose-500 text-lg">
                Your surprise arrives in...
              </p>
              <p className="text-rose-400 text-sm mt-2">
                Made with love for {userName} 💕
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-4 gap-4 mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <TimeUnit value={timeLeft.days} label="Days" icon={Clock} />
              <TimeUnit value={timeLeft.hours} label="Hours" icon={Clock} />
              <TimeUnit value={timeLeft.minutes} label="Minutes" icon={Clock} />
              <TimeUnit value={timeLeft.seconds} label="Seconds" icon={Clock} />
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-pink-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
              <p className="text-rose-400 text-sm mt-4">Get ready for something magical! ✨</p>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 text-pink-200 text-2xl animate-bounce">🎁</div>
            <div className="absolute top-4 right-4 text-pink-200 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎈</div>
            <div className="absolute bottom-4 left-4 text-pink-200 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🎀</div>
            <div className="absolute bottom-4 right-4 text-pink-200 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>🌸</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}