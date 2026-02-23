import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { translations, servicesData } from '@/i18n/translations';
import { MapPin, Phone, Mail, ArrowUpRight, Anchor } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <footer className="bg-petrol-green-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10"><Anchor className="h-40 w-40" /></div>
        <div className="absolute bottom-10 right-10 rotate-45"><Anchor className="h-60 w-60" /></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="font-heading font-bold text-2xl text-petrol-gold mb-4 uppercase tracking-wide">Petrol Grava</h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4 font-body">{t(translations.footer.description)}</p>
            <p className="text-xs text-white/50 font-mono">{translations.about.rif}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="font-heading font-bold text-lg text-petrol-gold mb-4 uppercase tracking-widest">{t(translations.nav.services)}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {servicesData.map((s) => (
                <Link key={s.id} to={`/servicios/${s.slug}`} className="group flex items-center gap-1 text-xs text-white/70 hover:text-petrol-gold transition-colors py-1">
                  <span className="truncate">{t(s.title)}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-bold text-lg text-petrol-gold mb-4 uppercase tracking-widest">{t(translations.nav.contact)}</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-1 text-petrol-gold flex-shrink-0" /><span className="text-white/70 leading-relaxed">{t(translations.contact.addressText)}</span></div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-petrol-gold flex-shrink-0" /><span className="text-white/70">{translations.contact.phoneNumbers}</span></div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-1 text-petrol-gold flex-shrink-0" />
                <div className="text-white/70">
                  {translations.contact.emails.map((e) => (<a key={e} href={`mailto:${e}`} className="block hover:text-petrol-gold transition-colors">{e}</a>))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 font-body">© {new Date().getFullYear()} Petrol Grava Services C.A. {t(translations.footer.rights)}</p>
          <div className="flex items-center gap-6">
            <Link to="/nosotros" className="text-xs text-white/50 hover:text-petrol-gold transition-colors font-heading uppercase tracking-wider">{t(translations.nav.about)}</Link>
            <Link to="/mision-vision" className="text-xs text-white/50 hover:text-petrol-gold transition-colors font-heading uppercase tracking-wider">{t(translations.nav.mission)}</Link>
            <Link to="/contacto" className="text-xs text-white/50 hover:text-petrol-gold transition-colors font-heading uppercase tracking-wider">{t(translations.nav.contact)}</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
