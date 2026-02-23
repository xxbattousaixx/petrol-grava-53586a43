import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { Home } from 'lucide-react';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-petrol-green-900 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-heading font-bold text-[150px] md:text-[200px] text-petrol-gold leading-none">
            404
          </h1>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-heading font-bold text-3xl md:text-4xl text-white uppercase tracking-tight mb-4"
        >
          {t(translations.notFound.title)}
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-3 bg-petrol-gold text-petrol-gold-foreground px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-petrol-gold-500 transition-all duration-300 mt-8"
          >
            <Home className="h-4 w-4" />
            {t(translations.notFound.back)}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
