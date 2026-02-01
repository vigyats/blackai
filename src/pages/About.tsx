import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Lightbulb, Users, Award, Rocket } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { FloatingShapes } from '@/components/shared/FloatingShapes';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { SparkleIcon } from '@/components/shared/SparkleIcon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Every solution is crafted with meticulous attention to detail and focused on delivering exact outcomes.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We push boundaries and explore new frontiers in AI to give our clients a competitive edge.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'We work alongside our clients as true partners, invested in their long-term success.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We hold ourselves to the highest standards in everything we build and deliver.',
  },
];

const timeline = [
  {
    year: '2025',
    title: 'The Beginning',
    description: 'Founded by AI researchers with a vision to make autonomous AI accessible to enterprises.',
  },
  {
    year: '2026',
    title: 'First Major Deployment',
    description: 'Launched our first enterprise-scale AI agent system, automating complex workflows.',
  },
];

const team = [
  { name: 'Vigyat', role: 'CEO & Co-founder', image: null },
  { name: 'Vaishnavi Bais', role: 'CMO & Co-founder', image: null },
  { name: 'Tanaya', role: 'COO & Co-founder', image: null },
  { name: 'Suraj', role: 'CTO & Co-founder', image: null },
];

const About = () => {
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
              <span className="text-sm text-muted-foreground">About BlackAI</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
            >
              Building the Future of
              <span className="text-gradient-gold"> Autonomous AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              We're a team of AI researchers, engineers, and visionaries on a mission 
              to create AI that truly thinks and acts on behalf of businesses.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-card/30 border-y border-border/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Our Mission</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Democratizing Autonomous Intelligence
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe every business deserves access to AI that can think, learn, and act autonomously. 
                Our mission is to bridge the gap between cutting-edge AI research and practical business 
                applications, making agentic AI accessible to organizations of all sizes.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-glow/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-glow" />
                </div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Our Vision</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                A World Augmented by AI
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We envision a future where AI agents work alongside humans as trusted partners, 
                handling complex tasks and freeing people to focus on what matters most—creativity, 
                strategy, and human connection. We're building that future, one agent at a time.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our <span className="text-gradient-gold">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The principles that guide everything we build and every decision we make.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <motion.div whileHover={{ y: -8, transition: { duration: 0.3 } }}>
                  <Card className="p-8 h-full bg-card/50 border-border/50 hover:border-border transition-all">
                    <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mb-6">
                      <value.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-card/30 border-y border-border/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our <span className="text-gradient-gold">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From a bold idea to industry-leading AI solutions.
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <AnimatedSection key={item.year} delay={index * 0.15}>
                <div className="relative pl-8 pb-12 last:pb-0 border-l border-border/50">
                  <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-accent border-4 border-background" />
                  <div className="mb-2">
                    <span className="text-sm text-accent font-semibold">{item.year}</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Leadership <span className="text-gradient-gold">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Visionaries and experts driving the future of AI.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 0.1}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                    <span className="text-3xl font-display font-bold text-muted-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </motion.div>
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
              Join Us on This Journey
            </h2>
            <p className="text-muted-foreground mb-8">
              Whether you're looking to implement AI solutions or join our team, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:bg-card"
              >
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default About;
