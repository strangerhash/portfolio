'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useWeather } from '@/contexts/WeatherContext'
import { FaGithub, FaCode, FaStar, FaCodeBranch, FaEye, FaClock } from 'react-icons/fa'

export default function GitHubStats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { weather } = useWeather()

  const weatherBgs = {
    winter: 'from-slate-950 via-slate-900 to-slate-950',
    summer: 'from-black via-orange-900/10 via-amber-900/10 to-yellow-950',
    rain: 'from-black via-slate-900/10 via-gray-900/10 to-blue-950',
  }

  return (
    <section id="github-stats" className="relative py-32 overflow-hidden">
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
              <span className="gradient-text">GitHub Analytics</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              My coding journey and contributions to open source
            </p>
          </motion.div>

          {/* GitHub Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* GitHub Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="glass rounded-3xl p-8 glow"
            >
              <div className="flex items-center gap-4 mb-6">
                <FaGithub className={`w-12 h-12 ${
                  weather === 'winter' ? 'text-white' :
                  weather === 'summer' ? 'text-yellow-400' :
                  'text-blue-400'
                }`} />
                <div>
                  <h3 className="text-2xl font-bold text-white">GitHub Profile</h3>
                  <p className="text-gray-400">@strangerhash</p>
                </div>
              </div>
              <img
                src="https://github-readme-stats.vercel.app/api?username=strangerhash&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=00D4FF&icon_color=00D4FF&text_color=FFFFFF"
                alt="GitHub Stats"
                className="w-full rounded-lg"
              />
            </motion.div>

            {/* Top Languages Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="glass rounded-3xl p-8 glow"
            >
              <div className="flex items-center gap-4 mb-6">
                <FaCode className="w-12 h-12 text-blue-400" />
                <div>
                  <h3 className="text-2xl font-bold text-white">Top Languages</h3>
                  <p className="text-gray-400">Most used programming languages</p>
                </div>
              </div>
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=strangerhash&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=00D4FF&text_color=FFFFFF"
                alt="Top Languages"
                className="w-full rounded-lg"
              />
            </motion.div>

            {/* Streak Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="glass rounded-3xl p-8 glow"
            >
              <div className="flex items-center gap-4 mb-6">
                <FaStar className="w-12 h-12 text-yellow-400" />
                <div>
                  <h3 className="text-2xl font-bold text-white">Contribution Streak</h3>
                  <p className="text-gray-400">Daily coding commitment</p>
                </div>
              </div>
              <img
                src="https://github-readme-streak-stats.herokuapp.com/?user=strangerhash&theme=tokyonight&hide_border=true&background=0D1117&stroke=00D4FF&ring=00D4FF&fire=00D4FF&currStreakLabel=00D4FF"
                alt="GitHub Streak"
                className="w-full rounded-lg"
              />
            </motion.div>

            {/* Activity Graph Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass rounded-3xl p-8 glow"
            >
              <div className="flex items-center gap-4 mb-6">
                <FaCodeBranch className="w-12 h-12 text-green-400" />
                <div>
                  <h3 className="text-2xl font-bold text-white">Activity Graph</h3>
                  <p className="text-gray-400">Contribution activity timeline</p>
                </div>
              </div>
              <img
                src="https://github-readme-activity-graph.vercel.app/graph?username=strangerhash&theme=tokyonight&hide_border=true&bg_color=0D1117&color=00D4FF&line=00D4FF&point=00D4FF"
                alt="GitHub Activity"
                className="w-full rounded-lg"
              />
            </motion.div>
          </div>

          {/* WakaTime Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="glass rounded-3xl p-8 glow"
            >
              <div className="flex items-center gap-4 mb-6">
                <FaClock className={`w-12 h-12 ${
                  weather === 'winter' ? 'text-white' :
                  weather === 'summer' ? 'text-yellow-400' :
                  'text-blue-400'
                }`} />
                <div>
                  <h3 className="text-2xl font-bold text-white">WakaTime Coding Activity</h3>
                  <p className="text-gray-400">Weekly coding statistics and time tracking</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* WakaTime Stats */}
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://github-readme-stats.vercel.app/api/wakatime?username=@strangerhash&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=00D4FF&text_color=FFFFFF"
                    alt="WakaTime Stats"
                    className="w-full"
                  />
                </div>
                {/* WakaTime Languages */}
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://github-readme-stats.vercel.app/api/wakatime?username=@strangerhash&langs_count=8&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=00D4FF&text_color=FFFFFF"
                    alt="WakaTime Languages"
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Views */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <div className="inline-block glass rounded-2xl p-6">
              <img
                src="https://komarev.com/ghpvc/?username=strangerhash&label=Profile%20views&color=0e75b6&style=flat"
                alt="Profile views"
                className="h-6"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

