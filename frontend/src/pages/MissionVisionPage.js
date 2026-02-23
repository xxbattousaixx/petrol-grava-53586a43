import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { Target, Eye } from 'lucide-react';
import mission1 from '../assets/mission-1.jpg';
import mission2 from '../assets/mission-2.jpg';

const MissionVisionPage = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 bg-petrol-green-900 text-white overflow-hidden" data-testid="mission-hero">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 border border-white rounded-full" />
          <div className="absolute bottom-20 left-20 w-48 h-48 border border-white rounded-full" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-petrol-gold text-xs tracking-[0.3em] mb-4 block"
          >
            {t(translations.nav.mission).toUpperCase()}
          </motion.span>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight"
            >
              {t(translations.mission.title)} & {t(translations.vision.title)}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-32 bg-industrial-white" data-testid="mission-content">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-petrol-green">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <span className="font-mono text-petrol-gold text-xs tracking-[0.3em]">
                  {t(translations.mission.label)}
                </span>
              </div>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6 uppercase tracking-tight">
                {t(translations.mission.title)}
              </h2>
              <div className="w-20 h-1 bg-petrol-gold mb-8" />
              <p className="text-muted-foreground leading-relaxed text-lg font-body">
                {t(translations.mission.text)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <img
                src={mission1}
                alt="Mission"
                className="w-full h-[400px] object-cover shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-full h-full border-4 border-petrol-gold -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 md:py-32 bg-stone-100" data-testid="vision-content">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-2 lg:order-1"
            >
              <img
                src={mission2}
                alt="Vision"
                className="w-full h-[400px] object-cover shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-petrol-green -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-petrol-gold">
                  <Eye className="h-8 w-8 text-petrol-gold-foreground" />
                </div>
                <span className="font-mono text-petrol-green text-xs tracking-[0.3em]">
                  {t(translations.vision.label)}
                </span>
              </div>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6 uppercase tracking-tight">
                {t(translations.vision.title)}
              </h2>
              <div className="w-20 h-1 bg-petrol-green mb-8" />
              <p className="text-muted-foreground leading-relaxed text-lg font-body">
                {t(translations.vision.text)}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Highlight */}
      <section className="py-20 bg-petrol-green-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h3 className="font-heading font-bold text-3xl md:text-4xl text-petrol-gold mb-8 uppercase tracking-tight">
              {t({ es: 'Nuestros Valores', en: 'Our Values' })}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { es: 'Calidad', en: 'Quality' },
                { es: 'Responsabilidad', en: 'Responsibility' },
                { es: 'Confiabilidad', en: 'Reliability' },
                { es: 'Seguridad', en: 'Safety' },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-4"
                >
                  <span className="font-heading font-bold text-lg uppercase tracking-widest">
                    {t(value)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MissionVisionPage;
