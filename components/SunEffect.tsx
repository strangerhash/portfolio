'use client'

export default function SunEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Sun rays */}
      <div className="absolute top-10 right-10 w-32 h-32">
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-400/20 to-transparent animate-pulse-slow" />
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-orange-400/10 to-transparent animate-pulse" 
             style={{ animationDelay: '1s', animationDuration: '3s' }} />
      </div>
      
      {/* Warm glow particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-yellow-400/20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  )
}

