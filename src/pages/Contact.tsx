import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Instagram, X, CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { FloatingShapes } from '@/components/shared/FloatingShapes';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { SparkleIcon } from '@/components/shared/SparkleIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@blackai.in',
    href: 'mailto:info@blackai.in',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9975473730',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Nagpur, Maharashtra, India',
    href: null,
  },
];

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/blackaii/' },
  { 
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    label: 'X', 
    href: 'https://x.com/blackai_in' 
  },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/blackai_in?igsh=MXUzY3oxa3Bmb2Z5cQ==' },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    inquiryType: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Web3Forms API to send email
      const formPayload = {
        access_key: '0a0db9a2-ed31-4c8a-9ad8-d95a1a86c32a',
        subject: 'BlackAI - New Contact Form Submission',
        name: formData.name,
        email: formData.email,
        message: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}
Service Interested: ${formData.service || 'Not specified'}
Inquiry Type: ${formData.inquiryType || 'Not specified'}

Message:
${formData.message}
        `,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formPayload),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: 'Message sent!',
          description: "We'll get back to you as soon as possible.",
        });

        // Reset form after a delay
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', company: '', service: '', inquiryType: '', message: '' });
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again or email us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <span className="text-sm text-muted-foreground">Get in Touch</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
            >
              Let's Build
              <span className="text-gradient-gold"> Together</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Have a project in mind? Want to learn more about our AI solutions? 
              We'd love to hear from you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <AnimatedSection>
              <Card className="p-8 bg-card/50 border-border/50">
                <h2 className="text-2xl font-display font-bold mb-6">Send a Message</h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll be in touch soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Your name"
                          className="bg-background/50 border-border/50 focus:border-accent"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your@email.com"
                          className="bg-background/50 border-border/50 focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="bg-background/50 border-border/50 focus:border-accent"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                          Company <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company"
                          className="bg-background/50 border-border/50 focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium mb-2">
                          Service Interested <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange as any}
                          className="w-full h-10 px-3 rounded-md bg-background/50 border border-border/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-sm"
                        >
                          <option value="">Select a service</option>
                          <option value="Custom AI Agents">Custom AI Agents</option>
                          <option value="Workflow Automation">Workflow Automation</option>
                          <option value="AI Consultation">AI Consultation</option>
                          <option value="Website Development">Website Development</option>
                          <option value="AI Deployment & Integration">AI Deployment & Integration</option>
                          <option value="AI Website Integration">AI Website Integration</option>
                          <option value="AI SEO Boost">AI SEO Boost</option>
                          <option value="AI Chatbot Development">AI Chatbot Development</option>
                          <option value="AI Content Generation">AI Content Generation</option>
                          <option value="Custom Web Applications">Custom Web Applications</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">
                          Inquiry Type <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange as any}
                          className="w-full h-10 px-3 rounded-md bg-background/50 border border-border/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-sm"
                        >
                          <option value="">Select inquiry type</option>
                          <option value="Product/Service Inquiry">Product/Service Inquiry</option>
                          <option value="Collaboration Opportunity">Collaboration Opportunity</option>
                          <option value="Join Our Team">Join Our Team</option>
                          <option value="Partnership">Partnership</option>
                          <option value="General Inquiry">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell us about your project..."
                        rows={5}
                        className="bg-background/50 border-border/50 focus:border-accent resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-foreground text-background hover:bg-foreground/90 h-12"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                        />
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-display font-bold mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Reach out through any of these channels and we'll get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a 
                            href={item.href} 
                            className="font-medium hover:text-accent transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-8 border-t border-border/50">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
                      >
                        {typeof social.icon === 'function' ? <social.icon /> : <social.icon size={20} />}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Location Display */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-card to-secondary/30 border border-border/50 p-12">
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center"
                    >
                      <MapPin className="w-12 h-12 text-accent" />
                    </motion.div>
                    <h3 className="text-xl font-display font-semibold mb-2">Our Location</h3>
                    <p className="text-muted-foreground text-lg">Nagpur, Maharashtra</p>
                    <p className="text-muted-foreground">India</p>
                  </div>
                  {/* Decorative circles */}
                  <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-accent/5 blur-2xl" />
                  <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-purple-glow/5 blur-2xl" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
