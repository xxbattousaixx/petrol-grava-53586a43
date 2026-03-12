import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { translations, servicesData } from '../i18n/translations';
import { ArrowRight, Anchor, Shield, Clock, Award } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import AnimatedCounter from '../components/AnimatedCounter';
import SatelliteHero from '../components/SatelliteHero';
import { serviceImages } from '../lib/serviceImages';

import aboutDock from '../assets/about-dock.jpg';
import mission1 from '../assets/mission-1.jpg';

const Index = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section - Satellite Zoom */}
      <SatelliteHero />

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-white border-y border-border" data-testid="stats-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { icon: Clock, value: '+27', label: translations.stats.years },
              { icon: Anchor, value: '76,402', label: translations.stats.land },
              { icon: Shield, value: '776', label: translations.stats.dock },
              { icon: Award, value: '10', label: translations.stats.services },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center md:text-left"
              >
                <stat.icon className="h-8 w-8 text-petrol-gold mx-auto md:mx-0 mb-3" />
                <div className="font-heading font-bold text-4xl md:text-5xl text-petrol-green-700 mb-1">
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="text-sm text-muted-foreground font-body uppercase tracking-wider">
                  {t(stat.label)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 md:py-32 bg-industrial-white relative overflow-hidden" data-testid="about-section">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-petrol-green-50/50 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-mono text-petrol-gold text-xs tracking-[0.3em] mb-4 block">
                {t(translations.about.label)}
              </span>
              <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-2 uppercase tracking-tight">
                {t(translations.about.title)}
              </h2>
              <h3 className="font-heading font-semibold text-2xl md:text-3xl text-petrol-gold mb-8 uppercase tracking-wide">
                {t(translations.about.subtitle)}
              </h3>
              <div className="w-20 h-1 bg-petrol-gold mb-8" />
              <p className="text-muted-foreground leading-relaxed text-lg mb-8 font-body">
                {t(translations.about.description)}
              </p>
              <Link
                to="/nosotros"
                className="group inline-flex items-center gap-3 bg-petrol-green text-white px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-petrol-green-800 transition-all duration-300"
                data-testid="about-cta"
              >
                {t(translations.about.readMore)}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative">
                <img
                  src={aboutDock}
                  alt="Petrol Grava dock facilities"
                  className="w-full h-auto object-contain shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-petrol-gold -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative bg-petrol-green-900 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-petrol-green-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-petrol-green-900 to-transparent z-10 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[50vh] md:h-[70vh] object-cover"
          >
            <source src="/assets/video-muelle.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 bg-stone-100" data-testid="services-section">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-petrol-gold text-xs tracking-[0.3em] mb-4 block">
              {t(translations.services.label)}
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 uppercase tracking-tight">
              {t(translations.services.title)}
            </h2>
            <p className="font-heading text-xl md:text-2xl text-muted-foreground uppercase tracking-wide">
              {t(translations.services.subtitle)}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {servicesData.slice(0, 6).map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                image={serviceImages[service.image] || ''}
                index={i}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/nosotros"
              className="group inline-flex items-center gap-3 bg-transparent border-2 border-petrol-green text-petrol-green px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-petrol-green hover:text-white transition-all duration-300"
              data-testid="services-view-all"
            >
              {t(translations.services.viewAll)}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 md:py-32 bg-petrol-green-900 text-white relative overflow-hidden" data-testid="mission-section">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white rounded-full" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-petrol-gold text-xs tracking-[0.3em] mb-4 block">
                {t(translations.mission.label)}
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-petrol-gold mb-6 uppercase tracking-tight">
                {t(translations.mission.title)}
              </h2>
              <p className="text-white/80 leading-relaxed font-body">
                {t(translations.mission.text)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <span className="font-mono text-petrol-gold text-xs tracking-[0.3em] mb-4 block">
                {t(translations.vision.label)}
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-petrol-gold mb-6 uppercase tracking-tight">
                {t(translations.vision.title)}
              </h2>
              <p className="text-white/80 leading-relaxed font-body">
                {t(translations.vision.text)}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <Link
              to="/mision-vision"
              className="group inline-flex items-center gap-3 bg-petrol-gold text-petrol-gold-foreground px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-petrol-gold-500 transition-all duration-300"
              data-testid="mission-cta"
            >
              {t(translations.about.readMore)}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-industrial-white relative" data-testid="cta-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative">
            <motion.img
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              src={mission1}
              alt="Petrol Grava operations"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-petrol-green-900/90 via-petrol-green-900/70 to-transparent flex items-center">
              <div className="px-8 md:px-16 max-w-2xl">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4 uppercase tracking-tight"
                >
                  {t(translations.cta.title)}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-white/80 mb-8 font-body text-lg"
                >
                  {t(translations.cta.subtitle)}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Link
                    to="/contacto"
                    className="group inline-flex items-center gap-3 bg-petrol-gold text-petrol-gold-foreground px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-petrol-gold-500 transition-all duration-300"
                    data-testid="cta-contact"
                  >
                    {t(translations.nav.contact)}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
