import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Linkedin, Instagram, X } from 'lucide-react';

const footerLinks = {
  navigation: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  services: [
    { name: 'Custom AI Agents', path: '/services#agents' },
    { name: 'Workflow Automation', path: '/services#automation' },
    { name: 'AI Consultation', path: '/services#consultation' },
  ],
  social: [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/blackaii/' },
    { name: 'X', icon: X, href: 'https://x.com/blackai_in' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/blackai_in?igsh=MXUzY3oxa3Bmb2Z5cQ==' },
  ],
};

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 bg-background">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-display font-bold text-foreground">
                Black<span className="text-gradient-gold">AI</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Pioneering the future of intelligent automation through agentic AI solutions.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>info@blackai.in</li>
              <li>+91 9975473730</li>
              <li>Nagpur, Maharashtra, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} BlackAI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
