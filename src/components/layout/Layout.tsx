import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [showBorder, setShowBorder] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowBorder(true);
    const timer = setTimeout(() => setShowBorder(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Golden Border Animation */}
      <AnimatePresence>
        {showBorder && (
          <>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent z-50"
              style={{ transformOrigin: 'center' }}
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent z-50"
              style={{ transformOrigin: 'center' }}
            />
          </>
        )}
      </AnimatePresence>

      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};
