import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Bot, Workflow, Sparkles, ArrowRight, ArrowLeft, X,
  Cpu, Brain, Cog, MessageSquare, FileSearch, TrendingUp,
  CheckCircle2, Globe, Zap, Search, Code, Package, Layers
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
    features: ['Multi-step reasoning and planning', 'Real-time decision making', 'Continuous learning and adaptation', 'Seamless system integration', 'Custom personality and behavior', 'Scalable architecture'],
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
    features: ['Intelligent task routing', 'Predictive process optimization', 'Anomaly detection and handling', 'Cross-system orchestration', 'Real-time monitoring and analytics', 'Self-healing workflows'],
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
    features: ['AI readiness assessment', 'Technology stack evaluation', 'Custom solution architecture', 'Implementation roadmap', 'Team training and enablement', 'Ongoing optimization support'],
    useCases: [
      { icon: Cpu, label: 'System Integration' },
      { icon: TrendingUp, label: 'ROI Optimization' },
      { icon: Brain, label: 'AI Strategy' },
    ],
  },
  {
    id: 'genai',
    icon: Zap,
    title: 'Generative AI Solutions',
    subtitle: 'Next-Gen Content & Intelligence',
    description: 'Harness the power of large language models and generative AI to create content, generate code, produce media, and build intelligent applications that transform how your business operates.',
    features: ['LLM fine-tuning and deployment', 'AI content generation pipelines', 'Custom GPT-powered applications', 'Image and media generation', 'AI-powered code generation', 'Multimodal AI systems'],
    useCases: [
      { icon: FileSearch, label: 'AI Content Generation' },
      { icon: Code, label: 'AI Code Assistant' },
      { icon: Layers, label: 'Multimodal AI Apps' },
    ],
  },
  {
    id: 'website',
    icon: Globe,
    title: 'Website Development',
    subtitle: 'Modern Web Experiences',
    description: 'We design and build high-performance, visually stunning websites and web applications tailored to your brand. From landing pages to full-scale platforms, we deliver experiences that convert.',
    features: ['Custom UI/UX design', 'React & Next.js development', 'Mobile-first responsive design', 'SEO-optimized architecture', 'CMS integration', 'Performance optimization'],
    useCases: [
      { icon: Globe, label: 'Business Website' },
      { icon: TrendingUp, label: 'Landing Page & Funnels' },
      { icon: Code, label: 'Custom Web Applications' },
    ],
  },
  {
    id: 'ai-web',
    icon: Code,
    title: 'AI Website Integration',
    subtitle: 'Make Your Website Intelligent',
    description: 'Supercharge your existing website with AI capabilities. From intelligent chatbots to personalization engines and AI-powered search, we embed AI directly into your web presence.',
    features: ['AI chatbot embedding', 'Personalization engines', 'AI-powered site search', 'Smart recommendation systems', 'Automated content updates', 'Visitor behavior analysis'],
    useCases: [
      { icon: MessageSquare, label: 'AI Chatbot Development' },
      { icon: Search, label: 'AI SEO Boost' },
      { icon: Cpu, label: 'AI Deployment & Integration' },
    ],
  },
  {
    id: 'products',
    icon: Package,
    title: 'Product Building',
    subtitle: 'From Idea to Market-Ready Product',
    description: 'We partner with founders and businesses to build complete digital products — from MVP to full-scale SaaS platforms. Our end-to-end product development covers design, engineering, and AI integration.',
    features: ['MVP development', 'SaaS platform architecture', 'AI-native product design', 'API development & integration', 'Scalable cloud infrastructure', 'Product strategy consulting'],
    useCases: [
      { icon: Package, label: 'SaaS Product Development' },
      { icon: Layers, label: 'AI-Native Applications' },
      { icon: Cpu, label: 'System Integration' },
    ],
  },
];

