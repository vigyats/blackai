import { useState } from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Search, Shield, Lock, Eye, Database, UserCheck, FileText, AlertCircle, Mail, ChevronDown } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const sections = [
  {
    id: 'information-collection',
    icon: Database,
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Personal Information',
        text: 'We collect information you provide directly to us, including name, email address, phone number, company name, job title, and any other information you choose to provide when you contact us, request services, or create an account.'
      },
      {
        subtitle: 'Usage Information',
        text: 'We automatically collect certain information about your device and how you interact with our services, including IP address, browser type, operating system, referring URLs, pages viewed, and access times.'
      },
      {
        subtitle: 'Cookies and Tracking',
        text: 'We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities and preferences. You can control cookies through your browser settings.'
      }
    ]
  },
  {
    id: 'information-use',
    icon: Eye,
    title: 'How We Use Your Information',
    content: [
      {
        subtitle: 'Service Delivery',
        text: 'We use your information to provide, maintain, and improve our AI solutions and services, process transactions, send service-related communications, and respond to your inquiries.'
      },
      {
        subtitle: 'Personalization',
        text: 'We analyze usage patterns to personalize your experience, recommend relevant services, and develop new features that better serve your needs.'
      },
      {
        subtitle: 'Marketing Communications',
        text: 'With your consent, we may send you promotional materials, newsletters, and updates about our services. You can opt-out at any time using the unsubscribe link in our emails.'
      },
      {
        subtitle: 'Legal Compliance',
        text: 'We may use your information to comply with legal obligations, enforce our terms, protect our rights and property, and ensure the security of our services.'
      }
    ]
  },
  {
    id: 'information-sharing',
    icon: UserCheck,
    title: 'Information Sharing and Disclosure',
    content: [
      {
        subtitle: 'Service Providers',
        text: 'We may share your information with third-party service providers who perform services on our behalf, such as hosting, analytics, payment processing, and customer support. These providers are contractually obligated to protect your information.'
      },
      {
        subtitle: 'Business Transfers',
        text: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of any such change in ownership or control.'
      },
      {
        subtitle: 'Legal Requirements',
        text: 'We may disclose your information if required by law, court order, or governmental request, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.'
      },
      {
        subtitle: 'With Your Consent',
        text: 'We may share your information with third parties when you explicitly consent to such sharing.'
      }
    ]
  },
  {
    id: 'data-security',
    icon: Lock,
    title: 'Data Security',
    content: [
      {
        subtitle: 'Security Measures',
        text: 'We implement industry-standard security measures including encryption, firewalls, secure socket layer (SSL) technology, and access controls to protect your information from unauthorized access, alteration, disclosure, or destruction.'
      },
      {
        subtitle: 'Data Retention',
        text: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.'
      },
      {
        subtitle: 'Breach Notification',
        text: 'In the event of a data breach that affects your personal information, we will notify you and relevant authorities as required by applicable law.'
      }
    ]
  },
  {
    id: 'your-rights',
    icon: Shield,
    title: 'Your Rights and Choices',
    content: [
      {
        subtitle: 'Access and Correction',
        text: 'You have the right to access, update, or correct your personal information. You can do this by logging into your account or contacting us directly.'
      },
      {
        subtitle: 'Data Portability',
        text: 'You have the right to request a copy of your personal information in a structured, commonly used, and machine-readable format.'
      },
      {
        subtitle: 'Deletion',
        text: 'You may request deletion of your personal information, subject to certain exceptions such as legal obligations or legitimate business purposes.'
      },
      {
        subtitle: 'Opt-Out',
        text: 'You can opt-out of marketing communications, cookies, and certain data collection practices. Note that opting out may affect your ability to use certain features.'
      },
      {
        subtitle: 'Do Not Track',
        text: 'We currently do not respond to "Do Not Track" signals from browsers, but you can control tracking through your browser and device settings.'
      }
    ]
  },
  {
    id: 'international-transfers',
    icon: FileText,
    title: 'International Data Transfers',
    content: [
      {
        subtitle: 'Cross-Border Transfers',
        text: 'Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this policy.'
      },
      {
        subtitle: 'Data Protection Standards',
        text: 'We comply with applicable data protection laws and frameworks, including GDPR for European users and other regional privacy regulations.'
      }
    ]
  },
  {
    id: 'children-privacy',
    icon: AlertCircle,
    title: "Children's Privacy",
    content: [
      {
        subtitle: 'Age Restrictions',
        text: 'Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete it promptly.'
      }
    ]
  },
  {
    id: 'changes-policy',
    icon: Mail,
    title: 'Changes to This Policy',
    content: [
      {
        subtitle: 'Policy Updates',
        text: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by posting the updated policy on our website and updating the "Last Updated" date.'
      },
      {
        subtitle: 'Continued Use',
        text: 'Your continued use of our services after any changes to this policy constitutes your acceptance of the updated terms.'
      }
    ]
  }
];

const PrivacyPolicy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const expandAll = () => {
    setExpandedSections(sections.map(s => s.id));
  };

  const collapseAll = () => {
    setExpandedSections([]);
  };

  const filteredSections = sections.filter(section => {
    const searchLower = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(searchLower) ||
      section.content.some(item =>
        item.subtitle.toLowerCase().includes(searchLower) ||
        item.text.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-border/30">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-8"
            >
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Legal</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6"
            >
              Privacy <span className="text-gradient-gold">Policy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-muted-foreground mb-8"
            >
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative max-w-xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search privacy policy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card/50 border-border/50"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              At BlackAI, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              AI solutions, services, and website. Please read this policy carefully to understand our practices regarding 
              your personal data.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Expand/Collapse All Button */}
            <div className="flex justify-end mb-6">
              {expandedSections.length === filteredSections.length && filteredSections.length > 0 ? (
                <button
                  onClick={collapseAll}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border/50 rounded-lg hover:border-border transition-all"
                >
                  Collapse All
                </button>
              ) : (
                <button
                  onClick={expandAll}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border/50 rounded-lg hover:border-border transition-all"
                >
                  Expand All
                </button>
              )}
            </div>

            <div className="space-y-8">
            {filteredSections.length > 0 ? (
              filteredSections.map((section, index) => {
                const isExpanded = expandedSections.includes(section.id);
                return (
                  <AnimatedSection key={section.id} delay={index * 0.1}>
                    <Card 
                      className="bg-card/50 border-border/50 hover:border-border transition-all cursor-pointer"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="p-8">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <section.icon className="w-6 h-6 text-accent" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl font-display font-bold mb-2">{section.title}</h2>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="text-muted-foreground"
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </div>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6 ml-16 mt-6"
                          >
                            {section.content.map((item, idx) => (
                              <div key={idx}>
                                <h3 className="text-lg font-semibold mb-2 text-foreground">{item.subtitle}</h3>
                                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </AnimatedSection>
                );
              })
            ) : (
              <Card className="p-12 text-center bg-card/50 border-border/50">
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              </Card>
            )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-card/30 border-t border-border/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Questions About Our Privacy Policy?
            </h2>
            <p className="text-muted-foreground mb-8">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              please contact us at:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong className="text-foreground">Email:</strong> privacy@blackai.in</p>
              <p><strong className="text-foreground">Address:</strong> BlackAI, Nagpur, Maharashtra, India</p>
              <p><strong className="text-foreground">Phone:</strong> +91 9975473730</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
