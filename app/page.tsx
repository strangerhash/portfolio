'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import GitHubStats from '@/components/GitHubStats'
import EngineeringPractices from '@/components/EngineeringPractices'
import Interests from '@/components/Interests'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import WeatherSelector from '@/components/WeatherSelector'
import SnowEffect from '@/components/SnowEffect'
import RainEffect from '@/components/RainEffect'
import SunEffect from '@/components/SunEffect'
import { motion, AnimatePresence } from 'framer-motion'
import { useWeather } from '@/contexts/WeatherContext'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { weather, theme } = useWeather()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Weather-specific background gradients
  const weatherGradients = {
    winter: 'from-slate-950 via-slate-900 to-slate-950', // Darker background for better contrast
    summer: 'from-orange-950 via-amber-950 to-yellow-950',
    rain: 'from-slate-950 via-gray-950 to-blue-950',
  }

  // Weather-specific glow colors
  const weatherGlows = {
    winter: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(248,250,252,0.2) 50%, rgba(226,232,240,0.1) 70%, transparent 90%)',
    summer: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, rgba(251,191,36,0.2) 50%, rgba(254,240,138,0.1) 70%, transparent 90%)',
    rain: 'radial-gradient(circle, rgba(100,116,139,0.4) 0%, rgba(148,163,184,0.2) 50%, rgba(203,213,225,0.1) 70%, transparent 90%)',
  }

  return (
    <main className={`relative min-h-screen bg-gradient-to-br ${weatherGradients[weather]}`}>
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className={`absolute inset-0 bg-gradient-to-br ${weatherGradients[weather]} animate-gradient`} />
        {/* Winter: Subtle frost/ice texture - freezing effect */}
        {weather === 'winter' && (
          <>
            <div className="absolute inset-0 opacity-8" style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.02) 10px, rgba(255, 255, 255, 0.02) 11px),
                repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.02) 10px, rgba(255, 255, 255, 0.02) 11px)
              `,
            }} />
            {/* Subtle blue tint for cold effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/5 via-blue-950/3 to-transparent pointer-events-none" />
          </>
        )}
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-300"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            background: weatherGlows[weather],
          }}
        />
      </div>

      {/* Weather Effects */}
      {weather === 'winter' && <SnowEffect />}
      {weather === 'rain' && <RainEffect />}
      {weather === 'summer' && <SunEffect />}

      {/* Weather Selector */}
      <div className="fixed top-24 right-4 md:right-8 z-50">
        <WeatherSelector />
      </div>

      <Navigation />
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <EngineeringPractices />
          <GitHubStats />
          <Interests />
          <Contact />
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

