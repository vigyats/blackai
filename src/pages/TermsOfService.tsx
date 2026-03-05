import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Scale, AlertTriangle, CreditCard, Ban, CheckCircle, Users, Shield, Gavel } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const sections = [
  {
    id: 'acceptance',
    icon: CheckCircle,
    title: 'Acceptance of Terms',
    content: [
      {
        subtitle: 'Agreement to Terms',
        text: 'By accessing or using BlackAI\'s services, website, or AI solutions, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.'
      },
      {
        subtitle: 'Eligibility',
        text: 'You must be at least 18 years old and have the legal capacity to enter into binding contracts to use our services. By using our services, you represent and warrant that you meet these requirements.'
      },
      {
        subtitle: 'Business Use',
        text: 'Our services are intended for business and professional use. You agree to use our services only for lawful business purposes and in accordance with these terms.'
      }
    ]
  },
  {
    id: 'services',
    icon: FileText,
    title: 'Description of Services',
    content: [
      {
        subtitle: 'AI Solutions',
        text: 'BlackAI provides custom AI agents, workflow automation, AI consultation, and related artificial intelligence solutions. Our services are designed to help businesses automate processes, improve efficiency, and leverage AI technology.'
      },
      {
        subtitle: 'Service Modifications',
        text: 'We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of services.'
      },
      {
        subtitle: 'Service Availability',
        text: 'While we strive to provide uninterrupted service, we do not guarantee that our services will be available at all times. Services may be subject to maintenance, updates, or unforeseen technical issues.'
      }
    ]
  },
  {
    id: 'user-obligations',
    icon: Users,
    title: 'User Obligations and Conduct',
    content: [
      {
        subtitle: 'Acceptable Use',
        text: 'You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of our services. You must not use our services for any illegal, harmful, or fraudulent activities.'
      },
      {
        subtitle: 'Prohibited Activities',
        text: 'You may not: (a) attempt to gain unauthorized access to our systems; (b) interfere with or disrupt our services; (c) use our services to transmit malware or harmful code; (d) violate any applicable laws or regulations; (e) infringe on intellectual property rights; (f) engage in data scraping or automated data collection without permission.'
      },
      {
        subtitle: 'Account Security',
        text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.'
      },
      {
        subtitle: 'Accurate Information',
        text: 'You agree to provide accurate, current, and complete information when using our services and to update such information as necessary to maintain its accuracy.'
      }
    ]
  },
  {
    id: 'payment-terms',
    icon: CreditCard,
    title: 'Payment Terms and Pricing',
    content: [
      {
        subtitle: 'Service Fees',
        text: 'Fees for our services are specified in your service agreement or quote. All fees are in Indian Rupees (INR) unless otherwise stated. Prices are subject to change with 30 days\' notice for existing customers.'
      },
      {
        subtitle: 'Payment Methods',
        text: 'We accept payment via bank transfer, credit card, debit card, UPI, and other payment methods as specified. Payment terms are typically net 30 days from invoice date unless otherwise agreed in writing.'
      },
      {
        subtitle: 'Advance Payments',
        text: 'For custom AI development projects, we require advance payment as specified in the project agreement. Advance payments are typically structured as: 40% upon project initiation, 30% upon prototype delivery, and 30% upon final delivery.'
      },
      {
        subtitle: 'Late Payments',
        text: 'Late payments may be subject to interest charges of 1.5% per month (18% per annum) or the maximum rate permitted by law, whichever is lower. We reserve the right to suspend services for accounts with overdue payments.'
      },
      {
        subtitle: 'Taxes',
        text: 'All fees are exclusive of applicable taxes, including GST, which will be added to invoices as required by law. You are responsible for paying all applicable taxes associated with your use of our services.'
      }
    ]
  },
  {
    id: 'refund-policy',
    icon: Ban,
    title: 'Refund and Cancellation Policy',
    content: [
      {
        subtitle: 'No Refund After Prototype Delivery',
        text: 'IMPORTANT: Advance payments are NON-REFUNDABLE after the delivery of a prototype that satisfies all conditions and requirements specified in the project agreement. By making an advance payment, you acknowledge and agree to this policy.'
      },
      {
        subtitle: 'Prototype Acceptance Criteria',
        text: 'A prototype is considered satisfactory when it meets all functional requirements, technical specifications, and acceptance criteria documented in the project scope and agreement. You will have a specified review period (typically 7-14 business days) to evaluate the prototype.'
      },
      {
        subtitle: 'Pre-Prototype Cancellation',
        text: 'If you cancel the project before prototype delivery, refunds will be calculated based on work completed: (a) 0-25% completion: 70% refund of advance payment; (b) 26-50% completion: 50% refund; (c) 51-75% completion: 30% refund; (d) 76%+ completion: No refund.'
      },
      {
        subtitle: 'Service Subscription Refunds',
        text: 'For monthly or annual service subscriptions, you may cancel at any time. Refunds for unused subscription periods will be prorated on a monthly basis, minus a 10% administrative fee. No refunds are provided for partial months.'
      },
      {
        subtitle: 'Consultation Services',
        text: 'Consultation and advisory services are non-refundable once delivered. If you are unsatisfied with a consultation session, please contact us within 48 hours to discuss resolution options.'
      },
      {
        subtitle: 'Refund Processing',
        text: 'Approved refunds will be processed within 14-21 business days and credited to the original payment method. Bank processing times may vary.'
      }
    ]
  },
  {
    id: 'intellectual-property',
    icon: Shield,
    title: 'Intellectual Property Rights',
    content: [
      {
        subtitle: 'Our IP Rights',
        text: 'All intellectual property rights in our services, including software, algorithms, designs, trademarks, and content, are owned by BlackAI or our licensors. These terms do not grant you any rights to our intellectual property except as expressly stated.'
      },
      {
        subtitle: 'Custom Development',
        text: 'For custom AI solutions, intellectual property ownership will be specified in your project agreement. Typically, you receive a license to use the delivered solution, while we retain rights to underlying frameworks, tools, and methodologies.'
      },
      {
        subtitle: 'Client Data',
        text: 'You retain all rights to your data and content. By using our services, you grant us a limited license to use your data solely for providing services to you, improving our AI models (with your consent), and as described in our Privacy Policy.'
      },
      {
        subtitle: 'Feedback and Suggestions',
        text: 'Any feedback, suggestions, or ideas you provide about our services become our property, and we may use them without obligation or compensation to you.'
      }
    ]
  },
  {
    id: 'warranties',
    icon: AlertTriangle,
    title: 'Warranties and Disclaimers',
    content: [
      {
        subtitle: 'Service Warranty',
        text: 'We warrant that our services will be performed in a professional and workmanlike manner consistent with industry standards. For custom development, we provide a warranty period (typically 90 days) for bug fixes and corrections.'
      },
      {
        subtitle: 'AI Limitations',
        text: 'You acknowledge that AI systems have inherent limitations and may produce unexpected results. We do not warrant that AI outputs will be error-free, accurate, or suitable for your specific purposes. You are responsible for reviewing and validating AI outputs before use.'
      },
      {
        subtitle: 'Disclaimer of Warranties',
        text: 'EXCEPT AS EXPRESSLY PROVIDED, OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.'
      },
      {
        subtitle: 'No Guarantee of Results',
        text: 'We do not guarantee specific results, outcomes, or performance improvements from using our services. Results may vary based on your specific use case, data quality, and implementation.'
      }
    ]
  },
  {
    id: 'liability',
    icon: Scale,
    title: 'Limitation of Liability',
    content: [
      {
        subtitle: 'Liability Cap',
        text: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR ₹100,000, WHICHEVER IS GREATER.'
      },
      {
        subtitle: 'Excluded Damages',
        text: 'WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST REVENUE, LOST DATA, OR BUSINESS INTERRUPTION, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.'
      },
      {
        subtitle: 'Force Majeure',
        text: 'We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, labor disputes, government actions, or internet/telecommunications failures.'
      },
      {
        subtitle: 'Indemnification',
        text: 'You agree to indemnify and hold harmless BlackAI, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services, violation of these terms, or infringement of any third-party rights.'
      }
    ]
  },
  {
    id: 'confidentiality',
    icon: Shield,
    title: 'Confidentiality',
    content: [
      {
        subtitle: 'Confidential Information',
        text: 'Both parties may have access to confidential information during the course of our relationship. Confidential information includes business plans, technical data, customer information, and any information marked as confidential.'
      },
      {
        subtitle: 'Protection Obligations',
        text: 'Each party agrees to: (a) maintain confidential information in strict confidence; (b) use confidential information only for the purposes of the agreement; (c) not disclose confidential information to third parties without consent; (d) protect confidential information with the same care used for its own confidential information.'
      },
      {
        subtitle: 'Exceptions',
        text: 'Confidentiality obligations do not apply to information that: (a) is publicly available; (b) was known prior to disclosure; (c) is independently developed; (d) is required to be disclosed by law.'
      }
    ]
  },
  {
    id: 'termination',
    icon: Ban,
    title: 'Termination',
    content: [
      {
        subtitle: 'Termination by You',
        text: 'You may terminate your use of our services at any time by providing written notice. Termination does not relieve you of payment obligations for services already provided or committed resources.'
      },
      {
        subtitle: 'Termination by Us',
        text: 'We may terminate or suspend your access to our services immediately, without notice, for: (a) violation of these terms; (b) non-payment; (c) fraudulent or illegal activities; (d) conduct that harms our business or reputation.'
      },
      {
        subtitle: 'Effect of Termination',
        text: 'Upon termination: (a) your right to use our services ceases immediately; (b) you must pay all outstanding fees; (c) we may delete your data after a reasonable retention period; (d) provisions that by their nature should survive will continue to apply.'
      }
    ]
  },
  {
    id: 'dispute-resolution',
    icon: Gavel,
    title: 'Dispute Resolution',
    content: [
      {
        subtitle: 'Governing Law',
        text: 'These terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.'
      },
      {
        subtitle: 'Jurisdiction',
        text: 'Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts in Nagpur, Maharashtra, India.'
      },
      {
        subtitle: 'Arbitration',
        text: 'For disputes exceeding ₹500,000, parties agree to first attempt resolution through binding arbitration under the Indian Arbitration and Conciliation Act, 1996, before pursuing litigation.'
      },
      {
        subtitle: 'Informal Resolution',
        text: 'Before initiating formal proceedings, parties agree to attempt good-faith informal resolution by providing written notice of the dispute and engaging in negotiations for at least 30 days.'
      }
    ]
  },
  {
    id: 'general',
    icon: FileText,
    title: 'General Provisions',
    content: [
      {
        subtitle: 'Entire Agreement',
        text: 'These terms, together with any service agreements and our Privacy Policy, constitute the entire agreement between you and BlackAI regarding our services and supersede all prior agreements.'
      },
      {
        subtitle: 'Amendments',
        text: 'We may modify these terms at any time by posting updated terms on our website. Material changes will be notified via email. Your continued use of services after changes constitutes acceptance of the modified terms.'
      },
      {
        subtitle: 'Severability',
        text: 'If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.'
      },
      {
        subtitle: 'Waiver',
        text: 'Our failure to enforce any right or provision of these terms shall not constitute a waiver of such right or provision.'
      },
      {
        subtitle: 'Assignment',
        text: 'You may not assign or transfer these terms or your rights hereunder without our prior written consent. We may assign these terms without restriction.'
      },
      {
        subtitle: 'Notices',
        text: 'All notices under these terms must be in writing and sent to the addresses specified in your service agreement or to legal@blackai.in for BlackAI.'
      }
    ]
  }
];

