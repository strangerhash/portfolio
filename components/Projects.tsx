'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useWeather } from '@/contexts/WeatherContext'
import { HiExternalLink, HiCode } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'

const projects = [
  {
    title: 'Layer 1 Trading Platform (AntierDex)',
    description: 'Building a high-performance decentralized trading platform with custom blockchain infrastructure, BFT-based consensus, and 50K+ TPS capacity. Fully on-chain DEX with advanced order matching engine.',
    technologies: ['Go', 'Blockchain', 'BFT Consensus', 'Solidity', 'Rust'],
    gradient: 'from-cyan-600 to-blue-600',
    github: 'https://github.com/strangerhash',
    demo: '#',
    featured: true,
  },
  {
    title: 'Advanced Order Matching Engine',
    description: 'Ultra-low latency trading infrastructure with sub-millisecond execution capabilities. Custom blockchain with on-chain order book managing spot and perpetual trading markets.',
    technologies: ['Go', 'Rust', 'Blockchain', 'DeFi', 'Smart Contracts'],
    gradient: 'from-blue-600 to-indigo-600',
    github: 'https://github.com/strangerhash',
    demo: '#',
    featured: true,
  },
  {
    title: 'DeFi Trading Platform',
    description: 'Decentralized exchange with automated market making, yield farming, and liquidity provision. Built with advanced smart contract security and gas optimization.',
    technologies: ['Solidity', 'Web3.js', 'Ethers.js', 'Hardhat', 'Foundry'],
    gradient: 'from-cyan-500 to-blue-500',
    github: 'https://github.com/strangerhash',
    demo: '#',
    featured: false,
  },
  {
    title: 'Cross-Chain Bridge Protocol',
    description: 'Secure bridge protocol for asset transfers between Ethereum, Polygon, and other blockchain networks. Implementing multi-signature security and validator networks.',
    technologies: ['Solidity', 'Node.js', 'Ethereum', 'Polygon', 'Web3'],
    gradient: 'from-indigo-600 to-cyan-600',
    github: 'https://github.com/strangerhash',
    demo: '#',
    featured: false,
  },
  {
    title: 'CeFi Forex Trading Platform (Fincrafts)',
    description: 'Centralized Forex trading platform with social trading, algo trading, copy trading, and MAM/PAMM master strategy support. High-speed data flow with robust concurrent user handling.',
    technologies: ['Node.js', 'React', 'MongoDB', 'Microservices', 'Kubernetes'],
    gradient: 'from-blue-600 to-cyan-600',
    github: 'https://github.com/strangerhash',
    demo: '#',
    featured: false,
  },
  {
    title: 'NFT Marketplace Platform',
    description: 'Multi-chain NFT marketplace with minting, trading, and auction functionality. Integrated with IPFS for decentralized storage and multiple wallet connections.',
    technologies: ['React', 'Next.js', 'IPFS', 'Solidity', 'OpenSea API'],
    gradient: 'from-cyan-500 to-indigo-500',
    github: 'https://github.com/strangerhash',
    demo: '#',
    featured: false,
  },
]

function Project3DCard({ gradient }: { gradient: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box args={[2, 1.5, 0.5]}>
        <meshStandardMaterial
          color="#667eea"
          emissive="#667eea"
          emissiveIntensity={0.3}
          wireframe
        />
      </Box>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { weather } = useWeather()

  const weatherBgs = {
    winter: 'from-slate-950 via-slate-900 to-slate-950',
    summer: 'from-black via-orange-900/10 via-amber-900/10 to-yellow-950',
    rain: 'from-black via-slate-900/10 via-gray-900/10 to-blue-950',
  }

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
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
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A showcase of innovative solutions and impactful projects from my career
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative group glass rounded-3xl overflow-hidden glow cursor-pointer ${
                  project.featured ? 'md:col-span-2 lg:col-span-1 md:row-span-2' : ''
                }`}
              >
                {/* 3D Background */}
                <div className="absolute inset-0 opacity-20">
                  <Project3DCard gradient={project.gradient} />
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-xs font-semibold text-white"
                    >
                      Featured
                    </motion.div>
                  )}

                  {/* Title */}
                  <h3 className={`text-2xl font-bold text-white mb-3 transition-colors ${
                    weather === 'winter' ? 'group-hover:text-white' :
                    weather === 'summer' ? 'group-hover:text-yellow-400' :
                    'group-hover:text-blue-400'
                  }`}>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium glass rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-auto">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-white hover:bg-white/10 transition-colors"
                    >
                      <FaGithub size={18} />
                      <span className="text-sm font-medium">Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:shadow-lg transition-all ${
                        weather === 'winter' ? 'bg-gradient-to-r from-white/30 to-gray-100/30 hover:shadow-white/40 border border-white/30' :
                        weather === 'summer' ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:shadow-yellow-500/50' :
                        'bg-gradient-to-r from-blue-600 to-slate-600 hover:shadow-blue-500/50'
                      }`}
                    >
                      <HiExternalLink size={18} />
                      <span className="text-sm font-medium">Live Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="text-center mt-16"
          >
            <motion.a
              href="https://github.com/strangerhash"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 glass rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <FaGithub size={20} />
              <span className="font-semibold">View More on GitHub</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

