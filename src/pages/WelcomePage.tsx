import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useLenis } from '../components/providers/SmoothScrollProvider'
import { PillButton } from '../components/ui/PillButton'
import { GlassCard } from '../components/ui/GlassCard'
import { AnimatedText } from '../components/ui/AnimatedText'
import { Scene } from '../components/3d/Scene'
import { Globe, BookOpen, Search, Calendar, Plane, Cpu, Languages, TrendingUp, Award } from 'lucide-react'

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate()
  const lenis = useLenis()

  // Use a MotionValue synced to Lenis scroll instead of framer's useScroll
  // This prevents the two scroll systems from conflicting/jittering
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    if (!lenis) return
    const handler = ({ progress }: { progress: number }) => {
      scrollProgress.set(progress)
    }
    lenis.on('scroll', handler)
    return () => lenis.off('scroll', handler)
  }, [lenis, scrollProgress])

  // Parallax effects driven by the Lenis-synced MotionValue
  const heroY = useTransform(scrollProgress, [0, 1], [0, 300])
  const heroOpacity = useTransform(scrollProgress, [0, 0.2], [1, 0])
  const statsY = useTransform(scrollProgress, [0, 1], [0, -100])

  return (
    <div className="relative bg-background">
      {/* 3D Scene Background Layer */}
      <Scene />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-margin-mobile md:px-margin-desktop overflow-hidden">
        {/* Subtle mesh gradient overlay */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-20 pointer-events-none" />
        
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-container-max mx-auto w-full text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-display-lg text-primary mb-6 max-w-5xl mx-auto leading-tight font-black tracking-tighter">
              <AnimatedText text="Empowering Skills." delay={0.1} splitBy="char" />
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-container animate-gradient-xy">
                <AnimatedText text="Enabling Global Careers." delay={0.3} splitBy="char" />
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12"
          >
            Your journey to global success starts here. We provide the tools, network, and guidance to transition your career across borders seamlessly.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mb-20 max-w-4xl mx-auto"
          >
            <PillButton
              variant="primary"
              onClick={() => navigate('/onboarding/path')}
              className="flex items-center gap-2 px-10 py-5 text-lg"
            >
              <Calendar className="w-5 h-5" />
              Book Free Counselling
            </PillButton>
            <PillButton
              variant="secondary"
              onClick={() => navigate('/destinations')}
              className="flex items-center gap-2 px-10 py-5 text-lg bg-surface/40 backdrop-blur-xl"
            >
              <Globe className="w-5 h-5" />
              Explore Countries
            </PillButton>
          </motion.div>

          {/* Quick Actions (Floating Glass pills) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
             <button onClick={() => navigate('/academy')} className="group flex items-center gap-2 px-6 py-3 rounded-full glass-panel hover:bg-white/60 transition-all hover:-translate-y-1 hover:shadow-glass-hover">
                <BookOpen className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-on-surface-variant group-hover:text-primary">Browse Courses</span>
             </button>
             <button onClick={() => navigate('/search')} className="group flex items-center gap-2 px-6 py-3 rounded-full glass-panel hover:bg-white/60 transition-all hover:-translate-y-1 hover:shadow-glass-hover">
                <Search className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-on-surface-variant group-hover:text-primary">Programs Search</span>
             </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Bar / Stats with Parallax */}
      <motion.section 
        style={{ y: statsY }}
        className="relative z-20 max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop -mt-10 mb-24"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Countries', value: '22+', delay: 0 },
            { label: 'Partners', value: '1000+', delay: 0.1 },
            { label: 'Students', value: '50K+', delay: 0.2 },
            { label: 'Visa Success', value: '98%', delay: 0.3 }
          ].map((stat, idx) => (
            <GlassCard key={idx} hoverable={false} delay={stat.delay} className="p-8 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-stats-xl text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mb-2 font-black relative z-10">
                {stat.value}
              </div>
              <div className="text-label-md text-on-surface-variant uppercase tracking-wider relative z-10">
                {stat.label}
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.section>

      {/* Training Divisions */}
      <section className="py-32 px-margin-mobile md:px-margin-desktop relative overflow-hidden">
        <div className="absolute inset-0 bg-surface-container-low/40 backdrop-blur-3xl -z-10" />
        <div className="max-w-container-max mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-display-lg text-primary mb-6 font-bold tracking-tight">
              Comprehensive Pathways
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto text-xl">
              Tailored programs designed to equip you with the skills demanded by global markets.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Plane, title: 'Study Abroad', desc: 'Navigate international education opportunities with expert guidance.', path: '/destinations' },
              { icon: Cpu, title: 'AI & Tech', desc: 'Master future-proof technical skills in our advanced academies.', path: '/academy' },
              { icon: Languages, title: 'Language', desc: 'Achieve fluency and cultural competence for global integration.', path: '/academy' },
              { icon: TrendingUp, title: 'Career Dev', desc: 'Build a resilient professional profile and leadership skills.', path: '/academy' },
              { icon: Award, title: 'Overseas Success', desc: 'End-to-end support for settling and thriving in your new country.', path: '/onboarding/path' },
            ].map((item, idx) => (
              <GlassCard
                key={idx}
                delay={idx * 0.1}
                onClick={() => navigate(item.path)}
                className="p-8 flex flex-col items-center text-center group h-full"
              >
                <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-500 shadow-glow-primary">
                  <item.icon className="w-10 h-10 text-secondary" strokeWidth={1.5} />
                </div>
                <h3 className="text-headline-md text-on-surface mb-4 font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-body-md text-on-surface-variant text-sm leading-relaxed">
                  {item.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
export default WelcomePage
