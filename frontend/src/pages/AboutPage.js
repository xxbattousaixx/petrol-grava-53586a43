import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { CheckCircle } from 'lucide-react';
import aboutDock from '../assets/about-dock.jpg';
import mission1 from '../assets/mission-1.jpg';
import mission2 from '../assets/mission-2.jpg';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

const AboutPage = () => {
  const { t, tArr } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 bg-petrol-green-900 text-white overflow-hidden" data-testid="about-hero">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-60 h-60 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-petrol-gold text-xs tracking-[0.3em] mb-4 block"
          >
            {t(translations.about.label)}
          </motion.span>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight mb-4"
            >
              {t(translations.about.title)}
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-white/80 font-heading uppercase tracking-wider"
          >
            {t(translations.about.subtitle)}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm text-white/50 mt-4 font-mono"
          >
            {translations.about.rif}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 md:py-32 bg-industrial-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-muted-foreground leading-relaxed text-lg mb-10 font-body">
                {t(translations.about.description)}
              </p>
              
              <h3 className="font-heading font-bold text-2xl text-foreground mb-6 uppercase tracking-wide">
                {t(translations.about.areas.title)}
              </h3>
              
              <ul className="space-y-4">
                {[
                  translations.about.areas.north,
                  translations.about.areas.west,
                  translations.about.areas.east
                ].map((area, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-petrol-green flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground font-body">{t(area)}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <motion.div className="relative overflow-hidden" style={{ y: imageY }}>
                <img
                  src={aboutDock}
                  alt="Dock facilities"
                  className="w-full h-auto object-contain shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-petrol-green-900/30 to-transparent" />
              </motion.div>
              <img
                src={mission1}
                alt="Operations"
                className="w-full h-auto object-contain shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Experience */}
      <section className="py-24 md:py-32 bg-stone-100">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="font-mono text-petrol-gold text-xs tracking-[0.3em] mb-4 block">
              EXPERIENCIA
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground uppercase tracking-tight">
              {t(translations.about.experience.title)}
            </h2>
          </motion.div>

          {/* Mobile Carousel - shows 2 cards at a time */}
          {isMobile ? (
            <Swiper
              modules={[Pagination, FreeMode]}
              spaceBetween={12}
              slidesPerView={2}
              freeMode={true}
              pagination={{ clickable: true }}
              className="experience-swiper pb-12"
              data-testid="experience-carousel-mobile"
            >
              {tArr(translations.about.experience.items).map((item, i) => (
                <SwiperSlide key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="group bg-white p-4 border-l-4 border-petrol-green hover:shadow-xl transition-all duration-300 h-full min-h-[120px]"
                  >
                    <CheckCircle className="h-5 w-5 text-petrol-gold mb-2 group-hover:scale-110 transition-transform" />
                    <p className="font-heading font-semibold text-foreground uppercase tracking-wide text-xs leading-tight">
                      {item}
                    </p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            /* Desktop/Tablet Grid */
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="experience-grid-desktop">
              {tArr(translations.about.experience.items).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="group bg-white p-6 border-l-4 border-petrol-green hover:shadow-xl transition-all duration-300"
                >
                  <CheckCircle className="h-6 w-6 text-petrol-gold mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-heading font-semibold text-foreground uppercase tracking-wide text-sm">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Full Width Image */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={mission2}
            alt="Petrol Grava facilities"
            className="w-full h-[50vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-petrol-green-900/60 to-transparent" />
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
