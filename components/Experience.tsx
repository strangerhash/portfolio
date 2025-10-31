'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useWeather } from '@/contexts/WeatherContext'
import { HiBriefcase, HiCalendar, HiLocationMarker } from 'react-icons/hi'
import { FaArrowRight } from 'react-icons/fa'

const experiences = [
  {
    title: 'Blockchain Engineer',
    company: 'AntierDex (DeFi)',
    location: 'Remote',
    period: '2023 - Present',
    type: 'DeFi Platform',
    description: 'Building a fully on-chain decentralized exchange inspired by HyperLiquid. Designing custom blockchain infrastructure with BFT-based consensus and high-performance on-chain order book execution.',
    achievements: [
      'Designed custom blockchain with BFT-based consensus and 5 validator nodes',
      'Developing fully customized DEX capable of 50K+ TPS using Go',
      'Implementing on-chain order book managing spot and perpetual trading',
      'Researching and planning complete DeFi exchange architecture',
    ],
    technologies: ['Go', 'Blockchain', 'BFT Consensus', 'Solidity', 'Rust'],
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    title: 'Software Engineer',
    company: 'Fincrafts (CeFi)',
    location: 'Remote',
    period: '2022 - 2023',
    type: 'CeFi Trading Platform',
    description: 'Built centralized Forex trading platform for proprietary assets and forex reserves. Optimized high-speed data flow with robust concurrent user handling and advanced trading features.',
    achievements: [
      'Optimized high-speed data flow with robust concurrent user handling',
      'Implemented advanced trading features: social trading, algo trading, copy trading',
      'Built MAM/PAMM master strategy support for forex trading',
      'Developed scalable architecture for real-time trading operations',
    ],
    technologies: ['Node.js', 'React', 'MongoDB', 'Microservices', 'Kubernetes'],
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Full-Stack Developer',
    company: 'Goldenleap (CeFi)',
    location: 'UAE',
    period: '2021 - 2022',
    type: 'CeFi Platform',
    description: 'Developed centralized finance and trading management platform for daily Forex traders in the UAE. Built secure and efficient workflows for proprietary asset trading and forex reserve management.',
    achievements: [
      'Built secure trading workflows for proprietary asset management',
      'Developed forex reserve management system with efficient data processing',
      'Implemented secure authentication and authorization systems',
      'Optimized platform performance for daily trading operations',
    ],
    technologies: ['Node.js', 'Angular', 'PostgreSQL', 'Docker', 'TypeScript'],
    gradient: 'from-cyan-500 to-blue-500',
  },
]

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { weather } = useWeather()

  const weatherBgs = {
    winter: 'from-slate-950 via-slate-900 to-slate-950',
    summer: 'from-black via-orange-900/10 via-amber-900/10 to-yellow-950',
    rain: 'from-black via-slate-900/10 via-gray-900/10 to-blue-950',
  }

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
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
              <span className="gradient-text">Work Experience</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Specialized in blockchain, DeFi, and high-performance trading systems
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 md:w-1 h-full opacity-40 ${
              weather === 'winter' ? 'bg-gradient-to-b from-white via-gray-200 via-gray-300 to-white' :
              weather === 'summer' ? 'bg-gradient-to-b from-yellow-500 via-orange-500 via-amber-500 to-yellow-500' :
              'bg-gradient-to-b from-blue-400 via-slate-500 via-gray-500 to-blue-400'
            }`} />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r ${exp.gradient} rounded-full border-4 border-black z-10 hidden md:block`} />
                  <div className={`absolute left-4 md:hidden w-4 h-4 bg-gradient-to-r ${exp.gradient} rounded-full border-4 border-black z-10`} />

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left md:ml-auto'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`glass rounded-2xl p-6 md:p-8 glow relative overflow-hidden ${
                        index % 2 === 0 ? '' : ''
                      }`}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${exp.gradient}`} />
                      
                      <div className="relative z-10">
                        {/* Header */}
                        <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} mb-4`}>
                          <div className="flex items-center gap-2 mb-2">
                            <HiBriefcase size={18} />
                            <span className={`text-sm font-medium ${
                              weather === 'winter' ? 'text-white' :
                              weather === 'summer' ? 'text-yellow-400' :
                              'text-blue-400'
                            }`}>{exp.type}</span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{exp.title}</h3>
                          <div className="text-lg md:text-xl font-semibold gradient-text mb-2">{exp.company}</div>
                        </div>

                        {/* Meta Info */}
                        <div className={`flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-4 text-xs sm:text-sm text-gray-400 ${
                          index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                        }`}>
                          <div className="flex items-center gap-1">
                            <HiCalendar size={14} />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <HiLocationMarker size={14} />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                        {/* Achievements */}
                        <div className="mb-4">
                          <h4 className="text-xs md:text-sm font-semibold text-white mb-2">Key Achievements:</h4>
                          <ul className={`space-y-1.5 ${
                            index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                          }`}>
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-xs md:text-sm text-gray-400 flex items-start gap-2">
                                <FaArrowRight className={`mt-1 flex-shrink-0 ${
                                  weather === 'winter' ? 'text-white' :
                                  weather === 'summer' ? 'text-yellow-400' :
                                  'text-blue-400'
                                }`} size={10} />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${
                          index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                        }`}>
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs font-medium glass rounded-full text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Year Badge */}
                  <div className={`absolute left-0 md:left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full glass flex items-center justify-center z-10 ${
                    index % 2 === 0 ? 'md:translate-x-[-120px]' : 'md:translate-x-[120px]'
                  }`}>
                    <div className="text-[10px] md:text-xs font-bold gradient-text text-center">
                      {exp.period.split(' ')[0]}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

