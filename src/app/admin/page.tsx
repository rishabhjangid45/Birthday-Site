'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check, Heart, Gift, Calendar, Lock, Sparkles } from 'lucide-react'

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    date: '',
    time: ''
  })
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generateLink = () => {
    if (!formData.name || !formData.code || !formData.date || !formData.time) {
      alert('Please fill in all fields')
      return
    }

    const dateTime = new Date(`${formData.date}T${formData.time}`).toISOString()
    const link = `${window.location.origin}?name=${encodeURIComponent(formData.name)}&code=${encodeURIComponent(formData.code)}&date=${encodeURIComponent(dateTime)}`
    setGeneratedLink(link)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', code: '', date: '', time: '' })
    setGeneratedLink('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="backdrop-blur-md bg-white/90 border-pink-200 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <motion.div
              className="flex justify-center mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="p-3 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold text-rose-600">
              Birthday Surprise Creator
            </CardTitle>
            <p className="text-rose-500 mt-2">
              Create a magical birthday experience for someone special! 💕
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {!generatedLink ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-rose-600 font-medium flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      Recipient Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter the birthday person's name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code" className="text-rose-600 font-medium flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Secret Code
                    </Label>
                    <Input
                      id="code"
                      name="code"
                      type="text"
                      placeholder="Create a secret code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-rose-600 font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Unlock Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-rose-600 font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Unlock Time
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-200"
                    />
                  </div>
                </div>

                <motion.div
                  className="flex justify-center pt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={generateLink}
                    className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Birthday Surprise Link
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-rose-600 mb-2">
                    Surprise Link Generated!
                  </h3>
                  <p className="text-rose-500">
                    Share this link with {formData.name} on their birthday
                  </p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200">
                  <Label className="text-rose-600 font-medium mb-2 block">
                    Shareable Link:
                  </Label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 p-3 bg-white rounded-lg border border-pink-200 text-sm text-gray-700 break-all">
                      {generatedLink}
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={copyToClipboard}
                        className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-lg"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </Button>
                    </motion.div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Instructions:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Share this link with {formData.name}</li>
                    <li>• They'll need to enter the secret code: <strong>{formData.code}</strong></li>
                    <li>• The countdown will start until {formData.date} at {formData.time}</li>
                    <li>• They'll experience a magical birthday surprise! 🎂</li>
                  </ul>
                </div>

                <motion.div
                  className="flex justify-center pt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={resetForm}
                    className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg"
                  >
                    Create Another Surprise
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <motion.div
          className="text-center mt-8 text-rose-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Made with love for creating memorable birthday moments 💕</p>
        </motion.div>
      </motion.div>
    </div>
  )
}