'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import { motion } from 'framer-motion'
import { HiArrowDown, HiCode, HiDownload } from 'react-icons/hi'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useWeather } from '@/contexts/WeatherContext'
import * as THREE from 'three'

function FloatingCube({ color }: { color: string }) {
  return (
    <mesh rotation={[0, 0.5, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  )
}

function ConnectionLines() {
  return (
    <group position={[0.55, 0.35, 0.95]}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2
        const distance = 1.6
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance * 0.5
        const z = Math.sin(angle) * distance * 0.3
        
        // Calculate midpoint for line position
        const midX = x / 2
        const midY = y / 2
        const midZ = z / 2
        
        // Calculate line direction
        const length = Math.sqrt(x * x + y * y + z * z)
        
        return (
          <mesh 
            key={i} 
            position={[midX, midY, midZ]}
            rotation={[Math.atan2(y, Math.sqrt(x * x + z * z)), Math.atan2(x, z), 0]}
          >
            <cylinderGeometry args={[0.003, 0.003, length, 8]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#fbbf24"
              emissiveIntensity={0.5}
              transparent
              opacity={0.4}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function OrbitingTechSymbols() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })
  
  return (
    <group ref={groupRef} position={[0.55, 0.35, 0.95]}>
      {[0, 2, 4, 6].map((i) => {
        const angle = (i / 8) * Math.PI * 2
        const distance = 1.8
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance * 0.5
        const z = Math.sin(angle) * distance * 0.3
        return (
          <mesh key={`tech-${i}`} position={[x, y, z]}>
            <octahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={1.2}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function EarthGlobe({ lightColor }: { lightColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Create Earth texture with detailed India map
  const createEarthTexture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 1024
    const ctx = canvas.getContext('2d')!
    
    // Base ocean gradient
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    oceanGradient.addColorStop(0, '#0c4a6e') // Dark blue at top
    oceanGradient.addColorStop(0.3, '#075985') // Medium blue
    oceanGradient.addColorStop(0.7, '#0369a1') // Lighter blue
    oceanGradient.addColorStop(1, '#0c4a6e') // Dark blue at bottom
    ctx.fillStyle = oceanGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Add continents
    ctx.fillStyle = '#166534' // Dark green for land
    // Africa
    ctx.beginPath()
    ctx.ellipse(1050, 720, 180, 380, 0, 0, Math.PI * 2)
    ctx.fill()
    // Asia shape
    ctx.beginPath()
    ctx.ellipse(1380, 480, 380, 420, 0, 0, Math.PI * 2)
    ctx.fill()
    // Europe
    ctx.beginPath()
    ctx.ellipse(1080, 320, 140, 180, 0, 0, Math.PI * 2)
    ctx.fill()
    // North America
    ctx.beginPath()
    ctx.ellipse(400, 380, 220, 400, 0, 0, Math.PI * 2)
    ctx.fill()
    // South America
    ctx.beginPath()
    ctx.ellipse(450, 750, 150, 380, 0, 0, Math.PI * 2)
    ctx.fill()
    // Australia
    ctx.beginPath()
    ctx.ellipse(1620, 820, 140, 100, 0, 0, Math.PI * 2)
    ctx.fill()
    
    // Draw India map outline (more accurate shape)
    // India coordinates: ~68°E to 97°E, 8°N to 37°N
    // On 2048x1024 canvas: X = (longitude + 180) / 360 * 2048, Y = (90 - latitude) / 180 * 1024
    ctx.fillStyle = '#059669' // Emerald green for India
    
    // India outline - triangular peninsula shape
    ctx.beginPath()
    ctx.moveTo(1380, 430) // Northwest (Kashmir region)
    ctx.lineTo(1420, 420) // North
    ctx.lineTo(1480, 450) // Northeast
    ctx.lineTo(1520, 500) // East (Assam)
    ctx.lineTo(1510, 580) // Southeast coast
    ctx.lineTo(1460, 640) // South tip (Kanyakumari)
    ctx.lineTo(1400, 650) // Southwest coast
    ctx.lineTo(1360, 620) // West coast (Goa region)
    ctx.lineTo(1350, 570) // West
    ctx.lineTo(1360, 520) // Northwest
    ctx.closePath()
    ctx.fill()
    
    // Add inner regions for more detail
    ctx.fillStyle = '#10b981' // Brighter green for central India
    ctx.beginPath()
    ctx.ellipse(1430, 530, 70, 90, 0.3, 0, Math.PI * 2)
    ctx.fill()
    
    // Highlight major cities with dots
    ctx.fillStyle = '#ffffff'
    // New Delhi
    ctx.beginPath()
    ctx.arc(1390, 435, 3, 0, Math.PI * 2)
    ctx.fill()
    // Mumbai
    ctx.beginPath()
    ctx.arc(1365, 560, 3, 0, Math.PI * 2)
    ctx.fill()
    // Bangalore
    ctx.beginPath()
    ctx.arc(1405, 610, 3, 0, Math.PI * 2)
    ctx.fill()
    // Kolkata
    ctx.beginPath()
    ctx.arc(1490, 485, 3, 0, Math.PI * 2)
    ctx.fill()
    
    // India glow effect - creative highlight
    const indiaGlow = ctx.createRadialGradient(1430, 530, 0, 1430, 530, 200)
    indiaGlow.addColorStop(0, 'rgba(16, 185, 129, 0.8)')
    indiaGlow.addColorStop(0.3, 'rgba(16, 185, 129, 0.5)')
    indiaGlow.addColorStop(0.6, 'rgba(16, 185, 129, 0.2)')
    indiaGlow.addColorStop(1, 'rgba(16, 185, 129, 0)')
    ctx.fillStyle = indiaGlow
    ctx.beginPath()
    ctx.arc(1430, 530, 200, 0, Math.PI * 2)
    ctx.fill()
    
    // Add star pattern around India (representing tech hubs)
    ctx.fillStyle = '#fbbf24'
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = 180
      const x = 1430 + Math.cos(angle) * radius
      const y = 530 + Math.sin(angle) * radius
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // Add subtle clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = 25 + Math.random() * 35
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }

  const earthTexture = createEarthTexture()
  
  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation focusing on India
      meshRef.current.rotation.y = Math.PI * 0.3 + state.clock.elapsedTime * 0.1
      // Gentle floating motion
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.15
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
    }
  })

  return (
    <group position={[3, 0, 0]}>
      {/* Earth globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          emissive="#1e40af"
          emissiveIntensity={0.15}
        />
      </mesh>
      
      {/* India location marker - red pin */}
      <mesh position={[0.55, 0.35, 0.95]} rotation={[-Math.PI / 6, 0, 0]}>
        <coneGeometry args={[0.1, 0.35, 8]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Pulsing glow around India */}
      <mesh position={[0.55, 0.35, 0.95]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={1.5}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      <ConnectionLines />
      
      <OrbitingTechSymbols />
      
      {/* Atmospheric glow layer */}
      <mesh>
        <sphereGeometry args={[1.45, 64, 64]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.15}
          transparent
          opacity={0.25}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Orbital ring around Earth */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

function Scene3D({ cubeColor, lightColor }: { cubeColor: string; lightColor: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      {/* Sun light - coming from one side to light up Earth */}
      <directionalLight position={[-5, 5, 5]} intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#fbbf24" />
      <pointLight position={[-10, -10, -10]} color={lightColor} intensity={0.3} />
      <FloatingCube color={cubeColor} />
      <EarthGlobe lightColor={lightColor} />
      <Stars radius={500} depth={100} count={50000} factor={8} fade speed={0.5} />
      <OrbitControls
        enableZoom={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
      />
    </Canvas>
  )
}

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { weather } = useWeather()

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Weather-specific colors for 3D elements
  const weatherColors = {
    winter: { cube: '#ffffff', light: '#e2e8f0' },
    summer: { cube: '#fef3c7', light: '#f59e0b' },
    rain: { cube: '#cbd5e1', light: '#64748b' },
  }

  const colors = weatherColors[weather]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Scene3D cubeColor={colors.cube} lightColor={colors.light} />
      </div>

      {/* Gradient Overlay - Dynamic Weather Theme */}
      {weather === 'winter' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-900/20 via-transparent to-slate-950/50" />
          {/* Subtle frost/ice overlay - freezing effect */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255, 255, 255, 0.03) 8px, rgba(255, 255, 255, 0.03) 9px),
              radial-gradient(circle at 30% 40%, rgba(224, 242, 254, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 70% 60%, rgba(224, 242, 254, 0.08) 0%, transparent 40%)
            `,
            filter: 'blur(0.5px)',
          }} />
          {/* Subtle cold blue tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/8 via-transparent to-blue-950/5 pointer-events-none" />
        </>
      )}
      {weather === 'summer' && (
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-amber-900/10 via-transparent to-yellow-950/50" />
      )}
      {weather === 'rain' && (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-gray-900/10 via-transparent to-blue-950/50" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block"
          >
            <span className={`text-lg sm:text-xl font-medium ${
              weather === 'winter' ? 'text-white' : 
              weather === 'summer' ? 'text-yellow-400' : 
              'text-blue-300'
            }`}>
              Hi there 👋, I&apos;m
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          >
            <span className="gradient-text">Satyendra Pandey</span>
          </motion.h1>
          
          {/* Subtitle Role */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-xl sm:text-2xl md:text-3xl font-semibold mt-2 ${
            weather === 'winter' ? 'text-gray-100' : 
            weather === 'summer' ? 'text-yellow-300' : 
            'text-blue-200'
          }`}
          >
            Full-Stack & Blockchain Developer
          </motion.div>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`text-xl sm:text-2xl md:text-3xl font-light ${
              weather === 'winter' ? 'text-gray-100' :
              weather === 'summer' ? 'text-gray-300' :
              'text-gray-300'
            }`}
          >
            Building High-Performance On-Chain DEX & Blockchain Systems
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className={`text-base sm:text-lg max-w-2xl mx-auto mt-4 ${
              weather === 'winter' ? 'text-gray-200' :
              weather === 'summer' ? 'text-gray-400' :
              'text-gray-400'
            }`}
          >
            {`Specializing in blockchain architecture, DeFi platforms, and AI-assisted 
            development. Designing custom blockchains with BFT consensus, on-chain order 
            books handling 50K+ TPS, and secure, scalable trading systems.`}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToAbout()}
              className={`px-8 py-4 rounded-lg font-semibold text-white shadow-lg transition-all flex items-center gap-2 ${
                weather === 'winter' ? 'bg-gradient-to-r from-white/20 to-gray-100/20 hover:shadow-white/30 border border-white/20' :
                weather === 'summer' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-yellow-500/50' :
                'bg-gradient-to-r from-blue-500 to-slate-500 hover:shadow-blue-500/50'
              }`}
            >
              View My Work
              <HiArrowDown className="animate-bounce" />
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download="Satyendra_Pandey_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-lg font-semibold text-white shadow-lg transition-all flex items-center gap-2 ${
                weather === 'winter' ? 'bg-gradient-to-r from-white/30 to-gray-100/30 hover:shadow-white/40 border border-white/30' :
                weather === 'summer' ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:shadow-amber-500/50' :
                'bg-gradient-to-r from-blue-600 to-slate-600 hover:shadow-blue-500/50'
              }`}
            >
              <HiDownload />
              Download Resume
            </motion.a>

            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass rounded-lg font-semibold text-white hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <HiCode />
              Explore Projects
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center justify-center gap-6 mt-12"
          >
            {[
              { Icon: FaGithub, href: 'https://github.com/strangerhash', label: 'GitHub' },
              { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/satyendra-pandey-a0314b167/', label: 'LinkedIn' },
              { Icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 glass rounded-full flex items-center justify-center transition-colors ${
                  weather === 'winter' ? 'text-white hover:text-gray-200 hover:bg-white/10' :
                  weather === 'summer' ? 'text-gray-300 hover:text-yellow-400' :
                  'text-gray-300 hover:text-blue-400'
                }`}
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer"
          onClick={scrollToAbout}
        >
          <HiArrowDown className={`w-8 h-8 ${
            weather === 'winter' ? 'text-white' :
            weather === 'summer' ? 'text-yellow-400' :
            'text-blue-400'
          }`} />
        </motion.div>
      </motion.div>
    </section>
  )
}

