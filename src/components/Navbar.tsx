import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations, servicesData } from '@/i18n/translations';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import logoHeader from '@/assets/logo-header-wide.jpg';

const policiesData = [
  { slug: translations.policies.safety.slug, title: translations.policies.safety.shortTitle },
  { slug: translations.policies.environment.slug, title: translations.policies.environment.shortTitle },
];

const Navbar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [policiesOpen, setPoliciesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg h-16' : 'bg-transparent h-20'}`}>
      <div className="container mx-auto h-full flex items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center group">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }} className="bg-gradient-to-r from-petrol-green-700 via-petrol-green-600 to-petrol-gold-500 rounded shadow-md px-6 py-0.5 flex items-center justify-center">
            <img src={logoHeader} alt="Petrol Grava Services C.A Logo" className="h-11 md:h-13 w-auto" />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavItem to="/" label={t(translations.nav.home)} active={isActive('/')} scrolled={scrolled} />
          <NavItem to="/nosotros" label={t(translations.nav.about)} active={isActive('/nosotros')} scrolled={scrolled} />

          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className={`flex items-center gap-1 px-4 py-2 font-heading font-semibold uppercase tracking-wider text-sm transition-all relative ${scrolled ? 'text-foreground hover:text-petrol-green' : 'text-white/90 hover:text-white'}`}>
              {t(translations.nav.services)}
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-petrol-gold transform origin-left transition-transform duration-300 ${servicesOpen ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="absolute left-0 top-full pt-2 w-80">
                  <div className="glass rounded-lg shadow-2xl border border-white/20 overflow-hidden max-h-[70vh] overflow-y-auto">
                    {servicesData.map((s) => (
                      <Link key={s.id} to={`/servicios/${s.slug}`} className="block px-4 py-3 text-sm text-foreground hover:bg-petrol-green hover:text-white transition-all duration-200 border-b border-border/50 last:border-b-0" onClick={() => setServicesOpen(false)}>
                        {t(s.title)}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Policies Dropdown */}
          <div className="relative" onMouseEnter={() => setPoliciesOpen(true)} onMouseLeave={() => setPoliciesOpen(false)}>
            <button className={`flex items-center gap-1 px-4 py-2 font-heading font-semibold uppercase tracking-wider text-sm transition-all relative ${scrolled ? 'text-foreground hover:text-petrol-green' : 'text-white/90 hover:text-white'}`}>
              {t(translations.policies.navLabel)}
              <ChevronDown className={`h-4 w-4 transition-transform ${policiesOpen ? 'rotate-180' : ''}`} />
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-petrol-gold transform origin-left transition-transform duration-300 ${policiesOpen ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>
            <AnimatePresence>
              {policiesOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="absolute left-0 top-full pt-2 w-80">
                  <div className="glass rounded-lg shadow-2xl border border-white/20 overflow-hidden">
                    {policiesData.map((p) => (
                      <Link key={p.slug} to={`/politicas/${p.slug}`} className="block px-4 py-3 text-sm text-foreground hover:bg-petrol-green hover:text-white transition-all duration-200 border-b border-border/50 last:border-b-0" onClick={() => setPoliciesOpen(false)}>
                        {t(p.title)}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavItem to="/mision-vision" label={t(translations.nav.mission)} active={isActive('/mision-vision')} scrolled={scrolled} />
          <NavItem to="/contacto" label={t(translations.nav.contact)} active={isActive('/contacto')} scrolled={scrolled} />

          <motion.button onClick={toggleLanguage} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-4 flex items-center gap-1.5 px-4 py-2 bg-petrol-gold text-petrol-green-900 text-xs font-heading font-bold uppercase tracking-widest hover:bg-petrol-gold-500 transition-colors">
            <Globe className="h-3.5 w-3.5" />
            {lang === 'es' ? 'EN' : 'ES'}
          </motion.button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button onClick={toggleLanguage} className="flex items-center gap-1 px-3 py-1.5 bg-petrol-gold text-petrol-green-900 text-xs font-heading font-bold uppercase">
            <Globe className="h-3.5 w-3.5" />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`p-2 transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden glass border-t border-white/20 overflow-hidden max-h-[calc(100vh-4rem)] overflow-y-auto" data-lenis-prevent>
            <div className="container mx-auto py-4">
              <MobileLink to="/" label={t(translations.nav.home)} onClick={() => setMobileOpen(false)} />
              <MobileLink to="/nosotros" label={t(translations.nav.about)} onClick={() => setMobileOpen(false)} />
              <div className="px-4 py-2 mt-2">
                <span className="text-petrol-gold text-xs font-heading font-bold uppercase tracking-widest">{t(translations.nav.services)}</span>
              </div>
              {servicesData.map((s) => (
                <MobileLink key={s.id} to={`/servicios/${s.slug}`} label={t(s.title)} onClick={() => setMobileOpen(false)} indent />
              ))}
              <div className="px-4 py-2 mt-2">
                <span className="text-petrol-gold text-xs font-heading font-bold uppercase tracking-widest">{t(translations.policies.navLabel)}</span>
              </div>
              {policiesData.map((p) => (
                <MobileLink key={p.slug} to={`/politicas/${p.slug}`} label={t(p.title)} onClick={() => setMobileOpen(false)} indent />
              ))}
              <MobileLink to="/mision-vision" label={t(translations.nav.mission)} onClick={() => setMobileOpen(false)} />
              <MobileLink to="/contacto" label={t(translations.nav.contact)} onClick={() => setMobileOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavItem = ({ to, label, active, scrolled }: { to: string; label: string; active: boolean; scrolled: boolean }) => (
  <Link to={to} className={`relative px-4 py-2 font-heading font-semibold uppercase tracking-wider text-sm transition-all group ${active ? (scrolled ? 'text-petrol-green' : 'text-petrol-gold') : (scrolled ? 'text-foreground hover:text-petrol-green' : 'text-white/90 hover:text-white')}`}>
    {label}
    <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-petrol-gold transform origin-left transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
  </Link>
);

const MobileLink = ({ to, label, onClick, indent }: { to: string; label: string; onClick: () => void; indent?: boolean }) => (
  <Link to={to} onClick={onClick} className={`block px-4 py-2.5 text-foreground hover:bg-petrol-green/10 hover:text-petrol-green transition-colors ${indent ? 'pl-8 text-xs font-body' : 'font-heading font-semibold uppercase tracking-wider text-sm'}`}>
    {label}
  </Link>
);

export default Navbar;
