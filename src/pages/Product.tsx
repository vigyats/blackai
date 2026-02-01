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

const mainProducts = [
  {
    id: 'find-ai',
    icon: Bot,
    title: 'Find AI',
    subtitle: 'AI‑Powered Discovery Engine',
    description:
      'Find AI helps you discover the right AI tools, agents, and workflows for your specific use case. ' +
      'From customer service to research and automation, Find AI surfaces the best solutions and integrations.',
    features: [
      'Smart recommendation engine',
      'Use‑case based matching',
      'Integration compatibility scoring',
      'Performance and cost comparison',
      'Real‑time market updates',
      'Custom fit score for your stack',
    ],
    useCases: [
      { icon: MessageSquare, label: 'Customer Service Stack' },
      { icon: FileSearch, label: 'Research Tooling' },
      { icon: TrendingUp, label: 'Sales & Marketing AI' },
    ],
  },
  {
    id: 'agent-studio',
    icon: Workflow,
    title: 'Agent Studio',
    subtitle: 'No‑Code Agent Builder',
    description:
      'Design, test, and deploy custom AI agents without writing code. ' +
      'Agent Studio provides a visual interface to define behavior, memory, and integrations.',
    features: [
      'Drag‑and‑drop agent design',
      'Built‑in memory and context',
      'Pre‑built templates',
      'Testing sandbox',
      'Versioning and rollback',
      'Team collaboration',
    ],
    useCases: [
      { icon: Cog, label: 'Operations Agents' },
      { icon: FileSearch, label: 'Document Agents' },
      { icon: Brain, label: 'Decision Agents' },
    ],
  },
  {
    id: 'workflow-hub',
    icon: Sparkles,
    title: 'Workflow Hub',
    subtitle: 'AI Workflow Marketplace',
    description:
      'Browse, customize, and deploy pre‑built AI workflows for common business processes. ' +
      'From onboarding to sales and support, Workflow Hub accelerates your automation journey.',
    features: [
      'Curated workflow library',
      'One‑click deployment',
      'Customization options',
      'Performance analytics',
      'Community templates',
      'Enterprise governance',
    ],
    useCases: [
      { icon: Cpu, label: 'IT & DevOps' },
      { icon: TrendingUp, label: 'Sales & Marketing' },
      { icon: Brain, label: 'Data & Analytics' },
    ],
  },
];

const processSteps = [
  { step: '01', title: 'Discover', description: 'Find the right product for your needs' },
  { step: '02', title: 'Configure', description: 'Customize settings and integrations' },
  { step: '03', title: 'Test', description: 'Validate in sandbox before going live' },
  { step: '04', title: 'Deploy', description: 'Roll out with monitoring and support' },
];

const Products = () => {
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
              <span className="text-sm text-muted-foreground">Our Products</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
            >
              Agentic AI
              <span className="text-gradient-gold"> Products</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Ready‑made platforms and tools that help you build, discover, and deploy AI agents faster.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Products Detail */}
      {mainProducts.map((product, index) => (
        <section
          key={product.id}
          id={product.id}
          className={`py-24 ${index % 2 === 1 ? 'bg-card/30' : ''}`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <AnimatedSection className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <product.icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    {product.subtitle}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  {product.title}
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {product.features.map((feature) => (
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
                      {product.useCases.map((useCase) => (
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

      {/* Big "Find AI" Card */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Discover the <span className="text-gradient-gold">Right AI</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Let our AI‑powered discovery engine match you with the perfect tools and workflows.
            </p>
          </AnimatedSection>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mx-auto max-w-2xl"
          >
            <Card
              className="p-10 text-center cursor-pointer group"
              onClick={() => window.open('https://your-find-ai-link.com', '_blank')}
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-accent" />
              </div>

              <h3 className="text-2xl font-display font-bold mb-2">Find AI</h3>
              <p className="text-muted-foreground mb-6">
                AI‑powered discovery engine for agents, tools, and workflows tailored to your stack.
              </p>

              <div className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                Explore Find AI
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 border-t border-border/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our <span className="text-gradient-gold">Process</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A proven methodology for delivering AI products that work.
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
              Ready to Try Our Products?
            </h2>
            <p className="text-muted-foreground mb-8">
              Schedule a demo or start with a free trial of our AI products.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-10 h-14"
            >
              <Link to="/contact">
                Schedule a Demo
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
