import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Workflow, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Brain, 
  Cog, 
  MessageSquare, 
  FileSearch, 
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { FloatingShapes } from '@/components/shared/FloatingShapes';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { SparkleIcon } from '@/components/shared/SparkleIcon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const mainServices = [
  {
    id: 'agents',
    icon: Bot,
    title: 'Custom AI Agents',
    subtitle: 'Autonomous Intelligence at Scale',
    description: 'Build intelligent agents that can perceive, reason, and act autonomously. Our custom AI agents integrate seamlessly with your systems to handle complex tasks, make decisions, and learn from experience.',
    features: [
      'Multi-step reasoning and planning',
      'Real-time decision making',
      'Continuous learning and adaptation',
      'Seamless system integration',
      'Custom personality and behavior',
      'Scalable architecture',
    ],
    useCases: [
      { icon: MessageSquare, label: 'Customer Service Agents' },
      { icon: FileSearch, label: 'Research Assistants' },
      { icon: TrendingUp, label: 'Sales Automation' },
    ],
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'AI Workflow Automation',
    subtitle: 'Intelligent Process Orchestration',
    description: 'Transform your business processes with AI-powered automation that goes beyond simple rules. Our workflows understand context, adapt to changes, and continuously optimize for better outcomes.',
    features: [
      'Intelligent task routing',
      'Predictive process optimization',
      'Anomaly detection and handling',
      'Cross-system orchestration',
      'Real-time monitoring and analytics',
      'Self-healing workflows',
    ],
    useCases: [
      { icon: Cog, label: 'Operations Automation' },
      { icon: FileSearch, label: 'Document Processing' },
      { icon: Brain, label: 'Decision Support' },
    ],
  },
  {
    id: 'consultation',
    icon: Sparkles,
    title: 'AI Consultation & Integration',
    subtitle: 'Strategic AI Implementation',
    description: 'Navigate the AI landscape with expert guidance. From strategy to deployment, we help you identify opportunities, select the right solutions, and integrate AI seamlessly into your existing infrastructure.',
    features: [
      'AI readiness assessment',
      'Technology stack evaluation',
      'Custom solution architecture',
      'Implementation roadmap',
      'Team training and enablement',
      'Ongoing optimization support',
    ],
    useCases: [
      { icon: Cpu, label: 'System Integration' },
      { icon: TrendingUp, label: 'ROI Optimization' },
      { icon: Brain, label: 'AI Strategy' },
    ],
  },
];

const processSteps = [
  { step: '01', title: 'Discovery', description: 'We analyze your needs and identify AI opportunities' },
  { step: '02', title: 'Design', description: 'Custom solution architecture tailored to your goals' },
  { step: '03', title: 'Develop', description: 'Agile development with continuous feedback loops' },
  { step: '04', title: 'Deploy', description: 'Seamless integration and launch with full support' },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <FloatingShapes variant="hero" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-8"
            >
              <SparkleIcon size={16} className="text-accent" />
              <span className="text-sm text-muted-foreground">Our Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
            >
              Agentic AI
              <span className="text-gradient-gold"> Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              From intelligent agents to workflow automation, we build AI solutions 
              that think, adapt, and deliver real business value.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      {mainServices.map((service, index) => (
        <section 
          key={service.id} 
          id={service.id}
          className={`py-24 ${index % 2 === 1 ? 'bg-card/30' : ''}`}
        >
          <div className="container mx-auto px-6">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <AnimatedSection className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    {service.subtitle}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  {service.title}
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
                  <Link to="/contact" className="flex items-center gap-2">
                    Get Started
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative">
                  <Card className="p-8 bg-card/50 border-border/50">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                      Use Cases
                    </h4>
                    <div className="space-y-4">
                      {service.useCases.map((useCase) => (
                        <motion.div
                          key={useCase.label}
                          whileHover={{ x: 8 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <useCase.icon className="w-5 h-5 text-accent" />
                          </div>
                          <span className="font-medium">{useCase.label}</span>
                          <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                  {/* Decorative gradient */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-accent/5 via-transparent to-purple-glow/5 rounded-3xl -z-10 blur-2xl" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="py-24 border-t border-border/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our <span className="text-gradient-gold">Process</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A proven methodology for delivering AI solutions that work.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.step} delay={index * 0.1}>
                <div className="relative">
                  <div className="text-6xl font-display font-bold text-secondary/50 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                  
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border/50 -translate-x-1/2" />
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/50 border-t border-border/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how our AI solutions can transform your business.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-10 h-14"
            >
              <Link to="/contact">
                Schedule a Consultation
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
