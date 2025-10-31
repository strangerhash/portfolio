'use client'

import { useEffect, useState } from 'react'

interface RainDrop {
  id: number
  left: number
  animationDuration: number
  animationDelay: number
  length: number
}

export default function RainEffect() {
  const [raindrops, setRaindrops] = useState<RainDrop[]>([])

  useEffect(() => {
    const drops: RainDrop[] = []
    for (let i = 0; i < 100; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 0.5 + Math.random() * 0.5,
        animationDelay: Math.random() * 2,
        length: 10 + Math.random() * 20,
      })
    }
    setRaindrops(drops)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute top-0 bg-blue-400 animate-rainfall opacity-60"
          style={{
            left: `${drop.left}%`,
            width: '2px',
            height: `${drop.length}px`,
            animationDuration: `${drop.animationDuration}s`,
            animationDelay: `${drop.animationDelay}s`,
            boxShadow: '0 0 2px rgba(59, 130, 246, 0.5)',
          }}
        />
      ))}
    </div>
  )
}

