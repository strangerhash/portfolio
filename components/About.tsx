'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useWeather } from '@/contexts/WeatherContext'
import { HiCode, HiLightBulb, HiTrendingUp, HiAcademicCap } from 'react-icons/hi'

const stats = [
  { label: 'Years Experience', value: '6+', icon: HiTrendingUp },
  { label: 'Projects Delivered', value: '50+', icon: HiCode },
  { label: 'Technologies Mastered', value: '50+', icon: HiLightBulb },
  { label: 'GitHub Contributions', value: '1000+', icon: HiAcademicCap },
]

const journey = [
  {
    year: '2018',
    title: 'The Beginning',
    description: 'Started my journey as a junior developer, learning the fundamentals of web development and software engineering principles.',
  },
  {
    year: '2019-2020',
    title: 'Full-Stack Development',
    description: 'Dove deep into full-stack development, mastering React, Node.js, and databases. Built my first production applications.',
  },
  {
    year: '2021-2022',
    title: 'Cloud & Architecture',
    description: 'Expanded expertise in cloud platforms (AWS, Azure), microservices architecture, and DevOps practices.',
  },
  {
    year: '2023-2024',
    title: 'Senior Engineering',
    description: 'Led technical teams, architected scalable systems, and mentored junior developers. Focused on performance and best practices.',
  },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { weather } = useWeather()

  const weatherBgs = {
    winter: 'from-slate-950 via-slate-900 to-slate-950',
    summer: 'from-black via-orange-900/10 via-amber-900/10 to-yellow-950',
    rain: 'from-black via-slate-900/10 via-gray-900/10 to-blue-950',
  }

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${weatherBgs[weather]}`} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Building high-performance, fully on-chain decentralized exchanges with deep blockchain 
              architecture expertise and modern AI-assisted development.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-6 text-center glow"
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${
                    weather === 'winter' ? 'text-white' :
                    weather === 'summer' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`} />
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
              My Journey
            </h3>

            {/* Timeline Line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full opacity-50 hidden md:block ${
              weather === 'winter' ? 'bg-gradient-to-b from-white via-gray-200 via-gray-300 to-white' :
              weather === 'summer' ? 'bg-gradient-to-b from-yellow-500 via-orange-500 via-amber-500 to-yellow-500' :
              'bg-gradient-to-b from-blue-400 via-slate-500 via-gray-500 to-blue-400'
            }`} />

            <div className="space-y-12">
              {journey.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-black z-10 ${
                    weather === 'winter' ? 'bg-white' :
                    weather === 'summer' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:ml-auto'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="glass rounded-2xl p-6 glow"
                    >
                      <div className={`font-semibold mb-2 ${
                        weather === 'winter' ? 'text-white' :
                        weather === 'summer' ? 'text-yellow-400' :
                        'text-blue-400'
                      }`}>{item.year}</div>
                      <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                      <p className="text-gray-400">{item.description}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 }}
            className="mt-20 glass rounded-3xl p-8 md:p-12 text-center glow"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
              About My Work
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              I&apos;m a software engineer passionate about building high-performance, fully on-chain 
              decentralized exchanges — blending deep blockchain architecture with the creativity of 
              modern AI-assisted coding. I focus on delivering secure, scalable, and maintainable systems 
              that perform beautifully under real-world load.
            </p>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed mt-4">
              I&apos;ve designed and deployed custom blockchains using BFT-based consensus, managed validator 
              networks, and implemented on-chain order books capable of handling tens of thousands of 
              transactions per second. My experience spans spot, perpetual, and hybrid trading markets, 
              with a relentless focus on speed, fault tolerance, and security at every layer.
            </p>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed mt-4">
              As a senior software engineer, I bring expertise in system design, scalable architecture, 
              and engineering best practices. I&apos;ve architected distributed systems handling millions 
              of requests, implemented microservices patterns, and designed fault-tolerant applications. 
              My approach combines SOLID principles, design patterns, clean code practices, and 
              performance optimization to deliver production-ready systems.
            </p>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed mt-4">
              I thrive in AI-driven development environments, using tools like Cursor, Copilot, Claude, 
              and ChatGPT to iterate faster, refactor cleaner, and maintain peak productivity without 
              sacrificing code quality. My core stack includes Rust, Go, TypeScript, Solidity, and 
              Node.js, supported by Docker, Kubernetes, Grafana, Hardhat, and Foundry for reliable 
              infrastructure and testing.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

