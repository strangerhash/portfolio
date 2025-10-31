'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useWeather } from '@/contexts/WeatherContext'
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiJavascript,
  SiGo, SiRust, SiDocker, SiKubernetes,
  SiMongodb, SiPostgresql, SiGraphql, SiTailwindcss,
  SiGit, SiGitlab, SiTerraform, SiSolidity
} from 'react-icons/si'
import { FaEthereum, FaCode, FaBrain, FaDatabase, FaCloud } from 'react-icons/fa'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// Helper function to convert percentage to level - Ice/Space Theme
const getLevel = (percentage: number): { text: string; color: string } => {
  if (percentage >= 90) return { text: 'Expert', color: 'from-cyan-500 to-blue-500' }
  if (percentage >= 75) return { text: 'Advanced', color: 'from-blue-500 to-indigo-500' }
  if (percentage >= 50) return { text: 'Intermediate', color: 'from-indigo-500 to-blue-500' }
  return { text: 'Beginner', color: 'from-gray-500 to-gray-600' }
}

const skillCategories = [
  {
    name: 'Languages & Core',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, level: 95, color: '#339933' },
      { name: 'Go', icon: SiGo, level: 92, color: '#00ADD8' },
      { name: 'Rust', icon: SiRust, level: 88, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, level: 94, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, level: 93, color: '#F7DF1E' },
      { name: 'Solidity', icon: SiSolidity, level: 90, color: '#363636' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'React', icon: SiReact, level: 95, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, level: 92, color: '#000000' },
      { name: 'Angular', icon: FaCode, level: 88, color: '#DD0031' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90, color: '#06B6D4' },
    ],
  },
  {
    name: 'Blockchain & Smart Contracts',
    skills: [
      { name: 'Blockchain', icon: FaEthereum, level: 93, color: '#627EEA' },
      { name: 'Smart Contracts', icon: SiSolidity, level: 91, color: '#363636' },
      { name: 'BFT Consensus', icon: FaCode, level: 89, color: '#8B5CF6' },
      { name: 'DeFi', icon: FaEthereum, level: 92, color: '#627EEA' },
    ],
  },
  {
    name: 'Databases & Storage',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, level: 91, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 89, color: '#4169E1' },
      { name: 'OpenSearch', icon: FaDatabase, level: 85, color: '#005571' },
      { name: 'Vector DB', icon: FaDatabase, level: 83, color: '#8B5CF6' },
      { name: 'RAG', icon: FaBrain, level: 82, color: '#10B981' },
    ],
  },
  {
    name: 'DevOps & Infrastructure',
    skills: [
      { name: 'Docker', icon: SiDocker, level: 94, color: '#2496ED' },
      { name: 'Kubernetes', icon: SiKubernetes, level: 91, color: '#326CE5' },
      { name: 'Container Orchestration', icon: SiKubernetes, level: 90, color: '#326CE5' },
      { name: 'Microservices', icon: FaCloud, level: 92, color: '#8B5CF6' },
      { name: 'Grafana', icon: FaCloud, level: 87, color: '#F46800' },
      { name: 'Hardhat', icon: FaCode, level: 88, color: '#FFF100' },
      { name: 'Foundry', icon: FaCode, level: 86, color: '#FF6B6B' },
      { name: 'Terraform', icon: SiTerraform, level: 84, color: '#7B42BC' },
    ],
  },
  {
    name: 'System Design & Architecture',
    skills: [
      { name: 'System Design', icon: FaCode, level: 95, color: '#06b6d4' },
      { name: 'Distributed Systems', icon: FaCloud, level: 93, color: '#3b82f6' },
      { name: 'Microservices Architecture', icon: FaCloud, level: 92, color: '#6366f1' },
      { name: 'Scalable Systems', icon: FaCode, level: 94, color: '#8b5cf6' },
      { name: 'API Design', icon: FaCode, level: 91, color: '#06b6d4' },
      { name: 'System Optimization', icon: FaCode, level: 90, color: '#3b82f6' },
    ],
  },
  {
    name: 'Software Engineering Practices',
    skills: [
      { name: 'SOLID Principles', icon: FaCode, level: 95, color: '#06b6d4' },
      { name: 'Design Patterns', icon: FaCode, level: 94, color: '#3b82f6' },
      { name: 'Clean Code', icon: FaCode, level: 96, color: '#6366f1' },
      { name: 'Code Reviews', icon: FaCode, level: 93, color: '#8b5cf6' },
      { name: 'Refactoring', icon: FaCode, level: 92, color: '#06b6d4' },
      { name: 'Agile/Scrum', icon: FaCode, level: 91, color: '#3b82f6' },
      { name: 'DDD (Domain-Driven Design)', icon: FaCode, level: 88, color: '#6366f1' },
      { name: 'CQRS', icon: FaCode, level: 87, color: '#8b5cf6' },
    ],
  },
  {
    name: 'Testing & Quality Assurance',
    skills: [
      { name: 'Unit Testing', icon: FaCode, level: 92, color: '#06b6d4' },
      { name: 'Integration Testing', icon: FaCode, level: 90, color: '#3b82f6' },
      { name: 'Load Testing', icon: FaCode, level: 89, color: '#6366f1' },
      { name: 'Performance Testing', icon: FaCode, level: 91, color: '#8b5cf6' },
      { name: 'Test-Driven Development', icon: FaCode, level: 88, color: '#06b6d4' },
      { name: 'Code Quality Tools', icon: FaCode, level: 90, color: '#3b82f6' },
    ],
  },
  {
    name: 'AI Tools & Development',
    skills: [
      { name: 'Cursor AI', icon: FaBrain, level: 95, color: '#06b6d4' },
      { name: 'Claude AI', icon: FaBrain, level: 94, color: '#3b82f6' },
      { name: 'Gemini Pro', icon: FaBrain, level: 90, color: '#6366f1' },
      { name: 'Git', icon: SiGit, level: 96, color: '#8b5cf6' },
    ],
  },
]

function SkillSphere({ color }: { color: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { weather } = useWeather()

  const weatherBgs = {
    winter: 'from-slate-950 via-slate-900 to-slate-950',
    summer: 'from-black via-orange-900/10 via-amber-900/10 to-yellow-950',
    rain: 'from-black via-slate-900/10 via-gray-900/10 to-blue-950',
  }

  const weatherColors = {
    winter: '#ffffff',
    summer: '#f59e0b',
    rain: '#64748b',
  }

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
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
              <span className="gradient-text">Skills & Expertise</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Blockchain, DeFi, AI-assisted development, and high-performance systems
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + categoryIndex * 0.1 }}
                className="glass rounded-3xl p-8 glow"
              >
                <h3 className="text-2xl font-bold mb-6 gradient-text">{category.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = skill.icon
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="relative overflow-hidden rounded-xl glass p-4 group"
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${skill.color}20` }}
                          >
                            <Icon
                              size={24}
                              style={{ color: skill.color }}
                              className="group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white">{skill.name}</div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                              delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                              duration: 0.5,
                            }}
                            className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${getLevel(skill.level).color} text-white`}
                          >
                            {getLevel(skill.level).text}
                          </motion.span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3D Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
                className="mt-20 h-64 w-full glass rounded-3xl overflow-hidden glow"
              >
                <SkillSphere color={weatherColors[weather]} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

