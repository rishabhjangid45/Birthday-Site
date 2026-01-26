'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import PasswordScreen from '@/components/screens/PasswordScreen'
import CountdownScreen from '@/components/screens/CountdownScreen'
import GiftRevealScreen from '@/components/screens/GiftRevealScreen'
import MessageScreen from '@/components/screens/MessageScreen'
import FinalSurpriseScreen from '@/components/screens/FinalSurpriseScreen'
import FinalLetterScreen from '@/components/screens/FinalLetterScreen'
import AnimatedBackground from '@/components/ui/AnimatedBackground'

type Screen = 'password' | 'countdown' | 'gift' | 'message' | 'surprise' | 'letter'

function Home() {
  const searchParams = useSearchParams()
  const [currentScreen, setCurrentScreen] = useState<Screen>('password')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [countdownComplete, setCountdownComplete] = useState(false)

  // Get URL parameters
  const name = searchParams.get('name') || 'Birthday Star'
  const code = searchParams.get('code') || ''
  const date = searchParams.get('date') || ''

  // Check if we have required parameters
  const hasValidParams = code && date

  // Handle password unlock
  const handleUnlock = useCallback(() => {
    setIsUnlocked(true)
    setCurrentScreen('countdown')
  }, [])

  // Handle countdown completion
  const handleCountdownComplete = useCallback(() => {
    setCountdownComplete(true)
    setTimeout(() => {
      setCurrentScreen('gift')
    }, 2000) // Show confetti for 2 seconds
  }, [])

  // Handle screen transitions
  const handleNext = useCallback(() => {
    setCurrentScreen(prev => {
      switch (prev) {
        case 'gift': return 'message'
        case 'message': return 'surprise'
        case 'surprise': return 'letter'
        default: return prev
      }
    })
  }, [])

  // If no valid parameters, show admin link
  if (!hasValidParams) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <h1 className="text-3xl font-bold text-rose-600 mb-4">Birthday Surprise Creator</h1>
          <p className="text-rose-500 mb-6">Create a magical birthday experience for someone special!</p>
          <motion.a
            href="/admin"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600 transition-colors"
          >
            Create Birthday Surprise
          </motion.a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative z-10 min-h-screen"
        >
          {currentScreen === 'password' && (
            <PasswordScreen
              secretCode={code}
              onUnlock={handleUnlock}
              userName={name}
            />
          )}
          
          {currentScreen === 'countdown' && (
            <CountdownScreen
              targetDate={date}
              onComplete={handleCountdownComplete}
              userName={name}
            />
          )}
          
          {currentScreen === 'gift' && (
            <GiftRevealScreen
              onNext={handleNext}
              userName={name}
            />
          )}
          
          {currentScreen === 'message' && (
            <MessageScreen
              onNext={handleNext}
              userName={name}
            />
          )}
          
          {currentScreen === 'surprise' && (
            <FinalSurpriseScreen
              onNext={handleNext}
              userName={name}
            />
          )}
          
          {currentScreen === 'letter' && (
            <FinalLetterScreen
              userName={name}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  )
}

