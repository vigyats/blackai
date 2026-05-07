import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Linkedin, Instagram, X, CheckCircle, ChevronDown, Search } from 'lucide-react';
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

const serviceOptions = [
  'Custom AI Agents',
  'AI Workflow Automation',
  'AI Consultation & Integration',
  'Generative AI Solutions',
  'Website Development',
  'AI Website Integration',
  'Product Building',
  'AI Deployment & Integration',
  'AI SEO Boost',
  'AI Chatbot Development',
  'AI Content Generation',
  'Custom Web Applications',
  'Other',
];

const inquiryOptions = [
  'Product/Service Inquiry',
  'Collaboration Opportunity',
  'Join Our Team',
  'Partnership',
  'General Inquiry',
];

interface SearchableDropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

const SearchableDropdown = ({ label, placeholder, options, value, onChange }: SearchableDropdownProps) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setQuery('');
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-medium mb-2">
        {label} <span className="text-muted-foreground">(optional)</span>
      </label>
      <div
        className={`flex items-center h-10 px-3 rounded-md bg-background/50 border ${
          open ? 'border-accent ring-1 ring-accent' : 'border-border/50'
        } cursor-pointer transition-all`}
        onClick={() => setOpen(o => !o)}
      >
        {open ? (
          <div className="flex items-center gap-2 w-full" onClick={e => e.stopPropagation()}>
            <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Type to search..."
              className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
            />
          </div>
        ) : (
          <span className={`text-sm flex-1 truncate ${value ? 'text-foreground' : 'text-muted-foreground'}`}>
            {value || placeholder}
          </span>
        )}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground ml-2 flex-shrink-0" />
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 bg-card border border-border/50 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="max-h-52 overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map(option => (
                  <div
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center gap-2 ${
                      value === option
                        ? 'bg-accent/15 text-accent font-medium'
                        : 'text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    {value === option && <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />}
                    {option}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground">No results found</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    company: '',
    service: '',
    inquiryType: '',
    message: '',
  });

  const countryCodes = [
    { code: '+91', label: '🇮🇳 +91' },
    { code: '+1', label: '🇺🇸 +1' },
    { code: '+44', label: '🇬🇧 +44' },
    { code: '+61', label: '🇦🇺 +61' },
    { code: '+971', label: '🇦🇪 +971' },
    { code: '+65', label: '🇸🇬 +65' },
    { code: '+49', label: '🇩🇪 +49' },
    { code: '+33', label: '🇫🇷 +33' },
    { code: '+81', label: '🇯🇵 +81' },
    { code: '+86', label: '🇨🇳 +86' },
    { code: '+7', label: '🇷🇺 +7' },
    { code: '+55', label: '🇧🇷 +55' },
    { code: '+27', label: '🇿🇦 +27' },
    { code: '+92', label: '🇵🇰 +92' },
    { code: '+880', label: '🇧🇩 +880' },
    { code: '+94', label: '🇱🇰 +94' },
    { code: '+977', label: '🇳🇵 +977' },
    { code: '+60', label: '🇲🇾 +60' },
    { code: '+62', label: '🇮🇩 +62' },
    { code: '+63', label: '🇵🇭 +63' },
    { code: '+66', label: '🇹🇭 +66' },
    { code: '+82', label: '🇰🇷 +82' },
    { code: '+39', label: '🇮🇹 +39' },
    { code: '+34', label: '🇪🇸 +34' },
    { code: '+31', label: '🇳🇱 +31' },
    { code: '+46', label: '🇸🇪 +46' },
    { code: '+41', label: '🇨🇭 +41' },
    { code: '+48', label: '🇵🇱 +48' },
    { code: '+90', label: '🇹🇷 +90' },
    { code: '+20', label: '🇪🇬 +20' },
    { code: '+966', label: '🇸🇦 +966' },
    { code: '+52', label: '🇲🇽 +52' },
    { code: '+54', label: '🇦🇷 +54' },
  ];

  useEffect(() => {
    const service = searchParams.get('service');
    const inquiry = searchParams.get('inquiry');
    if (service || inquiry) {
      setFormData(prev => ({
        ...prev,
        service: service || prev.service,
        inquiryType: inquiry || prev.inquiryType,
      }));
      // Scroll to form
      setTimeout(() => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
Phone: ${formData.phone ? formData.countryCode + ' ' + formData.phone : 'Not provided'}
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
          setFormData({ name: '', email: '', phone: '', countryCode: '+91', company: '', service: '', inquiryType: '', message: '' });
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
              <Card id="contact-form" className="p-8 bg-card/50 border-border/50">
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

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone <span className="text-muted-foreground">(optional)</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange as any}
                          className="w-28 h-10 px-2 rounded-md bg-background/50 border border-border/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-sm flex-shrink-0"
                        >
                          {countryCodes.map(c => (
                            <option key={c.code} value={c.code}>{c.label}</option>
                          ))}
                        </select>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="XXXXX XXXXX"
                          className="bg-background/50 border-border/50 focus:border-accent flex-1"
                        />
                      </div>
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

                    <div className="grid sm:grid-cols-2 gap-4">
                      <SearchableDropdown
                        label="Service Interested"
                        placeholder="Select a service"
                        options={serviceOptions}
                        value={formData.service}
                        onChange={(val) => setFormData(prev => ({ ...prev, service: val }))}
                      />
                      <SearchableDropdown
                        label="Inquiry Type"
                        placeholder="Select inquiry type"
                        options={inquiryOptions}
                        value={formData.inquiryType}
                        onChange={(val) => setFormData(prev => ({ ...prev, inquiryType: val }))}
                      />
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

                    {/* Terms Agreement */}
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/20 border border-border/30">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-yellow-400 cursor-pointer flex-shrink-0"
                      />
                      <label htmlFor="agreeTerms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                        I have read and agree to the{' '}
                        <Link to="/terms-of-service" target="_blank" className="font-bold text-foreground hover:text-accent underline underline-offset-2 transition-colors">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy-policy" target="_blank" className="font-bold text-foreground hover:text-accent underline underline-offset-2 transition-colors">Privacy Policy</Link>
                        {' '}of BlackAI.
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !agreedToTerms}
                      className="w-full bg-foreground text-background hover:bg-foreground/90 h-12 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
