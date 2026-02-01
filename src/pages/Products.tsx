import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { FloatingShapes } from '@/components/shared/FloatingShapes';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { SparkleIcon } from '@/components/shared/SparkleIcon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
