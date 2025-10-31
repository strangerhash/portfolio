'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Weather = 'winter' | 'summer' | 'rain'

interface WeatherContextType {
  weather: Weather
  setWeather: (weather: Weather) => void
  theme: {
    primary: string
    secondary: string
    accent: string
    bgGradient: string
    textGradient: string
    glow: string
    glass: string
  }
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

const themes = {
  winter: {
    primary: '#ffffff', // Pure white snow
    secondary: '#f8fafc', // Snow white
    accent: '#e2e8f0', // Light gray snow
    bgGradient: 'from-slate-900 via-slate-800 to-slate-900',
    textGradient: 'from-white via-gray-100 to-gray-200',
    glow: 'rgba(255, 255, 255, 0.4)',
    glass: 'rgba(255, 255, 255, 0.08)',
  },
  summer: {
    primary: '#fef3c7', // Warm yellow
    secondary: '#fde68a', // Light amber
    accent: '#f59e0b', // Amber
    bgGradient: 'from-orange-950 via-amber-950 to-yellow-950',
    textGradient: 'from-yellow-300 via-orange-300 to-amber-400',
    glow: 'rgba(245, 158, 11, 0.4)',
    glass: 'rgba(254, 243, 199, 0.05)',
  },
  rain: {
    primary: '#cbd5e1', // Slate gray
    secondary: '#94a3b8', // Light slate
    accent: '#64748b', // Slate
    bgGradient: 'from-slate-950 via-gray-950 to-blue-950',
    textGradient: 'from-slate-300 via-gray-300 to-blue-300',
    glow: 'rgba(100, 116, 139, 0.4)',
    glass: 'rgba(203, 213, 225, 0.05)',
  },
}

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<Weather>('winter')

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        theme: themes[weather],
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export function useWeather() {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider')
  }
  return context
}

