'use client'

import { useEffect, useState } from 'react'

interface Snowflake {
  id: number
  left: number
  animationDuration: number
  animationDelay: number
  size: number
  opacity: number
  slideDirection: 'left' | 'right'
  slideStart: number // Percentage of screen height where sliding begins
}

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])
  const [sections, setSections] = useState<{ top: number; bottom: number }[]>([])

  useEffect(() => {
    // Detect content sections to avoid
    const updateSections = () => {
      const contentSections = document.querySelectorAll('section')
      const sectionData: { top: number; bottom: number }[] = []
      
      contentSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.height > 100) { // Only consider substantial sections
          sectionData.push({
            top: (rect.top / window.innerHeight) * 100,
            bottom: ((rect.top + rect.height) / window.innerHeight) * 100,
          })
        }
      })
      setSections(sectionData)
    }

    updateSections()
    window.addEventListener('scroll', updateSections)
    window.addEventListener('resize', updateSections)

    return () => {
      window.removeEventListener('scroll', updateSections)
      window.removeEventListener('resize', updateSections)
    }
  }, [])

  useEffect(() => {
    const flakes: Snowflake[] = []
    // Reduced snowflakes for less distraction - subtle winter effect
    for (let i = 0; i < 60; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 8 + Math.random() * 12, // Slower for calmer effect
        animationDelay: Math.random() * 5,
        size: 3 + Math.random() * 4, // Smaller flakes
        opacity: 0.2 + Math.random() * 0.3, // Much more subtle
        slideDirection: Math.random() > 0.5 ? 'left' : 'right',
        slideStart: 30 + Math.random() * 50, // Start sliding later
      })
    }
    setSnowflakes(flakes)
  }, [])

  return (
    <>
      {/* Subtle frost overlay - freezing effect */}
      <div className="fixed inset-0 pointer-events-none z-5 opacity-5" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px),
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px),
          radial-gradient(circle at 20% 30%, rgba(224, 242, 254, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(224, 242, 254, 0.05) 0%, transparent 50%)
        `,
        filter: 'blur(0.5px)',
      }} />

      {/* Minimal, subtle snowflakes - very reduced */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden opacity-40">
        {snowflakes.slice(0, 30).map((flake) => {
          const slideDistance = flake.slideDirection === 'left' ? -25 : 25
          const slideKeyframe = `
            @keyframes snowfall-slide-${flake.id} {
              0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0;
              }
              10% {
                opacity: ${flake.opacity};
              }
              ${flake.slideStart}% {
                transform: translateY(${flake.slideStart}vh) translateX(0) rotate(0deg);
                opacity: ${flake.opacity};
              }
              90% {
                opacity: ${flake.opacity};
              }
              100% {
                transform: translateY(100vh) translateX(${slideDistance}vw) rotate(360deg);
                opacity: 0;
              }
            }
          `
          
          return (
            <div key={flake.id}>
              <style>{slideKeyframe}</style>
              <div
                className="absolute top-0 rounded-full bg-white"
                style={{
                  left: `${flake.left}%`,
                  width: `${flake.size}px`,
                  height: `${flake.size}px`,
                  opacity: flake.opacity,
                  animation: `snowfall-slide-${flake.id} ${flake.animationDuration}s linear ${flake.animationDelay}s infinite`,
                  boxShadow: `0 0 ${flake.size}px rgba(255, 255, 255, 0.4)`,
                  filter: 'blur(1px)',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Subtle frost accumulation at edges - freezing effect */}
      <div className="fixed bottom-0 left-0 right-0 h-20 pointer-events-none z-5 bg-gradient-to-t from-white/3 via-white/1 to-transparent opacity-30" />
      <div className="fixed top-0 left-0 right-0 h-20 pointer-events-none z-5 bg-gradient-to-b from-white/2 via-transparent to-transparent opacity-20" />
      
      {/* Frost crystal pattern overlay - very subtle */}
      <div className="fixed inset-0 pointer-events-none z-5 opacity-10" style={{
        backgroundImage: `
          radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          radial-gradient(circle at 85% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '300px 300px, 250px 250px, 400px 400px',
        backgroundPosition: '0 0, 150px 100px, 200px 200px',
      }} />
    </>
  )
}

