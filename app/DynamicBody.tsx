'use client'

import { useWeather } from '@/contexts/WeatherContext'
import { useEffect } from 'react'

export default function DynamicBody() {
  const { weather } = useWeather()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-weather', weather)
      document.body.className = 'antialiased text-white overflow-x-hidden'
    }
  }, [weather])

  return null
}