const processSteps = [
  { step: '01', title: 'Discovery', description: 'We analyze your needs and identify AI opportunities' },
  { step: '02', title: 'Design', description: 'Custom solution architecture tailored to your goals' },
  { step: '03', title: 'Develop', description: 'Agile development with continuous feedback loops' },
  { step: '04', title: 'Deploy', description: 'Seamless integration and launch with full support' },
];

const useCaseDetails: Record<string, { description: string; points: string[]; service: string; inquiry: string }> = {
  'Customer Service Agents': {
    description: 'Deploy intelligent AI agents that handle customer queries 24/7, resolve issues autonomously, escalate complex cases, and learn from every interaction to continuously improve response quality.',
    points: ['24/7 automated support with human-like responses', 'Multi-channel support: chat, email, and voice', 'Seamless escalation to human agents when needed', 'Sentiment analysis and proactive issue resolution'],
    service: 'Custom AI Agents', inquiry: 'Product/Service Inquiry',
  },
  'Research Assistants': {
    description: 'AI-powered research agents that autonomously gather, analyze, and synthesize information from multiple sources, delivering structured insights and reports tailored to your business needs.',
    points: ['Automated data collection from multiple sources', 'Intelligent summarization and insight extraction', 'Competitive analysis and market research', 'Real-time monitoring and alert systems'],
    service: 'Custom AI Agents', inquiry: 'Product/Service Inquiry',
  },
  'Sales Automation': {
    description: 'Supercharge your sales pipeline with AI agents that qualify leads, personalize outreach, follow up automatically, and provide your sales team with actionable intelligence to close deals faster.',
    points: ['Automated lead scoring and qualification', 'Personalized outreach at scale', 'CRM integration and pipeline management', 'Predictive analytics for deal closure'],
    service: 'Custom AI Agents', inquiry: 'Product/Service Inquiry',
  },
  'Operations Automation': {
    description: 'Streamline your entire operations with intelligent workflows that automate repetitive tasks, coordinate between departments, and optimize resource allocation in real time.',
    points: ['End-to-end process automation', 'Real-time resource optimization', 'Cross-department workflow coordination', 'Performance monitoring and reporting'],
    service: 'Workflow Automation', inquiry: 'Product/Service Inquiry',
  },
  'Document Processing': {
    description: 'Transform how your business handles documents with AI that reads, understands, extracts, and acts on information from any document type — invoices, contracts, forms, and more.',
    points: ['Intelligent OCR and data extraction', 'Contract analysis and risk flagging', 'Automated invoice and form processing', 'Compliance checking and audit trails'],
    service: 'Workflow Automation', inquiry: 'Product/Service Inquiry',
  },
  'Decision Support': {
    description: 'Empower your leadership with AI-driven decision support systems that analyze complex data, model scenarios, and provide clear recommendations backed by real-time intelligence.',
    points: ['Real-time data analysis and visualization', 'Scenario modeling and risk assessment', 'Predictive forecasting and trend analysis', 'Executive dashboards and automated reports'],
    service: 'AI Consultation', inquiry: 'Product/Service Inquiry',
  },
  'System Integration': {
    description: 'Seamlessly connect your existing tools, platforms, and databases with AI capabilities. We architect robust integrations that make your entire tech stack smarter and more efficient.',
    points: ['API design and integration architecture', 'Legacy system modernization with AI', 'Cloud and on-premise hybrid solutions', 'Secure data pipelines and synchronization'],
    service: 'AI Deployment & Integration', inquiry: 'Product/Service Inquiry',
  },
  'ROI Optimization': {
    description: 'Maximize the return on your AI investments with our expert optimization services. We audit your current AI usage, identify gaps, and implement strategies that directly impact your bottom line.',
    points: ['AI investment audit and gap analysis', 'Cost reduction through intelligent automation', 'Performance benchmarking and KPI tracking', 'Continuous improvement frameworks'],
    service: 'AI Consultation', inquiry: 'Product/Service Inquiry',
  },
  'AI Strategy': {
    description: 'Build a future-proof AI roadmap with our strategic consultation. We help you identify the highest-impact AI opportunities, prioritize initiatives, and create a clear path to AI-driven growth.',
    points: ['AI readiness assessment and gap analysis', 'Prioritized AI implementation roadmap', 'Technology selection and vendor evaluation', 'Change management and team enablement'],
    service: 'AI Consultation', inquiry: 'Product/Service Inquiry',
  },
  'AI Content Generation': {
    description: 'Automate your content pipeline with generative AI that produces high-quality blogs, social posts, product descriptions, emails, and marketing copy tailored to your brand voice.',
    points: ['Brand-voice-trained content models', 'Multi-format content generation', 'SEO-optimized article writing', 'Automated content scheduling and publishing'],
    service: 'AI Content Generation', inquiry: 'Product/Service Inquiry',
  },
  'AI Code Assistant': {
    description: 'Boost developer productivity with AI-powered code assistants that write, review, debug, and document code — integrated directly into your development workflow.',
    points: ['Automated code generation and completion', 'Intelligent bug detection and fixing', 'Code documentation generation', 'Custom model trained on your codebase'],
    service: 'Custom AI Agents', inquiry: 'Product/Service Inquiry',
  },
  'Multimodal AI Apps': {
    description: 'Build applications that understand and generate text, images, audio, and video simultaneously — creating rich, intelligent experiences that go beyond single-modality AI.',
    points: ['Text + image understanding and generation', 'Voice and audio AI integration', 'Video analysis and generation', 'Cross-modal reasoning systems'],
    service: 'Custom AI Agents', inquiry: 'Product/Service Inquiry',
  },
  'Business Website': {
    description: 'Get a professional, high-converting business website built with modern technologies. We handle everything from design to deployment, ensuring your online presence stands out.',
    points: ['Custom design aligned with your brand', 'Fast, SEO-optimized architecture', 'Mobile-first responsive layout', 'Analytics and conversion tracking setup'],
    service: 'Website Development', inquiry: 'Product/Service Inquiry',
  },
  'Landing Page & Funnels': {
    description: 'Convert visitors into customers with high-performance landing pages and sales funnels designed for maximum conversion, built with A/B testing and analytics in mind.',
    points: ['Conversion-optimized design', 'A/B testing ready structure', 'CRM and email integration', 'Performance analytics dashboard'],
    service: 'Website Development', inquiry: 'Product/Service Inquiry',
  },
  'Custom Web Applications': {
    description: 'Build powerful, scalable web applications tailored to your business logic. From internal tools to customer-facing platforms, we engineer robust solutions that grow with you.',
    points: ['Full-stack React/Next.js development', 'Scalable backend architecture', 'Third-party API integrations', 'Role-based access and authentication'],
    service: 'Custom Web Applications', inquiry: 'Product/Service Inquiry',
  },
  'AI Chatbot Development': {
    description: 'Deploy intelligent chatbots on your website, app, or messaging platforms that understand natural language, answer questions, qualify leads, and provide 24/7 support.',
    points: ['Natural language understanding', 'Multi-platform deployment', 'CRM and helpdesk integration', 'Continuous learning from conversations'],
    service: 'AI Chatbot Development', inquiry: 'Product/Service Inquiry',
  },
  'AI SEO Boost': {
    description: 'Leverage AI to dominate search rankings. We use AI-powered tools to optimize your content, identify keyword opportunities, build backlinks, and monitor your SEO performance.',
    points: ['AI keyword research and clustering', 'Automated content optimization', 'Technical SEO auditing', 'Competitor gap analysis'],
    service: 'AI SEO Boost', inquiry: 'Product/Service Inquiry',
  },
  'AI Deployment & Integration': {
    description: 'Take your AI models from development to production with our end-to-end deployment and integration services. We ensure your AI runs reliably, securely, and at scale.',
    points: ['Cloud deployment on AWS/GCP/Azure', 'API development for AI models', 'Monitoring and performance tracking', 'Security and compliance setup'],
    service: 'AI Deployment & Integration', inquiry: 'Product/Service Inquiry',
  },
  'SaaS Product Development': {
    description: 'Build your SaaS product from scratch with our full-stack development team. We handle architecture, design, development, and launch — so you can focus on your business.',
    points: ['Multi-tenant SaaS architecture', 'Subscription and billing integration', 'Admin dashboard and analytics', 'Scalable cloud infrastructure'],
    service: 'Other', inquiry: 'Product/Service Inquiry',
  },
  'AI-Native Applications': {
    description: 'Build applications with AI at their core — not as an add-on, but as the foundation. We design and develop AI-native products that deliver intelligent experiences from day one.',
    points: ['AI-first product architecture', 'Real-time inference integration', 'Personalization and recommendation engines', 'Continuous model improvement pipelines'],
    service: 'Custom AI Agents', inquiry: 'Product/Service Inquiry',
  },
};