const TermsOfService = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.some(item =>
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
              <Scale className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Legal</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6"
            >
              Terms of <span className="text-gradient-gold">Service</span>
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
                placeholder="Search terms of service..."
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
              Welcome to BlackAI. These Terms of Service ("Terms") govern your access to and use of our AI solutions, 
              services, and website. By using our services, you enter into a legally binding agreement with BlackAI. 
              Please read these terms carefully before using our services. If you do not agree to these terms, you may 
              not access or use our services.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-accent/5 border-y border-accent/20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Important Notice</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Please read all Terms of Service carefully before entering into any agreement with BlackAI. 
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {filteredSections.length > 0 ? (
              filteredSections.map((section, index) => (
                <AnimatedSection key={section.id} delay={index * 0.1}>
                  <Card className="p-8 bg-card/50 border-border/50 hover:border-border transition-all">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <section.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-display font-bold mb-2">{section.title}</h2>
                      </div>
                    </div>
                    <div className="space-y-6 ml-16">
                      {section.content.map((item, idx) => (
                        <div key={idx}>
                          <h3 className="text-lg font-semibold mb-2 text-foreground">{item.subtitle}</h3>
                          <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </AnimatedSection>
              ))
            ) : (
              <Card className="p-12 text-center bg-card/50 border-border/50">
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-card/30 border-t border-border/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-muted-foreground mb-8">
              If you have any questions or concerns about these Terms of Service, please contact our legal team:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong className="text-foreground">Email:</strong> legal@blackai.in</p>
              <p><strong className="text-foreground">Address:</strong> BlackAI, Nagpur, Maharashtra, India</p>
              <p><strong className="text-foreground">Phone:</strong> +91 9975473730</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
