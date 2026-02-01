import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Workflow, Sparkles, Zap, Shield, Target } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { FloatingShapes } from '@/components/shared/FloatingShapes';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { SparkleIcon } from '@/components/shared/SparkleIcon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const services = [
  {
    icon: Bot,
    title: 'Custom AI Agents',
    description: 'Autonomous agents that think, learn, and act on your behalf to accomplish complex tasks.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Intelligent process automation that adapts and improves over time with AI-driven insights.',
  },
  {
    icon: Sparkles,
    title: 'AI Consultation',
    description: 'Expert guidance on integrating cutting-edge AI solutions into your existing infrastructure.',
  },
];

const stats = [
  { value: 2, suffix: ' ', label: 'AI Agents Deployed' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 1, suffix: 'k+', label: 'Tasks Automated' },
  { value: 24, suffix: '/7', label: 'Autonomous Operation' },
];

const trustedLogos = [
  ' ', ' ', ' ', ' ', ' ', ' ',
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <FloatingShapes variant="hero" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(hsl(0, 0%, 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0, 0%, 50%) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-8"
            >
              <SparkleIcon size={16} className="text-accent" />
              <span className="text-sm text-muted-foreground">Perfect AI Solutions</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-6"
            >
              <span className="text-gradient-white">Intelligence</span>
              <br />
              <span className="text-gradient-gold">Unleashed</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              We build autonomous AI agents that transform how businesses operate. 
              From intelligent automation to adaptive workflows, we make AI work for you.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 px-8 h-12 text-base font-medium group"
              >
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:bg-card h-12 px-8 text-base"
              >
                <Link to="/services">Explore Services</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-border/50 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-muted-foreground rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 border-y border-border/30 bg-card/30">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider">
            Trusted by innovative companies
          </p>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee">
              {[...trustedLogos, ...trustedLogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-12 text-2xl font-display font-semibold text-muted-foreground/40"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 md:py-32 relative">
        <FloatingShapes variant="section" />
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              What We <span className="text-gradient-gold">Build</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge AI solutions designed to give your business an unfair advantage.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Card className="p-8 h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                      <service.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4} className="text-center mt-12">
            <Button asChild variant="outline" className="border-border hover:bg-card">
              <Link to="/services" className="flex items-center gap-2">
                View All Services
                <ArrowRight size={16} />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-card/50 border-y border-border/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
                We're building the future of
                <span className="text-gradient-gold"> autonomous intelligence</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At BlackAI, we believe in AI that doesn't just assist—it acts. Our agentic AI solutions 
                are designed to understand context, make decisions, and execute tasks with minimal 
                human intervention.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Founded by AI researchers and industry veterans, we combine cutting-edge technology 
                with practical business applications to deliver solutions that transform operations.
              </p>
              <Button asChild variant="outline" className="border-border hover:bg-card">
                <Link to="/about" className="flex items-center gap-2">
                  Learn More About Us
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Zap, label: 'Lightning Fast' },
                    { icon: Shield, label: 'Enterprise Secure' },
                    { icon: Target, label: 'Precision Focused' },
                    { icon: Sparkles, label: 'AI-Native' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-2xl bg-card/50 border border-border/50 text-center"
                    >
                      <item.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                      <p className="text-sm font-medium">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
                {/* Decorative gradient */}
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/5 via-transparent to-purple-glow/5 rounded-3xl -z-10 blur-2xl" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
        <FloatingShapes variant="section" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <SparkleIcon size={32} className="mx-auto mb-6 text-accent" />
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Let's discuss how agentic AI can revolutionize your operations and give you a competitive edge.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-10 h-14 text-base font-medium group"
            >
              <Link to="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
