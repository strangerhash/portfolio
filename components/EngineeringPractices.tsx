'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useWeather } from '@/contexts/WeatherContext'
import { 
  FaCode, FaCloud, FaDatabase, FaShieldAlt, FaChartLine,
  FaUsers, FaCogs, FaSync, FaRocket
} from 'react-icons/fa'

const practices = [
  {
    category: 'System Design',
    icon: FaRocket,
    items: [
      'Scalable architecture design for high-traffic applications',
      'Distributed systems and microservices architecture',
      'Load balancing and horizontal scaling strategies',
      'Caching strategies (Redis, Memcached, CDN)',
      'Database sharding and replication patterns',
      'Message queue systems (Kafka, RabbitMQ, SQS)',
      'API gateway and service mesh implementation',
    ],
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    category: 'Software Engineering Principles',
    icon: FaCode,
    items: [
      'SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)',
      'Design Patterns (Creational, Structural, Behavioral)',
      'Clean Code practices and code quality standards',
      'Domain-Driven Design (DDD)',
      'Command Query Responsibility Segregation (CQRS)',
      'Event-Driven Architecture',
      'Test-Driven Development (TDD)',
    ],
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    category: 'Performance & Optimization',
    icon: FaChartLine,
    items: [
      'Performance profiling and optimization',
      'Query optimization and database indexing',
      'Caching strategies and implementation',
      'Code optimization and refactoring',
      'Memory management and garbage collection',
      'Network optimization and API efficiency',
      'Bundle size optimization and lazy loading',
    ],
    gradient: 'from-indigo-600 to-cyan-600',
  },
  {
    category: 'Security & Best Practices',
    icon: FaShieldAlt,
    items: [
      'Secure coding practices and vulnerability assessment',
      'Authentication and authorization (OAuth, JWT, RBAC)',
      'Data encryption and secure storage',
      'API security and rate limiting',
      'Security auditing and penetration testing',
      'Compliance standards (GDPR, SOC 2)',
      'Secure DevOps practices',
    ],
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    category: 'Code Quality & Collaboration',
    icon: FaUsers,
    items: [
      'Code reviews and pair programming',
      'Documentation and technical writing',
      'Version control best practices (Git workflows)',
      'Continuous Integration/Continuous Deployment (CI/CD)',
      'Automated testing strategies',
      'Code quality tools (SonarQube, ESLint, Prettier)',
      'Agile/Scrum methodologies',
    ],
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    category: 'Architecture Patterns',
    icon: FaCogs,
    items: [
      'Microservices vs Monolith architecture decisions',
      'Service-Oriented Architecture (SOA)',
      'RESTful and GraphQL API design',
      'Event Sourcing and CQRS patterns',
      'Circuit breaker and bulkhead patterns',
      'Saga pattern for distributed transactions',
      'Backend-for-Frontend (BFF) pattern',
    ],
    gradient: 'from-indigo-500 to-cyan-500',
  },
]

export default function EngineeringPractices() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { weather } = useWeather()

  const weatherBgs = {
    winter: 'from-slate-950 via-slate-900 to-slate-950',
    summer: 'from-black via-orange-900/10 via-amber-900/10 to-yellow-950',
    rain: 'from-black via-slate-900/10 via-gray-900/10 to-blue-950',
  }

  return (
    <section id="engineering-practices" className="relative py-32 overflow-hidden">
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
              <span className="gradient-text">Senior Engineering Expertise</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              System design, architecture patterns, and software engineering best practices 
              that define world-class software development
            </p>
          </motion.div>

          {/* Practices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practices.map((practice, index) => {
              const Icon = practice.icon
              return (
                <motion.div
                  key={practice.category}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass rounded-3xl p-8 glow relative overflow-hidden group"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${practice.gradient} group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${practice.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Category Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 gradient-text">
                      {practice.category}
                    </h3>

                    {/* Items List */}
                    <ul className="space-y-3">
                      {practice.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + index * 0.1 + itemIndex * 0.05 }}
                          className="text-sm text-gray-300 flex items-start gap-2"
                        >
                          <span className={`mt-1 ${
                            weather === 'winter' ? 'text-white' :
                            weather === 'summer' ? 'text-yellow-400' :
                            'text-blue-400'
                          }`}>▸</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
            className="mt-16 glass rounded-3xl p-8 md:p-12 glow text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
              Comprehensive Engineering Approach
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              As a senior software engineer, I bring a holistic approach to software development, 
              combining deep technical expertise with proven engineering practices. From initial 
              system design to production deployment, I ensure scalability, maintainability, security, 
              and performance at every layer of the application stack.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

