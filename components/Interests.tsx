'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useWeather } from '@/contexts/WeatherContext'
import { 
  FaCamera, FaTree,
  FaCloud, FaBrain, FaCoins, FaLeaf,
  FaMicrophone, FaUsers, FaCodeBranch, FaHeart
} from 'react-icons/fa'
import { HiOfficeBuilding, HiLightningBolt } from 'react-icons/hi'

const interests = [
  {
    category: 'Adventure & Lifestyle',
    items: [
      { icon: HiLightningBolt, name: 'Motorcycle Riding', description: 'Exploring scenic routes and mountain terrains' },
      { icon: FaTree, name: 'Camping', description: 'Off-grid adventures and hill station camping' },
      { icon: HiOfficeBuilding, name: 'Off-Roading', description: 'Conquering challenging terrains and exploring nature' },
      { icon: FaCamera, name: 'Photography', description: 'Capturing moments from adventures and tech events' },
    ],
    gradient: 'from-orange-600 to-red-600',
  },
  {
    category: 'Technology Interests',
    items: [
      { icon: FaCloud, name: 'Cloud-Native Tech', description: 'Kubernetes, microservices, and distributed systems' },
      { icon: FaBrain, name: 'AI & ML', description: 'Exploring AI applications in blockchain and DeFi' },
      { icon: FaCoins, name: 'Cryptocurrency Research', description: 'Staying updated with latest trends and innovations' },
      { icon: FaLeaf, name: 'Sustainable Tech', description: 'Promoting eco-friendly blockchain solutions' },
    ],
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    category: 'Community & Speaking',
    items: [
      { icon: FaMicrophone, name: 'Tech Blogger', description: 'Sharing insights on Web3 development' },
      { icon: FaUsers, name: 'Meetup Speaker', description: 'Presenting at blockchain conferences' },
      { icon: FaCodeBranch, name: 'Open Source Advocate', description: 'Contributing to blockchain projects' },
      { icon: FaHeart, name: 'Mentorship', description: 'Guiding newcomers in Web3 space' },
    ],
    gradient: 'from-cyan-600 to-indigo-600',
  },
]

export default function Interests() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { weather } = useWeather()

  const weatherBgs = {
    winter: 'from-slate-950 via-slate-900 to-slate-950',
    summer: 'from-black via-orange-900/10 via-amber-900/10 to-yellow-950',
    rain: 'from-black via-slate-900/10 via-gray-900/10 to-blue-950',
  }

  return (
    <section id="interests" className="relative py-32 overflow-hidden">
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
              <span className="gradient-text">Beyond Code</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              When I&apos;m not building the future of Web3, I&apos;m exploring the world and sharing knowledge
            </p>
          </motion.div>

          {/* Interests Grid */}
          <div className="space-y-12">
            {interests.map((interest, categoryIndex) => (
              <motion.div
                key={interest.category}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + categoryIndex * 0.1 }}
                className="glass rounded-3xl p-8 glow relative overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 opacity-5 bg-gradient-to-r ${interest.gradient}`} />
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 gradient-text">
                    {interest.category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {interest.items.map((item, itemIndex) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.4 + categoryIndex * 0.1 + itemIndex * 0.05 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="glass rounded-2xl p-6 text-center group cursor-pointer"
                        >
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${interest.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2">{item.name}</h4>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center glass rounded-3xl p-8 md:p-12 glow"
          >
            <p className="text-xl md:text-2xl text-gray-300 italic mb-4">
              &quot;Innovation happens at the intersection of technology and creativity&quot;
            </p>
            <p className="text-lg gradient-text font-semibold">
              Let&apos;s build the decentralized future together! 🚀
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