const Services = () => {
  const navigate = useNavigate();
  const [activeUseCase, setActiveUseCase] = useState<string | null>(null);

  const handleGetStarted = (service: string, inquiry: string) => {
    navigate(`/contact?service=${encodeURIComponent(service)}&inquiry=${encodeURIComponent(inquiry)}`);
  };

  return (
    <Layout>
      {/* Use Case Modal */}
      <AnimatePresence>
        {activeUseCase && useCaseDetails[activeUseCase] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
            onClick={() => setActiveUseCase(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="p-8 bg-card border-border/50 relative">
                <button onClick={() => setActiveUseCase(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="mb-6">
                  <span className="text-xs text-accent uppercase tracking-wider font-semibold">{useCaseDetails[activeUseCase].service}</span>
                  <h3 className="text-2xl font-display font-bold mt-2 mb-3">{activeUseCase}</h3>
                  <p className="text-muted-foreground leading-relaxed">{useCaseDetails[activeUseCase].description}</p>
                </div>
                <ul className="space-y-2 mb-8">
                  {useCaseDetails[activeUseCase].points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 border-border hover:bg-card" onClick={() => setActiveUseCase(null)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                  </Button>
                  <Button
                    className="flex-1 bg-foreground text-background hover:bg-foreground/90"
                    onClick={() => handleGetStarted(useCaseDetails[activeUseCase].service, useCaseDetails[activeUseCase].inquiry)}
                  >
                    Start This Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <FloatingShapes variant="hero" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-8">
              <SparkleIcon size={16} className="text-accent" />
              <span className="text-sm text-muted-foreground">Our Services</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              AI & Web
              <span className="text-gradient-gold"> Solutions</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From intelligent AI agents to full product development — we build solutions that think, adapt, and deliver real business value.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      {mainServices.map((service, index) => (
        <section key={service.id} id={service.id} className={`py-24 ${index % 2 === 1 ? 'bg-card/30' : ''}`}>
          <div className="container mx-auto px-6">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <AnimatedSection className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">{service.subtitle}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{service.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">{service.description}</p>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="bg-foreground text-background hover:bg-foreground/90"
                  onClick={() => handleGetStarted(service.title, 'Product/Service Inquiry')}>
                  Get Started
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative">
                  <Card className="p-8 bg-card/50 border-border/50">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Use Cases</h4>
                    <div className="space-y-4">
                      {service.useCases.map((useCase) => (
                        <motion.div key={useCase.label} whileHover={{ x: 8 }}
                          onClick={() => setActiveUseCase(useCase.label)}
                          className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <useCase.icon className="w-5 h-5 text-accent" />
                          </div>
                          <span className="font-medium">{useCase.label}</span>
                          <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
                        </motion.div>
                      ))}
                    </div>
                  </Card>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our <span className="text-gradient-gold">Process</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A proven methodology for delivering AI solutions that work.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.step} delay={index * 0.1}>
                <div className="relative">
                  <div className="text-6xl font-display font-bold text-foreground/20 mb-4">{step.step}</div>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">Let's discuss how our AI solutions can transform your business.</p>
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 px-10 h-14"
              onClick={() => handleGetStarted('AI Consultation', 'Product/Service Inquiry')}>
              Book a Consultation
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
