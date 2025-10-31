'use client'

import { useState } from 'react'
import { useWeather } from '@/contexts/WeatherContext'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'
import { FaSnowflake, FaSun, FaCloudRain } from 'react-icons/fa'

const weatherOptions = [
  { value: 'winter' as const, label: 'Winter', icon: FaSnowflake, color: 'text-white' },
  { value: 'summer' as const, label: 'Summer', icon: FaSun, color: 'text-yellow-400' },
  { value: 'rain' as const, label: 'Rain', icon: FaCloudRain, color: 'text-blue-400' },
]

export default function WeatherSelector() {
  const { weather, setWeather } = useWeather()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentWeather = weatherOptions.find((w) => w.value === weather) || weatherOptions[0]
  const CurrentIcon = currentWeather.icon

  return (
    <div className="relative z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass rounded-xl px-4 py-2 flex items-center gap-2 text-white hover:bg-white/10 transition-all"
      >
        <CurrentIcon className={`w-5 h-5 ${currentWeather.color}`} />
        <span className="text-sm font-medium">{currentWeather.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 glass rounded-xl overflow-hidden z-50 min-w-[160px]"
            >
              {weatherOptions.map((option) => {
                const Icon = option.icon
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => {
                      setWeather(option.value)
                      setIsOpen(false)
                    }}
                    whileHover={{ x: 5 }}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                      weather === option.value
                        ? 'bg-white/10 text-white'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${option.color}`} />
                    <span className="text-sm font-medium">{option.label}</span>
                  </motion.button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

