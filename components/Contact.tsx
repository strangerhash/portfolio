'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useWeather } from '@/contexts/WeatherContext'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi'
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from 'react-icons/fa'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Torus } from '@react-three/drei'

const contactInfo = [
  {
    icon: HiMail,
    label: 'Email',
    value: 'pandeysatyendra870@gmail.com',
    link: 'mailto:pandeysatyendra870@gmail.com',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    icon: HiLocationMarker,
    label: 'Location',
    value: 'India',
    link: '#',
    color: 'from-green-600 to-teal-600',
  },
]

const socialLinks = [
  { Icon: FaGithub, href: 'https://github.com/strangerhash', label: 'GitHub', color: 'from-gray-700 to-gray-900' },
  { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/satyendra-pandey-a0314b167/', label: 'LinkedIn', color: 'from-blue-600 to-blue-800' },
  { Icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter', color: 'from-blue-400 to-blue-600' },
  { Icon: FaDiscord, href: 'https://discord.com', label: 'Discord', color: 'from-indigo-500 to-purple-600' },
]

function Contact3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Torus args={[1.5, 0.5, 16, 100]}>
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          wireframe
        />
      </Torus>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  )
}

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { weather } = useWeather()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', message: '' })
      alert('Thank you! Your message has been sent.')
    }, 1000)
  }

  const weatherBgs = {
    winter: 'from-slate-950 via-slate-900 to-slate-950',
    summer: 'from-black via-orange-900/10 via-amber-900/10 to-yellow-950',
    rain: 'from-black via-slate-900/10 via-gray-900/10 to-blue-950',
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
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
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Let&apos;s collaborate and bring your ideas to life. I&apos;m always open to discussing new projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.a
                      key={index}
                      href={info.link}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="glass rounded-2xl p-6 flex items-center gap-4 glow block"
                    >
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">{info.label}</div>
                        <div className="text-white font-semibold">{info.value}</div>
                      </div>
                    </motion.a>
                  )
                })}
              </div>

              {/* 3D Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="h-64 w-full glass rounded-2xl overflow-hidden glow"
              >
                <Contact3D />
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4"
              >
                {socialLinks.map((social, index) => {
                  const Icon = social.Icon
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center text-white hover:shadow-lg transition-shadow`}
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 glow"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={`w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                      weather === 'winter' ? 'focus:border-white focus:ring-white/20' :
                      weather === 'summer' ? 'focus:border-yellow-500 focus:ring-yellow-500/20' :
                      'focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={`w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                      weather === 'winter' ? 'focus:border-white focus:ring-white/20' :
                      weather === 'summer' ? 'focus:border-yellow-500 focus:ring-yellow-500/20' :
                      'focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full px-6 py-4 rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    weather === 'winter' ? 'bg-gradient-to-r from-white/30 to-gray-100/30 hover:shadow-white/40 border border-white/30' :
                    weather === 'summer' ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:shadow-yellow-500/50' :
                    'bg-gradient-to-r from-blue-600 to-slate-600 hover:shadow-blue-500/50'
                  }`}
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <HiPaperAirplane size={20} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="text-center mt-20 pt-8 border-t border-gray-800"
          >
            <p className="text-gray-400">
              © {new Date().getFullYear()} Portfolio. Built with Next.js, React Three Fiber, and Framer Motion.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

