import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { FloatingShapes } from '@/components/shared/FloatingShapes';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { SparkleIcon } from '@/components/shared/SparkleIcon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

// Example product list (you can add more later)
const allProducts = [
  {
    id: 'find-ai',
    icon: Bot,
    title: 'Find AI',
    subtitle: 'AI‑Powered Discovery Engine',
    description:
      'Find AI helps you discover the right AI tools, agents, and workflows for your specific use case.',
    features: [
      'Smart recommendation engine',
      'Use‑case based matching',
      'Integration compatibility scoring',
    ],
    link: 'https://your-find-ai-link.com',
  },
  // Add more products here in future
];

const Products = () => {
  const [search, setSearch] = useState('');

  const filtered = allProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase().trim())
  );

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

      {/* Search Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border/50 bg-card/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8">
            {/* Giant "Find AI" card (left) */}
            <AnimatedSection>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mx-auto"
              >
                <Card
                  className="p-10 text-center cursor-pointer group"
                  onClick={() => window.open('https://findai-pdpz.onrender.com/', '_blank')}
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <Bot className="w-8 h-8 text-accent" />
                  </div>

                  <h3 className="text-2xl font-display font-bold mb-2">Find AI</h3>
                  <p className="text-muted-foreground mb-6">
                    AI‑powered discovery engine for agents, tools, and workflows tailored to your stack (Its FREE to use).
                  </p>

                  <div className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                    Explore Find AI
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              </motion.div>
            </AnimatedSection>

            {/* Coming Soon card (right) */}
            <AnimatedSection delay={0.2}>
              <Card className="p-10 text-center bg-card/50 border-border/50">
                <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                  <SparkleIcon size={24} className="text-secondary" />
                </div>

                <h3 className="text-2xl font-display font-bold mb-2">More Products</h3>
                <p className="text-muted-foreground mb-6">
                  More powerful AI products are coming soon. Stay tuned for new releases.
                </p>

                <Button
                  asChild
                  variant="outline"
                  className="border-border/50 hover:bg-secondary/20"
                >
                  <Link to="/contact">Notify Me</Link>
                </Button>
              </Card>
            </AnimatedSection>
          </div>

          {/* Search results */}
          {search && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">
                {filtered.length === 0 ? 'No product found' : 'Search Results'}
              </h3>

              {filtered.length === 0 ? (
                <p className="text-muted-foreground">No product matches your search.</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((product) => (
                    <Card
                      key={product.id}
                      className="p-6 bg-card/50 border-border/50 hover:bg-card/70 transition-colors cursor-pointer"
                      onClick={() => window.open(product.link, '_blank')}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <product.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{product.title}</h4>
                          <p className="text-sm text-muted-foreground">{product.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {product.description}
                      </p>

                      <div className="space-y-1">
                        {product.features.slice(0, 3).map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-accent" />
                            {feat}
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
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
